
declare namespace Process {
  type Core = {
    name: string
    version: number
    program: Program
  }

  // break down per function
  interface Result {
    process?: Payload 
    name?: string
    version?: number
    program?: Program
    message: string
  }

  export type CLIParsed = Core[] 
  export type Program = ProgramStep[]

  type Restriction = {
    [key: string]: import('./restrictions').ChainRestrictions | object
  }

  interface ProgramStep {
    restriction?: Restriction
    op?: any
  }

  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    program?: Program 
  } | null

  export type Response = {
    [key: string]: Result
  }
}
