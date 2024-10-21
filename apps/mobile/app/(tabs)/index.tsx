import { useState } from "react"

import { spacing } from "@constants/styles"

import { AppBar, Text, View, Button, IconButton } from "@components/ui"

import { router } from "expo-router"

export default function Songs() {
  const [search, setSearch] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <>
      <AppBar
        title="Songs"
        value={search}
        onSearchChange={(text) => setSearch(text)}
        renderLeft={() => {
          return <IconButton name="download-outline" onPress={() => router.push("/downloads")} />
        }}
        renderRight={() => {
          return <IconButton name="settings-outline" onPress={() => router.push("/settings")} />
        }}
      />
      <View
        style={{
          marginHorizontal: spacing.medium + spacing.xSmall,
          gap: spacing.small
        }}
      >
        <Button title="Press!" onPress={() => setIsLoading(!isLoading)} />
        <Button title="Press!" loading={isLoading} onPress={() => setIsLoading(!isLoading)} />
        <Button
          color="secondary"
          title="Press!"
          loading={isLoading}
          onPress={() => setIsLoading(!isLoading)}
        />
        <Button
          color="primary"
          variant="text"
          title="Press!"
          loading={isLoading}
          onPress={() => setIsLoading(!isLoading)}
        />
        <IconButton
          name="musical-note"
          loading={isLoading}
          onPress={() => setIsLoading(!isLoading)}
        />
        <Text>{search}</Text>
      </View>
    </>
  )
}
