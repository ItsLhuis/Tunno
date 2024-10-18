import { Platform } from "react-native"

import { IconButton, type IconButtonProps } from "../ui/IconButton"

import { router } from "expo-router"

export function BackIcon({ color, ...rest }: Omit<IconButtonProps, "name">) {
  return (
    <IconButton
      name={Platform.OS === "ios" ? "chevron-back" : "arrow-back-outline"}
      onPress={() => router.back()}
      {...rest}
    />
  )
}
