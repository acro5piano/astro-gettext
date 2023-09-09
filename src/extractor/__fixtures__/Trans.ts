import { Trans } from '../../runtime/Trans.js'
export const trans = new Trans<'en' | 'ja'>()
trans.addLocale('ja', {} as any)
export const t = trans.get('ja')
