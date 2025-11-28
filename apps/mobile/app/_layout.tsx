import "expo-dev-client"

import { useCallback, useEffect, useLayoutEffect, useState } from "react"

import { Linking, View } from "react-native"

import { useFonts } from "expo-font"

import { useAllStoresHydrated } from "@utils/stores"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import "@repo/i18n"
import { useTranslation } from "@repo/i18n"

import * as Updates from "expo-updates"

import { initializeStorage } from "@services/storage"

import { databaseName } from "@database/client"
import migrations from "@migrations/migrations"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { migrate } from "drizzle-orm/expo-sqlite/migrator"
import { openDatabaseSync } from "expo-sqlite"

import { SystemBars } from "react-native-edge-to-edge"

import * as SystemUI from "expo-system-ui"

import * as SplashScreen from "expo-splash-screen"

import { queryClient } from "@lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"

import { ThemeProvider, useTheme } from "@styles"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { KeyboardProvider } from "react-native-keyboard-controller"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { Toaster } from "@components/ui"

import { Stack } from "expo-router"

import { enableFreeze, enableScreens } from "react-native-screens"

enableScreens()
enableFreeze()

SplashScreen.preventAutoHideAsync()

function Main() {
  const { theme } = useTheme()

  const [isAppReady, setIsAppReady] = useState(false)

  const allStoresHydrated = useAllStoresHydrated()

  const { i18n } = useTranslation()

  const { language } = useSettingsStore(
    useShallow((state) => ({
      language: state.language
    }))
  )

  const { isUpdatePending, isUpdateAvailable } = Updates.useUpdates()

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf")
  })

  useLayoutEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background)
  }, [theme.colors.background])

  const prepareApp = async (): Promise<void> => {
    await initializeStorage()
    await migrate(drizzle(openDatabaseSync(databaseName)), migrations)
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    const checkForUpdates = async () => {
      if (isUpdateAvailable) await Updates.fetchUpdateAsync()
    }

    checkForUpdates()
  }, [isUpdateAvailable])

  useEffect(() => {
    if (isAppReady || isUpdatePending || !allStoresHydrated || !fontsLoaded) return

    const startApp = async () => {
      await prepareApp()
      setIsAppReady(true)
    }

    startApp()
  }, [isUpdatePending, allStoresHydrated, fontsLoaded])

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

  if (!allStoresHydrated || !isAppReady) return null

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          <SystemBars style="auto" />
          <View onLayout={onChildrenLayout} style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
            </Stack>
          </View>
          <Toaster />
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
