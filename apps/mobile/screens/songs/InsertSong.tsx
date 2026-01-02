import { View } from "react-native"

import { useRouter } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton } from "@components/navigation"
import { Button, Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { SongForm } from "@features/songs/forms"

const InsertSong = () => {
  const styles = useStyles(insertSongStyles)

  const router = useRouter()

  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("form.titles.createSong")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("form.titles.createSong")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <SongForm
          mode="insert"
          asSheet={false}
          onSubmit={async () => {
            router.back()
          }}
        >
          {({ isSubmitting, isDirty, isValid, submit }) => (
            <View style={styles.footer}>
              <Button
                title={t("form.buttons.cancel")}
                variant="outline"
                onPress={() => router.back()}
                disabled={isSubmitting}
              />
              <Button
                title={t("form.buttons.create")}
                disabled={!isValid || !isDirty || isSubmitting}
                isLoading={isSubmitting}
                onPress={submit}
              />
            </View>
          )}
        </SongForm>
      </ScrollViewWithHeaders>
    </View>
  )
}

const insertSongStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  },
  footer: {
    flexDirection: "row",
    gap: theme.space(2),
    justifyContent: "flex-end",
    paddingTop: theme.space("lg")
  }
}))

export { InsertSong }
