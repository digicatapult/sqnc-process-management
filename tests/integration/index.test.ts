import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  noValidRestrictions,
  invalidRestrictionValue,
} from '../fixtures/restrictions.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { ZodError } from 'zod'
import { HexError, NoValidRestrictionsError, VersionError } from '../../src/lib/types/error.js'

describe('Process creation and deletion', () => {
  describe('Happy path', () => {
    it.only('creates then disables a process', async () => {

      const currentVersion = await getVersionHelper('0x30')
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess('0', bumpedVersion, validAllRestrictions)
      console.log({ newProcess }) 
      expect(newProcess).to.deep.equal({
        id: '0x30',
        version: bumpedVersion,
        status: 'Enabled',
        program: validAllRestrictions, 
      })

      const disabledProcess = await disableProcess('0', bumpedVersion)
      expect(disabledProcess).to.deep.equal({ id: '0x30', version: bumpedVersion, status: 'Disabled' })
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
      expect(disabledProcess).to.equal(null)
    })
  })

  describe('Sad path', () => {
    const validProcessName = '0'
    let validVersionNumber: number
    before(async () => {
      const currentVersion = await getVersionHelper('0x30')
      validVersionNumber = currentVersion + 1
    })

    it('fails for invalid restriction name', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber, noValidRestrictions),
        NoValidRestrictionsError
      )
    })

    it('fails for invalid restriction value', async () => {
      return assert.isRejected(createProcess(validProcessName, validVersionNumber, invalidRestrictionValue), ZodError)
    })

    it('fails for invalid json', async () => {
      // ts is robust for this. I must use any in order for this test to work
      //Argument of type 'string' is not assignable to parameter of type 'Program'.ts(2345)
      return assert.isRejected(createProcess(validProcessName, validVersionNumber, 'invalidJson' as any), SyntaxError)
    })

    it('fails to create for same version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber - 1, validAllRestrictions),
        VersionError
      )
    })

    it('fails to create for too low version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber - 2, validAllRestrictions),
        VersionError
      )
    })

    it('fails to create for too high version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber + 1, validAllRestrictions),
        VersionError
      )
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
