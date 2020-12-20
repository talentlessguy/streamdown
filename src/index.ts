import { Transform } from 'stream'
import marked, { MarkedOptions } from 'marked'

export type StreamdownOptions = Partial<{
  markedOptions: MarkedOptions
  writableOptions: ConstructorParameters<typeof Transform>[0]
}>

type Callback = (err?: any) => void

export class Streamdown extends Transform {
  readonly markedOptions: MarkedOptions

  constructor({ markedOptions, writableOptions }: StreamdownOptions) {
    super(writableOptions)
    this.markedOptions = markedOptions
  }
  _write(chunk: Uint8Array | string, _encoding: string, cb: Callback) {
    const html = marked(chunk instanceof Uint8Array ? chunk.toString() : chunk, this.markedOptions)

    this.push(html, this.readableEncoding)

    cb()
  }
  end(chunk?: any, encoding?: any, cb?: () => void) {
    if (chunk) {
      const html = marked(chunk instanceof Uint8Array ? chunk.toString() : chunk, this.markedOptions)

      this.push(html, this.readableEncoding)
    }

    this.push(null)
    cb?.()
  }
}

export const streamdown = (options?: StreamdownOptions) => new Streamdown(options || {})
