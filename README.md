# fast-memory-cache

NodeJs fast memory cache implementation.

## Installation

```
npm install fast-memory-cache --save
```

## Usage example

```js
var MemoryCache = require('fast-memory-cache');

var cache = new MemoryCache();

var val = cache.get('key'); // undefined

cache.set('key', 'value', 1000);

val = cache.get('key'); // 'value'

cache.delete('key');

val = cache.get('key'); // undefined

cache.set('key', 'new-value', 1000);

setTimeout(function() {

    val = cache.get('key'); // undefined

}, 2000);
```
