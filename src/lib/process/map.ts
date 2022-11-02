import { NoValidRestrictionsError } from '../types/error.js'
import { userRestrictionValidation } from '../types/restrictions.js'
import type { ChainRestrictions } from '../types/restrictions.js'

// Changes more human-readable format of grouping the same type of restriction -> an array of single restrictions for submitting to node
// { RestrictionName: [RestrictionValue] } -> [ { RestrictionName: RestrictionValue } ]
export const mapRestrictions = (rawRestrictions: string): any => {
  const restrictions: any = userRestrictionValidation.parse(JSON.parse(rawRestrictions))
  if (Object.keys(restrictions[0]).length < 1) {
    throw new NoValidRestrictionsError('No valid restrictions in request')
  }

  const chainRestrictions: any = []
  restrictions.map((restriction: Object) => {
    const [key, values] = Object.entries(restriction)[0]
    if (values.length === 0) {
      chainRestrictions.push({ restriction: { [key]: {} }})
    }

    if (key === 'op') {
      chainRestrictions.push({ [key]: values })
    } else {
      for (const value of values) {
        chainRestrictions.push({ restriction: { [key]: value }})
      }
    }
  })

  return chainRestrictions
}
