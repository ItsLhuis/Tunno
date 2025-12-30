import { type StyleProp, View, type ViewStyle } from "react-native"

import Animated, {
  type DerivedValue,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue
} from "react-native-reanimated"

import {
  type BorderWidthAlias,
  type ColorKey,
  createStyleSheet,
  resolveColor,
  useAnimatedTheme,
  useStyles,
  viewStyle
} from "@styles"

import { FadingView } from "./FadingView"

import { type HeaderProps, type LargeHeaderProps, type LargeHeaderSubtitleProps } from "../types"

const Header = ({
  scrollY,
  showHeader,
  headerStyle,
  headerLeft = null,
  headerLeftStyle,
  headerLeftFadesIn,
  headerCenter = null,
  headerCenterStyle,
  headerCenterFadesIn = true,
  headerRight = null,
  headerRightStyle,
  headerRightFadesIn,
  headerBackgroundAnimation = true,
  ignoreTopSafeArea = false,
  bottomBorder = true,
  borderColor,
  borderWidth,
  SurfaceComponent
}: HeaderProps) => {
  const styles = useStyles(headerStyles)

  const animatedTheme = useAnimatedTheme()

  const headerCenterExists = !!headerCenter

  const noHeaderLeftRight = !headerLeft && !headerRight

  const headerBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        showHeader.value,
        [0, 1],
        [animatedTheme.value.colors.background, animatedTheme.value.colors.tabbar]
      )
    }
  })

  return (
    <View>
      {SurfaceComponent && SurfaceComponent({ showHeader })}
      <Animated.View
        style={[
          styles.container(ignoreTopSafeArea),
          headerBackgroundAnimation && headerBackgroundStyle,
          headerStyle
        ]}
      >
        {headerLeftFadesIn ? (
          <FadingView
            opacity={showHeader}
            style={[
              styles.left(headerCenterExists),
              noHeaderLeftRight && styles.leftHidden,
              headerLeftStyle
            ]}
          >
            {headerLeft}
          </FadingView>
        ) : (
          <View
            style={[
              styles.left(headerCenterExists),
              noHeaderLeftRight && styles.leftHidden,
              headerLeftStyle
            ]}
          >
            {headerLeft}
          </View>
        )}
        {headerCenter &&
          (headerCenterFadesIn ? (
            <FadingView
              opacity={showHeader}
              style={[styles.center(headerCenterExists), headerCenterStyle]}
            >
              {headerCenter}
            </FadingView>
          ) : (
            <View style={[styles.centerFixed(headerCenterExists), headerCenterStyle]}>
              {headerCenter}
            </View>
          ))}
        {headerRightFadesIn ? (
          <FadingView
            opacity={showHeader}
            style={[
              styles.right(headerCenterExists),
              noHeaderLeftRight && styles.rightHidden,
              headerRightStyle
            ]}
          >
            {headerRight}
          </FadingView>
        ) : (
          <View
            style={[
              styles.right(headerCenterExists),
              noHeaderLeftRight && styles.rightHidden,
              headerRightStyle
            ]}
          >
            {headerRight}
          </View>
        )}
      </Animated.View>
      {bottomBorder && (
        <HeaderBottomBorder
          scrollY={scrollY}
          showHeader={showHeader}
          borderColor={borderColor}
          borderWidth={borderWidth}
        />
      )}
    </View>
  )
}

const HeaderBottomBorder = ({
  scrollY,
  showHeader,
  style,
  borderColor,
  borderWidth
}: {
  scrollY?: SharedValue<number>
  showHeader: DerivedValue<0 | 1>
  style?: StyleProp<ViewStyle>
  borderColor?: ColorKey
  borderWidth?: BorderWidthAlias
}) => {
  const styles = useStyles(borderStyles)

  const animatedTheme = useAnimatedTheme()

  const borderVisible = useDerivedValue(() => {
    if (!scrollY) return showHeader.value
    return scrollY.value > 0 ? 1 : 0
  })

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const resolvedColor = borderColor ? resolveColor(animatedTheme.value, borderColor) : undefined
    const backgroundColor = resolvedColor ?? animatedTheme.value.colors.muted

    return {
      opacity: borderVisible.value,
      backgroundColor
    }
  })

  return <Animated.View style={[styles.border(borderWidth), borderAnimatedStyle, style]} />
}

const LargeHeader = ({ style, children }: LargeHeaderProps) => {
  const styles = useStyles(largeHeaderStyles)

  return <View style={[styles.container, style]}>{children}</View>
}

const LargeHeaderSubtitle = ({ style, children }: LargeHeaderSubtitleProps) => {
  const styles = useStyles(largeHeaderSubtitleStyles)

  return <View style={[styles.container, style]}>{children}</View>
}

const headerStyles = createStyleSheet(({ theme, runtime }) => ({
  container: (ignoreTopSafeArea: boolean) =>
    viewStyle({
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: (ignoreTopSafeArea ? 0 : runtime.insets.top) + theme.space("lg"),
      paddingBottom: theme.space("lg")
    }),
  left: (headerCenterExists: boolean) => {
    const centerWidth = headerCenterExists ? 0.4 * runtime.dimensions.width : 0
    const minSideHeaderWidth = (runtime.dimensions.width - centerWidth) / 2
    return viewStyle({
      flexDirection: "row",
      paddingLeft: theme.space("lg"),
      justifyContent: "flex-start",
      alignItems: "center",
      overflow: "hidden",
      width: minSideHeaderWidth
    })
  },
  leftHidden: {
    display: "none"
  },
  center: (headerCenterExists: boolean) => {
    const centerWidth = headerCenterExists ? 0.4 * runtime.dimensions.width : 0
    return viewStyle({
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: theme.space("sm"),
      alignItems: "center",
      justifyContent: "center",
      minWidth: centerWidth
    })
  },
  centerFixed: (headerCenterExists: boolean) => {
    const centerWidth = headerCenterExists ? 0.4 * runtime.dimensions.width : 0
    return viewStyle({
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: theme.space("sm"),
      alignItems: "center",
      justifyContent: "center",
      width: centerWidth
    })
  },
  right: (headerCenterExists: boolean) => {
    const centerWidth = headerCenterExists ? 0.4 * runtime.dimensions.width : 0
    const minSideHeaderWidth = (runtime.dimensions.width - centerWidth) / 2
    return viewStyle({
      flexDirection: "row-reverse",
      paddingRight: theme.space("lg"),
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "hidden",
      width: minSideHeaderWidth
    })
  },
  rightHidden: {
    display: "none"
  }
}))

const borderStyles = createStyleSheet(({ theme }) => ({
  border: (borderWidth?: BorderWidthAlias) => ({
    width: "100%",
    height: borderWidth ? theme.borderWidth(borderWidth) : theme.borderWidth()
  })
}))

const largeHeaderStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: theme.space("lg")
  }
}))

const largeHeaderSubtitleStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: theme.space("lg")
  }
}))

export { Header, LargeHeader, LargeHeaderSubtitle }
