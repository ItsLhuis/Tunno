import { ConfigPlugin, withStringsXml, AndroidConfig, withAndroidStyles } from "expo/config-plugins"

export const withSplashScreen: ConfigPlugin = (config) => {
  config = withStringsXml(config, (modConfig) => {
    modConfig.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          _: "true",
          $: {
            name: "expo_splash_screen_status_bar_translucent",
            translatable: "false"
          }
        }
      ],
      modConfig.modResults
    )
    return modConfig
  })

  config = withAndroidStyles(config, async (modConfig) => {
    modConfig.modResults = AndroidConfig.Styles.assignStylesValue(modConfig.modResults, {
      add: true,
      name: "android:windowIsTranslucent",
      value: "true",
      parent: {
        name: "Theme.App.SplashScreen",
        parent: "AppTheme"
      }
    })
    return modConfig
  })

  return config
}
