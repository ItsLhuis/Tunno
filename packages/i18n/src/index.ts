import { type TFunction as I18nTFunction } from "i18next"

import i18n from "./config"

export * from "./hooks"
export * from "./locales"
export * from "./resources"
export * from "./types"
export { i18n }

/**
 * Re-exports the i18next TFunction type, specifically for the "translation" namespace.
 * This provides a strongly typed translation function for use throughout the application.
 */
export type TFunction = I18nTFunction<"translation">
