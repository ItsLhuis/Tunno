import { Stack } from "expo-router"

import { useTheme } from "@styles"

export default function AlbumsLayout() {
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="insert" />
      <Stack.Screen name="[id]/update" />
    </Stack>
  )
}
