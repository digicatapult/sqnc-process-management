import { expect } from 'chai'

import { utf8ToHex, hexToUtf8 } from '../hex.js'
import { listTransforming, handleVerbose } from '../index.js'

import sample from '../../../../tests/fixtures/processes.js'

const defaultPolkadot: Process.CLIOptions = {
  port: '9044',
  user: 'alice',
  host: 'localhost',
  file: './exampleProcess.json',
}

describe('utf8ToHex', () => {
  it('converts a utf8 string to hexadecimal', () => {
    expect(utf8ToHex('test123')).to.equal('0x74657374313233')
  })
})

describe('hexToUtf8', () => {
  it('converts a prefixed string to hex', () => {
    expect(hexToUtf8('0x74657374313233')).to.equal('test123')
  })
})

describe('listTranforming', () => {
  it('returns all transformed processes without a program (--verbose=false)', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Enabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, verbose: false })

    expect(res[0]).to.deep.contain({
      name: '123',
      status: 'Enabled',
      version: 1,
    })
  })

  it('returns all transformed processes with a program (--verbose=true)', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, verbose: true })

    expect(res[0]).to.deep.contain({
      name: '123',
      status: 'Disabled',
      version: 1,
    })
  })

  it('returns all options active', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Enabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, active: true })

    expect(res[0]).to.deep.contain({
      name: '123',
      status: 'Enabled',
      version: 1,
    })
  })

  it('returns all options disabled but with active true', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, active: true })

    expect(res[0]).to.equal(undefined)
  })

  it('returns all options disabled', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot })

    expect(res[0]).to.deep.contain({
      name: '123',
      status: 'Disabled',
      version: 1,
    })
  })

  it('returns all options active with status enabled', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, active: false })

    expect(res[0]).to.deep.contain({
      name: '123',
      status: 'Disabled',
      version: 1,
    })
  })

  it('returns additional properties with raw', async () => {
    const enriched: Process.RawPayload = {
      ...sample[0],
      name: '123',
      status: 'Disabled',
      createdAtHash: 'abc',
      initialU8aLength: '32',
    }

    const res = listTransforming([enriched], { ...defaultPolkadot, active: false, raw: true })

    expect(res[0]).to.deep.contain({
      name: '0x313233',
      status: 'Disabled',
      version: 1,
      createdAtHash: 'abc',
      initialU8aLength: '32',
    })
  })
})

describe('handleVerbose', function () {
  it('should remove program when verbose == false', function () {
    const result = handleVerbose(
      {
        name: 'test',
        status: 'Enabled',
        version: 1,
        program: [],
      },
      false
    )
    expect(result).to.deep.equal({ name: 'test', status: 'Enabled', version: 1 })
  })

  it('should include program when verbose == false', function () {
    const result = handleVerbose(
      {
        name: 'test',
        status: 'Enabled',
        version: 1,
        program: [],
      },
      true
    )
    expect(result).to.deep.equal({ name: 'test', status: 'Enabled', version: 1, program: [] })
  })
})
