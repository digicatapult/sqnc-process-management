import { createNodeApi } from '../utils/polkadot.js'
import { Constants } from './constants.js'
import { createTransaction, getVersion } from './api.js'
import { utf8ToHex } from './hex.js'
import { stepValidation } from '../types/restrictions.js'
import { NoValidRestrictionsError, VersionError } from '../types/error.js'

export const defaultOptions: Polkadot.Options = {
  API_HOST: 'localhost',
  API_PORT: 9944,
  USER_URI: '//Alice',
}

// TODO merge api.sts and this together since they are both doing almost the same thing
// and api is already mapped by polkadot e.g. storagemaps
const validate = (program: Process.Program = []): Process.Program => {
  return program.reduce((out: Process.Program, step: Process.ProgramStep)=> {
    const validated: Process.ProgramStep = stepValidation.parse(step?.restriction || step)
    if (Object.keys(validated).length === 0) {
      return out
    }
    out.push(step) // .push in reduce is more effective than spread, can cause issuecs
    return out
  }, [])
}


export const loadProcesses = async ({ data, options, dryRun }: { data: string, options?: Polkadot.Options, dryRun?: boolean }): Promise<Process.Response> => {
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
  rawProgram: Process.Program,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const program: Process.Program = validate(rawProgram)
  if (program.length === 0) throw new NoValidRestrictionsError('nothing to process')
  const id = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)
  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
  const expectedVersion: number = await getVersion(polkadot, id) + 1

  if (version !== expectedVersion) {
    throw new VersionError(`Version: ${version} must be incremented: ${expectedVersion}`)
  }

  if (dryRun) return {
    process: null,
    message: 'Dry run: transaction has not been created',
    name,
    version: expectedVersion,
    program,
  }

  const process: Process.Payload = await createTransaction({ polkadot, id, fn: 'createProcess', data: program, options })

  return {
    message: `Transaction for new process ${name} has been successfully submitted`,
    process,
  }
}

export const disableProcess = async (
  name: string,
  version: number,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const id = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)
  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
  const currentVersion: number = await getVersion(polkadot, id)

  if (!currentVersion) {
    throw new VersionError(`Version: ${version} does not exist for name: ${name}`)
  }

  if (dryRun) return {
    message: `This will DISABLE the following process ${name}`,
    name, 
    version: currentVersion,
  }


  const process = await createTransaction({ polkadot, id, data: version, options, fn: 'disableProcess'})
  return {
    message: 'Process has been disabled',
    process,
  }
}
