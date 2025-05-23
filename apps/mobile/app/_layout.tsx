import "expo-dev-client"

import { useCallback, useEffect, useState } from "react"

import { Linking, useColorScheme, View } from "react-native"

import { useColorTheme } from "@hooks/useColorTheme"

import { useFonts } from "expo-font"

import { useSettingsStore } from "@stores/useSettingsStore"

import "@repo/i18n"
import { useTranslation } from "@repo/i18n"

import * as Updates from "expo-updates"

import { initializeAppStorage } from "@lib/appStorage"

import { databaseName } from "@database/client"
import migrations from "@migrations/migrations"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { migrate } from "drizzle-orm/expo-sqlite/migrator"
import { openDatabaseSync } from "expo-sqlite"

import TrackPlayer from "react-native-track-player"

import { playback, setupAudioPlayer } from "@services/audio"

import { SystemBars } from "react-native-edge-to-edge"

import * as SystemUI from "expo-system-ui"

import * as SplashScreen from "expo-splash-screen"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from "@react-navigation/native"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { KeyboardProvider } from "react-native-keyboard-controller"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { Toaster } from "@components/ui"

import { Stack } from "expo-router"

import { enableFreeze, enableScreens } from "react-native-screens"

enableScreens()
enableFreeze()

SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playback)

export default function RootLayout() {
  const { colors, isAppThemeChanging } = useColorTheme()

  SystemUI.setBackgroundColorAsync(colors.background)

  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const { hasHydrated, language } = useSettingsStore()

  const { i18n } = useTranslation()

  const { isUpdatePending, isUpdateAvailable } = Updates.useUpdates()

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf")
  })

  const prepareApp = async (): Promise<void> => {
    await initializeAppStorage()
    await migrate(drizzle(openDatabaseSync(databaseName)), migrations)
    await setupAudioPlayer()
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    const checkForUpdates = async () => {
      if (isUpdateAvailable) await Updates.fetchUpdateAsync()
    }

    checkForUpdates()
  }, [isUpdateAvailable])

  useEffect(() => {
    if (isAppReady || isUpdatePending || !hasHydrated || !fontsLoaded) return

    const startApp = async () => {
      await prepareApp()
      setIsAppReady(true)
    }

    startApp()
  }, [isUpdatePending, hasHydrated, fontsLoaded])

  const onChildrenLayout = useCallback(() => {
    if (isAppReady) SplashScreen.hide()
  }, [isAppReady])

  useEffect(() => {
    function deepLinkHandler(data: { url: string }) {
      console.log("deepLinkHandler", data.url)
    }

    const subscription = Linking.addEventListener("url", deepLinkHandler)

    Linking.getInitialURL().then((url) => console.log("getInitialURL", url))

    return () => subscription.remove()
  }, [])

  const themeScheme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme

  const theme: Theme = {
    ...themeScheme,
    colors: {
      ...themeScheme.colors,
      primary: colors.primary,
      background: colors.background,
      text: colors.foreground
    }
  }

  if (isAppThemeChanging || !isAppReady) return null

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <SystemBars style="auto" />
              <View onLayout={onChildrenLayout} style={{ flex: 1 }}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="database" options={{ headerShown: false }} />
                </Stack>
              </View>
              <Toaster />
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
