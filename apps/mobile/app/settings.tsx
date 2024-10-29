import { useStorage } from "@storage/useStorage"

import { spacing } from "@constants/styles"

import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text, View } from "@components/ui"

export default function Settings() {
  const { appDirectory, backupsDirectory, isLoggedIn, setIsLoggedIn, clear } = useStorage()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.medium,
        gap: spacing.medium
      }}
    >
      <Button title="Limpar Tudo" onPress={() => clear()} />
      <View
        style={{
          alignItems: "center",
          gap: spacing.small,
          borderWidth: 2,
          borderColor: "red",
          padding: spacing.medium
        }}
      >
        <Text>AppDirectory - {appDirectory}</Text>
        <Text>BackupsDirectory - {backupsDirectory}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          gap: spacing.small,
          borderWidth: 2,
          borderColor: "red",
          padding: spacing.medium
        }}
      >
        <View style={{ flexDirection: "row", gap: spacing.small }}>
          <Button title="Definir" onPress={() => setIsLoggedIn(!isLoggedIn)} />
          <Button title="Limpar" onPress={() => setIsLoggedIn(false)} />
        </View>
        <Text>Logged In: {isLoggedIn ? "Yes" : "No"}</Text>
      </View>
    </SafeAreaView>
  )
}
