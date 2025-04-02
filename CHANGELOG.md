# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/mdevils/fast-memory-cache/compare/v2.0.4...v3.0.0) (2025-04-02)


### Features

* rewrite using TS, upgrade tooling, improve README ([948f68b](https://github.com/mdevils/fast-memory-cache/commit/948f68bd487fd150ab7270de4af89707ce82332f))

### 2.0.4
* Clarify documentation for `expireTime` parameter in `MemoryCache#set`.

### 2.0.3
* Fix usage keys from `Object.prototype` [#4](https://github.com/mdevils/fast-memory-cache/pull/4)

### 2.0.2
* Package improvements [#3](https://github.com/mdevils/fast-memory-cache/pull/3)

### 2.0.1
* Fix: correct remove expiration time when update value.

### 2.0.0
* MemoryCache#set
  * Use seconds instead milliseconds for expiration time.
  * Never expire value if expiration time is 0.

### 1.0.0
* Initial release.
