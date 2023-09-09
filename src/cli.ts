import { globby } from 'globby'
import { extract } from './extractor/extract'
import { renderPo } from './extractor/renderPo'
import { createPoEntries } from './extractor/createPoEntries'
import { PoEntry } from './extractor/PoEntry'
import { readFile, writeFile } from 'fs/promises'
import { program } from 'commander'

type ExtractOption = {
  po: string
  pattern: string
}

program
  .command('extract')
  .description('Extract astro files into po file')
  .argument('--po', 'po file to output')
  .argument('--pattern', 'glob pattern to extract', 'src/**/*.astro')
  .action(async (_, options: ExtractOption) => {
    // 1. render po from exising one
    // 2. glob and read and extract all files
    // 3. render updated po file
    // 4. write out
    const exisingPoFileContent = await readFile(options.po, 'utf8')
    let entries: PoEntry[] = createPoEntries(exisingPoFileContent)

    for (const filePath of await globby(options.pattern)) {
      const astroFile = await readFile(filePath, 'utf8')
      entries = await extract(filePath, astroFile, entries)
    }

    writeFile(options.po, renderPo(entries), 'utf8')
  })

program.parseAsync()
