import React from "react"

import { useBottomTabBarHeight } from "@hooks/useBottomTabBarHeight"

import { useThemeColor } from "@hooks/useThemeColor"

import { family, size } from "@constants/font"
import { spacing, elevation, border, borderRadius } from "@constants/styles"

import { Tabs } from "expo-router"

import { TouchableOpacity } from "react-native"

import { View, Text } from "@components/ui"

import { TabBarIcon } from "@components/navigation"

export default function TabLayout() {
  const bottomTabBarHeight = useBottomTabBarHeight()

  const colors = useThemeColor()

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarAllowFontScaling: false,
          tabBarStyle: {
            height: bottomTabBarHeight,
            backgroundColor: colors.tabBarBackground,
            elevation: elevation.none,
            borderTopWidth: border.none
          },
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.icon,
          tabBarLabelStyle: {
            fontSize: size.xxSmall,
            fontFamily: family.bold
          },
          headerShown: false
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Songs",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "musical-notes" : "musical-notes-outline"}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "heart" : "heart-outline"} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "list" : "list"} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? "people" : "people-outline"} color={color} />
            )
          }}
        />
      </Tabs>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: bottomTabBarHeight + spacing.large,
          left: spacing.large,
          right: spacing.large,
          padding: spacing.large,
          borderRadius: borderRadius.medium,
          backgroundColor: "#fc3c44"
        }}
      >
        <Text style={{ color: "#ECEDEE" }}>Overlay Content</Text>
      </TouchableOpacity>
    </View>
  )
}
