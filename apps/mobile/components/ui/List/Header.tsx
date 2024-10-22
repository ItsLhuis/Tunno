import { useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { spacing, zIndex } from "@constants/styles"

import { Animated, type StyleProp, type ViewStyle } from "react-native"

import { View, ViewProps } from "../View"
import { Text } from "../Text"
import { Icon } from "../Icon"
import { SearchInput } from "../SearchInput"

export type HeaderProps = ViewProps & {
  title?: string
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
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

  const colors = useThemeColor()

  const [headerHeight, setHeaderHeight] = useState<number>(0)

  const [titleHeight, setTitleHeight] = useState<number>(0)
  const [searchInputHeight, setSearchInputHeight] = useState<number>(0)

  const headerTitleTranslateY =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [headerHeight, 0],
          extrapolate: "clamp"
        })
      : headerHeight

  const headerTitleOpacity =
    isAnimated && scrollY
      ? scrollY.interpolate({
          inputRange: [0, headerHeight * 0.6, headerHeight],
          outputRange: [0, 0.1, 1],
          extrapolate: "clamp"
        })
      : 0

  const adjustedHeaderInputRange = Math.max(headerHeight + searchInputHeight - spacing.small, 0)

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
          inputRange: [0, (5 * headerHeight) / 7],
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
          paddingBottom: hideSearch ? spacing.medium : spacing.medium,
          paddingHorizontal: spacing.large,
          zIndex: zIndex.high
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
          zIndex: zIndex.high
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderLeft ? renderLeft() : <Icon name="information" style={{ opacity: 0 }} />}
        </View>
        {isAnimated && (
          <Animated.View
            style={{
              transform: [{ translateY: headerTitleTranslateY }],
              opacity: headerTitleOpacity,
              zIndex: zIndex.max
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
          {renderRight ? renderRight() : <Icon name="information" style={{ opacity: 0 }} />}
        </View>
      </View>
      <Animated.View
        style={[
          isAnimated
            ? {
                position: "absolute",
                top: headerHeight + spacing.medium,
                left: 0,
                right: 0,
                paddingHorizontal: spacing.large,
                transform: [{ translateY: bigHeaderTitleTranslateY }]
              }
            : {},
          { gap: spacing.small }
        ]}
      >
        <Animated.View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout
            setTitleHeight(height || 0)
          }}
          style={{ opacity: isAnimated ? bigHeaderTitleOpacity : 1 }}
        >
          <Text
            numberOfLines={2}
            variant="bold"
            style={{ color: colors.text, fontSize: size.xxLarge, marginTop: spacing.small }}
          >
            {title}
          </Text>
        </Animated.View>
        <View style={{ opacity: hideSearch ? 0 : 1 }}>
          <SearchInput
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout
              setSearchInputHeight(height || 0)

              if (!hideSearch && onHeaderHeightChange) {
                onHeaderHeightChange(headerHeight + height)
                return
              }

              if (onHeaderHeightChange) {
                onHeaderHeightChange(headerHeight + height + spacing.small)
              }
            }}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            onChangeText={onSearchChange}
            style={{ backgroundColor: colors.tabBarBackground }}
          />
        </View>
      </Animated.View>
    </View>
  )
}
