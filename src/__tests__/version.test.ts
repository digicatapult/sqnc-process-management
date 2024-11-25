import { expect } from 'chai'

import version from '../version'


describe('version helper', () => {
  it('returns a version number from package.json', () => {
    expect(version).to.match((/^(\d+\.)?(\d+\.)?(\*|\d+)$/g))
  })
})
