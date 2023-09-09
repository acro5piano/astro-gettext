import { parse } from '@astrojs/compiler'
import { is } from '@astrojs/compiler/utils'
import { walkRecursively } from './ast'
import { PoEntry } from './PoEntry'

export async function extract(
  fileName: string,
  content: string,
  existingEntries: PoEntry[],
): Promise<PoEntry[]> {
  const parseResult = await parse(content, {})

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

    const existingEntry = entries.find((e) => e.msgid === msgid)
    const comment = `# ${fileName}:${node.position!.start.line}`.replace(
      './',
      '',
    )
    if (existingEntry) {
      if (existingEntry.comments.every((c) => c !== comment)) {
        existingEntry.comments.push(comment)
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
