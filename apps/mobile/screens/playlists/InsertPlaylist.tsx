import { View } from "react-native"

import { useRouter } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton, FadingScreen } from "@components/navigation"
import { Button, Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { PlaylistForm } from "@features/playlists/forms"

const InsertPlaylist = () => {
  const styles = useStyles(insertPlaylistStyles)

  const router = useRouter()

  const { t } = useTranslation()

  return (
    <FadingScreen style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("form.titles.createPlaylist")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("form.titles.createPlaylist")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <PlaylistForm
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
        </PlaylistForm>
      </ScrollViewWithHeaders>
    </FadingScreen>
  )
}

const insertPlaylistStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    flexGrow: 1,
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

export { InsertPlaylist }
