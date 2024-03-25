import { ProgramError } from '../types/error.js'
import * as api from '../utils/polkadot.js'
import { hexToUtf8 } from './hex.js'

// TODO - refactor to validate payload?
// for some reason reduce did not work with Process.Program or ProgramStep[] type due to symbol.iterator
const isProgramValid = (program: Process.Program, out = { ops: 0, restrictions: -1 }): Boolean => {
  program.forEach((step: Process.ProgramStep) => {
    out = Object.hasOwn(step, 'Op') ? { ...out, ops: out.ops + 1 } : { ...out, restrictions: out.restrictions + 1 }
  })

  return out.ops === out.restrictions
}

// TODO refactor since api.ts other should be a util
// since createNodeApi, set's all routes we could use in process.index.ts
export const createProcessTransaction = async (
  polkadot: Polkadot.Polkadot,
  processId: Process.Hex,
  program: Process.Program,
  options: Polkadot.Options
): Promise<{ waitForFinal: Promise<Process.Payload> }> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)
  const supportsManualSeal = !!polkadot.api.rpc.engine.createBlock

  if (!isProgramValid(program)) throw new ProgramError('invalid program')

  let resolve: (value: Process.Payload) => void = () => {}
  let reject: (reason: any) => void = () => {}
  const result: Promise<Process.Payload> = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  try {
    const unsub = await polkadot.api.tx.sudo
      .sudo(polkadot.api.tx.processValidation.createProcess(processId, program))
      .signAndSend(sudo, { nonce: -1 }, (result: any) => {
        if (result.status.isFinalized) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessCreated'
          )

          const data = event.data
          const newProcess: Process.Payload = {
            name: data[0].toHuman(),
            version: data[1].toNumber(),
            status: 'Enabled',
            program,
          }
          unsub()
          resolve(newProcess)
        }
      })
    if (supportsManualSeal) {
      await polkadot.api.rpc.engine.createBlock(true, true)
    }
  } catch (err) {
    reject(err)
  }

  return {
    waitForFinal: result,
  }
}

export const disableProcessTransaction = async (
  polkadot: Polkadot.Polkadot,
  processId: Process.Hex,
  version: number,
  options: Polkadot.Options
): Promise<Process.Payload> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)
  const supportsManualSeal = !!polkadot.api.rpc.engine.createBlock

  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await polkadot.api.tx.sudo
        .sudo(polkadot.api.tx.processValidation.disableProcess(processId, version))
        .signAndSend(sudo, (result: any) => {
          if (result.status.isFinalized) {
            const { event } = result.events.find(
              ({ event: { method } }: { event: { method: string } }) => method === 'ProcessDisabled'
            )

            const data = event.data
            const disabledProcess: Process.Payload = {
              name: data[0].toHuman(),
              version: data[1].toNumber(),
              status: 'Disabled',
            }

            unsub()
            resolve(disabledProcess)
          }
        })
      if (supportsManualSeal) {
        await polkadot.api.rpc.engine.createBlock(true, true)
      }
    } catch (err) {
      reject(err)
    }
  })
}

// TODO sort types for all functions if time allows
// validate ids?
type GetAllFn = (options: Polkadot.Options) => Promise<Process.RawPayload[]>

export const getAll: GetAllFn = async (options) => {
  const polkadot: Polkadot.Polkadot = await api.createNodeApi(options)
  const processesRaw = await polkadot.api.query.processValidation.processModel.entries()
  return processesRaw.map(([idRaw, data]: any) => {
    const id = idRaw.toHuman()
    return {
      name: id[0],
      version: parseInt(id[1]),
      status: data.status.toString(),
      program: data.program.toJSON(),
      createdAtHash: data.createdAtHash.toHuman(),
      initialU8aLength: data.initialU8aLength,
    }
  })
}

export const getVersion = async (polkadot: Polkadot.Polkadot, processId: Process.Hex): Promise<number> => {
  const id = await polkadot.api.query.processValidation.versionModel(processId)
  return Number(id.toString())
}

export const getProcess = async (
  polkadot: Polkadot.Polkadot,
  processId: Process.Hex,
  version: number
): Promise<Process.Payload> => {
  const result = await polkadot.api.query.processValidation.processModel(processId, version)
  const data = Object(result.toHuman())
  return {
    name: hexToUtf8(processId),
    version,
    status: data.status,
    program: data.program,
  }
}
