import { type ReactNode } from "react"

import {
  ColorValue,
  type LayoutRectangle,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle
} from "react-native"

import { DerivedValue, SharedValue } from "react-native-reanimated"

export type SurfaceHeaderProps = {
  showHeader: DerivedValue<0 | 1>
}

export type HeaderProps = {
  headerStyle?: StyleProp<ViewStyle>
  headerLeft?: ReactNode
  headerLeftStyle?: StyleProp<ViewStyle>
  headerLeftFadesIn?: boolean
  headerCenter?: ReactNode
  headerCenterStyle?: StyleProp<ViewStyle>
  headerCenterFadesIn?: boolean
  headerRight?: ReactNode
  headerRightStyle?: StyleProp<ViewStyle>
  headerRightFadesIn?: boolean
  ignoreTopSafeArea?: boolean
  showHeader: DerivedValue<0 | 1>
  bottomBorder?: boolean
  borderColor?: ColorValue
  borderWidth?: number
  SurfaceComponent?: (props: SurfaceHeaderProps) => ReactNode
}

export type LargeHeaderProps = {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type LargeHeaderSubtitleProps = {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type ScrollLargeHeaderProps = {
  scrollY: SharedValue<number>
  showHeader: DerivedValue<0 | 1>
}

export type ScrollLargeHeaderSubtitleProps = {
  scrollY: SharedValue<number>
  showHeader: DerivedValue<0 | 1>
}

export type ScrollHeaderProps = {
  scrollY: SharedValue<number>
  showHeader: DerivedValue<0 | 1>
}

export type SharedScrollContainerProps = {
  largeHeaderShown?: SharedValue<number>
  LargeHeaderComponent?: (props: ScrollLargeHeaderProps) => ReactNode
  LargeHeaderSubtitleComponent?: (props: ScrollLargeHeaderSubtitleProps) => ReactNode
  HeaderComponent: (props: ScrollHeaderProps) => ReactNode
  onLargeHeaderLayout?: (rect: LayoutRectangle) => void
  largeHeaderContainerStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  ignoreLeftSafeArea?: boolean
  ignoreRightSafeArea?: boolean
  disableAutoFixScroll?: boolean
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollWorklet?: (evt: NativeScrollEvent) => void
  absoluteHeader?: boolean
  initialAbsoluteHeaderHeight?: number
  headerFadeInThreshold?: number
  disableLargeHeaderFadeAnim?: boolean
}
