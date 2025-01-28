import { useMemo } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorTheme } from "@hooks/useColorTheme"

import { useWindowDimensions, View, type StyleProp, type ViewStyle } from "react-native"

import { border, spacing } from "@constants/styles"

import { FadingView } from "../FadingView"

import Animated, { DerivedValue, useAnimatedStyle } from "react-native-reanimated"

import { type HeaderProps, type LargeHeaderProps, type LargeHeaderSubtitleProps } from "./types"

export function Header({
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
  ignoreTopSafeArea = false,
  bottomBorder = false,
  borderColor,
  borderWidth,
  SurfaceComponent
}: HeaderProps) {
  const insets = useSafeAreaInsets()

  const dimensions = useWindowDimensions()

  const headerCenterExists = !!headerCenter

  const { centerWidth, minSideHeaderWidth } = useMemo(() => {
    const centerWidth = headerCenterExists ? 0.5 * dimensions.width : 0
    const minSideHeaderWidth = (dimensions.width - centerWidth) / 2

    return { centerWidth, minSideHeaderWidth }
  }, [headerCenterExists, dimensions])

  const noHeaderLeftRight = !headerLeft && !headerRight

  return (
    <View>
      {SurfaceComponent && SurfaceComponent({ showHeader })}
      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: (ignoreTopSafeArea ? 0 : insets.top) + spacing.large,
            paddingBottom: spacing.large
          },
          headerStyle
        ]}
      >
        {headerLeftFadesIn ? (
          <FadingView
            opacity={showHeader}
            style={[
              {
                flexDirection: "row",
                paddingLeft: spacing.large,
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
                paddingLeft: spacing.large,
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
                  paddingHorizontal: spacing.small,
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
                  paddingHorizontal: spacing.small,
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
                paddingRight: spacing.large,
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
                paddingRight: spacing.large,
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
      </View>
      {!bottomBorder && (
        <HeaderBottomBorder
          opacity={showHeader}
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
  borderWidth = border.thin
}: {
  opacity: DerivedValue<0 | 1> | DerivedValue<number>
  style?: StyleProp<ViewStyle>
  borderColor?: string
  borderWidth?: number
}) {
  const { colors } = useColorTheme()

  const borderBottomStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      backgroundColor: borderColor || colors.secondary
    }),
    [borderColor, colors.secondary]
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
          justifyContent: "space-between",
          paddingBottom: spacing.large
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
LargeHeaderSubtitle.displayName = "LargeHeaderSubtitle"
