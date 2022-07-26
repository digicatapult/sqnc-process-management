import { createNodeApi } from '../utils/polkadot.js'
import { Constants } from './constants.js'
import { createProcessTransaction, disableProcessTransaction, getVersion } from './api.js'
import { utf8ToHex } from './hex.js'
import { mapRestrictions } from './map.js'

export const defaultOptions: Polkadot.Options = {
  API_HOST: 'localhost',
  API_PORT: 9944,
  USER_URI: '//Alice',
}

export const createProcess = async (
  name: string,
  version: number,
  rawRestrictions: string,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const restrictions: Restrictions.Restrictions = mapRestrictions(rawRestrictions)
  const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)

  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
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

export const disableProcess = async (
  name: string,
  processVersion: number,
  dryRun: boolean = false,
  options: Polkadot.Options = defaultOptions
): Promise<Process.Result> => {
  const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)

  const polkadot: Polkadot.Polkadot = await createNodeApi(options)
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
