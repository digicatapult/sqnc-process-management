import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess, loadProcesses } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  invalidPOSIX,
  multiple,
  simple2,
  simple,
} from '../fixtures/programs.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { DisableError } from '../../src/lib/types/error.js'
import { getAll } from '../../src/lib/process/api.js'

const polkadotOptions = { API_HOST: 'localhost', API_PORT: 9944, USER_URI: '//Alice' }


describe('Process creation and deletion, listing', () => {
  describe('Happy path', () => {
    describe('Multiple processes', () => {
      it('skips already created processes and creates new ones', async () => {
        await createProcess('existing-process-test', 1, simple2, false, polkadotOptions)
        const process2Name = 'process-to-be-created'
        const process2BumpedV = (await getVersionHelper(process2Name)) + 1
        // TODO multiple to take an array?, better assertation
        const newProcesses = await loadProcesses({
          options: polkadotOptions,
          data: multiple('existing-process-test', 1, process2Name, process2BumpedV),
        })
        expect(newProcesses['existing-process-test']).to.deep.contain({
          message: 'Process existing-process-test is already created.',
          process: {
            id: '0x6578697374696e672d70726f636573732d74657374',
            version: 1,
            status: 'Enabled',
            program: [{
              restriction: {
                senderHasInputRole: {
                  index: 0,
                  roleKey: 'Supplier',
                },
              },
            }],
          },
        })
        expect(newProcesses[process2Name].message).to.deep.equal(
          'Transaction for new process process-to-be-created has been successfully submitted'
        )
        expect(newProcesses[process2Name].process).to.deep.contain({
          version: process2BumpedV,
          status: 'Enabled',
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
    })

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
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, validAllRestrictions, false, polkadotOptions)
      expect(newProcess.process).to.exist

      const disabledProcess = await disableProcess(processName, bumpedVersion, true, polkadotOptions)
      expect(disabledProcess.process).to.equal(undefined)
      expect(disabledProcess).to.deep.contain({
        message: `This will DISABLE the following process ${processName}`,
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

    describe('If process already exists', () => {
      describe('Multiple uploads', () => {
        // TODO could prestage in before if more scenarios
        it('skips and notifies if process programs are different', async () => {
          await createProcess('existing-length', 1, validAllRestrictions, false, polkadotOptions)
          const process2Name = 'should-create-1'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-length', 1, process2Name, process2BumpedV),
          })

          expect(res['existing-length'].message).to.equal('existing: programs are different lengths')
          expect(res[process2Name].message).to.equal('Transaction for new process should-create-1 has been successfully submitted')

        })

        it('also fails if number of steps matches but POSTFIX does not', async () => {
          await createProcess('existing-steps', 1, simple, false, polkadotOptions)
          const process2Name = 'should-create-2'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-steps', 1, process2Name, process2BumpedV),
          })

          expect(res['existing-steps'].message).to.equal('existing: program steps did not match')
          expect(res[process2Name].message).to.equal('Transaction for new process should-create-2 has been successfully submitted')
        })
      })

      it('does not create new one and notifies if programs are different length', async () => {
        await createProcess('existing-single', 1, validAllRestrictions, false, polkadotOptions)
        const { message, process } = await createProcess('existing-single', 1, simple, false, polkadotOptions)

        expect(message).to.equal('existing: programs are different lengths')
        expect(process).to.deep.contain({
          id: '0x6578697374696e672d73696e676c65',
          version: 1,
          status: 'Enabled',
        })
      })

      it('does not create new one and notifies if programs same are length but do not match', async () => {
        await createProcess('existing-steps-single', 1, simple2, false, polkadotOptions)
        const { message, process } = await createProcess('existing-steps-single', 1, [{ restriction: { None: {} }}], false, polkadotOptions)

        expect(message).to.equal('existing: program steps did not match')
        expect(process).to.deep.contain({
          id: '0x6578697374696e672d73746570732d73696e676c65',
          version: 1,
          status: 'Enabled',
        })
      })
    })

    it('fails for invalid POSTFIX notation', async () => {
      const { message } = await createProcess(validProcessName, validVersionNumber, invalidPOSIX, false, polkadotOptions)
      expect(message).to.equal('invalid program')
    })

    it('fails for invalid restriction key', async () => {
      const { message } = await createProcess(validProcessName, validVersionNumber, invalidPOSIX, false, polkadotOptions)
      expect(message).to.equal('invalid program')
    })

    it('fails for invalid restriction value', async () => {
      const { message } = await createProcess(validProcessName, validVersionNumber, invalidPOSIX, false, polkadotOptions)
      expect(message).to.equal('invalid program')
    })

    it('fails for invalid json', async () => {
      const err = await createProcess(
          validProcessName,
          validVersionNumber,
          'invalidJson' as unknown as Process.Program,
          false,
          polkadotOptions
        )
      expect(err.toString()).to.equal('TypeError: program.reduce is not a function')
    })

    it('fails to create for too low version', async () => {
        // - 2 because -1 would make current = valid
      const res = await createProcess(validProcessName, validVersionNumber - 2, validAllRestrictions, false, polkadotOptions)

      expect(res.message).to.equal(`Process version ${validVersionNumber - 2} is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`)
    })

    it('fails to create for too high version', async () => {
      const res = await createProcess(validProcessName, validVersionNumber + 1, validAllRestrictions, false, polkadotOptions)

      expect(res.message).to.equal(`Process version ${validVersionNumber + 1} is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`)
    })

    it('fails to create with too long process id', async () => {
      const processName = '0'.repeat(Constants.PROCESS_ID_LENGTH + 1)
      const { message } = await createProcess(processName, 1, validAllRestrictions, false, polkadotOptions)
      expect(message).to.equal('000000000000000000000000000000000 is too long. Max length: 32 bytes')
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
