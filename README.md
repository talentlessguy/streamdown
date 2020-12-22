<p align="center" ><img src="logo.svg" /></p>

![Top lang][top-lang-badge-url]
![Vulnerabilities][vulns-badge-url]
[![Version][v-badge-url]][npm-url]
![Last commit][last-commit-badge-url]
![Minified size][size-badge-url] [![Codecov][cov-badge-url]][cov-url] [![Downloads][dl-badge-url]][npm-url]

# Streamdown

Stream markdown to HTML using [marked](https://marked.js) that later can be piped to response.

> **WARNING!!!** Markdown wasn't intended to be streamable so this library has a lot of limitations. Splitting markdown in chunks might break code markup, folded > lists and link references. Use this library only for very basic markdown. The better approach would be using a string instead. More details here: #1

## Install

```sh
pnpm i streamdown
```

## Usage

```js
import { createServer } from 'http'
import { streamdown } from 'streamdown'
import { createReadStream } from 'fs'

createServer((_, res) => {
  createReadStream('page.md').pipe(streamdown()).pipe(res)
}).listen(3000)
```

## API

```js
import { streamdown, Streamdown } from 'streamdown'
```

### `new Streamdown(opts)`

Create a new `Streamdown` transform stream with options for transform and `MarkedOptions` from `marked`

```js
const md = new Streamdown({
  markedOptions: {
    headerIds: false
  },
  transformOptions: {
    encoding: 'utf8'
  }
})
```

### `streamdown(opts)`

Create a new `Streamdown` transform stream and return it.

[top-lang-badge-url]: https://img.shields.io/github/languages/top/talentlessguy/streamdown.svg?style=flat-square
[vulns-badge-url]: https://img.shields.io/snyk/vulnerabilities/npm/streamdown.svg?style=flat-square
[v-badge-url]: https://img.shields.io/npm/v/streamdown.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/streamdown
[last-commit-badge-url]: https://img.shields.io/github/last-commit/talentlessguy/streamdown.svg?style=flat-square
[size-badge-url]: https://img.shields.io/bundlephobia/min/streamdown.svg?style=flat-square
[cov-badge-url]: https://img.shields.io/codecov/c/gh/talentlessguy/streamdown?style=flat-square
[cov-url]: https://codecov.io/gh/talentlessguy/streamdown
[dl-badge-url]: https://img.shields.io/npm/dt/streamdown?style=flat-square
