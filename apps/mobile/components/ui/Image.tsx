import { useState, useEffect, forwardRef, type ReactNode } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"

import { Shadow } from "react-native-shadow-2"

import { FadingView } from "./FadingView"

import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated"

export type ImageProps = ExpoImageProps & {
  containerStyle?: StyleProp<ViewStyle>
  placeholderComponent?: ReactNode
  shadow?: boolean
}

export const Image = forwardRef<ExpoImage, ImageProps>(
  (
    { containerStyle, placeholderComponent, shadow = false, source, onLoad, ...props }: ImageProps,
    ref
  ) => {
    const { colors } = useColorTheme()

    const [loaded, setLoaded] = useState<boolean>(false)

    const [currentSource, setCurrentSource] = useState<typeof source>(source)

    const loadOpacity = useSharedValue(1)

    const handleLoad = () => {
      loadOpacity.value = withTiming(0, { duration: 300 }, () => runOnJS(setLoaded)(true))
    }

    const resetLoadingState = () => {
      setLoaded(false)
      loadOpacity.value = withTiming(1, { duration: 300 }, () => runOnJS(setCurrentSource)(source))
    }

    useEffect(() => {
      if (currentSource !== source) resetLoadingState()
    }, [source])

    const defaultPlaceholder = (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.border
        }}
      />
    )

    const Component = shadow ? Shadow : View

    return (
      <Component style={[{ position: "relative", overflow: "hidden" }, containerStyle]}>
        <ExpoImage
          ref={ref}
          source={currentSource}
          onLoad={(e) => {
            handleLoad()
            if (onLoad) onLoad(e)
          }}
          {...props}
        />
        {!loaded && (
          <FadingView
            opacity={loadOpacity}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
          >
            {placeholderComponent ?? defaultPlaceholder}
          </FadingView>
        )}
      </Component>
    )
  }
)
Image.displayName = "Image"
