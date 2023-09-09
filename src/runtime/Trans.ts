import parser from 'gettext-parser'

export class Trans<T extends string> {
  locales: { [key in T]?: parser.GetTextTranslations }
  poCache: { [key in T]?: string }

  constructor() {
    this.locales = {}
    this.poCache = {}
  }

  addLocaleFromPoString(locale: T, poContent: string) {
    if (this.poCache[locale] === poContent) {
      return
    }
    this.poCache[locale] = poContent
    this.locales[locale] = parser.po.parse(poContent)
  }

  addLocale(locale: T, po: parser.GetTextTranslations) {
    this.locales[locale] = po
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
