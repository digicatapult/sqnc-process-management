import { createNodeApi } from '../utils/polkadot.js'
import { PROCESS_ID_LENGTH } from '../types/restrictions.js'
import { defaultOptions, Options } from '../types/options.js'
import { createProcessTransaction, disableProcessTransaction, getVersion } from './api.js'
import { utf8ToHex } from './hex.js'
import { Polkadot } from '../types/substrate.js'
import { mapRestrictions } from './map.js'
import { Restrictions } from '../types/restrictions.js'

export type ProcessResult = {
  process: Process
  message: string
}

export type Process = {
  id: string
  version: number
  status: 'Enabled' | 'Disabled'
  restrictions?: Restrictions
} | null

export async function createProcess(
  name: string,
  version: number,
  rawRestrictions: string,
  dryRun: boolean = false,
  options: Options = defaultOptions
): Promise<ProcessResult> {
  const restrictions: Restrictions = mapRestrictions(rawRestrictions)
  const processId = utf8ToHex(name, PROCESS_ID_LENGTH)

  const polkadot: Polkadot = await createNodeApi(options)
  const currentVersion = await getVersion(polkadot, processId)

  if (version !== currentVersion + 1) {
    throw new Error(`Version: ${version} must be one higher than current version: ${currentVersion}`)
  }

  if (dryRun) {
    return {
      process: null,
      message: `
        This will CREATE the following process:

        name: ${name} 
        version: ${currentVersion + 1}
        restrictions: ${JSON.stringify(restrictions, null, 2)}`,
    }
  }

  const process = await createProcessTransaction(polkadot, processId, restrictions, options)
  return {
    process: process,
    message: `
      CREATED the following process:

      name: ${name} 
      version: ${process?.version}
      restrictions: ${JSON.stringify(restrictions, null, 2)}`,
  }
}

export async function disableProcess(
  name: string,
  processVersion: number,
  dryRun: boolean = false,
  options: Options = defaultOptions
): Promise<ProcessResult> {
  const processId = utf8ToHex(name, PROCESS_ID_LENGTH)

  const polkadot: Polkadot = await createNodeApi(options)
  const currentVersion = await getVersion(polkadot, processId)

  if (!currentVersion) {
    throw new Error(`Version: ${processVersion} does not exist for name: ${name}`)
  }

  if (dryRun) {
    return {
      process: null,
      message: `
      This will DISABLE the following process:

        name: ${name} 
        version: ${processVersion}`,
    }
  }

  const process = await disableProcessTransaction(polkadot, processId, processVersion, options)
  return {
    process: process,
    message: `
      DISABLED the following process:

      name: ${name} 
      version: ${processVersion}`,
  }
}
