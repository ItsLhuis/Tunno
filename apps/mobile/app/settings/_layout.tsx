import { Stack } from "expo-router"

import { useTheme } from "@styles"

export default function SettingsLayout() {
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="appearance" />
      <Stack.Screen name="language" />
      <Stack.Screen name="sync" />
      <Stack.Screen name="about" />
    </Stack>
  )
}
