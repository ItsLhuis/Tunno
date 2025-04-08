import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTranslation } from "@i18n/hooks"

import { theme } from "@styles/theme"

import { useWindowDimensions, View } from "react-native"

import { FadingScreen } from "@components/navigation"
import {
  ActivityIndicator,
  FadingView,
  FlashListWithHeaders,
  Header,
  Icon,
  IconButton,
  LargeHeader,
  LargeHeaderSubtitle,
  ListItemText,
  Pressable,
  SearchInput,
  Text
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { router } from "expo-router"

type Playlist = {
  id: string
  name: string
}

const playlists = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Playlists() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const { width } = useWindowDimensions()

  const minItemSize = 150
  const itemSpacing = theme.styles.spacing.medium
  const availableWidth = width - theme.styles.spacing.large * 2

  const numColumns = Math.max(1, Math.floor(availableWidth / (minItemSize + itemSpacing)))
  const itemSize = (availableWidth - (numColumns - 1) * itemSpacing) / numColumns

  const [data, setData] = useState<Playlist[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(playlists)
    }, 200)
  }, [])

  return (
    <FadingScreen style={{ flex: 1 }}>
      <FlashListWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                {t("playlists.title")}
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
                {t("playlists.title")}
              </Text>
            </View>
            <IconButton name="More" />
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle>
            <SearchInput placeholder="Search" />
          </LargeHeaderSubtitle>
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        contentContainerStyle={{
          paddingHorizontal: theme.styles.spacing.large,
          paddingBottom: theme.styles.spacing.large
        }}
        data={data}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              paddingTop: index >= numColumns ? itemSpacing : 0,
              paddingLeft: index % numColumns ? itemSpacing / 2 : 0,
              paddingRight: index % numColumns ? 0 : itemSpacing / 2
            }}
          >
            <Pressable style={{ gap: theme.styles.spacing.xxSmall }}>
              <View
                style={{
                  width: itemSize,
                  height: itemSize,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: theme.styles.spacing.small,
                  borderRadius: theme.styles.borderRadius.xSmall,
                  backgroundColor: colors.muted
                }}
              >
                <Icon color={colors.mutedForeground} name="List" size={itemSize / 3} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: theme.styles.spacing.small
                }}
              >
                <ListItemText title={item.name} description={item.id} />
                <IconButton name="More" />
              </View>
            </Pressable>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={itemSize + 32}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        }
      />
    </FadingScreen>
  )
}
