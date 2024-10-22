import { useRef, useState } from "react"

import { useThemeColor } from "@hooks/useThemeColor"

import { spacing, borderRadius, iconSize } from "@constants/styles"

import { TextInput as RNTextInput, StyleProp, ViewStyle } from "react-native"
import { TextInput, TextInputProps } from "./TextInput"
import { Pressable } from "./Pressable"
import { Button } from "./Button"
import { IconButton } from "./IconButton"
import { View } from "./View"
import { Icon } from "./Icon"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate
} from "react-native-reanimated"

export type SearchInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
}

export function SearchInput({
  style,
  value,
  onChangeText,
  containerStyle,
  ...rest
}: SearchInputProps) {
  const inputRef = useRef<RNTextInput>(null)

  const colors = useThemeColor()

  const [cancelWidth, setCancelWidth] = useState<number>(0)

  const clearAnimation = useSharedValue(0)
  const cancelAnimation = useSharedValue(0)

  const handleFocus = () => {
    clearAnimation.value = withTiming(1, { duration: 300 })
    cancelAnimation.value = withTiming(1, { duration: 300 })
  }

  const handleBlur = () => {
    inputRef.current?.blur()
    clearAnimation.value = withTiming(0, { duration: 300 })
    cancelAnimation.value = withTiming(0, { duration: 300 })
  }

  const handlePress = () => {
    inputRef.current?.focus()
  }

  const clearStyle = useAnimatedStyle(() => ({
    opacity: clearAnimation.value
  }))

  const cancelStyle = useAnimatedStyle(() => ({
    opacity: cancelAnimation.value,
    marginRight: interpolate(cancelAnimation.value, [0, 1], [-cancelWidth, 0]),
    marginLeft: interpolate(cancelAnimation.value, [0, 1], [0, spacing.small])
  }))

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Pressable
        onPress={handlePress}
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.tabBarBackground,
            borderRadius: borderRadius.xSmall,
            paddingHorizontal: spacing.small
          },
          containerStyle
        ]}
      >
        <Icon name="search" size={iconSize.medium} color={colors.placeholder} />
        <TextInput
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          style={[style, { flex: 1, paddingHorizontal: spacing.xSmall }]}
          {...rest}
        />
        <Animated.View style={clearStyle}>
          <IconButton
            name="close"
            size={iconSize.medium}
            color={colors.placeholder}
            onPress={() => {
              if (clearAnimation.value === 0) {
                handlePress()
                return
              }
              onChangeText ? onChangeText("") : inputRef.current?.clear()
            }}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setCancelWidth(width)
        }}
        style={cancelStyle}
      >
        <Button
          variant="text"
          title="Cancel"
          onPress={handleBlur}
          style={{ paddingRight: spacing.none, paddingLeft: spacing.xSmall }}
          textStyle={{ color: colors.primary }}
        />
      </Animated.View>
    </View>
  )
}
