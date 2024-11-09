import "expo-dev-client"

import { useEffect, useState } from "react"

import { useColorScheme } from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { useFonts } from "expo-font"

import { useAppStore } from "@stores/app"

import { initializeAppDirectories } from "@utils/app"

import { initializeGoogleSignin } from "@utils/google"

import { StatusBar } from "expo-status-bar"

import { Splash } from "@components/screens"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { Stack } from "expo-router"

export default function RootLayout() {
  const { colors, isThemeChanging } = useThemeColor()

  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf")
  })

  const { appDirectory, backupsDirectory } = useAppStore()

  const prepareApp = async (): Promise<void> => {
    await initializeAppDirectories(appDirectory, backupsDirectory)
    await initializeGoogleSignin()
  }

  useEffect(() => {
    if (fontsLoaded) {
      prepareApp().then(() => setIsAppReady(true))
    }
  }, [fontsLoaded])

  const themeScheme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme

  const theme = {
    ...themeScheme,
    colors: {
      ...themeScheme.colors,
      background: colors.background
    }
  }

  if (isThemeChanging) return null

  return (
    <Splash isAppLoaded={isAppReady}>
      <ThemeProvider value={theme}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
          <BottomSheetModalProvider>
            <StatusBar translucent style="auto" />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="drive" options={{ headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Splash>
  )
}
