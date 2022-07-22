import { Restrictions } from '../types/restrictions.js'
import { Options } from '../types/options.js'
import { Polkadot } from '../types/substrate.js'
import { Process } from './index.js'

export const createProcessTransaction = async (
  polkadot: Polkadot,
  processId: string,
  restrictions: Restrictions,
  options: Options
): Promise<Process> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)

  return new Promise((resolve, reject) => {
    let unsub: Function
    polkadot.api.tx.sudo
      .sudo(polkadot.api.tx.processValidation.createProcess(processId, restrictions))
      .signAndSend(sudo, (result: any) => {
        if (result.status.isInBlock) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessCreated'
          )

          const data = event.data
          const newProcess: Process = {
            id: processId,
            version: data[1].toNumber(),
            status: 'Enabled',
            restrictions: restrictions,
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
  polkadot: Polkadot,
  processId: string,
  version: number,
  options: Options
): Promise<Process> => {
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
          const disabledProcess: Process = {
            id: processId,
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

export const getVersion = async (polkadot: Polkadot, processId: string): Promise<number> => {
  const id = await polkadot.api.query.processValidation.versionModel(processId)
  return Number(id.toString())
}

export const getProcess = async (polkadot: Polkadot, processId: string, version: number): Promise<Process> => {
  const result = await polkadot.api.query.processValidation.processModel(processId, version)
  const data = Object(result.toJSON())
  return {
    id: processId,
    version: version,
    status: data.status,
    restrictions: data.restrictions,
  }
}