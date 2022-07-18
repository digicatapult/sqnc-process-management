import { createProcess, disableProcess, getVersionUtf } from '../../src/lib/process.js'
import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { validAll } from '../fixtures/restrictions.js'
chai.use(chaiAsPromised)

describe('Process creation and deletion', () => {
  it('creates then disables a process', async () => {
    const currentVersion = await getVersionUtf('0')
    const bumpedVersion = currentVersion + 1
    const newProcess = await createProcess('0', bumpedVersion, JSON.stringify(validAll))
    expect(newProcess).to.deep.equal({ id: '0x30', version: bumpedVersion })

    const disabledProcess = await disableProcess('0', bumpedVersion)
    expect(disabledProcess).to.deep.equal({ id: '0x30', version: bumpedVersion })
  })

  it('fails for same version', async () => {
    const currentVersion = await getVersionUtf('0')
    return assert.isRejected(createProcess('0', currentVersion, ''))
  })

  it('fails for too low version', async () => {
    const currentVersion = await getVersionUtf('0')
    const tooLowVersion = currentVersion - 1
    return assert.isRejected(createProcess('0', tooLowVersion, ''))
  })

  it('fails with too long process id', async () => {
    return assert.isRejected(createProcess('00000000000000000000000000000000000000', 1, ''))
  })
})
