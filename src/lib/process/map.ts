import { Restrictions } from '../types/restrictions.js'

// Changes more human-readable format of grouped restrictions to array of single restrictions for submitting to node
// { RestrictionName: [RestrictionValue] } -> [ { RestrictionName: RestrictionValue } ]
export const mapRestrictions = (rawRestrictions: string): Restrictions => {
  const restrictionsObj: Object = JSON.parse(rawRestrictions)

  const restrictions: Restrictions = []
  Object.entries(restrictionsObj).map(([restrictionName, restrictionValues]) => {
    if (restrictionValues.length === 0) {
      restrictions.push({ [restrictionName]: {} })
    }

    for (const restrictionValue of restrictionValues) {
      restrictions.push({ [restrictionName]: restrictionValue })
    }
  })
  return restrictions
}
