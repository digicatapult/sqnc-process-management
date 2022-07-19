import { createProcess, disableProcess, getVersionUtf } from '../../src/lib/process.js'
import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { validRestrictions } from '../fixtures/restrictions.js'
import { PROCESS_ID_LENGTH } from '../../src/lib/restrictions.js'
chai.use(chaiAsPromised)

describe('Process creation and deletion', () => {
  it('creates then disables a process', async () => {
    const currentVersion = await getVersionUtf('0')
    const bumpedVersion = currentVersion + 1
    const newProcess = await createProcess('0', bumpedVersion, validRestrictions)
    expect(newProcess).to.deep.equal({ id: '0x30', version: bumpedVersion })

    const disabledProcess = await disableProcess('0', bumpedVersion)
    expect(disabledProcess).to.deep.equal({ id: '0x30', version: bumpedVersion })
  })

  it('does not create process if dry run', async () => {
    const currentVersion = await getVersionUtf('0')
    const bumpedVersion = currentVersion + 1
    const newProcess = await createProcess('0', bumpedVersion, validRestrictions, true)
    expect(newProcess).to.equal(null)
  })

  it('does not disable process if dry run', async () => {
    const currentVersion = await getVersionUtf('0')
    const disabledProcess = await disableProcess('0', currentVersion, true)
    expect(disabledProcess).to.equal(null)
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
    const processId = 'a'.repeat(PROCESS_ID_LENGTH + 1)
    return assert.isRejected(createProcess(processId, 1, ''))
  })

  it('fails for process that does not exist', async () => {
    return assert.isRejected(disableProcess('incorrectProcessName', 1))
  })
})
