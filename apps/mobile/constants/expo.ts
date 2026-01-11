import { ExpoConfig as DefaultExpoConfig } from "@expo/config"

import Constants from "expo-constants"

/**
 * Defines the structure for custom extra configuration properties within `app.config.ts`.
 */
type ExtraConfig = {
  env: {}
}

/**
 * Extends the default ExpoConfig type with custom extra configuration properties.
 */
type ExpoConfig = {
  expoConfig: {
    extra: ExtraConfig
  }
} & DefaultExpoConfig

/**
 * Represents the augmented `Constants` object from Expo, including custom extra configuration.
 */
type NewConstants = typeof Constants & ExpoConfig

export default Constants as NewConstants
