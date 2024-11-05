import { ReactNode, useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { spacing, zIndex } from "@constants/styles"

import { Dimensions, Animated, type StyleProp, type ViewStyle } from "react-native"

import { View, ViewProps } from "./View"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { SearchInput } from "./SearchInput"

import { renderContent } from "@utils/renderContent"

export type HeaderProps = Omit<ViewProps, "style"> & {
  title?: string
  renderLeft?: ReactNode | (() => ReactNode)
  renderRight?: ReactNode | (() => ReactNode)
  containerStyle?: StyleProp<ViewStyle>
  hideSearch?: boolean
  searchPlaceholder?: string
  value?: string
  onSearchChange?: (text: string) => void
  scrollY?: Animated.Value
  isAnimated?: boolean
  onHeaderHeightChange?: (height: number) => void
}

export function Header({
  title = "Title",
  renderLeft,
  renderRight,
  containerStyle,
  hideSearch = false,
  searchPlaceholder = "Search",
  value,
  onSearchChange,
  scrollY,
  isAnimated = false,
  onHeaderHeightChange,
  ...rest
}: HeaderProps) {
  const insets = useSafeAreaInsets()

  const { colors } = useThemeColor()

  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const [searchInputHeight, setSearchInputHeight] = useState<number>(0)

  const adjustedHeaderInputRange = Math.max(headerHeight + searchInputHeight - spacing.small, 0)

  const headerTitleTranslateY =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, adjustedHeaderInputRange],
          outputRange: [headerHeight, 0],
          extrapolate: "clamp"
        })
      : -headerHeight

  const headerTitleOpacity =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, adjustedHeaderInputRange],
          outputRange: [0, 1],
          extrapolate: "clamp"
        })
      : 0

  const bigHeaderTitleTranslateY =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, adjustedHeaderInputRange],
          outputRange: [0, -adjustedHeaderInputRange],
          extrapolate: "clamp"
        })
      : 0

  const bigHeaderTitleOpacity =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, adjustedHeaderInputRange],
          outputRange: [1, 0],
          extrapolate: "clamp"
        })
      : 1

  return (
    <View
      style={[
        {
          marginTop: insets.top,
          marginBottom: !hideSearch ? searchInputHeight + spacing.large : 0,
          paddingBottom: spacing.large,
          paddingHorizontal: spacing.large
        },
        containerStyle
      ]}
      {...rest}
    >
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          setHeaderHeight(height || 0)

          if (onHeaderHeightChange) {
            onHeaderHeightChange(height)
          }
        }}
        style={{
          paddingTop: spacing.medium,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.medium,
          zIndex: zIndex.xxHigh
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderLeft ? (
            renderContent(renderLeft)
          ) : (
            <Icon name="information" style={{ opacity: 0 }} />
          )}
        </View>
        {isAnimated && (
          <Animated.View
            style={{
              transform: [{ translateY: headerTitleTranslateY }],
              opacity: headerTitleOpacity
            }}
          >
            <Text
              numberOfLines={1}
              variant="bold"
              style={{ flex: 1, textAlign: "center", color: colors.text, fontSize: size.medium }}
            >
              {title}
            </Text>
          </Animated.View>
        )}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderRight ? (
            renderContent(renderRight)
          ) : (
            <Icon name="information" style={{ opacity: 0 }} />
          )}
        </View>
      </View>
      <Animated.View
        style={[
          isAnimated
            ? {
                position: "absolute",
                top: headerHeight,
                left: 0,
                right: 0,
                paddingHorizontal: spacing.large,
                transform: [{ translateY: bigHeaderTitleTranslateY }]
              }
            : {},
          {
            gap: spacing.medium,
            marginTop: spacing.medium,
            zIndex: hideSearch ? -zIndex.xxxLow : zIndex.high
          }
        ]}
      >
        <Animated.View style={{ opacity: isAnimated ? bigHeaderTitleOpacity : 1 }}>
          <Text
            numberOfLines={2}
            variant="bold"
            style={{ color: colors.text, fontSize: size.xxLarge, marginTop: spacing.small }}
          >
            {title}
          </Text>
        </Animated.View>
        <View
          style={
            hideSearch && {
              opacity: 0,
              transform: [{ translateY: -Dimensions.get("window").height }]
            }
          }
        >
          <SearchInput
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout
              setSearchInputHeight(height || 0)

              if (onHeaderHeightChange) {
                onHeaderHeightChange(headerHeight + height)
              }
            }}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            onChangeText={onSearchChange}
            style={{ backgroundColor: colors.secondary }}
          />
        </View>
      </Animated.View>
    </View>
  )
}
