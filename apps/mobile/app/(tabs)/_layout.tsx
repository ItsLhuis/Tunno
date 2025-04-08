import { useEffect } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorTheme } from "@hooks/useColorTheme"

import { useTranslation } from "@i18n/hooks"

import { theme } from "@styles/theme"

import { Tabs } from "expo-router"

import { View } from "react-native"

import { BottomPlayer, Player } from "@features/songs/components"
import { FadingView, Icon, Pressable, Text } from "@components/ui"

import { useSharedValue, withTiming } from "react-native-reanimated"

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  const { colors } = useColorTheme()

  const { t } = useTranslation()

  const opacity = useSharedValue<number>(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => (
          <FadingView opacity={opacity} style={{ backgroundColor: colors.secondary }}>
            {props.state.routes && props.state.routes.length > 0 && <BottomPlayer />}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              {props.state.routes.map((route, index) => {
                const { options } = props.descriptors[route.key]

                const isFocused = props.state.index === index

                const icon = options.tabBarIcon
                  ? options.tabBarIcon({
                      color: isFocused ? colors.primary : colors.mutedForeground,
                      focused: isFocused,
                      size: 24
                    })
                  : null

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
                    containerStyle={{
                      flex: 1
                    }}
                    style={{
                      paddingTop: theme.styles.spacing.small,
                      paddingBottom: theme.styles.spacing.xSmall + insets.bottom,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: theme.styles.spacing.xxSmall
                    }}
                  >
                    {icon}
                    <Text
                      variant="bold"
                      size="xxSmall"
                      style={{
                        color:
                          props.state.index === index ? colors.primary : colors.mutedForeground,
                        paddingHorizontal: theme.styles.spacing.small
                      }}
                      numberOfLines={1}
                    >
                      {options.title}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </FadingView>
        )}
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: colors.background
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("songs.title"),
            tabBarIcon: ({ color }) => <Icon name="Music" color={color} />
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: t("favorites.title"),
            tabBarIcon: ({ color }) => <Icon name="Heart" color={color} />
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: t("playlists.title"),
            tabBarIcon: ({ color }) => <Icon name="List" color={color} />
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: t("artists.title"),
            tabBarIcon: ({ color }) => <Icon name="Users" color={color} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("settings.title"),
            tabBarIcon: ({ color }) => <Icon name="Settings" color={color} />
          }}
        />
      </Tabs>
      <Player />
    </View>
  )
}
