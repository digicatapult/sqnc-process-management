declare namespace Process {
  import { VersionError, ProgramError, DisableError } from './error'
  import { ZodError } from 'zod'

  type Core = {
    name: string
    version: number
    program: Program
  }

  export type ProcessError = ZodError | ProgramError | ProgramError | DisableError

  // break down per function
  // TODO rename types as this is causing a little confusion
  interface Result {
    Error?: ProcessError
    process?: Payload
    name?: string
    version?: number
    program?: Program
    message: string
  }

  type Restriction = {
    [key: string]: import('./restrictions').ChainRestrictions | object
  }

  interface ProgramStep {
    restriction?: Restriction
    op?: any
  }

  export type CLIOptions = {
    print?: boolean
    dryRun?: boolean
    active?: boolean
    disabled?: boolean
    raw?: boolean
    port: string
    user: string
    host: string
    verbose: boolean
  }
  export type CLIParsed = Core[]
  export type Program = ProgramStep[]

  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    program?: Program
  } | null

  export interface RawPayload extends Payload {
    createdAtHash: string
    initialU8aLength: string
  }

  export type Response = {
    [key: string]: Result
  }
}
