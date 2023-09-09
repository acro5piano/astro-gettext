import { PoEntry } from './PoEntry.js'

export function renderPo(entries: PoEntry[]): string {
  let result = ''
  for (const entry of entries) {
    result += entry.comments.join('\n')
    result += `\nmsgid "${entry.msgid}"`
    result += `\nmsgstr "${entry.msgstr}"`
    result += `\n`
    result += `\n`
  }
  return result.trim()
}
