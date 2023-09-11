import { expect } from 'chai'

import { HexError } from '../../types/error.js'
import { utf8ToHex } from '../hex.js'
import { listTransforming } from '../index.js'

import sample from '../../../../tests/fixtures/processes.js'

const defaultPolkadot: Process.CLIOptions = { port: '9044', user: 'alice', host: 'localhost' }

describe('utf8ToHex', () => {
  it('converts a utf8 string to hexadecimal', () => {
    expect(utf8ToHex('test123', 10)).to.equal('0x74657374313233')
  })

  it('throws for string over given max length', () => {
    expect(() => utf8ToHex('test123', 1)).to.throw(HexError)
  })
})

describe('listTranforming', () => {
  it('returns all transformed processes without a program (--verbose=false)', async () => {
    let processes: Process.RawPayload[]
    const enriched: Process.RawPayload = {
      ...sample[0],
      id: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }
    
    const res = await listTransforming([enriched], processes, { ...defaultPolkadot, verbose: false })

    expect(res[0])
      .to.be.an('object')
      .that.not.contain.keys(['program'])

    expect(res[0]).to.deep.contain({
      id: '123',
      status: 'Disabled',
      version: 1,
    })
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