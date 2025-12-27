import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import NotFoundLottie from "@assets/lotties/NotFound.json"
import LottieView from "lottie-react-native"

import { Text } from "@components/ui/Text"

export type NotFoundProps = {
  style?: StyleProp<ViewStyle>
}

const NotFound = ({ style }: NotFoundProps) => {
  const styles = useStyles(notFoundStyles)

  const { t } = useTranslation()

  return (
    <View style={[styles.container, style]}>
      <LottieView source={NotFoundLottie} autoPlay loop style={styles.lottie} />
      <Text color="mutedForeground" size="sm">
        {t("common.noResultsFound")}
      </Text>
    </View>
  )
}

const notFoundStyles = createStyleSheet(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  lottie: {
    width: 240,
    height: 240,
    marginTop: -90,
    marginBottom: -70
  }
}))

export { NotFound }
