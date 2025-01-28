import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"

export type ImageProps = ExpoImageProps

export function Image({ ...props }: ImageProps) {
  return <ExpoImage {...props} />
}
Image.displayName = "Image"
