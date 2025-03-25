import { useTranslation as useI18nTranslation } from "react-i18next"

import i18n from "./config"

import { locales } from "./resources"

export type UseTranslationState = {
  t: typeof i18n.t
  i18n: typeof i18n
  ready: boolean
  locales: typeof locales
}

export const useTranslation = (): UseTranslationState => {
  const { t, i18n, ready } = useI18nTranslation()

  return {
    t,
    i18n,
    ready,
    locales
  }
}
