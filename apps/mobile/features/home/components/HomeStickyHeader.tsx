import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { Header, IconButton, Text, type ScrollHeaderProps } from "@components/ui"

type HomeStickyHeaderProps = ScrollHeaderProps

const HomeStickyHeader = ({ scrollY, showHeader }: HomeStickyHeaderProps) => {
  const styles = useStyles(homeStickyHeaderStyles)

  const { t } = useTranslation()

  const router = useRouter()

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("home.title")}
        </Text>
      }
      headerRight={
        <View style={styles.headerRight}>
          <IconButton name="Settings" variant="ghost" onPress={() => router.push("/settings")} />
        </View>
      }
    />
  )
}

const homeStickyHeaderStyles = createStyleSheet(() => ({
  headerRight: {
    flexDirection: "row",
    alignItems: "center"
  }
}))

export { HomeStickyHeader }
