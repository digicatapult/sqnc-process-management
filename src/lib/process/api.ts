import * as api from '../utils/polkadot.js'

// TODO - refactor to validate payload?
// for some reason reduce did not work with Process.Program or ProgramStep[] type due to symbol.iterator
const isProgramValid = (program: Process.Program, out = { ops: 0, restrictions: -1 }): Boolean => {
  program.forEach((step: Process.ProgramStep) => {
    out = Object.hasOwn(step, 'op')
      ? { ...out, ops: out.ops + 1 }
      : { ...out, restrictions: out.restrictions + 1 }
  })

  return out.ops === out.restrictions
}

// TODO refactor since api.ts other should be a util
// since createNodeApi, set's all routes we could use in process.index.ts
export const createProcessTransaction = async (
  polkadot: Polkadot.Polkadot,
  processId: string,
  program: Process.Program,
  options: Polkadot.Options
): Promise<Process.Payload> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)
  
  if (!isProgramValid(program)) throw new Error('invalid program')

  return new Promise((resolve, reject) => {
    let unsub: Function
    polkadot.api.tx.sudo
      .sudo(polkadot.api.tx.processValidation.createProcess(processId, program))
      .signAndSend(sudo, (result: any) => {
        if (result.status.isInBlock) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessCreated'
          )

          const data = event.data
          const newProcess: Process.Payload = {
            id: data[0].toHuman(),
            version: data[1].toNumber(),
            status: 'Enabled',
            program,
          }

          unsub()
          resolve(newProcess)
        }
      })
      .then((res: Function) => {
        unsub = res
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

export const disableProcessTransaction = async (
  polkadot: Polkadot.Polkadot,
  processId: string,
  version: number,
  options: Polkadot.Options
): Promise<Process.Payload> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)

  return new Promise((resolve, reject) => {
    let unsub: Function
    polkadot.api.tx.sudo
      .sudo(polkadot.api.tx.processValidation.disableProcess(processId, version))
      .signAndSend(sudo, (result: any) => {
        if (result.status.isInBlock) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessDisabled'
          )

          const data = event.data
          const disabledProcess: Process.Payload = {
            id: data[0].toHuman(),
            version: data[1].toNumber(),
            status: 'Disabled',
          }

          unsub()
          resolve(disabledProcess)
        }
      })
      .then((res: Function) => {
        unsub = res
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

// TODO sort types for all functions if time allows
// validate ids?
type GetAllFn = (options: Polkadot.Options) => Promise<Process.RawPayload[]>

export const getAll: GetAllFn = async (options) => {
  const polkadot: Polkadot.Polkadot = await api.createNodeApi(options)
  const processes = await Promise.all<Process.RawPayload>(
    (
      await polkadot.api.query.processValidation.processModel.entries()
    ).map(([id, data]: any) => {
      return {
        id: id.toHuman()[0],
        version: parseInt(id.toHuman()[1]),
        status: data.status.toString(),
        program: data.program.toJSON(),
        createdAtHash: data.createdAtHash.toHuman(),
        initialU8aLength: data.initialU8aLength,
      }
    })
  )
  return processes
}

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
