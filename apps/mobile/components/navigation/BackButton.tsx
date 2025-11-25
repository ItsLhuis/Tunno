import { Platform } from "react-native"

import { router } from "expo-router"

import { IconButton, type IconButtonProps } from "@components/ui/IconButton"

export type BackButtonProps = Omit<IconButtonProps, "name" | "onPress">

const BackButton = (props: BackButtonProps) => {
  const iconName: IconButtonProps["name"] = Platform.OS === "ios" ? "ChevronLeft" : "ArrowLeft"

  return <IconButton name={iconName} onPress={() => router.back()} {...props} />
}

export { BackButton }
