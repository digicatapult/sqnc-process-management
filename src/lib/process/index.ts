import { createNodeApi } from '../utils/polkadot.js'
import { Constants } from './constants.js'
import { createProcessTransaction, disableProcessTransaction, getVersion, getProcess } from './api.js'
import { utf8ToHex } from './hex.js'
import { processValidation, simpleProcesssValidation } from '../types/validation.js'
import { CliInputParseError, DisableError, ProgramError, VersionError } from '../types/error.js'
import { ZodError } from 'zod'

export const defaultOptions: Polkadot.Options = {
  API_HOST: 'localhost',
  API_PORT: 9944,
  USER_URI: '//Alice',
}

const textify = (obj: Process.ProgramStep): string => {
  return JSON.stringify(obj, (_key, val) => {
    // convert snake case to camel case
    if (val && typeof val === 'object') {
      return Object.fromEntries(
        Object.entries(val).map(([k, v]) => {
          return [
            [...k]
              .map((c, i) => (k[i - 1] === '_' ? c.toUpperCase() : c))
              .filter((c) => c != '_')
              .join(''),
            v,
          ]
        })
      )
    }
    if (typeof val === 'number') return val.toString()
    return val
  })
}

export const sanitizeInput = (data: string): Process.Result<{ name: string }[], CliInputParseError> => {
  try {
    return {
      type: 'ok',
      result: simpleProcesssValidation.parse(JSON.parse(data)),
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        error: new CliInputParseError(err),
        message: err.message,
      }
    }
    throw err
  }
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
  const parsedRes = sanitizeInput(data)
  if (parsedRes.type === 'error') {
    return parsedRes
  }
  const processes = parsedRes.result

  const [result, successCount] = await processes.reduce<Promise<[{ [key: string]: Process.ProcessResponse }, number]>>(
    async (acc, process) => {
      const [result, oldCount] = await acc
      const processResult = await createProcess(process, dryRun, options, verbose)
      const newCount = processResult.type === 'ok' ? oldCount + 1 : oldCount
      result[process.name] = processResult
      return [result, newCount]
    },
    Promise.resolve([{}, 0])
  )

  return {
    type: 'ok',
    result,
    message: `Successfully loaded ${successCount}/${processes.length} processes`,
  }
}

export const listTransforming = (res: Process.RawPayload[], options: Process.CLIOptions) => {
  let processes: Process.RawPayload[]
  if (options.active) {
    processes = res.filter(({ status }) => status === 'Enabled')
  } else if (options.disabled) {
    processes = res.filter(({ status }) => status === 'Disabled')
  } else {
    processes = res
  }

  if (options.raw) {
    return processes.map(({ name, program, ...p }) => ({
      name: utf8ToHex(name),
      ...(options.verbose ? { program } : {}),
      ...p,
    }))
  } else {
    return processes.map((p) => {
      return {
        name: p.name,
        version: p.version,
        status: p.status,
        ...(options.verbose ? { program: p.program } : {}),
      }
    })
  }
}

export const handleVerbose = (res: Process.Payload, verbose: boolean): Process.Payload => {
  if (verbose) {
    return res
  }
  const { program, ...rest } = res
  return rest
}

export const createProcess = async (
  processRaw: Process.CliProcessInput,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions,
  verbose: boolean = false
): Promise<Process.ProcessResponse> => {
  try {
    const { name, version, program } = processValidation.parse(processRaw)

    const processId = utf8ToHex(name)
    const polkadot: Polkadot.Polkadot = await createNodeApi(options)
    const currentVersion: number = await getVersion(polkadot, processId)
    const expectedVersion: number = currentVersion + 1

    if (version > expectedVersion || version < currentVersion) throw new VersionError(version, expectedVersion, name)

    if (version === currentVersion) {
      const process = await getProcess(polkadot, processId, version)

      if (program.length !== process.program.length)
        throw new ProgramError('existing: programs are different lengths', process)

      if (!program.every((step, i) => textify(step) === textify(process.program[i])))
        throw new ProgramError('existing: program steps did not match', process)

      return {
        type: 'ok',
        message: `Skipping: process ${name} is already created.`,
        result: handleVerbose(
          {
            name,
            version,
            program,
            status: process.status,
          },
          verbose
        ),
      }
    }

    if (dryRun)
      return {
        type: 'ok',
        message: 'Dry run: transaction has not been created',
        result: handleVerbose(
          {
            name,
            version,
            program,
            status: 'Enabled (dry-run)',
          },
          verbose
        ),
      }

    return {
      type: 'ok',
      message: `Transaction for new process ${name} has been successfully submitted`,
      result: handleVerbose(await createProcessTransaction(polkadot, processId, program, options), verbose),
    }
  } catch (err) {
    // err is basically from errors.ts or any exception
    // process errors will comntain specific messages and/or process
    // Promise<Process.Result> is in try {} and any exception is in catch {}
    if (err instanceof ProgramError || err instanceof VersionError || err instanceof ZodError) {
      return {
        type: 'error',
        error: err,
        message: err.message,
      }
    } else if (err instanceof Error) {
      return {
        type: 'error',
        error: err,
        message: 'An unknown error occurred',
      }
    }
    throw err
  }
}

export const disableProcess = async (
  name: string,
  processVersion: number,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.ProcessResponse> => {
  const processId = utf8ToHex(name)

  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
  const currentProcess: Process.Payload = await getProcess(polkadot, processId, processVersion)

  if (currentProcess.status === 'Disabled') {
    throw new DisableError(`${name} with version ${processVersion} doesn't exist or is already disabled`)
  }

  if (dryRun) {
    return {
      type: 'ok',
      message: `This will DISABLE the following process ${name}`,
      result: {
        name,
        version: processVersion,
        status: 'Disabled (dry-run)',
      },
    }
  }

  return {
    type: 'ok',
    message: 'Process has been disabled',
    result: await disableProcessTransaction(polkadot, processId, processVersion, options),
  }
}
