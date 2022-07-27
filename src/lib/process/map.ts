import { NoValidRestrictionsError } from '../types/error.js'
import { userRestrictionValidation } from '../types/restrictions.js'
import type { ChainRestrictions } from '../types/restrictions.js'

// Changes more human-readable format of grouping the same type of restriction -> an array of single restrictions for submitting to node
// { RestrictionName: [RestrictionValue] } -> [ { RestrictionName: RestrictionValue } ]
export const mapRestrictions = (rawRestrictions: string): ChainRestrictions => {
  const restrictionsObj: Object = userRestrictionValidation.parse(JSON.parse(rawRestrictions))

  const restrictionPairs = Object.entries(restrictionsObj)
  if (restrictionPairs.length === 0) {
    throw new NoValidRestrictionsError('No valid restrictions in request')
  }

  const chainRestrictions: ChainRestrictions = []
  restrictionPairs.map(([restrictionName, restrictionValues]) => {
    if (restrictionValues.length === 0) {
      chainRestrictions.push({ [restrictionName]: {} })
    }

    for (const restrictionValue of restrictionValues) {
      chainRestrictions.push({ [restrictionName]: restrictionValue })
    }
  })
  return chainRestrictions
}
