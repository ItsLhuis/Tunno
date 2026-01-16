import "expo-router/entry"

import { registerWidgetTaskHandler } from "react-native-android-widget"

import { widgetTaskHandler } from "./features/player/components/Widget/widgetTaskHandler"

registerWidgetTaskHandler(widgetTaskHandler)
