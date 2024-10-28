import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"

export type ImageProps = ExpoImageProps

export function Image({ ...rest }: ImageProps) {
  return <ExpoImage {...rest} />
}
