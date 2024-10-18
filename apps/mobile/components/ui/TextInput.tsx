import { forwardRef } from "react"

import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps
} from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { family, size } from "@constants/font"
import { spacing, borderRadius } from "@constants/styles"

export type TextInputProps = RNTextInputProps

export const TextInput = forwardRef<RNTextInput, TextInputProps>(({ style, ...rest }, ref) => {
  const colors = useThemeColor()

  return (
    <RNTextInput
      ref={ref}
      maxFontSizeMultiplier={1}
      selectionColor={colors.primary}
      style={[
        {
          fontFamily: family.regular,
          fontSize: size.small,
          color: colors.text,
          borderRadius: borderRadius.xSmall,
          paddingHorizontal: spacing.small,
          paddingVertical: Platform.OS === "android" ? spacing.xSmall : spacing.small
        },
        style
      ]}
      {...rest}
    />
  )
})
