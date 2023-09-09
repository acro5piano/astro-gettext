import { globby } from 'globby'
import { extract } from './extract'
import { renderPo } from './renderPo'
import { createPoEntries } from './createPoEntries'
import { readFile, writeFile } from 'fs/promises'
import { PoEntry } from './PoEntry'

// 1. render po from exising one
// 2. glob and read and extract all files
// 3. render updated po file
// 4. write out
export async function appendToPoFile(poFilePath: string, pattern: string) {
  const exisingPoFileContent = await readFile(poFilePath, 'utf8')
  let entries: PoEntry[] = createPoEntries(exisingPoFileContent)

  for (const filePath of await globby(pattern)) {
    const astroFile = await readFile(filePath, 'utf8')
    entries = await extract(filePath, astroFile, entries)
  }

  writeFile(poFilePath, renderPo(entries), 'utf8')
}
