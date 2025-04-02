/**
 * Provides in-memory cache.
 *
 * @name MemoryCache
 * @constructor
 */
class MemoryCache {
    private _cache = createMap();
    private _timeouts = createMap();

    /**
     * Returns cache value for the specified key.
     *
     * @returns {*} Value or `undefined` if value does not exist
     */
    get<T = unknown>(key: string): T | undefined {
        return this._cache[key];
    }

    /**
     * Assigns value for the specified key.
     *
     * @param {String} key
     * @param {*} value
     * @param {Number} [expireTime=0] The length of time in seconds. After this time has expired, the
     *      value will be automatically deleted. 0 means that time never expire.
     */
    set<T = unknown>(key: string, value: T, expireTime?: number): void {
        this.delete(key);
        this._cache[key] = value;
        if (expireTime) {
            this._timeouts[key] = setTimeout(this.delete.bind(this, key), expireTime * 1000);
        }
    }

    /**
     * Deletes value for the specified key.
     *
     * @param {String} key
     */
    delete(key: string): void {
        delete this._cache[key];
        if (key in this._timeouts) {
            clearTimeout(this._timeouts[key]);
            delete this._timeouts[key];
        }
    }

    /**
     * Clears the whole cache storage.
     */
    clear(): void {
        this._cache = createMap();
        for (const key in this._timeouts) {
            clearTimeout(this._timeouts[key]);
        }
        this._timeouts = createMap();
    }
}

type LookupMap = Record<string, any>;

/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 */
function createMap(): LookupMap {
    return Object.create(null);
}

export default MemoryCache;
