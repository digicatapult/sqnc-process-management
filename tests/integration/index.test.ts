import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  validMultipleOfSameRestrictions,
  invalidRestrictionName,
  invalidRestrictionValue,
} from '../fixtures/restrictions.js'
import { PROCESS_ID_LENGTH } from '../../src/lib/types/restrictions.js'
import { getProcessHelper, getVersionHelper } from '../helpers/substrateHelper.js'
import { mapRestrictions } from '../../src/lib/process/map.js'

describe('Process creation and deletion', () => {
  describe('Happy path', () => {
    it('creates then disables a process', async () => {
      const currentVersion = await getVersionHelper('0x30')
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess('0', bumpedVersion, validAllRestrictions)
      const mappedRestrictions = mapRestrictions(validAllRestrictions)
      expect(newProcess.process).to.deep.equal({
        id: '0x30',
        version: bumpedVersion,
        status: 'Enabled',
        restrictions: mappedRestrictions,
      })

      const processOnChain = await getProcessHelper('0x30', bumpedVersion)
      expect(processOnChain?.restrictions?.length).to.equal(mappedRestrictions.length) // restrictions are returned with some hex values making equality check difficult

      const disabledProcess = await disableProcess('0', bumpedVersion)
      expect(disabledProcess.process).to.deep.equal({ id: '0x30', version: bumpedVersion, status: 'Disabled' })
    })

    it('creates a process with multiple variations of same restrictions', async () => {
      const currentVersion = await getVersionHelper('0x30')
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess('0', bumpedVersion, validMultipleOfSameRestrictions)
      expect(newProcess.process).to.deep.equal({
        id: '0x30',
        version: bumpedVersion,
        status: 'Enabled',
        restrictions: mapRestrictions(validMultipleOfSameRestrictions),
      })
    })

    it('does not create process if dry run', async () => {
      const currentVersion = await getVersionHelper('0x30')
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess('0', bumpedVersion, validAllRestrictions, true)
      expect(newProcess.process).to.equal(null)
    })

    it('does not disable process if dry run', async () => {
      const currentVersion = await getVersionHelper('0x30')
      const disabledProcess = await disableProcess('0', currentVersion, true)
      expect(disabledProcess.process).to.equal(null)
    })
  })

  describe('Sad path', () => {
    let currentVersion: number
    before(async () => {
      currentVersion = await getVersionHelper('0x30')
    })

    it('fails for invalid restriction name', async () => {
      return assert.isRejected(createProcess('0', currentVersion + 1, invalidRestrictionName))
    })

    // it('fails for invalid restriction value', async () => {
    //   return assert.isRejected(createProcess('0', currentVersion + 1, invalidRestrictionValue))
    // })

    it('fails for invalid json', async () => {
      return assert.isRejected(createProcess('0', currentVersion + 1, 'invalidJson'))
    })

    it('fails to create for same version', async () => {
      return assert.isRejected(createProcess('0', currentVersion, validAllRestrictions))
    })

    it('fails to create for too low version', async () => {
      return assert.isRejected(createProcess('0', currentVersion - 1, validAllRestrictions))
    })

    it('fails to create for too high version', async () => {
      return assert.isRejected(createProcess('0', currentVersion + 2, validAllRestrictions))
    })

    it('fails to create with too long process id', async () => {
      const processId = 'a'.repeat(PROCESS_ID_LENGTH + 1)
      return assert.isRejected(createProcess(processId, 1, validAllRestrictions))
    })

    it('fails to disable process that does not exist', async () => {
      return assert.isRejected(disableProcess('incorrectProcessName', 1))
    })
  })
})
