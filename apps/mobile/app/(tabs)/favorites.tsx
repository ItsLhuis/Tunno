import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
import {
  Icon,
  IconButton,
  Text,
  Pressable,
  SearchInput,
  Header,
  LargeHeader,
  LargeHeaderSubtitle,
  FlashListWithHeaders,
  ListItemText,
  ActivityIndicator
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

  const [data, setData] = useState<Favorit[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(favorites)
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
                Favorites
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.small }}>
              <IconButton noMargin buttonColor="primary" name="Shuffle" />
              <Text variant="bold" size="xxxLarge" numberOfLines={1}>
                Favorites
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
                <View
                  style={{
                    padding: spacing.medium,
                    borderRadius: borderRadius.xSmall,
                    backgroundColor: colors.secondary
                  }}
                >
                  <Icon color={colors.placeholder} name="Heart" />
                </View>
                <ListItemText title={item.name} description={item.id} />
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
