import parser from 'gettext-parser'

import { PoEntry, escapeMsgId } from './PoEntry.js'

export function keys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

export function createPoEntries(input: string): PoEntry[] {
  const res = parser.po.parse(input)
  const defaultContextMessages = res.translations['']

  if (!defaultContextMessages) {
    return []
  }

  return keys(defaultContextMessages).map((msgid) => {
    const trans = defaultContextMessages[msgid] as parser.GetTextTranslation
    return {
      msgid: escapeMsgId(trans.msgid),
      msgstr: escapeMsgId(trans.msgstr[0] as string),
      comments: [],
    }
  })
}
