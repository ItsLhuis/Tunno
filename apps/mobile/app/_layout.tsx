import "expo-dev-client"

import { useCallback, useEffect, useState } from "react"

import { useColorScheme, View } from "react-native"

import { useColorTheme } from "@hooks/useColorTheme"

import { useFonts } from "expo-font"

import migrations from "@migrations/migrations"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { migrate } from "drizzle-orm/expo-sqlite/migrator"
import { openDatabaseSync } from "expo-sqlite"

import { databaseName } from "@database/client"

import { SystemBars } from "react-native-edge-to-edge"

import * as SystemUI from "expo-system-ui"

import * as SplashScreen from "expo-splash-screen"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { Toaster } from "@components/ui"

import { Stack } from "expo-router"

import { enableFreeze, enableScreens } from "react-native-screens"

enableScreens()
enableFreeze()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { colors, isThemeChanging } = useColorTheme()

  SystemUI.setBackgroundColorAsync(colors.background)

  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf")
  })

  const prepareApp = async (): Promise<void> => {
    await migrate(drizzle(openDatabaseSync(databaseName)), migrations)
  }

  useEffect(() => {
    if (fontsLoaded) prepareApp().then(() => setIsAppReady(true))
  }, [fontsLoaded])

  const onChildrenLayout = useCallback(() => {
    if (isAppReady) SplashScreen.hide()
  }, [isAppReady])

  const themeScheme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme

  const theme = {
    ...themeScheme,
    colors: {
      ...themeScheme.colors,
      background: colors.background
    }
  }

  if (isThemeChanging || !isAppReady) return null

  return (
    <ThemeProvider value={theme}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
        <BottomSheetModalProvider>
          <SystemBars style="auto" />
          <View onLayout={onChildrenLayout} style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="drive" options={{ headerShown: false }} />
            </Stack>
          </View>
          <Toaster />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
