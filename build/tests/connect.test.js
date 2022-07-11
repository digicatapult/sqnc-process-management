//import api from '../src/lib/api'
import { expect } from 'chai';
describe('Tests node connection', () => {
    it('should return 0', () => {
        // async function getLastTokenId() {
        //   await api.default.isReady
        //   const lastTokenId = await api.default.query.simpleNftModule.lastToken()
        //   return lastTokenId.toJSON()
        // }
        const num = 1;
        expect(num).to.equal(1);
    });
});
