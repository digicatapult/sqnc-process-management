declare namespace Process {
  import { ValidationProgram, ValidationProgramStep, ValidationProcess, ValidationProcesses } from './validation'
  import { VersionError, ProgramError, DisableError } from './error'
  import { ZodError } from 'zod'

  type InputProcess = InputProcess

  export type ProcessError = ZodError | ProgramError | ProgramError | DisableError

  export type Result<R, E> =
    | {
        type: 'ok'
        result: R
        message?: string
      }
    | {
        type: 'error'
        error: E
        message?: string
      }

  export type CLIOptions = {
    print?: boolean
    manualSeal?: boolean
    dryRun?: boolean
    active?: boolean
    disabled?: boolean
    raw?: boolean
    port: string
    user: string
    host: string
    file: string
    verbose?: boolean
  }

  export type CliProcessInput = ValidationProcess
  export type CliProcessesInput = ValidationProcesses
  export type ProgramStep = ValidationProgramStep
  export type Program = ValidationProgram

  export type Payload = {
    name: string
    version: number
    status: 'Enabled' | 'Disabled' | 'Enabled (dry-run)' | 'Disabled (dry-run)'
    program?: Program
  }

  export interface RawPayload extends Payload {
    createdAtHash: string
    initialU8aLength: string
  }

  export type ProcessResponse = Result<Payload, ProcessError>

  export type Response = Result<
    {
      [key: string]: ProcessResponse
    },
    CliInputParseError
  >

  export type Hex = `0x${string}`
}
