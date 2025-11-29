import { createStyleSheet, useStyles, useTheme } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Tabs } from "expo-router"

import { View } from "react-native"

import { Fade, Icon, Pressable, Text, type IconProps } from "@components/ui"

type RouteIconMap = Record<string, IconProps["name"]>

const routeIcons: RouteIconMap = {
  index: "House",
  songs: "Music",
  albums: "DiscAlbum",
  playlists: "ListMusic",
  artists: "Users"
}

export default function TabLayout() {
  const styles = useStyles(tabLayoutStyles)

  const { theme } = useTheme()

  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Tabs
        tabBar={(props) => (
          <Fade style={styles.tabBar}>
            {/* {props.state.routes && props.state.routes.length > 0 && <BottomPlayer />} */}
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
                    <Text size="xs" weight="bold" color={iconColor} numberOfLines={1}>
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
      {/* <Player /> */}
    </View>
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
