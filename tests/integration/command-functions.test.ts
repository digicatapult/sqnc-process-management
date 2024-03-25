import { expect } from 'chai'

import { createProcess, disableProcess, loadProcesses } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  invalidPOSIX,
  multiple,
  simple2,
  simple,
  invalidRestrictionKey,
  invalidRestrictionValue,
} from '../fixtures/programs.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { ZodError } from 'zod'
import { DisableError, ProgramError, VersionError } from '../../src/lib/types/error.js'
import { getAll } from '../../src/lib/process/api.js'
/* fixtures */
import processesExample from '../fixtures/processes.js'

const polkadotOptions = { API_HOST: 'localhost', API_PORT: 9944, USER_URI: '//Alice', MANUAL_SEAL: true }

const createProcessAndWait = async (
  processRaw: Process.CliProcessInput,
  dryRun?: boolean,
  options?: Polkadot.Options,
  verbose?: boolean
) => {
  const { waitForFinalised } = await createProcess(processRaw, dryRun, options, verbose)
  const result = await waitForFinalised
  return result
}

describe('Process creation and deletion, listing', () => {
  describe('Happy path', () => {
    describe('Multiple processes', () => {
      it('skips already created processes and creates new ones', async () => {
        await createProcessAndWait(
          {
            name: 'existing-process-test',
            version: 1,
            program: simple2,
          },
          false,
          polkadotOptions
        )
        const process2Name = 'process-to-be-created'
        const process2BumpedV = (await getVersionHelper(process2Name)) + 1
        const newProcesses = await loadProcesses({
          options: polkadotOptions,
          data: multiple('existing-process-test', 1, process2Name, process2BumpedV),
        })

        if (newProcesses.type !== 'ok') {
          expect.fail('Expected new process creation to succeed')
        }

        expect(newProcesses.result['existing-process-test'].type).to.equal('ok')
        expect(newProcesses.result['existing-process-test']).to.deep.contain({
          message: 'Skipping: process existing-process-test is already created.',
          result: {
            name: 'existing-process-test',
            version: 1,
            status: 'Enabled',
          },
        })

        const process2Result = newProcesses.result[process2Name]

        if (process2Result.type !== 'ok') {
          expect.fail('Expected process create for process2 to succeed')
        }

        expect(process2Result.message).to.deep.equal(
          'Transaction for new process process-to-be-created has been successfully submitted'
        )
        expect(process2Result.result).to.deep.contain({
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
        if (newProcesses.type !== 'ok') {
          expect.fail('Expected new process creation to succeed')
        }
        expect(newProcesses.result[process1Name].message).to.deep.equal(
          'Transaction for new process process-1 has been successfully submitted'
        )
        const process1Result = newProcesses.result[process1Name]
        if (process1Result.type !== 'ok') {
          expect.fail('Expected process1 creation to succeed')
        }
        expect(process1Result.result).to.deep.contain({
          version: process1BumpedV,
          status: 'Enabled',
        })

        const process2Result = newProcesses.result[process2Name]
        if (process2Result.type !== 'ok') {
          expect.fail('Expected process2 creation to succeed')
        }
        expect(process2Result.message).to.deep.equal(
          'Transaction for new process process-2 has been successfully submitted'
        )
        expect(process2Result.result).to.deep.contain({
          version: process2BumpedV,
          status: 'Enabled',
        })
      })

      it('loads and skips multiple processes using number values', async () => {
        await loadProcesses({ options: polkadotOptions, data: JSON.stringify(processesExample) })
        const res = await loadProcesses({ options: polkadotOptions, data: JSON.stringify(processesExample) })

        if (res.type !== 'ok') {
          expect.fail('Expected process create to succeed')
        }

        const process1Result = res.result['test-program-create']
        const process2Result = res.result['test-program-propose']
        const process3Result = res.result['test-program-strings-and-numbers']

        if (process1Result.type !== 'ok') {
          expect.fail('Expected test-program-create to be already created and succeed')
        }
        if (process2Result.type !== 'ok') {
          expect.fail('Expected test-program-propose to be already created and succeed')
        }
        if (process2Result.type !== 'ok') {
          expect.fail('Expected test-program-strings-and-numbers to be already created and succeed')
        }

        expect(process1Result.message).to.equal('Skipping: process test-program-create is already created.')
        expect(process2Result.message).to.equal('Skipping: process test-program-propose is already created.')
        expect(process3Result.message).to.equal(
          'Skipping: process test-program-strings-and-numbers is already created.'
        )
      }).timeout(60000)
    })

    it('creates then disables a process', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcessAndWait(
        { name: processName, version: bumpedVersion, program: simple },
        false,
        polkadotOptions
      )

      if (newProcess.type !== 'ok') {
        expect.fail('Expected process creation to succeed')
      }
      expect(newProcess.result).to.deep.equal({
        name: processName,
        version: bumpedVersion,
        status: 'Enabled',
      })

      const disabledProcess = await disableProcess(processName, bumpedVersion, false, polkadotOptions)

      if (disabledProcess.type !== 'ok') {
        expect.fail('Expected process disable to succeed')
      }
      expect(disabledProcess.message).to.equal('Process has been disabled')
      expect(disabledProcess.result).to.deep.equal({
        name: processName,
        version: bumpedVersion,
        status: 'Disabled',
      })
    })

    it('does not create process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcessAndWait(
        { name: processName, version: bumpedVersion, program: validAllRestrictions },
        true,
        polkadotOptions
      )

      if (newProcess.type !== 'ok') {
        expect.fail('Expected process create to succeed')
      }
      expect(newProcess.message).to.equal('Dry run: transaction has not been created')
      expect(newProcess.result).to.deep.equal({
        name: processName,
        version: bumpedVersion,
        status: 'Enabled (dry-run)',
      })
    })

    it('does not disable process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcessAndWait(
        { name: processName, version: bumpedVersion, program: validAllRestrictions },
        false,
        polkadotOptions
      )
      expect(newProcess.type).to.equal('ok')

      const disabledProcess = await disableProcess(processName, bumpedVersion, true, polkadotOptions)
      if (disabledProcess.type !== 'ok') {
        expect.fail('Expected disable process to succeed')
      }
      expect(disabledProcess.result).to.deep.contain({
        name: processName,
        status: 'Disabled (dry-run)',
      })
      expect(disabledProcess).to.deep.contain({
        message: `This will DISABLE the following process ${processName}`,
      })
    })

    // it('returns a list of raw processes when with --verbose flag', () => {
    it('returns a list of processes', async () => {
      const res = await getAll(polkadotOptions)

      expect(res).to.be.an('array')
      expect(res[0])
        .to.be.an('object')
        .that.has.keys(['name', 'createdAtHash', 'initialU8aLength', 'program', 'status', 'version'])
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
          await createProcessAndWait(
            { name: 'existing-length', version: 1, program: validAllRestrictions },
            false,
            polkadotOptions
          )
          const process2Name = 'should-create-1'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-length', 1, process2Name, process2BumpedV),
          })

          if (res.type !== 'ok') {
            expect.fail('Expected overall create to succeed')
          }

          const failResult = res.result['existing-length']
          if (failResult.type !== 'error') {
            expect.fail('Expected existing-length creation to fail')
          }
          expect(failResult.message).to.equal('existing: programs are different lengths')

          const process2Res = res.result[process2Name]
          if (process2Res.type !== 'ok') {
            expect.fail(`Expected ${process2Name} creation to succeed`)
          }
          expect(process2Res.message).to.equal(
            'Transaction for new process should-create-1 has been successfully submitted'
          )
        })

        it('also fails if number of steps matches but POSTFIX does not', async () => {
          await createProcessAndWait({ name: 'existing-steps', version: 1, program: simple }, false, polkadotOptions)
          const process2Name = 'should-create-2'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-steps', 1, process2Name, process2BumpedV),
          })

          // TODO: should this fail
          if (res.type !== 'ok') {
            expect.fail('Expected overall process create to succeed')
          }

          expect(res.result['existing-steps'].message).to.equal('existing: program steps did not match')
          expect(res.result[process2Name].message).to.equal(
            'Transaction for new process should-create-2 has been successfully submitted'
          )
        })
      })

      it('does not create new one and notifies if programs are different length', async () => {
        await createProcessAndWait(
          { name: 'existing-single', version: 1, program: validAllRestrictions },
          false,
          polkadotOptions
        )
        const res = await createProcessAndWait(
          { name: 'existing-single', version: 1, program: simple },
          false,
          polkadotOptions
        )

        if (res.type !== 'error') {
          expect.fail('Expected program create with different lengths to fail')
        }

        expect(res.message).to.equal('existing: programs are different lengths')
        expect(res.error).to.instanceOf(ProgramError)
      })

      it('does not create new one and notifies if programs same are length but do not match', async () => {
        await createProcessAndWait(
          { name: 'existing-steps-single', version: 1, program: simple2 },
          false,
          polkadotOptions
        )
        const res = await createProcessAndWait(
          { name: 'existing-steps-single', version: 1, program: [{ Restriction: 'None' }] },
          false,
          polkadotOptions
        )

        if (res.type !== 'error') {
          expect.fail('Expected program create with different lengths to fail')
        }

        expect(res.message).to.equal('existing: program steps did not match')
        expect(res.error).to.instanceOf(ProgramError)
        const error = res.error as ProgramError
        expect(error.process).to.deep.contain({
          name: 'existing-steps-single',
          version: 1,
          status: 'Enabled',
        })
      })
    })

    it('fails for invalid POSTFIX notation', async () => {
      const res = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber, program: invalidPOSIX },
        false,
        polkadotOptions
      )

      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.error).to.be.instanceOf(ProgramError)
      expect(res.message).to.equal('invalid program')
    })

    it('fails for invalid restriction key', async () => {
      const res = await createProcessAndWait(
        {
          name: validProcessName,
          version: validVersionNumber,
          program: invalidRestrictionKey,
        },
        false,
        polkadotOptions
      )

      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.error).to.be.instanceOf(ZodError)
      const zError = res.error as ZodError
      expect(zError.issues[0]).to.deep.contain({
        code: 'invalid_union',
        message: 'Invalid input',
      })
    })

    it('fails for invalid restriction value', async () => {
      const res = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber, program: invalidRestrictionValue },
        false,
        polkadotOptions
      )

      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.error).to.be.instanceOf(ZodError)
    })

    it('fails for invalid json', async () => {
      const res = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber, program: 'invalidJson' as unknown as Process.Program },
        false,
        polkadotOptions
      )

      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.error).to.be.instanceOf(ZodError)
    })

    it('fails to create for too low version', async () => {
      // - 2 because -1 would make current = valid
      const res = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber - 2, program: validAllRestrictions },
        false,
        polkadotOptions
      )
      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.message).to.equal(
        `Process version ${
          validVersionNumber - 2
        } is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`
      )
      expect(res.error).to.be.instanceOf(VersionError)
    })

    it('fails to create for too high version', async () => {
      const res = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber + 1, program: validAllRestrictions },
        false,
        polkadotOptions
      )

      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.message).to.equal(
        `Process version ${
          validVersionNumber + 1
        } is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`
      )
      expect(res.error).to.be.instanceOf(VersionError)
    })

    it('fails to create with too long process id', async () => {
      const processName = '0'.repeat(Constants.PROCESS_ID_LENGTH + 1)
      const res = await createProcessAndWait(
        { name: processName, version: 1, program: validAllRestrictions },
        false,
        polkadotOptions
      )
      if (res.type !== 'error') {
        expect.fail('Expected process create to fail')
      }

      expect(res.error).to.be.instanceOf(ZodError)
    })

    it('fails to disable process that does not exist', async () => {
      let err = null
      try {
        await disableProcess('incorrectProcessName', 1, false, polkadotOptions)
      } catch (error) {
        err = error
      }
      expect(err).instanceOf(DisableError)
    })

    it('fails to disable process a second time', async () => {
      const newProcess = await createProcessAndWait(
        { name: validProcessName, version: validVersionNumber, program: simple },
        false,
        polkadotOptions
      )
      expect(newProcess.type).to.equal('ok')
      const firstDisable = await disableProcess(validProcessName, validVersionNumber, false, polkadotOptions)
      expect(firstDisable.type).to.equal('ok')

      let err = null
      try {
        await disableProcess(validProcessName, validVersionNumber, false, polkadotOptions)
      } catch (error) {
        err = error
      }
      expect(err).instanceOf(DisableError)
    })
  })
})
