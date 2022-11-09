import { buildApi } from '@digicatapult/dscp-node'

export const createNodeApi = async (options: Polkadot.Options): Promise<Polkadot.Polkadot>  => {
  const { api, keyring } = buildApi({
    options: {
      apiHost: options.API_HOST,
      apiPort: options.API_PORT,
    },
  })

  await api.isReady

  api.on('error', (err: { message?: string }): string => { 
    const msg = err.message || JSON.stringify(err)
    console.log(`Error from substrate node connection. Error was ${msg}`)

    return msg 
  })

  return {
    api,
    keyring,
  }
}
