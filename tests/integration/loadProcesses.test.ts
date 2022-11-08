import { expect } from 'chai'
import processes from '../fixtures/mock-processes.js'
import { loadProcesses } from '../../src/lib/process/index.js'

describe('loadProcesses function', () => {
  let res: Process.Response

  beforeEach(async () => {
    res = await loadProcesses({ data: processes })
  })

  it('creates transactions for each process', () => {
    expect(res?.mock_accept_order?.process?.status).to.equal('Enabled')
    expect(res?.mock_post_order?.process?.status).to.equal('Enabled')
  })
})