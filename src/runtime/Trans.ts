import parser from 'gettext-parser'

export class Trans<T extends string> {
  locales: { [key in T]?: parser.GetTextTranslations }
  poCache: { [key in T]?: string }

  constructor() {
    this.locales = {}
    this.poCache = {}
  }

  addLocale(locale: T, po: string) {
    if (this.poCache[locale] === po) {
      return
    }
    this.poCache[locale] = po
    this.locales[locale] = parser.po.parse(po)
  }

  get(locale: T) {
    const t = (...text: any) => {
      const l = this.locales[locale]?.['translations']['']
      if (!l) {
        console.warn(
          `Missing locale: ${locale}. Did you forget to call "addLocale" method?`,
        )
      }
      return l?.[text]?.['msgstr']?.[0] || text[0][0] // fallback to the primary text
    }
    return t
  }
}
