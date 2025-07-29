import { Platform } from "react-native"

import { router } from "expo-router"

import { IconButton, type IconButtonProps } from "@components/ui/IconButton"

function BackButton({ color, ...props }: Omit<IconButtonProps, "name">) {
  return (
    <IconButton
      name={Platform.OS === "ios" ? "ChevronLeft" : "ArrowLeft"}
      onPress={() => router.back()}
      {...props}
    />
  )
}

export { BackButton }
