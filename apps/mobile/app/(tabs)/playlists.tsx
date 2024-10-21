import { AppBar, IconButton } from "@components/ui"

import { router } from "expo-router"

export default function Playlists() {
  return (
    <AppBar
      title="Playlists"
      renderLeft={() => {
        return <IconButton name="download-outline" onPress={() => router.push("/downloads")} />
      }}
      renderRight={() => {
        return <IconButton name="settings-outline" onPress={() => router.push("/settings")} />
      }}
    />
  )
}
