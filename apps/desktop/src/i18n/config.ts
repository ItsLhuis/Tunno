import i18n from "i18next"
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

i18n.use(initReactI18next).init({
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
