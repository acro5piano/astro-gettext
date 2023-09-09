import { parse } from '@astrojs/compiler'
import { is } from '@astrojs/compiler/utils'

import { walkRecursively } from './ast.js'
import { PoEntry } from './PoEntry.js'

export async function extract(
  fileName: string,
  content: string,
  existingEntries: PoEntry[],
): Promise<PoEntry[]> {
  const parseResult = await parse(content, {})
  const fileNameNormalized = fileName.replace('./', '')

  let entries: PoEntry[] = existingEntries.slice()
  walkRecursively(parseResult.ast, (node) => {
    if (!is.text(node)) {
      return
    }

    const match = node.value.trim().match(/t`(.+)`/)
    if (!match) {
      return
    }

    const msgid = match[1]
    if (!msgid) {
      return
    }

    const entry = entries.find((e) => e.msgid === msgid)
    const comment = `#: ${fileNameNormalized}:${node.position!.start.line}`
    if (entry) {
      if (entry.comments.every((c) => c !== comment)) {
        entry.comments.push(comment)
      }
    } else {
      entries.push({
        comments: [comment],
        msgid,
        msgstr: '',
      })
    }
  })

  return entries
}
