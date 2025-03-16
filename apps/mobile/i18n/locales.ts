import { german } from "./locales/de"
import { english } from "./locales/en"
import { spanish } from "./locales/es"
import { french } from "./locales/fr"
import { italian } from "./locales/it"
import { japanese } from "./locales/ja"
import { korean } from "./locales/ko"
import { portuguese } from "./locales/pt"
import { russian } from "./locales/ru"
import { chinese } from "./locales/zh"

import { type Language } from "./types"

export const Locales = {
  de: german,
  en: english,
  es: spanish,
  fr: french,
  it: italian,
  ja: japanese,
  ko: korean,
  pt: portuguese,
  ru: russian,
  zh: chinese
} as const

export type LocaleKeys = keyof typeof Locales

export const getLanguages = (): { [key in LocaleKeys]: Language } => {
  const result: { [key in LocaleKeys]: Language } = {} as { [key in LocaleKeys]: Language }

  for (const key in Locales) {
    const language = Locales[key as keyof typeof Locales]
    result[key as LocaleKeys] = language
  }

  return result
}
