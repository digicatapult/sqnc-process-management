import { expect } from 'chai'
import option from './../../../src/lib/options.js'

describe('Option values', () => {

    it('should return 9944', () => {
        expect(option.API_PORT).to.equal(9944)
    })
})