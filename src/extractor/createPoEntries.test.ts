import test from 'ava'
import { readFile } from 'fs/promises'

import { createPoEntries } from './createPoEntries.js'

const FIXTURE = require
  .resolve('./__fixtures__/MyComponent.po')
  .replace(process.cwd(), '.')

test('new file', async (t) => {
  const input = await readFile(FIXTURE, 'utf8')
  const res = createPoEntries(input)
  t.deepEqual(res, [
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:5',
        '#: src/extractor/__fixtures__/MyComponent.astro:10',
      ],
      msgid: 'Hello World',
      msgstr: 'こんにちは',
    },
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:6',
        '#: src/extractor/__fixtures__/MyComponent.astro:8',
      ],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr:
        'Lorem Ipsum は組版業界で使われてきたシンプルなダミーテキストです。',
    },
  ])
  t.log(JSON.stringify(res, null, 2))
})
