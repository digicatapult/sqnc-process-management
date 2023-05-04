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

const textify = (obj: Process.ProgramStep): string => JSON.stringify(obj).toLowerCase()

// TODO merge api.sts and this together since they are both doing almost the same thing
// and api is already mapped by polkadot e.g. storagemaps
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
}: {
  data: string
  options?: Polkadot.Options
  dryRun?: boolean
}): Promise<Process.Response> => {
  const res: Process.Response = {}
  const processes: Process.CLIParsed = JSON.parse(data)
  // TODO more elegant promise.series way.
  for (let i = 0; i < processes.length; i++) {
    const { name, version, program } = processes[i]
    res[name] = await createProcess(name, version, program, dryRun, options)
  }

  return res
}

export const createProcess = async (
  name: string,
  version: number,
  userProgram: Process.Program,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const program: Process.Program = validate(userProgram)
  const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)
  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
  const currentVersion: number = await getVersion(polkadot, processId)
  const expectedVersion: number = currentVersion + 1

  // TODO simplify
  if (version > expectedVersion || version < currentVersion) {
    throw new VersionError(`Version: ${version} must be: ${expectedVersion}`)
  }

  if (dryRun)
    return {
      process: null,
      message: 'Dry run: transaction has not been created',
      name,
      version: expectedVersion,
      program,
    }

  if (version === currentVersion) {
    const process = await getProcess(polkadot, processId, version)

    if (program.length !== process.program.length) return {
      message: 'existing: programs are different lengths',
      process,
    }

    if (!program.every((step, i) => textify(step) === textify(process.program[i]))) return {
      message: 'existing: program steps did not match',
      process,
    }

    return {
      message: `Process ${name} is already created.`,
      process,
    }
  }

  return {
    message: `Transaction for new process ${name} has been successfully submitted`,
    process: await createProcessTransaction(polkadot, processId, program, options),
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
