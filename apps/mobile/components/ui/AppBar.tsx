import { useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { spacing, zIndex } from "@constants/styles"

import { Animated, type StyleProp, type ViewStyle } from "react-native"

import { View, ViewProps } from "./View"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { SearchInput } from "./SearchInput"

export type AppBarProps = ViewProps & {
  title?: string
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  hideSearch?: boolean
  searchPlaceholder?: string
  value?: string
  onSearchChange?: (text: string) => void
  scrollY?: Animated.Value
  isForList?: boolean
  onHeaderHeightChange?: (height: number) => void
}

export function AppBar({
  title = "Title",
  renderLeft,
  renderRight,
  containerStyle,
  hideSearch = false,
  searchPlaceholder = "Search",
  value,
  onSearchChange,
  scrollY,
  isForList = false,
  onHeaderHeightChange,
  ...rest
}: AppBarProps) {
  const insets = useSafeAreaInsets()

  const colors = useThemeColor()

  const [headerHeight, setHeaderHeight] = useState<number>(0)

  const headerTitleTranslateY = scrollY
    ? scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [headerHeight, 0],
        extrapolate: "clamp"
      })
    : headerHeight

  const headerTitleOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, headerHeight * 0.6, headerHeight],
        outputRange: [0, 0.1, 1],
        extrapolate: "clamp"
      })
    : 0

  const bigHeaderTitleTranslateY = scrollY
    ? scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp"
      })
    : 0

  const bigHeaderTitleOpacity = scrollY
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
          marginBottom: spacing.large,
          paddingHorizontal: spacing.large,
          paddingBottom: isForList ? headerHeight - spacing.xSmall : 0,
          gap: spacing.small
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
          paddingTop: insets.top + spacing.medium,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.medium,
          zIndex: zIndex.medium
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
        {isForList && (
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
          isForList
            ? {
                position: "absolute",
                top: headerHeight + spacing.small,
                left: 0,
                right: 0,
                paddingHorizontal: spacing.large,
                transform: [{ translateY: bigHeaderTitleTranslateY }]
              }
            : {},
          { gap: spacing.small, zIndex: zIndex.xLow }
        ]}
      >
        <Animated.View style={{ opacity: isForList ? bigHeaderTitleOpacity : 1 }}>
          <Text
            numberOfLines={2}
            variant="bold"
            style={{ color: colors.text, fontSize: size.xxLarge, marginTop: spacing.small }}
          >
            {title}
          </Text>
        </Animated.View>
        {!hideSearch && (
          <SearchInput
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            onChangeText={onSearchChange}
            style={{ backgroundColor: colors.tabBarBackground }}
          />
        )}
      </Animated.View>
    </View>
  )
}
