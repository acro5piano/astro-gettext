import test from 'ava'
import { extract } from './extract'
import { readFile } from 'fs/promises'

test('test', async (t) => {
  const input = await readFile(
    require.resolve('./__fixtures__/Hello.astro'),
    'utf8',
  )
  t.deepEqual(await extract(input), ['t`Hello World`'])
})
