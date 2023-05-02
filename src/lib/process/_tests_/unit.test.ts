import { expect } from 'chai'
import { HexError } from '../../types/error.js'
import { utf8ToHex } from '../hex.js'

describe('utf8ToHex', () => {
  it('converts a utf8 string to hexadecimal', () => {
    expect(utf8ToHex('test123', 10)).to.equal('0x74657374313233')
  })

  it('throws for string over given max length', () => {
    expect(() => utf8ToHex('test123', 1)).to.throw(HexError)
  })
})

/* TODO will update with other due to this being covered in integration test suites
describe('createProcessTransaction', () => {
  describe('if POSIX is invalid', () => {
    it('throws invalid program error', () => {
    
    })
  })

  it('successfully creates process transaction', () => {
    
  })
})
*/