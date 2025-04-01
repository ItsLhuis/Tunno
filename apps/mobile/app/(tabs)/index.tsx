import { useCallback, useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTranslation } from "@i18n/hooks"

import { debounce } from "lodash"

import Fuse from "fuse.js"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
import {
  ActivityIndicator,
  FadingView,
  Header,
  IconButton,
  Image,
  LargeHeader,
  LargeHeaderSubtitle,
  LegendListWithHeaders,
  ListItemText,
  Pressable,
  SearchInput,
  Text
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { router } from "expo-router"

const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("")
}

type Song = {
  id: string
  name: string
  description: string
  thumbnail: any
}

const thumbnails = [
  require("@assets/thumbs/1.jpg"),
  require("@assets/thumbs/2.jpg"),
  require("@assets/thumbs/3.jpg"),
  require("@assets/thumbs/4.jpg"),
  require("@assets/thumbs/5.jpg"),
  require("@assets/thumbs/6.jpg"),
  require("@assets/thumbs/7.jpg")
]

const songs = Array.from({ length: 200 }, (_, i) => ({
  id: `${i}`,
  name: `Item ${i}`,
  description: generateRandomString(10),
  thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)]
}))

const fuse = new Fuse(songs, {
  keys: ["name", "description"]
})

export default function Songs() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const [data, setData] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = useCallback(
    debounce((query) => {
      if (query) {
        const results = fuse.search(query).map(({ item }) => item)
        setData(results)
      } else {
        setData(songs)
      }
    }, 300),
    []
  )

  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    setTimeout(() => {
      setData(songs)
    }, 200)
  }, [])

  return (
    <FadingScreen style={{ flex: 1 }}>
      <LegendListWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                {t("songs.title")}
              </Text>
            }
            headerLeft={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.styles.spacing.medium
                }}
              >
                <IconButton name="Plus" onPress={() => router.push("/database")} />
                <FadingView opacity={showHeader}>
                  <IconButton color="primary" name="Shuffle" />
                </FadingView>
              </View>
            }
            headerRight={<IconButton name="More" />}
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: theme.styles.spacing.small
              }}
            >
              <IconButton noMargin color="primary" variant="contained" name="Shuffle" />
              <Text variant="bold" size="xxxLarge" numberOfLines={1} style={{ flex: 1 }}>
                {t("songs.title")}
              </Text>
            </View>
            <IconButton name="More" />
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle>
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </LargeHeaderSubtitle>
        )}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        contentContainerStyle={{
          paddingHorizontal: theme.styles.spacing.large,
          paddingBottom: theme.styles.spacing.large
        }}
        data={data}
        extraData={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: theme.styles.spacing.xSmall,
                  paddingBottom:
                    index % 1 === 0 && index !== data.length - 1 ? theme.styles.spacing.medium : 0
                }}
              >
                <Image
                  recyclingKey={item.id}
                  style={{
                    borderRadius: theme.styles.borderRadius.xSmall,
                    borderColor: colors.muted,
                    borderWidth: theme.styles.border.thin,
                    height: theme.styles.image.size.xLow,
                    width: theme.styles.image.size.xLow
                  }}
                  source={item.thumbnail}
                />
                <ListItemText
                  title={item.name}
                  description={item.description}
                  descriptionProps={{ numberOfLines: 1 }}
                />
                <IconButton name="More" />
              </View>
            </Pressable>
          </Animated.View>
        )}
        recycleItems
        keyExtractor={(item) => item.id}
        estimatedItemSize={72}
        getEstimatedItemSize={() => 72}
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
