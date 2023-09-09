import { globby } from 'globby'
import { readFile, writeFile } from 'fs/promises'
import { program } from 'commander'

import { extract } from './extractor/extract.js'
import { renderPo } from './extractor/renderPo.js'
import { createPoEntries } from './extractor/createPoEntries.js'
import { PoEntry } from './extractor/PoEntry.js'

type ExtractOption = {
  po: string
  pattern: string
}

program
  .name('astro-gettext')
  .description('Simple gettext-style i18n solution for Astro')
  .version('0.0.1')

program
  .command('extract')
  .description('Extract astro files into po file')
  .requiredOption('--po <path>', 'po file to output')
  .option('--pattern <pattern>', 'glob pattern to extract', 'src/**/*.astro')
  .action(async (options: ExtractOption) => {
    // 1. render po from exising one
    // 2. glob and read and extract all files
    // 3. render updated po file
    // 4. write out
    const exisingPoFileContent = await readFile(options.po, 'utf8').catch(
      () => '',
    )
    let entries: PoEntry[] = createPoEntries(exisingPoFileContent)

    for (const filePath of await globby(options.pattern)) {
      const astroFile = await readFile(filePath, 'utf8')
      entries = await extract(filePath, astroFile, entries)
    }

    writeFile(options.po, renderPo(entries), 'utf8')
  })

program.parseAsync()
