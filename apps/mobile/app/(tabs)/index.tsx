import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTranslation } from "@i18n/hooks"

import { border, borderRadius, imageSize, spacing } from "@constants/styles"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
import {
  ActivityIndicator,
  FadingView,
  FlashListWithHeaders,
  Header,
  IconButton,
  Image,
  LargeHeader,
  LargeHeaderSubtitle,
  ListItemText,
  Pressable,
  SearchInput,
  Text
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { router } from "expo-router"

type Song = {
  id: string
  name: string
  thumbnail: any
}

const songs = Array.from({ length: 200 }, (_, i) => ({
  id: `${i}`,
  name: `Item ${i}`,
  thumbnail: [
    require("@assets/thumbs/1.jpg"),
    require("@assets/thumbs/2.jpg"),
    require("@assets/thumbs/3.jpg"),
    require("@assets/thumbs/4.jpg"),
    require("@assets/thumbs/5.jpg"),
    require("@assets/thumbs/6.jpg")
  ][Math.floor(Math.random() * 6)]
}))

export default function Songs() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const [data, setData] = useState<Song[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(songs)
    }, 200)
  }, [])

  return (
    <FadingScreen style={{ flex: 1 }}>
      <FlashListWithHeaders
        HeaderComponent={({ showHeader }) => (
          <Header
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                {t("pages.songs.title")}
              </Text>
            }
            headerLeft={
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.medium }}>
                <IconButton name="Plus" onPress={() => router.push("/drive")} />
                <FadingView opacity={showHeader}>
                  <IconButton color={colors.primary} name="Shuffle" />
                </FadingView>
              </View>
            }
            headerRight={<IconButton name="More" />}
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.small }}>
              <IconButton noMargin buttonColor="primary" name="Shuffle" />
              <Text variant="bold" size="xxxLarge" numberOfLines={1}>
                {t("pages.songs.title")}
              </Text>
            </View>
            <IconButton name="More" />
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle style={{ paddingTop: spacing.small }}>
            <SearchInput placeholder="Search" />
          </LargeHeaderSubtitle>
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        contentContainerStyle={{
          paddingHorizontal: spacing.large,
          paddingBottom: spacing.large
        }}
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.xSmall,
                  paddingBottom: index % 1 === 0 && index !== data.length - 1 ? spacing.medium : 0
                }}
              >
                <Image
                  key={item.id}
                  recyclingKey={item.id}
                  containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: borderRadius.xSmall,
                    backgroundColor: colors.muted,
                    borderColor: colors.muted,
                    borderWidth: border.thin
                  }}
                  style={{
                    height: imageSize.xLow,
                    width: imageSize.xLow
                  }}
                  source={item.thumbnail}
                />
                <ListItemText
                  title={item.name}
                  description={item.id}
                  descriptionProps={{ numberOfLines: 1 }}
                />
                <IconButton name="More" />
              </View>
            </Pressable>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={60}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator color={colors.primary} />
          </View>
        }
      />
    </FadingScreen>
  )
}
