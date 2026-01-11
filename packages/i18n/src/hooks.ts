import { useTranslation as useI18nTranslation } from "react-i18next"

import i18n from "./config"

import { locales } from "./resources"

/**
 * Represents the state returned by the `useTranslation` hook.
 * Provides access to the translation function, i18n instance, readiness state, and available locales.
 */
export type UseTranslationState = {
  t: typeof i18n.t
  i18n: typeof i18n
  ready: boolean
  locales: typeof locales
}

/**
 * A custom hook that provides translation functionalities and locale information.
 * It wraps `react-i18next`'s `useTranslation` and exposes additional locale data.
 *
 * @returns An object containing the translation function, i18n instance, readiness state, and available locales.
 */
export function useTranslation(): UseTranslationState {
  const { t, i18n, ready } = useI18nTranslation()

  return {
    t,
    i18n,
    ready,
    locales
  }
}
