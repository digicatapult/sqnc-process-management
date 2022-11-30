import * as api from '../utils/polkadot.js'

// TODO expand so it's functions rather than just harccoded values
type PorcessValidationEndpoints = 'createProcess' | 'disableProcess'
type TransactionArgs = { polkadot: Polkadot.Polkadot, id: string, data: Process.Program | number, options: Polkadot.Options }
type GetAll = (options: Polkadot.Options) => Promise<Process.Payload[]>
type CreateTransaction = (method: PorcessValidationEndpoints, args: TransactionArgs) => Promise<Process.Payload>
type ValidateApiRes = (args: {
  id: string,
  events: Array<any>, // TODO type this? @types/polkadot?
  method: PorcessValidationEndpoints,
  program?: Process.Program,
  version?: number,
}) => Process.Payload

const validateApiRes: ValidateApiRes = ({ events, id, program, version, method }) => {
  return events.reduce((out, { event }) => {
    switch (event.method) { // a helper for each method? so case 'a': return methodHandler(...args)
      case 'ProcessDisabled':
        if ('disableProcess' === method) return {
          id: out.id,
          status: 'Disabled',
          version: version,
        } 
      case 'ProcessCreated':
        if ('createProcess' === method) return {
          id: out.id,
          status: 'Enabled',
          version: event.data[1].toNumber(),
          program,
        } 
      default:
        return out
    }
  }, { id })
}

// TODO make it class? so stuff like polkadot can be part of constructor?
export const createTransaction: CreateTransaction = async (method, { polkadot, id, data, options }) => {
  const sudoKey = polkadot.keyring.addFromUri(options.USER_URI)
  
  return new Promise((resolve, reject) => {
    const { sudo, processValidation } = polkadot.api.tx
    let unsub: Function
    sudo.sudo(processValidation[method](id, data))
      .signAndSend(sudoKey, ({ status, events }: any) => {
        if (status.isInBlock) {
          const payload = typeof data !== 'number' ? { program: data } : { version: data } 
          const res = validateApiRes({ ...payload, id, events, method })
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
  id: string,
  version: number
): Promise<Process.Payload> => {
  const result = await polkadot.api.query.processValidation.processModel(id, version)
  const data = Object(result.toJSON())
  return {
    id,
    version, 
    status: data.status,
    program: data.program,
  }
}

export const getAll: GetAll = async (options) => {
  const polkadot: Polkadot.Polkadot = await api.createNodeApi(options)    
  const processes = await Promise.all(
    (
      await polkadot.api.query.processValidation.processModel.entries()
    ).map(
      ([id, data]: any) =>
        new Promise((r) => {
          getVersion(polkadot, id).then((version) => {
            return r({
              id,
              version,
              status: data.status,
              program: JSON.stringify(data.program),
              ...data,
            })
          })
        })
    )
  )

  // a quick hack to stringify substrate values
  return JSON.parse(JSON.stringify(processes))
}
