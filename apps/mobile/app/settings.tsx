import { useStorage } from "@storage/useStorage"

import { borderRadius, iconSize } from "@constants/styles"

import { BackIcon } from "@components/navigation"
import { Button, Image, List } from "@components/ui"

import { SettingButton } from "@features/settings/components"

import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin"

type Setting = {
  id: string
  title?: string
  description?: string
  onPress?: () => void
}

export default function Settings() {
  const { user, setUser } = useStorage()

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setUser(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut()
      setUser(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const data: Setting[] = [
    {
      id: "1",
      title: "Sign In",
      description: "Authenticate to enable cloud backups",
      onPress: () => signIn()
    },
    {
      id: "2",
      title: "Music",
      description: "Settings related to music playback, including audio preferences and playlists"
    },
    {
      id: "3",
      title: "General",
      description: "General app settings, such as language and notification preferences"
    },
    {
      id: "4",
      title: "Multimedia",
      description: "Adjustments for multimedia, such as video quality and image display settings"
    }
  ]

  return (
    <List
      contentContainerStyle={{ paddingHorizontal: 0 }}
      headerProps={{
        isAnimated: true,
        hideSearch: true,
        title: "Settings",
        renderLeft: () => {
          return <BackIcon />
        }
      }}
      hasPlayer={false}
      data={data}
      renderItem={({ item }) => (
        <SettingButton
          disabled={item.id === "1" && user ? true : false}
          onPress={item.onPress}
          title={item.id === "1" && user ? user?.user.name : item.title}
          description={item.id === "1" && user ? user?.user.email : item.description}
          renderLeft={
            item.id === "1" ? (
              <Image
                style={{
                  width: iconSize.xxLarge,
                  height: iconSize.xxLarge,
                  borderRadius: borderRadius.round
                }}
                source={
                  user && user.user.photo
                    ? { uri: user.user.photo }
                    : require("@assets/images/google.png")
                }
              />
            ) : undefined
          }
          renderRight={
            item.id === "1" && user && user.user.photo ? (
              <Button title="Log Out" onPress={signOut} />
            ) : undefined
          }
        />
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  )
}
