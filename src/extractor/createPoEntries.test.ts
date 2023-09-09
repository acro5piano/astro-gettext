import test from 'ava'
import { readFile } from 'fs/promises'

import { createPoEntries } from './createPoEntries.js'

const FIXTURE = 'src/extractor/__fixtures__/MyComponent.po'

test('new file', async (t) => {
  const input = await readFile(FIXTURE, 'utf8')
  const res = createPoEntries(input)
  t.deepEqual(res, [
    {
      comments: [],
      msgid: 'Hello World',
      msgstr: 'こんにちは',
    },
    {
      comments: [],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr:
        'Lorem Ipsum は組版業界で使われてきたシンプルなダミーテキストです。',
    },
    {
      comments: [],
      msgid: 'Working Hard to build better \\"i18n\\" library',
      msgstr: 'より良い \\"i18n\\" ライブラリのために頑張ってます。',
    },
  ])
  t.log(JSON.stringify(res, null, 2))
})
