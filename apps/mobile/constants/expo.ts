import Constants from "expo-constants"
import { ExpoConfig as DefaultExpoConfig } from "@expo/config"

type ExtraConfig = {
  env: {}
}

type ExpoConfig = {
  expoConfig: {
    extra: ExtraConfig
  }
} & DefaultExpoConfig

type NewConstants = typeof Constants & ExpoConfig

export default Constants as NewConstants
