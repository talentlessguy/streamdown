import { streamdown } from '../dist/index.js'
import { createServer } from 'http'
import { createReadStream } from 'fs'

createServer((_, res) => {
  createReadStream('page.md').pipe(streamdown()).pipe(res)
}).listen(3000)
