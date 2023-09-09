import test from 'ava'

import ja from '../__fixtures__/ja.json'
import { Trans } from './Trans.js'

test('Trans', async ({ is }) => {
  const trans = new Trans<'en' | 'ja'>()
  trans.addLocale('ja', ja)
  const t = trans.get('ja')

  is(t`Hello World`, 'こんにちは')
  is(t`Awesome Astro`, 'Awesome Astro')
})
