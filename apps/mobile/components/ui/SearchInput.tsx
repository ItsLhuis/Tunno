import { TextInput, TextInputProps } from "./TextInput"

import { useThemeColor } from "@hooks/useThemeColor"

import { spacing, borderRadius } from "@constants/styles"

export function SearchInput({ style, ...rest }: TextInputProps) {
  const colors = useThemeColor()

  return <TextInput style={[style]} {...rest} />
}
