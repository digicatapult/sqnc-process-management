import * as api from '../utils/polkadot.js'

// TODO expand so it's functions rather than just harccoded values
type PorcessValidationMethods = 'createProcess' | 'disableProcess'

type TransactionArgs = {
  polkadot: Polkadot.Polkadot,
  id: string,
  data: Process.Program | number,
  options: Polkadot.Options,
  fn: PorcessValidationMethods
}

type GetAllFn = (options: Polkadot.Options) => Promise<Process.Payload[]>
type CreateTransaction = (args: TransactionArgs) => Promise<Process.Payload>
type CheckResult = (args: {
  id: string,
  events: Array<any>,
  fn: PorcessValidationMethods,
  program?: Process.Program,
  version?: number,
}) => Process.Payload

const checkResult: CheckResult = ({
  events,
  id,
  program,
  version,
  fn,
}) => {
  return events.reduce((out, next) => {
    switch (next.event.method) {
      case 'ProcessDisabled':
        if ('disableProcess' == fn) return {
          ...out,
          status: 'Disabled',
          version: version,
        } 
      case 'ProcessCreated':
        if ('createProcess' == fn) return {
          ...out,
          status: 'Enabled',
          version: next.data[1].toNumber(),
          program,
        } 
        throw new Error('result validation failed')
      default:
        return false
    }
  }, { id })
}

// TODO make it class? so stuff like polkadot can be part of constructor?
export const createTransaction: CreateTransaction = async ({ polkadot, id, fn, data, options }) => {
  const sudoKey = polkadot.keyring.addFromUri(options.USER_URI)
  
  return new Promise((resolve, reject) => {
    const { sudo, processValidation } = polkadot.api.tx
    let unsub: Function
    sudo.sudo(processValidation[fn](id, data)).signAndSend(sudoKey, ({ status, events }: any) => {
        if (status.isInBlock) {
          const payload = typeof data !== 'number' ? { program: data } : { version: data } 
          const res = checkResult({ ...payload, id, events, fn })
          unsub() // what does this do?
          resolve(res)
        }
      })
      // already wrapped in try/catch should be covered? TODO investigate
      .then((res: Function) => unsub = res)
      .catch((err: Error) => reject(err))
  })
}



// TODO refactor into 'get' and maybe getAll
export const getVersion = async (polkadot: Polkadot.Polkadot, processId: string): Promise<number> => {
  const id = await polkadot.api.query.processValidation.versionModel(processId)
  return Number(id.toString())
}

export const getProcess = async (
  polkadot: Polkadot.Polkadot,
  processId: string,
  version: number
): Promise<Process.Payload> => {
  const result = await polkadot.api.query.processValidation.processModel(processId, version)
  const data = Object(result.toJSON())
  return {
    id: processId,
    version, 
    status: data.status,
    program: data.program,
  }
}

export const getAll: GetAllFn = async (options) => {
  const polkadot: Polkadot.Polkadot = await api.createNodeApi(options)    
  const processes = await Promise.all(
    (await polkadot.api.query.processValidation.processModel.entries())
      .map(([id, data]: any) => new Promise((r) => {
        getVersion(polkadot, id).then((version) => {
          return r({
            id,
            version,
            ...data
          })
        })
      }))
  )

  // a quick hack to stringify substrate values
  return JSON.parse(JSON.stringify(processes))
}
