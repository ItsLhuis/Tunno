import { getLocales, type LocaleKeys } from "./locales"

import { type Language } from "./types"

export const locales = getLocales()

export const getTranslationResources = () => {
  const resources: { [key in LocaleKeys]: { translation: Language["translations"] } } = {} as {
    [key in LocaleKeys]: { translation: Language["translations"] }
  }

  for (const code in locales) {
    resources[code as LocaleKeys] = { translation: locales[code as LocaleKeys].translations }
  }

  return resources
}
