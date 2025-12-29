import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"

import { createStyleSheet, useStyles } from "@styles"

export type ImageProps = ExpoImageProps

const Image = ({ style, transition, ...props }: ImageProps) => {
  const styles = useStyles(imageStyles)

  return (
    <ExpoImage
      style={[styles.image, style]}
      transition={transition ?? { duration: 300 }}
      {...props}
    />
  )
}

const imageStyles = createStyleSheet(({ theme }) => ({
  image: {
    backgroundColor: theme.colors.muted
  }
}))

export { Image }
