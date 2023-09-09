import test from 'ava'
import { readFile } from 'fs/promises'

import { extract } from './extract.js'

const FIXTURE = require
  .resolve('./__fixtures__/MyComponent.astro')
  .replace(process.cwd(), '.')

test('new file', async (t) => {
  const input = await readFile(FIXTURE, 'utf8')
  const res = await extract(FIXTURE, input, [])
  t.deepEqual(res, [
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:5',
        '#: src/extractor/__fixtures__/MyComponent.astro:10',
      ],
      msgid: 'Hello World',
      msgstr: '',
    },
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:6',
        '#: src/extractor/__fixtures__/MyComponent.astro:8',
      ],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr: '',
    },
  ])
  t.log(JSON.stringify(res, null, 2))
})

test('adding file', async (t) => {
  const input = await readFile(FIXTURE, 'utf8')
  const existing = [
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:6'],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr:
        'Lorem Ipsum は組版業界で使われてきたシンプルなダミーテキストです。',
    },
  ]
  const res = await extract(FIXTURE, input, existing)
  t.deepEqual(res, [
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
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:5',
        '#: src/extractor/__fixtures__/MyComponent.astro:10',
      ],
      msgid: 'Hello World',
      msgstr: '',
    },
  ])
  t.log(JSON.stringify(res, null, 2))
})
