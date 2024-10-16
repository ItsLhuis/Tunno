import React, { useState, useEffect, useCallback } from "react"

import * as SystemUI from "expo-system-ui"

import { SplashScreen } from "expo-router"

import * as NavigationBar from "expo-navigation-bar"

import { PRIMARY_COLOR } from "@constants/colors"

import Constants from "expo-constants"

import { Platform, StyleSheet, Image, View } from "react-native"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated"

SystemUI.setBackgroundColorAsync(PRIMARY_COLOR)

SplashScreen.preventAutoHideAsync()

const configureNavigationBar = async () => {
  if (Platform.OS === "android") {
    await NavigationBar.setPositionAsync("absolute")
    await NavigationBar.setBackgroundColorAsync("#ffffff00")
  }
}

export type SplashProps = {
  isAppLoaded?: boolean
  children: React.ReactNode
}

export function Splash({ isAppLoaded = true, children }: SplashProps) {
  const opacity = useSharedValue(0)

  const [isAppReady, setIsAppReady] = useState<boolean>(false)
  const [isSplashComplete, setIsSplashComplete] = useState(false)

  const isAppFinished = isAppReady && isAppLoaded

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync()
    } catch (error) {
      setIsAppReady(false)
    } finally {
      configureNavigationBar()
      opacity.value = withTiming(1, { duration: 250 }, () => runOnJS(setIsAppReady)(true))
    }
  }, [])

  useEffect(() => {
    if (isAppFinished) {
      opacity.value = withTiming(0, { duration: 250 }, () => runOnJS(setIsSplashComplete)(true))
    }
  }, [isAppFinished])

  return (
    <View style={{ flex: 1 }}>
      {isAppFinished && children}
      {!isSplashComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Constants?.expoConfig?.splash?.backgroundColor || PRIMARY_COLOR
            },
            animatedStyle
          ]}
        >
          <Image
            style={{
              aspectRatio: 1,
              height: undefined,
              width: "60%",
              resizeMode: "contain"
            }}
            source={require("@assets/images/adaptive-icon.png")}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  )
}
