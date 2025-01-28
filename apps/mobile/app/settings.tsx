import { Fragment, useCallback, useRef } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAppStore } from "@stores/app"

import { fontSize } from "@constants/font"
import { borderRadius, iconSize, spacing } from "@constants/styles"

import { signIn, signOut } from "@utils/google"

import { View } from "react-native"

import {
  BackButton,
  Button,
  Image,
  ScrollViewWithHeaders,
  Header,
  LargeHeader,
  BottomSheet,
  ListItemText,
  Text
} from "@components/ui"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

import { SettingButton } from "@features/settings/components"

type Setting = {
  id: string
  title?: string
  description?: string
  onPress?: () => void
}

export default function Settings() {
  const insets = useSafeAreaInsets()

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
      <ScrollViewWithHeaders
        HeaderComponent={({ showHeader }) => (
          <Header
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                Settings
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader style={{ paddingBottom: spacing.small }}>
            <Text variant="bold" size="xxxLarge" numberOfLines={1}>
              Settings
            </Text>
          </LargeHeader>
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: insets.bottom }}
      >
        <View style={{ paddingTop: spacing.medium, gap: spacing.large }}>
          {data.map((item, index) => (
            <SettingButton
              key={item.id}
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
          ))}
        </View>
      </ScrollViewWithHeaders>
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
            titleProps={{ style: { fontSize: fontSize.medium, textAlign: "center" } }}
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
