import { PoEntry } from './PoEntry'
import parser from 'gettext-parser'

export function keys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

export function createPoEntries(input: string): PoEntry[] {
  const res = parser.po.parse(input)
  const defaultContextMessages = res.translations['']

  if (!defaultContextMessages) {
    return []
  }

  console.log(JSON.stringify(res, null, 2))

  return keys(defaultContextMessages).map((msgid) => {
    const trans = defaultContextMessages[msgid] as parser.GetTextTranslation
    const comments: string[] = []
    if (trans.comments?.translator) {
      comments.push(
        ...trans.comments.translator.split('\n').map((c) => `#: ${c}`),
      )
    }
    return {
      msgid: trans.msgid,
      msgstr: trans.msgstr[0] as string,
      comments,
    }
  })
}
