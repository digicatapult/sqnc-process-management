import { createNodeApi } from '../../src/lib/utils/polkadot.js'
import { getVersion, getProcess } from '../../src/lib/process/api.js'
import { defaultOptions } from '../../src/lib/types/options.js'

export async function getVersionHelper(processId: string) {
  const polkadot = await createNodeApi(defaultOptions)
  const version = await getVersion(polkadot, processId)
  await polkadot.api.disconnect()
  return version
}

export async function getProcessHelper(processId: string, version: number) {
  const polkadot = await createNodeApi(defaultOptions)
  const process = await getProcess(polkadot, processId, version)
  await polkadot.api.disconnect()
  return process
}
