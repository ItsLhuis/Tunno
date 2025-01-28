import { useRef, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { spacing, borderRadius, iconSize } from "@constants/styles"

import { Pressable, TextInput as RNTextInput, View, StyleProp, ViewStyle } from "react-native"

import { Input, type InputProps } from "./Input"
import { Button } from "./Button"
import { IconButton } from "./IconButton"
import { Icon } from "./Icon"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate
} from "react-native-reanimated"

export type SearchInputProps = InputProps & {
  containerStyle?: StyleProp<ViewStyle>
}

export function SearchInput({
  style,
  value,
  placeholderTextColor,
  onChangeText,
  containerStyle,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<RNTextInput>(null)

  const { colors } = useColorTheme()

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
            backgroundColor: colors.secondary,
            borderRadius: borderRadius.xSmall,
            paddingHorizontal: spacing.small
          },
          containerStyle
        ]}
      >
        <Icon name="Search" size={iconSize.medium} color={colors.text} />
        <Input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor || colors.placeholder}
          style={[style, { flex: 1, paddingHorizontal: spacing.xSmall }]}
          {...props}
        />
        <Animated.View style={clearStyle}>
          <IconButton
            name="X"
            size={iconSize.medium}
            color={colors.text}
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
        onLayout={(event) => setCancelWidth(event.nativeEvent.layout.width)}
        style={cancelStyle}
      >
        <Button
          variant="text"
          title="Cancel"
          onPress={handleBlur}
          style={{ paddingRight: spacing.none, paddingLeft: spacing.xSmall }}
        />
      </Animated.View>
    </View>
  )
}
SearchInput.displayName = "SearchInput"
