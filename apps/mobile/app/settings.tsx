import { Fragment, useCallback, useRef } from "react"

import { useAppStore } from "@stores/app"

import { size } from "@constants/font"
import { borderRadius, iconSize, spacing } from "@constants/styles"
import Constants from "@constants/expo"

import { signIn, signOut } from "@utils/google"

import { BackIcon } from "@components/navigation"
import { Button, Image, List, BottomSheet, View, ListItemText } from "@components/ui"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

import { SettingButton } from "@features/settings/components"

type Setting = {
  id: string
  title?: string
  description?: string
  onPress?: () => void
}

export default function Settings() {
  const { user } = useAppStore()

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

  return (
    <Fragment>
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
                  cachePolicy="memory-disk"
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
              item.id === "1" && user ? (
                <Button title="Log Out" onPress={handleOpenBottomSheet} />
              ) : undefined
            }
          />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
      />
      <BottomSheet ref={bottomSheetModalRef}>
        <View
          style={{
            flex: 1,
            gap: spacing.medium,
            paddingBottom: spacing.small,
            paddingHorizontal: spacing.medium
          }}
        >
          <ListItemText
            title="Log Out"
            titleProps={{ style: { fontSize: size.medium, textAlign: "center" } }}
            description="Are you sure you want to log out? Once logged out, you won't be able to sync data to the cloud."
            descriptionProps={{ style: { textAlign: "center" } }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: spacing.small
            }}
          >
            <Button
              containerStyle={{ flex: 1 }}
              style={{ width: "100%" }}
              title="Cancel"
              color="secondary"
              onPress={handleCloseBottomSheet}
            />
            <Button
              containerStyle={{ flex: 1 }}
              style={{ width: "100%" }}
              title="Log Out"
              onPress={() => {
                signOut().then(() => handleCloseBottomSheet())
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </Fragment>
  )
}
