import test from 'ava'
import { extract } from './extract'
import { readFile } from 'fs/promises'

test('test', async (t) => {
  const fileName = require
    .resolve('./__fixtures__/MyComponent.astro')
    .replace(process.cwd(), '.')
  const input = await readFile(fileName, 'utf8')
  t.deepEqual(await extract(fileName, input), [
    {
      comments: [
        '# src/extractor/__fixtures__/MyComponent.astro:5',
        '# src/extractor/__fixtures__/MyComponent.astro:10',
      ],
      msgid: 'Hello World',
      msgstr: '',
    },
    {
      comments: [
        '# src/extractor/__fixtures__/MyComponent.astro:6',
        '# src/extractor/__fixtures__/MyComponent.astro:8',
      ],
      msgid:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      msgstr: '',
    },
  ])
  t.log(JSON.stringify(await extract(fileName, input), null, 2))
})
