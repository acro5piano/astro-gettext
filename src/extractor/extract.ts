import { parse } from '@astrojs/compiler'
import { Node } from '@astrojs/compiler/types'
import { Visitor, is } from '@astrojs/compiler/utils'

import { escapeMsgId, PoEntry } from './PoEntry.js'

function walkRecursively(node: Node, callback: Visitor): void {
  callback(node)
  if (is.parent(node)) {
    for (const child of node.children) {
      walkRecursively(child, callback)
    }
  }
}

function isArrayValue(value: string) {
  return /\[[\s\S]+\]/.test(value)
}

export async function extract(
  fileName: string,
  content: string,
  existingEntries: PoEntry[],
): Promise<PoEntry[]> {
  const parseResult = await parse(content, {})
  const fileNameNormalized = fileName.replace('./', '')

  let entries: PoEntry[] = existingEntries.slice()

  function pushToEntriesIfNeeded(value: string, position: Node['position']) {
    const match = value.trim().match(/t`(.+?)`/)
    if (!match) {
      return
    }
    const msgid = match[1] && escapeMsgId(match[1])
    if (!msgid) {
      return
    }
    const entry = entries.find((e) => e.msgid === msgid)
    const comment = `#: ${fileNameNormalized}:${position!.start.line}`
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
  }

  walkRecursively(parseResult.ast, (node) => {
    if (is.text(node)) {
      pushToEntriesIfNeeded(node.value, node.position)
    }
    if (is.element(node) || is.component(node)) {
      node.attributes.forEach((attr) => {
        if (isArrayValue(attr.value)) {
          const matches = attr.value.match(/t`(.+?)`/g) || []
          for (const match of matches) {
            pushToEntriesIfNeeded(match, attr.position)
          }
        } else {
          pushToEntriesIfNeeded(attr.value, attr.position)
        }
      })
    }
  })

  return entries
}
