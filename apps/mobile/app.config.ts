import { ConfigContext, ExpoConfig } from "@expo/config"

module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const plugins = config.plugins ?? []

  return {
    ...config,
    plugins: [...plugins],
    extra: {
      ...config.extra,
      env: {}
    }
  }
}
