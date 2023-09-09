import test from 'ava'
import dedent from 'dedent'

import { renderPo } from './renderPo.js'

test('test', async (t) => {
  const res = renderPo([
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
  const expected = dedent`
    # src/extractor/__fixtures__/MyComponent.astro:5
    # src/extractor/__fixtures__/MyComponent.astro:10
    msgid "Hello World"
    msgstr ""

    # src/extractor/__fixtures__/MyComponent.astro:6
    # src/extractor/__fixtures__/MyComponent.astro:8
    msgid "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    msgstr ""
  `
  t.deepEqual(res, expected)
  t.log(res)
})
