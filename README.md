# fast-memory-cache

![npm](https://img.shields.io/npm/v/fast-memory-cache)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/fast-memory-cache)
![npm](https://img.shields.io/npm/dm/fast-memory-cache)
![license](https://img.shields.io/npm/l/fast-memory-cache)

A lightweight, high-performance in-memory cache for Node.js applications with TypeScript support.

## Features

- 💨 **Fast**: Optimized for rapid access and storage
- 🔑 **Simple API**: Intuitive methods for cache operations
- ⏱️ **TTL Support**: Configurable time-to-live for cached items
- 🧠 **Memory Efficient**: Minimal overhead for stored values
- 📦 **Zero Dependencies**: No external packages required
- 📝 **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install fast-memory-cache
# or
yarn add fast-memory-cache
# or
pnpm add fast-memory-cache
```

## Usage

### TypeScript

```ts
import MemoryCache from 'fast-memory-cache';

interface User {
  id: number;
  name: string;
}

const cache = new MemoryCache();

// Type-safe storage and retrieval
cache.set<User>('user', { id: 1, name: 'John' });
const user = cache.get<User>('user'); // User type

// With expiration
cache.set<string>('token', 'abc123', 300); // expires in 5 minutes
```

### JavaScript

```js
const MemoryCache = require('fast-memory-cache');

// Create a new cache instance
const cache = new MemoryCache();

// Store a value
cache.set('user', { id: 1, name: 'John' });

// Retrieve a value
const user = cache.get('user'); // { id: 1, name: 'John' }

// Store with expiration (in seconds)
cache.set('session', 'abc123', 60); // expires in 60 seconds

// Delete a value
cache.delete('user');

// Clear all cache
cache.clear();
```

## API

### Constructor

```ts
const cache = new MemoryCache();
```

### Methods

#### `get<T>(key: string): T | undefined`

Retrieves a value from the cache.

- Returns `undefined` if the key doesn't exist or has expired

#### `set<T>(key: string, value: T, expireTime?: number): void`

Stores a value in the cache.

- `key`: The cache key
- `value`: The value to store
- `expireTime`: Time in seconds after which the value will be automatically deleted (optional)
  - Set to `0` or omit for values that never expire

#### `delete(key: string): void`

Removes a value from the cache.

#### `clear(): void`

Removes all values from the cache.

## Performance

Fast Memory Cache is designed to be extremely lightweight and performant:

- No serialization/deserialization overhead
- Direct in-memory storage with no I/O operations
- Efficient timeout management for expiration

## When to Use

Fast Memory Cache is ideal for:

- Caching API responses
- Storing session data
- Memoizing expensive function results
- Reducing database load
- Any scenario requiring fast, temporary data storage

## License

MIT

## Support the Project

If you find this package useful, consider:

- ⭐ Starring the [repository](https://github.com/mdevils/fast-memory-cache)
- 🐛 Reporting [issues](https://github.com/mdevils/fast-memory-cache/issues)
- 🤝 Contributing with PRs
