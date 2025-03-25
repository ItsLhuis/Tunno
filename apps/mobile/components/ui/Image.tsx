import { forwardRef } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"

export type ImageProps = ExpoImageProps

export const Image = forwardRef<ExpoImage, ImageProps>(
  ({ style, transition, ...props }: ImageProps, ref) => {
    const { colors } = useColorTheme()

    return (
      <ExpoImage
        ref={ref}
        style={[{ backgroundColor: colors.muted }, style]}
        transition={transition ? transition : { duration: 300 }}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"
