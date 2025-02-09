import { View } from "react-native"

import { Image, type ImageProps } from "./Image"

export function OverlayImage({ ...props }: ImageProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <Image
        {...props}
        style={[props.style, { position: "absolute", width: "100%", height: "100%" }]}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        }}
      />
    </View>
  )
}
OverlayImage.displayName = "OverlayImage"
