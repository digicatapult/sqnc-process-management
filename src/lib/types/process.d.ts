declare namespace Process {
  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    restrictions?: Restrictions.Restrictions
  } | null

  type Result = {
    process: Process
    message: string
  }
}
