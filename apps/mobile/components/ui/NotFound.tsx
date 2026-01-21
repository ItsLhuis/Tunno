import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import NotFoundLottie from "@assets/lotties/NotFound.json"
import LottieView from "lottie-react-native"

import { Text } from "@components/ui/Text"

export type NotFoundProps = {
  style?: StyleProp<ViewStyle>
  message?: string
}

const NotFound = ({ style, message }: NotFoundProps) => {
  const styles = useStyles(notFoundStyles)

  const { t } = useTranslation()

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      <View style={styles.lottieContainer}>
        <LottieView source={NotFoundLottie} autoPlay loop style={styles.lottie} />
      </View>
      <Text color="mutedForeground" size="sm">
        {message ?? t("common.noResultsFound")}
      </Text>
    </View>
  )
}

const notFoundStyles = createStyleSheet(() => ({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  lottieContainer: {
    position: "relative",
    width: 160,
    height: 160,
    overflow: "hidden",
    marginTop: -32,
    marginBottom: -16
  },
  lottie: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.5 }]
  }
}))

export { NotFound }
