import test from 'ava'
import { readFile } from 'fs/promises'

import { extract } from './extract.js'

const FIXTURE = 'src/extractor/__fixtures__/MyComponent.astro'

test('adding file', async (t) => {
  const input = await readFile(FIXTURE, 'utf8')
  const existing = [
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:7'],
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
        '#: src/extractor/__fixtures__/MyComponent.astro:7',
        '#: src/extractor/__fixtures__/MyComponent.astro:8',
        '#: src/extractor/__fixtures__/MyComponent.astro:10',
      ],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr:
        'Lorem Ipsum は組版業界で使われてきたシンプルなダミーテキストです。',
    },
    {
      comments: [
        '#: src/extractor/__fixtures__/MyComponent.astro:7',
        '#: src/extractor/__fixtures__/MyComponent.astro:12',
      ],
      msgid: 'Hello World',
      msgstr: '',
    },
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:13'],
      msgid: 'Get started with astro-gettext',
      msgstr: '',
    },
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:15'],
      msgid: 'Working Hard to build better \\"i18n\\" library',
      msgstr: '',
    },
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:17'],
      msgid: 'Canadian Club Original 1858 is an exceptionally smooth whisky',
      msgstr: '',
    },
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:18'], // :19 is correct, but this is limitation of Astro compiler
      msgid: 'Arr1',
      msgstr: '',
    },
    {
      comments: ['#: src/extractor/__fixtures__/MyComponent.astro:18'], // Same as above
      msgid: 'Arr2',
      msgstr: '',
    },
  ])
  t.log(JSON.stringify(res, null, 2))
})
