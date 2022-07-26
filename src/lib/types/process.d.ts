namespace Process {
  import type { ChainRestrictions } from './restrictions'

  export type Payload = {
    id: string
    version: number
    status: 'Enabled' | 'Disabled'
    restrictions?: Restrictions
  } | null

  type Result = {
    process: Process
    message: string
  }
}
