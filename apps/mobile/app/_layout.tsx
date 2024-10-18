import { StatusBar } from "expo-status-bar"

import { useEffect, useState } from "react"

import { useColorScheme } from "@hooks/useColorScheme"

import { useThemeColor } from "@hooks/useThemeColor"

import { useFonts } from "expo-font"

import { Splash } from "@components/screens"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"

import { Stack } from "expo-router"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const colors = useThemeColor()

  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Bold": require("@assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("@assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("@assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("@assets/fonts/SpaceGrotesk-Light.ttf")
  })

  useEffect(() => {
    if (fontsLoaded) return

    setTimeout(() => {
      setIsAppReady(true)
    }, 1000)
  }, [fontsLoaded])

  const themeScheme = colorScheme === "dark" ? DarkTheme : DefaultTheme

  const theme = {
    ...themeScheme,
    colors: {
      ...themeScheme.colors,
      background: colors.background
    }
  }

  return (
    <Splash isAppLoaded={isAppReady}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
        <ThemeProvider value={theme}>
          <StatusBar translucent style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="downloads" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Splash>
  )
}
