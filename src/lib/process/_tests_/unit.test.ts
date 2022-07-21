import { expect } from 'chai'
import { defaultOptions } from '../../types/options.js'

describe('Options values', () => {
  it('should return 9944', () => {
    expect(defaultOptions.API_PORT).to.equal(9944)
  })
})

//TODO unit test `process` helper functions
