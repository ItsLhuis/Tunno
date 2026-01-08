import { View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton, FadingScreen } from "@components/navigation"
import { Button, Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { AlbumForm } from "@features/albums/forms"

const UpdateAlbum = () => {
  const styles = useStyles(updateAlbumStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const router = useRouter()

  const { t } = useTranslation()

  const albumId = Number(id)

  return (
    <FadingScreen style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("form.titles.updateAlbum")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("form.titles.updateAlbum")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <AlbumForm
          mode="update"
          albumId={albumId}
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
                title={t("form.buttons.update")}
                disabled={!isValid || !isDirty || isSubmitting}
                isLoading={isSubmitting}
                onPress={submit}
              />
            </View>
          )}
        </AlbumForm>
      </ScrollViewWithHeaders>
    </FadingScreen>
  )
}

const updateAlbumStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { UpdateAlbum }
