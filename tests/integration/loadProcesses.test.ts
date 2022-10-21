import { expect } from 'chai'
import processes from '../fixtures/mock-processes.js'
import { loadProcesses } from '../../src/lib/process/index.js'

describe('loadProcesses function', () => {
  let res: any

  beforeEach(async () => {
    res = await loadProcesses(processes)
  })

  it('creates transactions for each process', () => {
    const { mock_accept_order, mock_post_order } = res

    expect(mock_accept_order.process.status).to.equal('Enabled')
    expect(mock_post_order.process.status).to.equal('Enabled')
  })
})