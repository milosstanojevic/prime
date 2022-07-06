import setRef from './setRef';

describe('setRef', () => {
    it('should handle ref as mutable object', () => {
        const ref = { current: null };
        setRef(ref, 'blah');
        expect(ref.current).toBe('blah');
    });
});
