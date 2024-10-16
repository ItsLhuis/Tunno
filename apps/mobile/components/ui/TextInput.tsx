import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { family, size } from "@constants/font"
import { spacing, borderRadius } from "@constants/styles"

export type TextInputProps = RNTextInputProps

export function TextInput({ style, ...rest }: TextInputProps) {
  const colors = useThemeColor()

  return (
    <RNTextInput
      maxFontSizeMultiplier={1}
      selectionColor={colors.tint}
      style={[
        style,
        {
          fontFamily: family.regular,
          fontSize: size.small,
          color: colors.text,
          borderRadius: borderRadius.xSmall,
          paddingHorizontal: spacing.small,
          paddingVertical: spacing.xSmall
        }
      ]}
      {...rest}
    />
  )
}
