import Constants from "expo-constants"
import { ExpoConfig as DefaultExpoConfig } from "@expo/config"

type ExtraConfig = {
  env: {
    EXPO_PUBLIC_GOOGLE_CLIENT_ID: string
  }
}

type ExpoConfig = {
  expoConfig: {
    extra: ExtraConfig
  }
} & DefaultExpoConfig

type NewConstants = typeof Constants & ExpoConfig

export default Constants as NewConstants
