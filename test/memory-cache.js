var should = require('chai').should();
var sinon = require('sinon');
var MemoryCache = require('../lib/memory-cache');

describe('MemoryCache', function () {
    var cache;

    beforeEach(function () {
        cache = new MemoryCache();
    });

    describe('set()', function () {
        it('should set data by keys', function () {
            var data1 = {};
            var data2 = {};
            cache.set('key1', data1);
            cache.set('key2', data2);

            cache.get('key1').should.equal(data1);
            cache.get('key2').should.equal(data2);
        });

        it('should return undefiend for non-existed key', function () {
            should.not.exist(cache.get('key'));
        });

        it('should set expiration for data', function () {
            var clock = sinon.useFakeTimers();

            cache.set('key', 1, 100);
            cache.get('key').should.equal(1);

            clock.tick(50 * 1000);
            cache.get('key').should.equal(1);

            clock.tick(100 * 1000);
            should.not.exist(cache.get('key'));

            clock.restore();
        });

        describe('when expiration time is 0', function () {
            it('should not expire value', function () {
                var clock = sinon.useFakeTimers();

                cache.set('key', 'val', 0);
                cache.get('key').should.equal('val');

                clock.tick(0);
                cache.get('key').should.equal('val');

                clock.tick(100 * 1000);
                cache.get('key').should.equal('val');
            });
        });

        it('should update data and expiration', function () {
            var clock = sinon.useFakeTimers();

            cache.set('key', 1, 50);
            cache.set('key', 2, 100);

            clock.tick(50 * 1000);
            cache.get('key').should.equal(2);

            clock.tick(100 * 1000);
            should.not.exist(cache.get('key'));

            clock.restore();
        });

        it('should remove previous expiration', function () {
            var clock = sinon.useFakeTimers();

            cache.set('key', 1, 1);
            cache.set('key', 2);

            clock.tick(1000);
            cache.get('key').should.equal(2);

            clock.restore();
        });
    });

    describe('delete()', function () {
        it('should delete data by key', function () {
            cache.set('key', 1);
            cache.delete('key');

            should.not.exist(cache.get('key'));
        });
    });

    describe('clear()', function () {
        it('should clear data', function () {
            var clock = sinon.useFakeTimers();

            cache.set('key1', 1);
            cache.set('key2', 2, 100);

            cache.clear();
            should.not.exist(cache.get('key1'));
            should.not.exist(cache.get('key2'));

            // Should not throw error after expiration time.
            clock.tick(100 * 1000);

            clock.restore();
        });
    });

    it('should not see data from the other cache', function () {
        var otherCache = new MemoryCache();
        otherCache.set('key', 1);

        should.not.exist(cache.get('key'));
    });
});
