import React, { useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useFetchSongsWithRelations } from "@features/songs/hooks/useFetchSongsWithRelations"

import { useCreateSong } from "@features/songs/hooks/useCreateSong"

import { theme } from "@styles/theme"

import { Image, View } from "react-native"

import LottieView from "lottie-react-native"

import { BackButton, FadingScreen } from "@components/navigation"
import {
  Header,
  IconButton,
  LargeHeader,
  LargeHeaderSubtitle,
  LegendListWithHeaders,
  ListItemText,
  Text,
  TextInput
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

export default function Songs() {
  const { colors } = useColorTheme()

  const [name, setName] = useState("")

  const { data: songs } = useFetchSongsWithRelations()

  const { mutate } = useCreateSong()

  return (
    <FadingScreen style={{ flex: 1 }}>
      <LegendListWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerLeft={<BackButton />}
            headerCenter={
              <Text variant="bold" size="large">
                Songs
              </Text>
            }
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="bold" size="xxxLarge">
              Songs
            </Text>
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle style={{ gap: theme.styles.spacing.medium }}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Artist Name"
              value={name}
              onChangeText={setName}
            />
            <IconButton name="Plus" onPress={() => mutate({ name, duration: 0 })} />
          </LargeHeaderSubtitle>
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.styles.spacing.large,
          paddingBottom: theme.styles.spacing.large
        }}
        data={songs ?? []}
        extraData={songs}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: theme.styles.spacing.medium,
              borderRadius: theme.styles.borderRadius.xSmall,
              backgroundColor: colors.secondary,
              borderWidth: theme.styles.border.thin,
              borderColor: colors.muted,
              marginBottom:
                index % 1 === 0 && index !== (songs?.length ?? 0) - 1
                  ? theme.styles.spacing.medium
                  : 0
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?cs=tinysrgb&w=2400&h=1200"
              }}
              style={{
                width: theme.styles.image.size.large,
                height: theme.styles.image.size.large,
                borderRadius: theme.styles.borderRadius.xSmall
              }}
            />
            <ListItemText
              style={{ marginHorizontal: theme.styles.spacing.small }}
              title={item.name}
              description={String(item.duration)}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        recycleItems
        getEstimatedItemSize={() => 130}
        estimatedItemSize={130}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LottieView
              autoPlay
              loop
              source={require("@assets/lotties/Load.json")}
              style={{ width: "100%", height: "100%", maxHeight: theme.styles.image.size.xLarge }}
            />
          </View>
        }
      />
    </FadingScreen>
  )
}
