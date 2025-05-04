import { Platform } from "react-native"

import { IconButton, type IconButtonProps } from "../ui/IconButton"

import { router } from "expo-router"

export function BackButton({ color, ...props }: Omit<IconButtonProps, "name">) {
  return (
    <IconButton
      name={Platform.OS === "ios" ? "ChevronLeft" : "ArrowLeft"}
      onPress={() => router.back()}
      {...props}
    />
  )
}
BackButton.displayName = "BackButton"
