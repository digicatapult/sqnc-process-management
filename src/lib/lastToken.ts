import * as api from './api.js'

export async function getLastTokenId() {
    await api.default.isReady
    const lastTokenId = await api.default.query.simpleNftModule.lastToken()
    return console.log('Last Token ID:', lastTokenId.toJSON())
  }

