import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'

export const createNodeApi = async (options: Polkadot.Options): Promise<Polkadot.Polkadot> => {
  const provider = new WsProvider(`ws://${options.API_HOST}:${options.API_PORT}`)
  const api = new ApiPromise({ provider })

  api.isReadyOrError.catch(() => {}) // prevent unhandled promise rejection errors

  await api.isReady

  api.on('error', (err: { message?: string }): string => {
    const msg = err.message || JSON.stringify(err)
    console.log(`Error from substrate node connection. Error was ${msg}`)

    return msg
  })

  return {
    api,
    keyring: new Keyring({ type: 'sr25519' }),
  }
}
