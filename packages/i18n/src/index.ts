import { type TFunction as I18nTFunction } from "i18next"

import i18n from "./config"

export * from "./hooks"
export * from "./locales"
export * from "./resources"
export * from "./types"
export { i18n }

export type TFunction = I18nTFunction<"translation">
