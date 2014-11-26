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

MemoryCache.prototype = {
    constructor: MemoryCache,

    /**
     * Returns cache value for the specified key.
     *
     * @param {String} key
     * @returns {*|undefined} Value of `undefined` if value does not exist.
     */
    get: function (key) {
        return this._cache[key];
    },

    /**
     * Assigns value for the specified key.
     *
     * @param {String} key
     * @param {*} value
     * @param {Number} [expireTime] Cache expiration timeout.
     */
    set: function (key, value, expireTime) {
        this._cache[key] = value;
        if (expireTime !== undefined) {
            clearTimeout(this._expires[key]);
            this._expires[key] = setTimeout(this.delete.bind(this, key), expireTime);
        }
    },

    /**
     * Deletes value for the specified key.
     *
     * @param {String} key
     */
    delete: function (key) {
        delete this._cache[key];
        if (this._expires.hasOwnProperty(key)) {
            clearTimeout(this._expires[key]);
            delete this._expires[key];
        }
    },

    /**
     * Clears the whole cache storage.
     */
    clear: function () {
        this._cache = {};
        for (var key in this._expires) {
            if (this._expires.hasOwnProperty(key)) {
                clearTimeout(this._expires[key]);
            }
        }
        this._expires = {};
    }
};

module.exports = MemoryCache;
