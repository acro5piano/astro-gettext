import test from 'ava'
import { readFile } from 'fs/promises'

import { Trans } from './Trans.js'

const FIXTURE = 'src/extractor/__fixtures__/MyComponent.po'

test('Trans', async ({ is }) => {
  const po = await readFile(FIXTURE, 'utf8')
  const trans = new Trans<'en' | 'ja'>()
  trans.addLocale('ja', po)
  const t = trans.get('ja')

  is(t`Hello World`, 'こんにちは')
  is(t`Awesome Astro`, 'Awesome Astro')
})
