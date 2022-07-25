declare namespace Process {
  export type Process = {
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
