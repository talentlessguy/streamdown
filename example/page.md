# streamdown

Process markdown using [marked](https://marked.js) into a stream that later can be piped to response.

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
  createReadStream('page.md').pipe(streamdown).pipe(res)
}).listen(3000)
```
