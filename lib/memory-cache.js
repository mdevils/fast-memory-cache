'use strict';

/**
 * Provides in-memory cache.
 *
 * @name MemoryCache
 * @constructor
 */
function MemoryCache() {
    this._cache = {};
    this._expires = {};
}

/**
 * Returns cache value for the specified key.
 *
 * @param {String} key
 * @returns {*} Value or `undefined` if value does not exist.
 */
MemoryCache.prototype.get = function (key) {
    return this._cache[key];
};

/**
 * Assigns value for the specified key.
 *
 * @param {String} key
 * @param {*} value
 * @param {Number} [expireTime=0] The number of seconds in which the cached value will expire.
 *      0 means never expire.
 */
MemoryCache.prototype.set = function (key, value, expireTime) {
    this.delete(key);
    this._cache[key] = value;
    if (expireTime) {
        this._expires[key] = setTimeout(this.delete.bind(this, key), expireTime * 1000);
    }
};

/**
 * Deletes value for the specified key.
 *
 * @param {String} key
 */
MemoryCache.prototype.delete = function (key) {
    delete this._cache[key];
    if (this._expires.hasOwnProperty(key)) {
        clearTimeout(this._expires[key]);
        delete this._expires[key];
    }
};

/**
 * Clears the whole cache storage.
 */
MemoryCache.prototype.clear = function () {
    this._cache = {};
    for (var key in this._expires) {
        if (this._expires.hasOwnProperty(key)) {
            clearTimeout(this._expires[key]);
        }
    }
    this._expires = {};
};

module.exports = MemoryCache;
