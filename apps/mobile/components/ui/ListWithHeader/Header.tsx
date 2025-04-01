import { useMemo } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorTheme } from "@hooks/useColorTheme"

import {
  type ColorValue,
  type StyleProp,
  useWindowDimensions,
  View,
  type ViewStyle
} from "react-native"

import { theme } from "@/styles/theme"

import { FadingView } from "../FadingView"

import Animated, {
  type DerivedValue,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle
} from "react-native-reanimated"

import { type HeaderProps, type LargeHeaderProps, type LargeHeaderSubtitleProps } from "./types"

export function Header({
  scrollY,
  showHeader,
  headerStyle,
  headerLeft = null,
  headerLeftStyle,
  headerLeftFadesIn,
  headerCenter = null,
  headerCenterStyle,
  headerCenterFadesIn = true,
  headerRight = null,
  headerRightStyle,
  headerRightFadesIn,
  headerBackgroundAnimation = true,
  ignoreTopSafeArea = false,
  bottomBorder = true,
  borderColor,
  borderWidth,
  SurfaceComponent
}: HeaderProps) {
  const insets = useSafeAreaInsets()

  const dimensions = useWindowDimensions()

  const { colors } = useColorTheme()

  const headerCenterExists = !!headerCenter

  const { centerWidth, minSideHeaderWidth } = useMemo(() => {
    const centerWidth = headerCenterExists ? 0.4 * dimensions.width : 0
    const minSideHeaderWidth = (dimensions.width - centerWidth) / 2

    return { centerWidth, minSideHeaderWidth }
  }, [headerCenterExists, dimensions])

  const noHeaderLeftRight = !headerLeft && !headerRight

  const headerBackgroundStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        showHeader.value,
        [0, 1],
        [colors.background, colors.secondary]
      )
    }),
    [colors.background, colors.secondary]
  )

  return (
    <View>
      {SurfaceComponent && SurfaceComponent({ showHeader })}
      <Animated.View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: (ignoreTopSafeArea ? 0 : insets.top) + theme.styles.spacing.large,
            paddingBottom: theme.styles.spacing.large
          },
          headerBackgroundAnimation && headerBackgroundStyle,
          headerStyle
        ]}
      >
        {headerLeftFadesIn ? (
          <FadingView
            opacity={showHeader}
            style={[
              {
                flexDirection: "row",
                paddingLeft: theme.styles.spacing.large,
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
                width: minSideHeaderWidth
              },
              noHeaderLeftRight && { display: "none" },
              headerLeftStyle
            ]}
          >
            {headerLeft}
          </FadingView>
        ) : (
          <View
            style={[
              {
                flexDirection: "row",
                paddingLeft: theme.styles.spacing.large,
                justifyContent: "flex-start",
                alignItems: "center",
                overflow: "hidden",
                width: minSideHeaderWidth
              },
              noHeaderLeftRight && { display: "none" },
              headerLeftStyle
            ]}
          >
            {headerLeft}
          </View>
        )}
        {headerCenter &&
          (headerCenterFadesIn ? (
            <FadingView
              opacity={showHeader}
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  paddingHorizontal: theme.styles.spacing.small,
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: centerWidth
                },
                headerCenterStyle
              ]}
            >
              {headerCenter}
            </FadingView>
          ) : (
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  paddingHorizontal: theme.styles.spacing.small,
                  alignItems: "center",
                  justifyContent: "center",
                  width: centerWidth
                },
                headerCenterStyle
              ]}
            >
              {headerCenter}
            </View>
          ))}
        {headerRightFadesIn ? (
          <FadingView
            opacity={showHeader}
            style={[
              {
                flexDirection: "row-reverse",
                paddingRight: theme.styles.spacing.large,
                alignItems: "center",
                justifyContent: "flex-start",
                overflow: "hidden",
                width: minSideHeaderWidth
              },
              noHeaderLeftRight && { display: "none" },
              headerRightStyle
            ]}
          >
            {headerRight}
          </FadingView>
        ) : (
          <View
            style={[
              {
                flexDirection: "row-reverse",
                paddingRight: theme.styles.spacing.large,
                alignItems: "center",
                justifyContent: "flex-start",
                overflow: "hidden",
                width: minSideHeaderWidth
              },
              noHeaderLeftRight && { display: "none" },
              headerRightStyle
            ]}
          >
            {headerRight}
          </View>
        )}
      </Animated.View>
      {bottomBorder && (
        <HeaderBottomBorder
          opacity={scrollY ? scrollY : showHeader}
          borderColor={borderColor}
          borderWidth={borderWidth}
        />
      )}
    </View>
  )
}
Header.displayName = "Header"

export function HeaderBottomBorder({
  opacity,
  style,
  borderColor,
  borderWidth = theme.styles.border.thin
}: {
  opacity: DerivedValue<0 | 1> | DerivedValue<number> | SharedValue<number>
  style?: StyleProp<ViewStyle>
  borderColor?: ColorValue
  borderWidth?: number
}) {
  const { colors } = useColorTheme()

  const borderBottomStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      backgroundColor: borderColor || colors.muted
    }),
    [borderColor, colors.muted]
  )

  return (
    <Animated.View style={[{ width: "100%" }, borderBottomStyle, { height: borderWidth }, style]} />
  )
}
HeaderBottomBorder.displayName = "HeaderBottomBorder"

export function LargeHeader({ style, children }: LargeHeaderProps) {
  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
LargeHeader.displayName = "LargeHeader"

export function LargeHeaderSubtitle({ style, children }: LargeHeaderSubtitleProps) {
  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: theme.styles.spacing.large
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
LargeHeaderSubtitle.displayName = "LargeHeaderSubtitle"
