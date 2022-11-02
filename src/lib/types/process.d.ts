namespace Process {
  type ClIProcess = {
    name: string
    version: number
    rawRestrictions: string
  }

  export type CLIParsed = ClIProcess[] 

  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    restrictions?: import('./restrictions').ChainRestrictions
  } | null

  export type Response = {
    [key: string]: Result
  }

  type Result = {
    process: Process
    message: string
  }
}
