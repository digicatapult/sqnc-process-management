import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess, loadProcesses } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  invalidRestrictionKey,
  invalidRestrictionValue,
  multiple,
  simple,
} from '../fixtures/programs.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { ZodError } from 'zod'
import { HexError, VersionError, DisableError } from '../../src/lib/types/error.js'
import { getAll } from '../../src/lib/process/api.js'

const polkadotOptions = { API_HOST: 'localhost', API_PORT: 9944, USER_URI: '//Alice' }

describe('Process creation and deletion, listing', () => {
  describe('Happy path', () => {
    it('creates then disables a process', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, simple, false, polkadotOptions)
      expect(newProcess.process).to.deep.equal({
        id: processName,
        version: bumpedVersion,
        status: 'Enabled',
        program: simple,
      })

      const disabledProcess = await disableProcess(processName, bumpedVersion, false, polkadotOptions)
      expect(disabledProcess.message).to.equal('Process has been disabled')
      expect(disabledProcess.process).to.deep.equal({
        id: processName,
        version: bumpedVersion,
        status: 'Disabled',
      })
    })

    it('creates multiple processes', async () => {
      const process1Name = 'process-1'
      const process1BumpedV = (await getVersionHelper(process1Name)) + 1
      const process2Name = 'process-2'
      const process2BumpedV = (await getVersionHelper(process2Name)) + 1
      const newProcesses = await loadProcesses({
        options: polkadotOptions,
        data: multiple(process1Name, process1BumpedV, process2Name, process2BumpedV),
      })
      expect(newProcesses[process1Name].message).to.deep.equal(
        'Transaction for new process process-1 has been successfully submitted'
      )
      expect(newProcesses[process1Name].process).to.deep.contain({
        version: process1BumpedV,
        status: 'Enabled',
      })
      expect(newProcesses[process2Name].message).to.deep.equal(
        'Transaction for new process process-2 has been successfully submitted'
      )
      expect(newProcesses[process2Name].process).to.deep.contain({
        version: process2BumpedV,
        status: 'Enabled',
      })
    })

    it('does not create process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, validAllRestrictions, true, polkadotOptions)
      expect(newProcess.process).to.equal(null)
    })

    it('does not disable process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const disabledProcess = await disableProcess(processName, currentVersion, true, polkadotOptions)
      expect(disabledProcess.process).to.equal(undefined)
      expect(disabledProcess).to.deep.contain({
        message: 'This will DISABLE the following process 0',
        name: processName,
      })
    })

    it('returns a list of raw processes', async () => {
      const res = await getAll(polkadotOptions)

      expect(res).to.be.an('array')
      expect(res[0])
        .to.be.an('object')
        .that.has.keys(['id', 'createdAtHash', 'initialU8aLength', 'program', 'status', 'version'])
    })
  })

  describe('Sad path', () => {
    const validProcessName = '0'
    let validVersionNumber: number
    before(async () => {
      const currentVersion = await getVersionHelper(validProcessName)
      validVersionNumber = currentVersion + 1
    })

    it('fails for invalid restriction key', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber, invalidRestrictionKey, false, polkadotOptions),
        ZodError
      )
    })

    it('fails for invalid restriction value', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber, invalidRestrictionValue, false, polkadotOptions),
        ZodError
      )
    })

    it('fails for invalid json', async () => {
      return assert.isRejected(
        createProcess(
          validProcessName,
          validVersionNumber,
          'invalidJson' as unknown as Process.Program,
          false,
          polkadotOptions
        ),
        TypeError
      )
    })

    it('fails to create for same version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber - 1, validAllRestrictions, false, polkadotOptions),
        VersionError
      )
    })

    it('fails to create for too low version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber - 2, validAllRestrictions, false, polkadotOptions),
        VersionError
      )
    })

    it('fails to create for too high version', async () => {
      return assert.isRejected(
        createProcess(validProcessName, validVersionNumber + 1, validAllRestrictions, false, polkadotOptions),
        VersionError
      )
    })

    it('fails to create with too long process id', async () => {
      const processName = '0'.repeat(Constants.PROCESS_ID_LENGTH + 1)
      return assert.isRejected(createProcess(processName, 1, validAllRestrictions, false, polkadotOptions), HexError)
    })

    it('fails to disable process that does not exist', async () => {
      return assert.isRejected(disableProcess('incorrectProcessName', 1, false, polkadotOptions), DisableError)
    })

    it('fails to disable process a second time', async () => {
      const newProcess = await createProcess(validProcessName, validVersionNumber, simple, false, polkadotOptions)
      expect(newProcess.process).to.exist
      const firstDisable = await disableProcess(validProcessName, validVersionNumber, false, polkadotOptions)
      expect(firstDisable.process).to.exist

      return assert.isRejected(disableProcess(validProcessName, validVersionNumber, false, polkadotOptions), DisableError)
    })
  })
})
