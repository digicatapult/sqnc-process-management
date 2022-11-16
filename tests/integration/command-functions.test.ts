import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess, loadProcesses } from '../../src/lib/process/index.js'
import { getAll } from '../../src/lib/process/api.js'
import {
  validAllRestrictions,
  noValidRestrictions,
  invalidRestrictionValue,
  multiple,
} from '../fixtures/programs.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { ZodError } from 'zod'
import { HexError, NoValidRestrictionsError, VersionError } from '../../src/lib/types/error.js'

const polkadotOptions = { API_HOST: 'localhost', API_PORT: 9944, USER_URI: '//Alice' }

describe('Process creation and deletion, listing', () => {
  describe('Happy path', () => {
    it('creates then disables a process', async () => {
      const currentVersion = await getVersionHelper('0x30')
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess('0', bumpedVersion, validAllRestrictions)
      expect(newProcess.process).to.deep.equal({
        id: '0x30',
        version: bumpedVersion,
        status: 'Enabled',
        program: validAllRestrictions, 
      })

      const disabledProcess = await disableProcess('0', bumpedVersion)
      expect(disabledProcess.message).to.equal('Process has been disabled')
      expect(disabledProcess.process).to.deep.equal({
        id: '0x30',
        version: bumpedVersion,
        status: 'Disabled', 
      })
    })
    
    it('creates multiple processes', async () => {
      const newProcesses = await loadProcesses({ data: multiple })
      expect(newProcesses?.mock_accept_order?.process?.status).to.equal('Enabled')
      expect(newProcesses?.mock_post_order?.process?.status).to.equal('Enabled')
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
      expect(disabledProcess.process).to.equal(undefined)
      expect(disabledProcess).to.deep.contain({
        message: 'This will DISABLE the following process 0',
        name: '0'
      })
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
      return assert.isRejected(createProcess(validProcessName, validVersionNumber, 'invalidJson' as unknown as Process.Program), TypeError)
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

  it('Lists all process flows', async () => {
    const res = await getAll(polkadotOptions)

    expect(res).to.be.an('array')
  })
})
