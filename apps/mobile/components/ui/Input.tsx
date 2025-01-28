import { forwardRef } from "react"

import {
  Platform,
  TextInput,
  type TextInputProps
} from "react-native"

import { useColorTheme } from "@hooks/useColorTheme"

import { fontFamily, fontSize } from "@constants/font"
import { spacing, borderRadius } from "@constants/styles"

export type InputProps = TextInputProps

export const Input = forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => {
  const { colors } = useColorTheme()

  return (
    <TextInput
      ref={ref}
      maxFontSizeMultiplier={1}
      selectionColor={colors.primary}
      style={[
        {
          fontFamily: fontFamily.regular,
          fontSize: fontSize.medium,
          color: colors.text,
          borderRadius: borderRadius.xSmall,
          paddingHorizontal: spacing.small,
          paddingVertical: Platform.OS === "android" ? spacing.xSmall : spacing.small
        },
        style
      ]}
      {...props}
    />
  )
})
Input.displayName = "Input"
