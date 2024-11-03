import { useBottomTabBarHeight } from "@hooks/useBottomTabBarHeight"

import { useThemeColor } from "@hooks/useThemeColor"

import { PlayerProvider } from "@contexts/PlayerContext"

import { family, size } from "@constants/font"
import { elevation, border, spacing } from "@constants/styles"

import { Tabs } from "expo-router"

import { View, Icon } from "@components/ui"

import { Player } from "@components/navigation"

export default function TabLayout() {
  const bottomTabBarHeight = useBottomTabBarHeight()

  const { colors } = useThemeColor()

  return (
    <View style={{ flex: 1 }}>
      <PlayerProvider>
        <Tabs
          screenOptions={{
            tabBarAllowFontScaling: false,
            tabBarStyle: {
              height: bottomTabBarHeight,
              borderTopColor: colors.secondary,
              borderTopWidth: border.thin,
              elevation: elevation.none
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.icon,
            tabBarLabelStyle: {
              fontSize: size.xxSmall,
              fontFamily: family.bold
            },
            tabBarIconStyle: { marginBottom: -spacing.xSmall },
            headerShown: false
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Songs",
              tabBarIcon: ({ color, focused }) => (
                <Icon name={focused ? "musical-notes" : "musical-notes-outline"} color={color} />
              )
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: "Favorites",
              tabBarIcon: ({ color, focused }) => (
                <Icon name={focused ? "heart" : "heart-outline"} color={color} />
              )
            }}
          />
          <Tabs.Screen
            name="playlists"
            options={{
              title: "Playlists",
              tabBarIcon: ({ color, focused }) => (
                <Icon name={focused ? "list" : "list"} color={color} />
              )
            }}
          />
          <Tabs.Screen
            name="artists"
            options={{
              title: "Artists",
              tabBarIcon: ({ color, focused }) => (
                <Icon name={focused ? "people" : "people-outline"} color={color} />
              )
            }}
          />
        </Tabs>
        <Player />
      </PlayerProvider>
    </View>
  )
}
