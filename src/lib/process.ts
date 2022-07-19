import { api, keyring } from './api.js'
import { Restrictions, PROCESS_ID_LENGTH } from './restrictions.js'
import options from './options.js'
import { utf8ToHex } from './helpers/hex.js'

// Changes more human-readable format of grouped restrictions to array of single restrictions for submitting to node
// { RestrictionName: [RestrictionValue] } -> [ { RestrictionName: RestrictionValue } ]
const mapRestrictions = (restrictionsObj: object) => {
  return Object.entries(restrictionsObj).map(([restrictionName, restrictionValues]) => {
    if (restrictionValues.length === 0) {
      return { [restrictionName]: {} }
    }

    let newObject = {}
    for (const restrictionValue of restrictionValues) {
      newObject = {
        ...newObject,
        [restrictionName]: restrictionValue,
      }
    }
    return newObject
  }) as Restrictions
}

export async function createProcess(name: string, version: number, rawRestrictions: string, dryRun?: boolean) {
  const restrictions = mapRestrictions(JSON.parse(rawRestrictions))
  console.log(restrictions)
  const processId = utf8ToHex(name, PROCESS_ID_LENGTH)
  console.log(processId)

  const currentVersion = await getVersion(processId)

  if (version <= currentVersion) {
    throw new Error(`version: ${version} must be higher than current version: ${currentVersion}`)
  }

  if (dryRun) {
    console.log('bla')
    return
  }

  const process = await createProcessTransaction(processId, version, restrictions)
  console.log(process)
  return process
}

export async function disableProcess(name: string, processVersion: number, dryRun?: boolean) {
  const processId = utf8ToHex(name, PROCESS_ID_LENGTH)
  console.log(processId)

  if (dryRun) {
    console.log('bla')
    return
  }

  const process = await disableProcessTransaction(processId, processVersion)
  console.log(process)
  return process
}

const createProcessTransaction = async (processId: string, version: number, restrictions: Restrictions) => {
  await api.isReady
  const sudo = keyring.addFromUri(options.USER_URI)

  return new Promise((resolve, reject) => {
    let unsub: Function
    api.tx.sudo
      .sudo(api.tx.processValidation.createProcess(processId, restrictions))
      .signAndSend(sudo, (result: any) => {
        if (result.status.isInBlock) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessCreated'
          )

          const data = event.data
          const newProcess = {
            id: processId,
            version: data[1].toNumber(),
          }

          const errors = result.events
            .filter(({ event: { method } }: { event: { method: string } }) => method === 'ExtrinsicFailed')
            .map(({ event: { data } }: { event: { data: any } }) => data[0])

          if (errors.length > 0) {
            reject('ExtrinsicFailed error in processValidation.createProcess')
          }

          unsub()
          resolve(newProcess)
        }
      })
      .then((res: Function) => {
        unsub = res
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

const disableProcessTransaction = async (processId: string, processVersion: number) => {
  await api.isReady
  const sudo = keyring.addFromUri(options.USER_URI)

  return new Promise((resolve, reject) => {
    let unsub: Function
    api.tx.sudo
      .sudo(api.tx.processValidation.disableProcess(processId, processVersion))
      .signAndSend(sudo, (result: any) => {
        if (result.status.isInBlock) {
          const { event } = result.events.find(
            ({ event: { method } }: { event: { method: string } }) => method === 'ProcessDisabled'
          )

          const data = event.data
          const disabledProcess = {
            id: processId,
            version: data[1].toNumber(),
          }

          const errors = result.events
            .filter(({ event: { method } }: { event: { method: string } }) => method === 'ExtrinsicFailed')
            .map(({ event: { data } }: { event: { data: any } }) => data[0])

          if (errors.length > 0) {
            reject('ExtrinsicFailed error in processValidation.disableProcess')
          }

          unsub()
          resolve(disabledProcess)
        }
      })
      .then((res: Function) => {
        unsub = res
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}

async function getVersion(processId: string) {
  await api.isReady
  const id = await api.query.processValidation.versionModel(processId)
  return <number>id.toNumber()
}

export async function getVersionUtf(name: string) {
  return await getVersion(utf8ToHex(name, PROCESS_ID_LENGTH))
}
