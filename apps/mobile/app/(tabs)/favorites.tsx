import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTranslation } from "@i18n/hooks"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
import {
  ActivityIndicator,
  Header,
  Icon,
  IconButton,
  LargeHeader,
  LargeHeaderSubtitle,
  LegendListWithHeaders,
  ListItemText,
  Pressable,
  SearchInput,
  Text
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

type Favorit = {
  id: string
  name: string
}

const favorites = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Favorites() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const { t } = useTranslation()

  const [data, setData] = useState<Favorit[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(favorites)
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
                {t("favorites.title")}
              </Text>
            }
            headerLeft={<IconButton color={colors.primary} name="Shuffle" />}
            headerLeftFadesIn
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
              <IconButton noMargin buttonColor="primary" name="Shuffle" />
              <Text variant="bold" size="xxxLarge" numberOfLines={1} style={{ flex: 1 }}>
                {t("favorites.title")}
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
                <View
                  style={{
                    padding: theme.styles.spacing.medium,
                    borderRadius: theme.styles.borderRadius.xSmall,
                    backgroundColor: colors.muted
                  }}
                >
                  <Icon color={colors.mutedForeground} name="Heart" />
                </View>
                <ListItemText title={item.name} description={item.id} />
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
