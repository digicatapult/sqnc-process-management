namespace Process {
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

  type ProgramStep = {
    [key: string]: import('./restrictions').ChainRestrictions
  } | null | Array

  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    program?: import('./restrictions').ChainRestrictions
  } | null | Array

  export type Response = {
    [key: string]: Result
  }
}
