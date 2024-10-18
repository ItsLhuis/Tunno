import React from "react"

import { useBottomTabBarHeight } from "@hooks/useBottomTabBarHeight"

import { useThemeColor } from "@hooks/useThemeColor"

import { family, size } from "@constants/font"
import { spacing, elevation, border, borderRadius } from "@constants/styles"

import { Tabs } from "expo-router"

import { View, Text, Icon, Pressable } from "@components/ui"

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
          tabBarActiveTintColor: colors.primary,
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
      <Pressable
        style={{
          position: "absolute",
          bottom: bottomTabBarHeight + spacing.large,
          left: spacing.large,
          right: spacing.large,
          padding: spacing.medium,
          borderRadius: borderRadius.small,
          backgroundColor: "#fc3c44"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.xSmall
          }}
        >
          <View
            style={{
              padding: spacing.large,
              borderRadius: borderRadius.xSmall,
              backgroundColor: "#ECEDEE"
            }}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text variant="bold" style={{ color: "#ECEDEE" }} numberOfLines={1}>
              Overlay Content
            </Text>
            <Text
              style={{ fontSize: size.xSmall, color: "#ECEDEE", opacity: 0.8 }}
              numberOfLines={1}
            >
              Overlay Content
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xSmall
            }}
          >
            <Icon name="play-back" style={{ color: "#ECEDEE" }} />
            <Icon name="play" style={{ color: "#ECEDEE" }} />
            <Icon name="play-forward" style={{ color: "#ECEDEE" }} />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
