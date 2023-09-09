import test from 'ava'
import { extract } from './extract'

test('test', (t) => {
  t.is(extract('t`Hello`'), 'Hello')
})
