import { useEffect } from "react"

import { useWindowDimensions, View } from "react-native"

import { createStyleSheet, useStyles, useTheme } from "@styles"

import { useTranslation } from "@repo/i18n"

import { TabbarProvider, useTabbarLayout } from "@contexts/TabbarContext"

import { BottomPlayerLayoutProvider } from "@features/player/contexts/BottomPlayerLayoutContext"

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Tabs } from "expo-router"

import { BottomPlayer } from "@features/player/components/BottomPlayer"

import { Fade, Icon, Pressable, Text, type IconProps } from "@components/ui"

type RouteIconMap = Record<string, IconProps["name"]>

const routeIcons: RouteIconMap = {
  index: "House",
  songs: "Music",
  albums: "DiscAlbum",
  playlists: "ListMusic",
  artists: "Users"
}

type TabIndicatorProps = {
  activeIndex: number
  tabCount: number
}

function TabIndicator({ activeIndex, tabCount }: TabIndicatorProps) {
  const styles = useStyles(tabIndicatorStyles)

  const { width: screenWidth } = useWindowDimensions()

  const tabWidth = screenWidth / tabCount

  const translateX = useSharedValue(activeIndex * tabWidth)

  useEffect(() => {
    translateX.value = withTiming(activeIndex * tabWidth, {
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    })
  }, [activeIndex, tabWidth])

  const animatedStyle = useAnimatedStyle(() => ({
    width: tabWidth,
    transform: [{ translateX: translateX.value }]
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
    </View>
  )
}

const tabIndicatorStyles = createStyleSheet(({ theme }) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2
  },
  indicator: {
    height: 2,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.radius("full"),
    borderBottomRightRadius: theme.radius("full")
  }
}))

function TabLayoutContent() {
  const styles = useStyles(tabLayoutStyles)

  const { theme } = useTheme()

  const { t } = useTranslation()

  const onLayout = useTabbarLayout()

  return (
    <View style={styles.container}>
      <Tabs
        tabBar={(props) => (
          <Fade style={styles.tabBar} onLayout={onLayout}>
            {props.state.routes && props.state.routes.length > 0 && <BottomPlayer />}
            <TabIndicator activeIndex={props.state.index} tabCount={props.state.routes.length} />
            <View style={styles.tabBarContent}>
              {props.state.routes.map((route, index) => {
                const { options } = props.descriptors[route.key]

                const isFocused = props.state.index === index
                const iconColor = isFocused ? "primary" : "mutedForeground"
                const iconName = routeIcons[route.name]

                const onPress = () => {
                  const event = props.navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true
                  })

                  if (!isFocused && !event.defaultPrevented) {
                    props.navigation.navigate(route.name, route.params)
                  }
                }

                const onLongPress = () => {
                  props.navigation.emit({
                    type: "tabLongPress",
                    target: route.key
                  })
                }

                return (
                  <Pressable
                    onPress={onPress}
                    onLongPress={onLongPress}
                    key={route.key}
                    containerStyle={styles.tabItemContainer}
                    style={styles.tabItem}
                  >
                    {iconName && <Icon name={iconName} color={iconColor} />}
                    <Text
                      size="xs"
                      weight={isFocused ? "bold" : "normal"}
                      color={iconColor}
                      numberOfLines={1}
                    >
                      {options.title}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </Fade>
        )}
        screenOptions={{
          headerShown: false,
          lazy: true,
          freezeOnBlur: true,
          animation: "fade",
          sceneStyle: {
            backgroundColor: theme.colors.background
          }
        }}
        backBehavior="history"
      >
        <Tabs.Screen name="index" options={{ title: t("home.title") }} />
        <Tabs.Screen name="songs" options={{ title: t("songs.title") }} />
        <Tabs.Screen name="albums" options={{ title: t("albums.title") }} />
        <Tabs.Screen name="playlists" options={{ title: t("playlists.title") }} />
        <Tabs.Screen name="artists" options={{ title: t("artists.title") }} />
      </Tabs>
    </View>
  )
}

export default function TabLayout() {
  return (
    <TabbarProvider>
      <BottomPlayerLayoutProvider>
        <TabLayoutContent />
      </BottomPlayerLayoutProvider>
    </TabbarProvider>
  )
}

const tabLayoutStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  tabBar: {
    backgroundColor: theme.colors.tabbar,
    borderTopWidth: theme.borderWidth(),
    borderTopColor: theme.colors.muted
  },
  tabBarContent: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabItemContainer: {
    flex: 1
  },
  tabItem: {
    paddingTop: theme.space(),
    paddingBottom: theme.space() + runtime.insets.bottom,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("xs")
  }
}))
