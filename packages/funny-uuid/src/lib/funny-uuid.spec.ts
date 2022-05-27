import { funnyUuid } from './funny-uuid';

describe('funnyUuid', () => {
    it('should work', () => {
        expect(funnyUuid()).not.toBeUndefined();
    })
})