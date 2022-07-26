import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  validMultipleOfSameRestrictions,
  noValidRestrictions,
  invalidRestrictionValue,
} from '../fixtures/restrictions.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getProcessHelper, getVersionHelper } from '../helpers/substrateHelper.js'
import { mapRestrictions } from '../../src/lib/process/map.js'
import { ZodError } from 'zod'
import { HexError, NoValidRestrictionsError, VersionError } from '../../src/lib/types/error.js'

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
    const validProcessName  = '0'
    let validVersionNumber: number
    before(async () => {
      const currentVersion = await getVersionHelper('0x30')
      validVersionNumber = currentVersion + 1
    })

    it('fails for invalid restriction name', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber, noValidRestrictions), NoValidRestrictionsError)
    })

    it('fails for invalid restriction value', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber, invalidRestrictionValue), ZodError)
    })

    it('fails for invalid json', async () => {
      return assert.isRejected(createProcess(validProcessName,  validVersionNumber, 'invalidJson'), SyntaxError)
    })

    it('fails to create for same version', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber - 1, validAllRestrictions), VersionError)
    })

    it('fails to create for too low version', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber - 2, validAllRestrictions), VersionError)
    })

    it('fails to create for too high version', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber + 1, validAllRestrictions), VersionError)
    })

    it('fails to create with too long process id', async () => {
      const processId = '0'.repeat(Constants.PROCESS_ID_LENGTH + 1)
      return assert.isRejected(createProcess(processId, 1, validAllRestrictions), HexError)
    })

    it('fails to disable process that does not exist', async () => {
      return assert.isRejected(disableProcess('incorrectProcessName', 1), VersionError)
    })
  })
})
