import type { ChainRestrictions } from '../types/restrictions'

export const createProcessTransaction = async (
  polkadot: Polkadot.Polkadot,
  processId: string,
  restrictions: ChainRestrictions,
  options: Polkadot.Options
): Promise<Process.Payload> => {
  const sudo = polkadot.keyring.addFromUri(options.USER_URI)

  console.log(restrictions)
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
          const newProcess: Process.Payload = {
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
    version: version,
    status: data.status,
    restrictions: data.program,
  }
}
