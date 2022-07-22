import { createNodeApi } from '../../src/lib/utils/polkadot.js'
import { getVersion, getProcess } from '../../src/lib/process/api.js'
import { defaultOptions } from '../../src/lib/types/options.js'
import { Process } from '../../src/lib/process/index.js'

export const getVersionHelper = async (processId: string) => {
  const polkadot = await createNodeApi(defaultOptions)
  const version = await getVersion(polkadot, processId)
  await polkadot.api.disconnect()
  return version
}

export const getProcessHelper = async (processId: string, version: number): Promise<Process> => {
  const polkadot = await createNodeApi(defaultOptions)
  const process = await getProcess(polkadot, processId, version)
  await polkadot.api.disconnect()
  return process as Process
}