An Astro i18n library in GNU gettext style. Inspired by [ttag](https://ttag.js.org/)

# Project Status

astro-gettext is still experimental, but covers most of use-cases for simple static websites build with Astro.

# Why

- Astro is awesome. It brings simpler syntax for the static website era.
- I'm a big fan of i18n using GNU gettext pattern.
- There's no such library to combine them. [Lingui still don't support Astro](https://github.com/lingui/js-lingui/issues/1640) (on Sep, 2023)

# Getting Started

## Install

```
npm install --save astro-gettext
```

Or if you use Yarn:

```
yarn add astro-gettext
```

## Implementation

First, you need to declare supported languages.

```ts
// src/locale.ts
import { Trans } from 'astro-gettext'

export const trans = new Trans<'en' | 'ja'>()
```

Then, write your Astro component like this:

```astro
---
// src/pages/index.astro
import { trans } from '../locale'

// You need to implement a logic to retrieve the current language.
// `Astro.url` is a recommended way, but it depends on your environment.
const t = trans.get(Astro.url.includes('ja') ? 'ja' : 'en')
---
<div>
  <h1>{t`Hello World!`}</h1>
</div>
```

Then, extract the text with the CLI:

```sh
npm run astro-gettext extract --po ja.po
```

This will create a new `ja.po` file with all appropriate translation templates for the Japanese language:

```po
# ja.po
#: src/pages/index.astro:8
msgid "Hello World!"
msgstr ""
```

Then update the `.po` file:

```po
# ja.po
#: src/pages/index.astro:8
msgid "Hello World!"
msgstr "こんにちは！"
```

After updating it, convert the `.po` into JSON file:

```sh
npm run astro-gettext po2json --po locales/ja.po --output src/ja.json --pretty
```

It willl produce a json file like this:

```json
{
  "charset": "utf-8",
  "translations": {
    "": {
      "Hello World!": {
        "msgid": "Hello World!",
        "msgstr": ["こんにちは！"]
      }
    }
  }
}
```

Finally, update the locale definition:

```ts
// src/locale.ts
import { Trans } from 'astro-gettext'
import ja from './ja.json' // <--- This

export const trans = new Trans<'en' | 'ja'>()
trans.addLocale('ja', ja) // <--- This
```

Well Done! Then you will see your Astro app is translated, in a manner of gettext.

# Limitations

- SSG only.

# TODO

- [ ] Variable support
- [ ] Context support
- [ ] `ngettext` support
- [ ] Covers `.ts` files using TypeScript compiler API - meaning this library truly become `ttag` replacement.
- [ ] Astro frontend integrations?
