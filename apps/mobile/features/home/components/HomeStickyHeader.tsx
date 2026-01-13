import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { Header, IconButton, Image, Text, type ScrollHeaderProps } from "@components/ui"

type HomeStickyHeaderProps = ScrollHeaderProps

const HomeStickyHeader = ({ scrollY, showHeader }: HomeStickyHeaderProps) => {
  const styles = useStyles(homeStickyHeaderStyles)

  const { t } = useTranslation()

  const router = useRouter()

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerLeft={
        <Image
          source={require("@assets/images/app/icons/primary.png")}
          style={styles.appIcon}
          contentFit="contain"
        />
      }
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

const homeStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  appIcon: {
    width: theme.fontSize("xl"),
    height: theme.fontSize("xl"),
    borderRadius: theme.radius("none"),
    backgroundColor: "trasnparent",
    borderWidth: theme.borderWidth("none")
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center"
  }
}))

export { HomeStickyHeader }
