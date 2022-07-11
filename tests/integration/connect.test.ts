import api from '../../src/lib/api.js'
import { expect } from 'chai'

describe('Tests node connection', () => {
  before(async function () {
    await api.isReady
  })

  it('get last token should return 0', async () => {
    const lastTokenRaw = await api.query.simpleNftModule.lastToken()
    const lastTokenId = lastTokenRaw.toJSON()
    expect(lastTokenId).to.equal(0)
  })
})
