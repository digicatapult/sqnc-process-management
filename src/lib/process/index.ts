import { createNodeApi } from '../utils/polkadot.js'
import { Constants } from './constants.js'
import { createProcessTransaction, disableProcessTransaction, getVersion, getProcess } from './api.js'
import { utf8ToHex } from './hex.js'
import { stepValidation } from '../types/restrictions.js'
import { DisableError, ProgramError, VersionError } from '../types/error.js'

export const defaultOptions: Polkadot.Options = {
  API_HOST: 'localhost',
  API_PORT: 9944,
}

const textify = (obj: Process.ProgramStep): string => {
  return JSON.stringify(obj, (key, val) => {
    // FYI: checking for none as from getAll/getProcess/etc returns 
    // { Restriction: "None" } while restriction to be uploaded is ->
    // { restriction: { None: {} } }
    if (val === 'None' && key === 'Restriction') return { None: {} } 
    if (typeof val === 'number') return val.toString()
    return val
  }).toLowerCase()
}

const validate = (program: Process.Program = []): Process.Program => {
  return program.reduce((out: Process.Program, step: Process.ProgramStep) => {
    const validated: Process.ProgramStep = stepValidation.parse(step?.restriction || step)
    if (Object.keys(validated).length === 0) {
      return out
    }
    out.push(step) // .push in reduce is more effective than spread, can cause issuecs
    return out
  }, [])
}

export const loadProcesses = async ({
  data,
  options,
  dryRun,
  verbose,
}: {
  data: string
  options?: Polkadot.Options
  dryRun?: boolean
  verbose?: boolean
}): Promise<Process.Response> => {
  const res: Process.Response = {}
  const processes: Process.CLIParsed = JSON.parse(data)
  // TODO more elegant promise.series way.
  for (let i = 0; i < processes.length; i++) {
    const { name, version, program } = processes[i]
    res[name] = await createProcess(name, version, program, dryRun, verbose, options)
  }

  return res
}

export const createProcess = async (
  name: string,
  version: number,
  userProgram: Process.Program,
  dryRun: boolean = false,
  verbose:boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  try {

    const program: Process.Program = validate(userProgram)
    const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)
    const polkadot: Polkadot.Polkadot = await createNodeApi(options)
    const currentVersion: number = await getVersion(polkadot, processId)
    const expectedVersion: number = currentVersion + 1

    if (version > expectedVersion || version < currentVersion)
      throw new VersionError(version, expectedVersion, name)

    if (version === currentVersion) {
      const process = await getProcess(polkadot, processId, version)

      if (program.length !== process.program.length) 
        throw new ProgramError('existing: programs are different lengths', process) 

      if (!program.every((step, i) => textify(step) === textify(process.program[i])))
        throw new ProgramError('existing: program steps did not match', process) 

      return {
        message: `Skipping: process ${name} is already created.`,
        process,
      }
    }

    if(!verbose)
    return {
      process: null,
      message: 'Dry run: transaction has not been created',
      name,
      version: expectedVersion,
      program
    }

    if(verbose)
    return {
      process: null,
      message: 'Dry run: transaction has not been created',
      name,
      version: expectedVersion,
    }
    

    if (dryRun)
      return {
        process: null,
        message: 'Dry run: transaction has not been created',
        name,
        version: expectedVersion,
        program,
      }

    return {
      message: `Transaction for new process ${name} has been successfully submitted`,
      process: await createProcessTransaction(polkadot, processId, program, options),
    }
  } catch (err) {
    // err is basically from errors.ts or any exception
    // process errors will comntain specific messages and/or process
    // Promise<Process.Result> is in try {} and any exception is in catch {}
    return err
  }

  
}

export const disableProcess = async (
  name: string,
  processVersion: number,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)

  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
  const currentProcess: Process.Payload = await getProcess(polkadot, processId, processVersion)

  if (currentProcess.status === 'Disabled') {
    throw new DisableError(`${name} with version ${processVersion} doesn't exist or is already disabled`)
  }

  if (dryRun)
    return {
      message: `This will DISABLE the following process ${name}`,
      name,
      version: processVersion,
    }

  const process = await disableProcessTransaction(polkadot, processId, processVersion, options)
  return {
    message: 'Process has been disabled',
    process,
  }
}
