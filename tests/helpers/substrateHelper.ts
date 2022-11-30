import { createNodeApi } from '../../src/lib/utils/polkadot.js'
import { getVersion, getProcess } from '../../src/lib/process/api.js'
import { defaultOptions } from '../../src/lib/process/index.js'
import { utf8ToHex } from '../../src/lib/process/hex.js'
import { Constants } from '../../src/lib/process/constants.js'

export const getVersionHelper = async (name: string): Promise<number> => {
  const processId = utf8ToHex(name, Constants.PROCESS_ID_LENGTH)
  const polkadot = await createNodeApi(defaultOptions)
  const version = await getVersion(polkadot, processId)
  await polkadot.api.disconnect()
  return version
}

export const Helper = async (processId: string, version: number): Promise<Process.Payload> => {
  const polkadot = await createNodeApi(defaultOptions)
  const process = await getProcess(polkadot, processId, version)
  await polkadot.api.disconnect()
  return process
}
