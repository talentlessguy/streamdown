![Top lang](https://img.shields.io/github/languages/top/talentlessguy/streamdown.svg?style=flat-square)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/streamdown.svg?style=flat-square)
![Version](https://img.shields.io/npm/v/streamdown.svg?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/talentlessguy/streamdown.svg?style=flat-square)
![Minified size](https://img.shields.io/bundlephobia/min/streamdown.svg?style=flat-square) ![Codecov](https://img.shields.io/codecov/c/gh/talentlessguy/streamdown?style=flat-square)

# Streamdown

Stream markdown to HTML using [marked](https://marked.js) that later can be piped to response.

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

Create a new `Transform` stream with options for transform and `MarkedOptions` from `marked`

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

Create a new `Transform` stream and return it.
