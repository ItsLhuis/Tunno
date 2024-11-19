import "expo-dev-client"

import { useState, useEffect, useCallback } from "react"

import { useColorScheme, Platform } from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { useFonts } from "expo-font"

import { useAppStore } from "@stores/app"

import { initializeAppDirectories } from "@utils/app"

import { initializeGoogleSignin } from "@utils/google"

import { StatusBar } from "expo-status-bar"

import * as SystemUI from "expo-system-ui"

import * as SplashScreen from "expo-splash-screen"

import * as NavigationBar from "expo-navigation-bar"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { View } from "@components/ui"

import { Stack } from "expo-router"

SplashScreen.preventAutoHideAsync()

const configureNavigationBar = async () => {
  if (Platform.OS === "android") {
    await NavigationBar.setPositionAsync("absolute")
    await NavigationBar.setBackgroundColorAsync("#ffffff00")
  }
}

export default function RootLayout() {
  const { colors, isThemeChanging } = useThemeColor()

  SystemUI.setBackgroundColorAsync(colors.background)

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
    await configureNavigationBar()
  }

  useEffect(() => {
    if (fontsLoaded) {
      prepareApp().then(() => setIsAppReady(true))
    }
  }, [fontsLoaded])

  const onChildrenLayout = useCallback(() => {
    if (isAppReady) {
      SplashScreen.hide()
    }
  }, [isAppReady])

  const themeScheme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme

  const theme = {
    ...themeScheme,
    colors: {
      ...themeScheme.colors,
      background: colors.background
    }
  }

  if (isThemeChanging) return null

  if (!isAppReady) return null

  return (
    <ThemeProvider value={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar translucent />
          <View onLayout={onChildrenLayout} style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="drive" options={{ headerShown: false }} />
            </Stack>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
