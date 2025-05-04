import { forwardRef, useImperativeHandle, useRef, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import {
  Animated,
  Easing,
  Pressable,
  TextInput as RNTextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputFocusEventData,
  type ViewStyle
} from "react-native"

import { Button } from "./Button"
import { Icon } from "./Icon"
import { IconButton } from "./IconButton"
import { TextInput, type TextInputProps } from "./TextInput"

export type SearchInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
}

export const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
  (
    {
      style,
      value,
      placeholderTextColor,
      containerStyle,
      onChangeText,
      onFocus,
      onBlur,
      ...props
    }: SearchInputProps,
    ref
  ) => {
    const { colors } = useColorTheme()

    const inputRef = useRef<RNTextInput>(null)
    useImperativeHandle(ref, () => inputRef.current || ({} as RNTextInput))

    const [cancelWidth, setCancelWidth] = useState<number>(0)

    const isFocused = useRef(new Animated.Value(0)).current

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      Animated.timing(isFocused, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false
      }).start()
      if (onFocus) onFocus(e)
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      inputRef.current?.blur()
      Animated.timing(isFocused, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false
      }).start()
      if (onBlur) onBlur(e)
    }

    const handlePress = () => {
      inputRef.current?.focus()
    }

    const clearStyle = {
      opacity: isFocused
    }

    const cancelStyle = {
      opacity: isFocused,
      marginRight: isFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [-cancelWidth, 0]
      }),
      marginLeft: isFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, theme.styles.spacing.small]
      })
    }

    const borderStyle = {
      borderColor: isFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.muted, colors.primary]
      })
    }

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: theme.styles.spacing.small,
              borderRadius: theme.styles.borderRadius.xSmall,
              borderColor: colors.muted,
              borderWidth: theme.styles.border.thin
            },
            borderStyle,
            containerStyle
          ]}
        >
          <Pressable onPress={handlePress} style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="Search" size={theme.styles.icon.size.medium} color={colors.foreground} />
            <TextInput
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={placeholderTextColor || colors.mutedForeground}
              style={[
                style,
                {
                  flex: 1,
                  paddingHorizontal: theme.styles.spacing.xSmall,
                  borderWidth: theme.styles.border.none
                }
              ]}
              disableBorderAnimation
              {...props}
            />
            <Animated.View style={clearStyle}>
              <IconButton
                name="X"
                size={theme.styles.icon.size.medium}
                color={colors.foreground}
                onPress={() => {
                  if (Number(JSON.stringify(isFocused)) === 0) {
                    handlePress()
                    return
                  }
                  onChangeText ? onChangeText("") : inputRef.current?.clear()
                }}
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
        <Animated.View
          onLayout={(event) => setCancelWidth(event.nativeEvent.layout.width)}
          style={cancelStyle}
        >
          <Button
            variant="text"
            title="Cancel"
            onPress={() => handleBlur({} as NativeSyntheticEvent<TextInputFocusEventData>)}
            style={{
              paddingRight: theme.styles.spacing.none,
              paddingLeft: theme.styles.spacing.xSmall
            }}
          />
        </Animated.View>
      </View>
    )
  }
)
SearchInput.displayName = "SearchInput"
