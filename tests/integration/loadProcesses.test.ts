import { expect } from 'chai'
import processes from '../fixtures/mock-processes.js'
import { loadProcesses } from '../../src/lib/process/index.js'

describe.skip('loadProcesses function', () => {
  it('calls it', async () => {
    const res = await loadProcesses(processes)
    console.log({ res })
    expect(1).to.equal(1)
  })
})