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

/**
 * A constant object containing all supported locale configurations.
 * Each key is a locale code, and its value is the corresponding Language object.
 */
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

/**
 * Type representing all possible locale keys (e.g., "en", "es").
 */
export type LocaleKeys = keyof typeof Locales

/**
 * Returns an object containing all supported locale configurations.
 * This function ensures that the `Locales` object is correctly typed
 * when accessed programmatically.
 *
 * @returns A record where keys are `LocaleKeys` and values are `Language` objects.
 */
export const getLocales = (): { [key in LocaleKeys]: Language } => {
  const result: { [key in LocaleKeys]: Language } = {} as { [key in LocaleKeys]: Language }

  for (const key in Locales) {
    const language = Locales[key as keyof typeof Locales]
    result[key as LocaleKeys] = language
  }

  return result
}
