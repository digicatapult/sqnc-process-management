import { expect } from 'chai'
import { type StartedTestContainer } from 'testcontainers'

import { loadProcesses } from '../../src/lib/process/index.js'
import { multiple } from '../fixtures/programs.js'

import { getVersionHelper } from '../helpers/substrateHelper.js'

import { withSubstrateNode } from '../helpers/containers.js'

describe('Transactions without manual seal', function () {
  this.timeout(60000)

  const context = {
    polkadotOptions: { API_HOST: 'localhost', API_PORT: 0, USER_URI: '//Alice', MANUAL_SEAL: false },
  } as {
    nodeContainer?: StartedTestContainer
    polkadotOptions: Polkadot.Options
  }

  withSubstrateNode({ manualSeal: false }, context)

  it('creates multiple processes', async () => {
    const process1Name = 'process-1'
    const process1BumpedV = (await getVersionHelper(process1Name, context.polkadotOptions)) + 1
    const process2Name = 'process-2'
    const process2BumpedV = (await getVersionHelper(process2Name, context.polkadotOptions)) + 1
    const newProcesses = await loadProcesses({
      options: context.polkadotOptions,
      data: multiple(process1Name, process1BumpedV, process2Name, process2BumpedV),
    })
    if (newProcesses.type !== 'ok') {
      expect.fail('Expected new process creation to succeed')
    }
    expect(newProcesses.result[process1Name].message).to.deep.equal(
      'Transaction for new process process-1 has been successfully submitted'
    )
    const process1Result = newProcesses.result[process1Name]
    if (process1Result.type !== 'ok') {
      expect.fail('Expected process1 creation to succeed')
    }
    expect(process1Result.result).to.deep.contain({
      version: process1BumpedV,
      status: 'Enabled',
    })

    const process2Result = newProcesses.result[process2Name]
    if (process2Result.type !== 'ok') {
      expect.fail('Expected process2 creation to succeed')
    }
    expect(process2Result.message).to.deep.equal(
      'Transaction for new process process-2 has been successfully submitted'
    )
    expect(process2Result.result).to.deep.contain({
      version: process2BumpedV,
      status: 'Enabled',
    })
  })
})
