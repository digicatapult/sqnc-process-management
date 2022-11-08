import { buildApi } from '@digicatapult/dscp-node'

export const createNodeApi = async (options: Polkadot.Options): Promise<Polkadot.Polkadot>  => {
  const { api, keyring } = buildApi({
    options: {
      apiHost: options.API_HOST,
      apiPort: options.API_PORT,
    },
  })

  await api.isReady

  api.on('error', (err: any) => {
    console.log(`Error from substrate node connection. Error was ${err.message || JSON.stringify(err)}`)
  })

  return {
    api,
    keyring,
  }
}
