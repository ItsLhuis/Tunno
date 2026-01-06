import "react-native-get-random-values"

import "intl-pluralrules"

import "expo-dev-client"

import { useCallback, useEffect, useLayoutEffect, useState } from "react"

import { Linking, View } from "react-native"

import { useFonts } from "expo-font"

import { useAllStoresHydrated } from "@utils/stores"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { type ThemeMode } from "@styles"

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

import { createStyleSheet, ThemeProvider, useStyles, useTheme } from "@styles"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { KeyboardProvider } from "react-native-keyboard-controller"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { PortalHost, PortalProvider } from "@gorhom/portal"

import { Toaster } from "@components/ui"

import { Player } from "@features/player/components"

import { Stack } from "expo-router"

import { enableFreeze, enableScreens } from "react-native-screens"

enableScreens()
enableFreeze()

SplashScreen.preventAutoHideAsync()

function Main() {
  const styles = useStyles(mainStyles)

  const { theme } = useTheme()

  const [isAppReady, setIsAppReady] = useState(false)

  const allStoresHydrated = useAllStoresHydrated()

  const { i18n } = useTranslation()

  const { language } = useSettingsStore(
    useShallow((state) => ({
      language: state.language
    }))
  )

  const { playerSheetRef } = usePlayerStore(
    useShallow((state) => ({
      playerSheetRef: state.playerSheetRef
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

  useEffect(() => {
    const handleUrl = (url: string | null) => {
      if (!url) return

      try {
        const urlObj = new URL(url)
        const action = urlObj.searchParams.get("action")

        if (action === "show-player" && playerSheetRef) {
          playerSheetRef.present()
        }
      } catch {}
    }

    const deepLinkHandler = ({ url }: { url: string }) => {
      handleUrl(url)
    }

    const subscription = Linking.addEventListener("url", deepLinkHandler)

    Linking.getInitialURL().then((url) => {
      handleUrl(url)
    })

    return () => subscription.remove()
  }, [playerSheetRef])

  const onChildrenLayout = useCallback(() => {
    if (isAppReady) SplashScreen.hide()
  }, [isAppReady])

  if (!allStoresHydrated || !isAppReady) return null

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardProvider>
        <PortalProvider>
          <BottomSheetModalProvider>
            <SystemBars style="auto" />
            <View onLayout={onChildrenLayout} style={styles.container}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: theme.colors.background }
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="settings" />
              </Stack>
            </View>
            <Toaster />
            <PortalHost name="dialog" />
            <Player />
          </BottomSheetModalProvider>
        </PortalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}

const mainStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export default function RootLayout() {
  const { theme, setTheme } = useSettingsStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme
    }))
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themeMode={theme as ThemeMode} onThemeModeChange={setTheme}>
        <Main />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
