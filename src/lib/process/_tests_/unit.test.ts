import { expect } from 'chai'
import { HexError } from '../../types/error.js'
import { utf8ToHex } from '../hex.js'
import { mapRestrictions } from '../map.js'
import { restrictionsAfterMap, restrictionsBeforeMap } from './fixtures.js'

describe('utf8ToHex', () => {
  it('converts a utf8 string to hexadecimal', () => {
    expect(utf8ToHex('test123', 10)).to.equal('0x74657374313233')
  })

  it('throws for string over given max length', () => {
    expect(() => utf8ToHex('test123', 1)).to.throw(HexError)
  })
})

describe('mapRestrictions', () => {
  it('maps{ RestrictionName: [RestrictionValue] } -> [ { RestrictionName: RestrictionValue } ]', () => {
    expect(mapRestrictions(restrictionsBeforeMap)).to.deep.equal(restrictionsAfterMap)
  })

  it('throws for invalid JSON', () => {
    expect(() => mapRestrictions('not JSON')).to.throw(SyntaxError)
  })
})
