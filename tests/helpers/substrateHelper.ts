import { createNodeApi } from '../../src/lib/utils/polkadot.js'
import { getVersion, getProcess } from '../../src/lib/process/api.js'
import { utf8ToHex } from '../../src/lib/process/hex.js'

export const getVersionHelper = async (name: string, options: Polkadot.Options): Promise<number> => {
  await using polkadot = await createNodeApi(options)
  const version = await getVersion(polkadot, utf8ToHex(name))
  await polkadot.api.disconnect()
  return version
}

export const Helper = async (
  processId: Process.Hex,
  version: number,
  options: Polkadot.Options
): Promise<Process.Payload> => {
  await using polkadot = await createNodeApi(options)
  const process = await getProcess(polkadot, processId, version)
  await polkadot.api.disconnect()
  return process
}
