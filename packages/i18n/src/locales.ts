import { danish } from "./locales/da"
import { german } from "./locales/de"
import { english } from "./locales/en"
import { spanish } from "./locales/es"
import { finnish } from "./locales/fi"
import { french } from "./locales/fr"
import { hindi } from "./locales/hi"
import { italian } from "./locales/it"
import { japanese } from "./locales/ja"
import { korean } from "./locales/ko"
import { dutch } from "./locales/nl"
import { norwegian } from "./locales/no"
import { polish } from "./locales/pl"
import { portuguese } from "./locales/pt"
import { russian } from "./locales/ru"
import { swedish } from "./locales/sv"
import { turkish } from "./locales/tr"
import { ukrainian } from "./locales/uk"
import { vietnamese } from "./locales/vi"
import { chinese } from "./locales/zh"

import { type Language } from "./types"

export const Locales = {
  da: danish,
  de: german,
  en: english,
  es: spanish,
  fi: finnish,
  fr: french,
  hi: hindi,
  it: italian,
  ja: japanese,
  ko: korean,
  nl: dutch,
  no: norwegian,
  pl: polish,
  pt: portuguese,
  ru: russian,
  sv: swedish,
  tr: turkish,
  uk: ukrainian,
  vi: vietnamese,
  zh: chinese
} as const

export type LocaleKeys = keyof typeof Locales

export const getLocales = (): { [key in LocaleKeys]: Language } => {
  const result: { [key in LocaleKeys]: Language } = {} as { [key in LocaleKeys]: Language }

  for (const key in Locales) {
    const language = Locales[key as keyof typeof Locales]
    result[key as LocaleKeys] = language
  }

  return result
}
