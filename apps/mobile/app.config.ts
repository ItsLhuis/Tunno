import { ConfigContext, ExpoConfig } from "@expo/config"

import { type WithAndroidWidgetsParams } from "react-native-android-widget"

const widgetConfig: WithAndroidWidgetsParams = {
  fonts: [
    "./assets/fonts/SpaceGrotesk-Light.ttf",
    "./assets/fonts/SpaceGrotesk-Regular.ttf",
    "./assets/fonts/SpaceGrotesk-Medium.ttf",
    "./assets/fonts/SpaceGrotesk-Bold.ttf"
  ],
  widgets: [
    {
      name: "MiniPlayer",
      label: "Tunno Player",
      description: "Control your music from the home screen",
      previewImage: "./assets/images/app/icon.png",
      minWidth: "140dp",
      minHeight: "70dp",
      targetCellWidth: 2,
      targetCellHeight: 2,
      maxResizeWidth: "400dp",
      maxResizeHeight: "180dp",
      resizeMode: "horizontal|vertical",
      updatePeriodMillis: 1800000
    }
  ]
}

module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const plugins = config.plugins ?? []
  return {
    ...config,
    plugins: [...plugins, ["react-native-android-widget", widgetConfig]],
    extra: {
      ...config.extra,
      env: {}
    }
  }
}
