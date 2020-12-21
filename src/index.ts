import { Transform } from 'stream'
import marked, { MarkedOptions } from 'marked'

export type StreamdownOptions = Partial<{
  markedOptions: MarkedOptions
  transformOptions: ConstructorParameters<typeof Transform>[0]
}>
/**
 * Stream with options for Node.js `Transform` and `MarkedOptions` from `marked`
 * 
 * @example
 *```js
 import { streamdown } from 'streamdown'
import { createServer } from 'http'
import { createReadStream } from 'fs'

createServer((_, res) => {
  createReadStream('page.md').pipe(streamdown()).pipe(res)
}).listen(3000)
 ```
 */
export class Streamdown extends Transform {
  readonly markedOptions: MarkedOptions

  constructor({ markedOptions, transformOptions }: StreamdownOptions) {
    super(transformOptions)

    this.markedOptions = markedOptions
  }
  _write(chunk: Uint8Array | string, _encoding: string, cb: (err?: any) => void) {
    const html = marked(chunk instanceof Uint8Array ? chunk.toString() : chunk, this.markedOptions)

    this.push(html, this.readableEncoding)

    cb()
  }
  end(_chunk?: any, _encoding?: any, cb?: () => void) {
    this.push(null)
    cb?.()
  }
}
/**
 * Create new Streamdown transform stream
 * @param options streamdown options
 */
export const streamdown = (options?: StreamdownOptions) => new Streamdown(options || {})
