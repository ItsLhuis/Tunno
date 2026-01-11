import { getLocales, type LocaleKeys } from "./locales"

import { type Language } from "./types"

/**
 * Retrieves all available locale configurations.
 */
export const locales = getLocales()

/**
 * Organizes translation resources for i18next.
 * Maps each locale code to its corresponding translation object under the "translation" namespace.
 *
 * @returns An object containing translation resources structured for i18next.
 */
export const getTranslationResources = () => {
  const resources: { [key in LocaleKeys]: { translation: Language["translations"] } } = {} as {
    [key in LocaleKeys]: { translation: Language["translations"] }
  }

  for (const code in locales) {
    resources[code as LocaleKeys] = { translation: locales[code as LocaleKeys].translations }
  }

  return resources
}
