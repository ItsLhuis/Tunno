import { english } from "./locales/en"
import { spanish } from "./locales/es"
import { french } from "./locales/fr"
import { portuguese } from "./locales/pt"

import { type Language } from "./types"

export const Locales = {
  en: english,
  pt: portuguese,
  es: spanish,
  fr: french
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
