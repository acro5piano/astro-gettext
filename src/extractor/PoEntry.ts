export type PoEntry = {
  comments: string[]
  msgid: string
  msgstr: string
}

export function escapeMsgId(raw: string) {
  return raw.replace(/"/g, '\\"')
}
