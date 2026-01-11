import i18n from "i18next"
import ICU from "i18next-icu"
import { initReactI18next } from "react-i18next"

import { getTranslationResources } from "./resources"

import { Locales, type LocaleKeys } from "./locales"

import { type Translations } from "./types"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"
    resources: {
      translation: Translations
    }
  }
}

/**
 * Configures and initializes the i18n instance using i18next and react-i18next.
 * Sets up translation resources, default language, fallback language, and interpolation options.
 */
i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    resources: getTranslationResources(),
    lng: "en",
    fallbackLng: "en",
    supportedLngs: Object.keys(Locales) as LocaleKeys[],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
