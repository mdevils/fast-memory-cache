import MemoryCache from '../src';

describe('MemoryCache', () => {
    let cache: MemoryCache;

    beforeEach(() => {
        cache = new MemoryCache();
    });

    describe('set()/get()', () => {
        it('should set data by keys', () => {
            const data1 = {};
            const data2 = {};
            cache.set('key1', data1);
            cache.set('key2', data2);

            expect(cache.get('key1')).toBe(data1);
            expect(cache.get('key2')).toBe(data2);
        });

        it('should return undefined for non-existed key', () => {
            expect(cache.get('key')).toBeUndefined();
        });

        it('should set expiration for data', () => {
            jest.useFakeTimers();

            cache.set('key', 1, 100);
            expect(cache.get('key')).toBe(1);

            jest.advanceTimersByTime(50 * 1000);
            expect(cache.get('key')).toBe(1);

            jest.advanceTimersByTime(100 * 1000);
            expect(cache.get('key')).toBeUndefined();

            jest.useRealTimers();
        });

        describe('when expiration time is 0', () => {
            it('should not expire value', () => {
                jest.useFakeTimers();

                cache.set('key', 'val', 0);
                expect(cache.get('key')).toBe('val');

                jest.advanceTimersByTime(0);
                expect(cache.get('key')).toBe('val');

                jest.advanceTimersByTime(100 * 1000);
                expect(cache.get('key')).toBe('val');

                jest.useRealTimers();
            });
        });

        it('should update data and expiration', () => {
            jest.useFakeTimers();

            cache.set('key', 1, 50);
            cache.set('key', 2, 100);

            jest.advanceTimersByTime(50 * 1000);
            expect(cache.get('key')).toBe(2);

            jest.advanceTimersByTime(100 * 1000);
            expect(cache.get('key')).toBeUndefined();

            jest.useRealTimers();
        });

        it('should remove previous expiration', () => {
            jest.useFakeTimers();

            cache.set('key', 1, 1);
            cache.set('key', 2);

            jest.advanceTimersByTime(1000);
            expect(cache.get('key')).toBe(2);

            jest.useRealTimers();
        });

        it('should not see data from the other cache', () => {
            const otherCache = new MemoryCache();
            otherCache.set('key', 1);

            expect(cache.get('key')).toBeUndefined();
        });

        it('should not search keys in Object.prototype', () => {
            expect(cache.get('hasOwnProperty')).toBeUndefined();
        });
    });

    describe('delete()', () => {
        it('should delete data by key', () => {
            cache.set('key', 1);
            cache.delete('key');

            expect(cache.get('key')).toBeUndefined();
        });

        it('should work properly with "hasOwnProperty" key', () => {
            cache.set('hasOwnProperty', 1, 1);
            cache.delete('hasOwnProperty');
            expect(cache.get('hasOwnProperty')).toBeUndefined();
        });
    });

    describe('clear()', () => {
        it('should clear all data', () => {
            jest.useFakeTimers();

            cache.set('key1', 1);
            cache.set('key2', 2, 100);

            cache.clear();
            expect(cache.get('key1')).toBeUndefined();
            expect(cache.get('key2')).toBeUndefined();

            // Should not throw error after expiration time.
            jest.advanceTimersByTime(100 * 1000);

            jest.useRealTimers();
        });

        it('should work properly with "hasOwnProperty" key', () => {
            cache.set('hasOwnProperty', 1, 1);
            cache.clear();
            expect(cache.get('hasOwnProperty')).toBeUndefined();
        });
    });
});
