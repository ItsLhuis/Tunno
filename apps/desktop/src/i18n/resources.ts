import { getLanguages, type LocaleKeys } from "./locales"

import { type Language } from "./types"

export const languages = getLanguages()

export const getTranslationResources = () => {
  const resources: { [key in LocaleKeys]: { translation: Language["translations"] } } = {} as {
    [key in LocaleKeys]: { translation: Language["translations"] }
  }

  for (const code in languages) {
    resources[code as LocaleKeys] = { translation: languages[code as LocaleKeys].translations }
  }

  return resources
}
