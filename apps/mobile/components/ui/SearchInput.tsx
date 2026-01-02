import { type ReactNode, useRef } from "react"

import { type BlurEvent, type FocusEvent, TextInput as RNTextInput, View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, durationTokens, useAnimatedTheme, useStyles } from "@styles"

import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Button } from "./Button"
import { Icon } from "./Icon"
import { TextInput, type TextInputProps } from "./TextInput"

export type SearchInputProps = TextInputProps & {
  cancelLabel?: string
  onCancel?: () => void
  renderRight?: ReactNode
}

const SearchInput = ({
  cancelLabel,
  onCancel,
  renderRight,
  ...textInputProps
}: SearchInputProps) => {
  const { t } = useTranslation()

  const styles = useStyles(searchInputStyles)

  const animatedTheme = useAnimatedTheme()

  const resolvedCancelLabel = cancelLabel ?? t("common.cancel")
  const resolvedPlaceholder = textInputProps.placeholder ?? t("common.search")

  const inputRef = useRef<RNTextInput>(null)

  const measureRef = useRef<View>(null)

  const isFocused = useSharedValue(0)
  const cancelButtonWidth = useSharedValue(0)

  const handleFocus = (event: FocusEvent) => {
    isFocused.value = withTiming(1, {
      duration: durationTokens[150],
      easing: Easing.out(Easing.ease)
    })
    textInputProps.onFocus?.(event)
  }

  const handleBlur = (event: BlurEvent) => {
    isFocused.value = withTiming(0, {
      duration: durationTokens[150],
      easing: Easing.out(Easing.ease)
    })
    textInputProps.onBlur?.(event)
  }

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
    onCancel?.()
  }

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        isFocused.value,
        [0, 1],
        [String(animatedTheme.value.colors.input), String(animatedTheme.value.colors.primary)]
      )
    }
  })

  const cancelContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(isFocused.value, [0, 1], [0, 1])
    const maxWidth = interpolate(isFocused.value, [0, 1], [0, cancelButtonWidth.value])

    return {
      opacity: withTiming(opacity, {
        duration: durationTokens[150],
        easing: Easing.out(Easing.ease)
      }),
      maxWidth: withTiming(maxWidth, {
        duration: durationTokens[150],
        easing: Easing.out(Easing.ease)
      })
    }
  })

  const cancelButtonInnerStyle = useAnimatedStyle(() => {
    return {
      width: cancelButtonWidth.value > 0 ? cancelButtonWidth.value : undefined
    }
  })

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.inputContainer, borderStyle]}>
        <Icon name="Search" color="foreground" style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          {...textInputProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disableBorderAnimation
          style={styles.input}
          placeholder={resolvedPlaceholder}
        />
        {renderRight && <View style={styles.rightContent}>{renderRight}</View>}
      </Animated.View>
      <View
        ref={measureRef}
        style={styles.hiddenMeasurer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          if (width > 0) {
            cancelButtonWidth.value = width
          }
        }}
      >
        <Button
          variant="text"
          size="sm"
          title={resolvedCancelLabel}
          onPress={() => {}}
          titleProps={{ numberOfLines: 1 }}
        />
      </View>
      <Animated.View style={[styles.cancelContainer, cancelContainerStyle]}>
        <Animated.View style={[styles.cancelButtonInner, cancelButtonInnerStyle]}>
          <Button
            variant="text"
            size="sm"
            title={resolvedCancelLabel}
            onPress={handleCancel}
            titleProps={{ numberOfLines: 1, ellipsizeMode: "clip" }}
            style={{ paddingRight: 0 }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const searchInputStyles = createStyleSheet(({ theme }) => ({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
    borderRadius: theme.radius(),
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.input,
    padding: theme.space("xs"),
    gap: theme.space(3)
  },
  searchIcon: {
    marginLeft: theme.space("sm")
  },
  input: {
    flex: 1,
    borderWidth: theme.borderWidth("none"),
    paddingHorizontal: theme.space("0"),
    backgroundColor: "transparent"
  },
  rightContent: {
    flexShrink: 0
  },
  hiddenMeasurer: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none"
  },
  cancelContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  cancelButtonInner: {
    width: "100%",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center"
  }
}))

export { SearchInput }
