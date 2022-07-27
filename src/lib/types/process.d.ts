namespace Process {
  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    restrictions?: import('./restrictions').ChainRestrictions
  } | null

  type Result = {
    process: Process
    message: string
  }
}
