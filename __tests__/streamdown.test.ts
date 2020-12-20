import { suite } from 'uvu'
import assert from 'uvu/assert'
import { Streamdown, streamdown } from '../src/index'
import { createReadStream } from 'fs'

const test = suite('stream')

test('Streamdown process markdown into HTML', () => {
  const source = createReadStream(`${process.cwd()}/__tests__/fixtures/test.md`)

  const md = new Streamdown({})

  let output = ''

  source
    .pipe(md)
    .on('data', (d) => {
      if (d) output += d.toString()
    })
    .on('end', () => {
      assert.is(output.trim(), '<h1 id="hello-world">hello world</h1>')
    })
})

test('streamdown(opts) works the same way as new Streamdown(opts)', () => {
  const source = createReadStream(`${process.cwd()}/__tests__/fixtures/test.md`)

  const md = streamdown()

  let output = ''

  source
    .pipe(md)
    .on('data', (d) => {
      if (d) output += d.toString()
    })
    .on('end', () => {
      assert.is(output.trim(), '<h1 id="hello-world">hello world</h1>')
    })
})

test('marked options are applied', () => {
  const source = createReadStream(`${process.cwd()}/__tests__/fixtures/test.md`)

  const md = streamdown({
    markedOptions: {
      headerIds: false
    }
  })

  let output = ''

  source
    .pipe(md)
    .on('data', (d) => {
      if (d) output += d.toString()
    })
    .on('end', () => {
      assert.is(output.trim(), '<h1>hello world</h1>')
    })
})

test('transform options are applied', () => {
  const source = createReadStream(`${process.cwd()}/__tests__/fixtures/test.md`)

  const md = streamdown({
    transformOptions: {
      encoding: 'utf8'
    },
    markedOptions: {
      headerIds: false
    }
  })

  let output = ''

  const result = source
    .pipe(md)
    .on('data', (d) => {
      if (d) output += d.toString()
    })
    .on('end', () => {
      assert.is(output.trim(), '<h1>hello world</h1>')
    })

  assert.is(result.readableEncoding, 'utf8')
})

test.run()
