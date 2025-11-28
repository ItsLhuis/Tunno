import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import {
  FadingView,
  FlashListWithHeaders,
  Header,
  Icon,
  IconButton,
  LargeHeader,
  LargeHeaderSubtitle,
  Pressable,
  SearchInput,
  Text
} from "@components/ui"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

const MOCK_SONGS = Array.from({ length: 50 }, (_, i) => ({
  id: String(i),
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  album: `Album ${i + 1}`
}))

type Song = (typeof MOCK_SONGS)[0]

const Songs = () => {
  const styles = useStyles(songsStyles)

  const { t } = useTranslation()

  const renderItem = ({ item, index }: { item: Song; index: number }) => (
    <Pressable style={styles.songItem(index)}>
      <View style={styles.songIconContainer}>
        <Icon name="Music" size="xl" color="mutedForeground" />
      </View>
      <View style={styles.songInfo}>
        <Text numberOfLines={1} weight="medium">
          {item.title}
        </Text>
        <Text size="xs" color="mutedForeground" numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <IconButton
        name="Ellipsis"
        variant="ghost"
        onPress={() => console.log("More options:", item.id)}
      />
    </Pressable>
  )

  return (
    <FlashListWithHeaders
      renderScrollComponent={(props) => <KeyboardAwareScrollView {...props} bottomOffset={62} />}
      data={MOCK_SONGS}
      renderItem={renderItem}
      HeaderComponent={({ scrollY, showHeader }) => (
        <Header
          scrollY={scrollY}
          showHeader={showHeader}
          headerCenter={
            <Text weight="semibold" numberOfLines={1}>
              {t("songs.title")}
            </Text>
          }
          headerLeft={
            <View style={styles.headerLeft}>
              <IconButton name="Plus" variant="ghost" onPress={() => console.log("Add song")} />
              <FadingView opacity={showHeader}>
                <IconButton name="Shuffle" variant="text" onPress={() => console.log("Shuffle")} />
              </FadingView>
            </View>
          }
          headerRight={
            <View style={styles.viewModeContainer}>
              <IconButton name="Grid3x3" variant="ghost" onPress={() => console.log("Grid view")} />
              <IconButton
                name="List"
                variant="ghost"
                containerStyle={styles.viewModeActive}
                onPress={() => console.log("List view")}
              />
            </View>
          }
          headerRightFadesIn
        />
      )}
      LargeHeaderComponent={() => (
        <LargeHeader style={styles.largeHeader}>
          <View style={styles.largeHeaderLeft}>
            <IconButton name="Shuffle" style={styles.largeHeaderIcon} iconSize="3xl" />
            <Text variant="h1" numberOfLines={1} style={styles.largeHeaderTitle}>
              {t("songs.title")}
            </Text>
          </View>
          <View style={styles.viewModeContainer}>
            <IconButton name="Grid3x3" variant="ghost" onPress={() => console.log("Grid view")} />
            <IconButton
              name="List"
              variant="ghost"
              containerStyle={styles.viewModeActive}
              onPress={() => console.log("List view")}
            />
          </View>
        </LargeHeader>
      )}
      LargeHeaderSubtitleComponent={() => (
        <LargeHeaderSubtitle style={styles.largeHeaderSubtitle}>
          <SearchInput
            placeholder="Search"
            renderRight={<IconButton name="Funnel" variant="ghost" />}
          />
        </LargeHeaderSubtitle>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  )
}

const songsStyles = createStyleSheet(({ theme }) => ({
  contentContainerStyle: {
    paddingLeft: theme.space("lg"),
    paddingBottom: theme.space("lg")
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  },
  viewModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    padding: theme.space("xs")
  },
  viewModeActive: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius()
  },
  largeHeader: {
    paddingRight: theme.space("lg")
  },
  largeHeaderSubtitle: {
    paddingRight: theme.space("lg")
  },
  largeHeaderLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  largeHeaderTitle: {
    flex: 1
  },
  largeHeaderIcon: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius("full")
  },
  songItem: (index: number) => {
    const itemSpacing = theme.space("lg")
    return viewStyle({
      flexDirection: "row",
      alignItems: "center",
      gap: theme.space("md"),
      marginRight: itemSpacing,
      marginTop: index > 0 ? itemSpacing : 0
    })
  },
  songIconContainer: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius("md"),
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  songInfo: {
    flex: 1
  }
}))

export { Songs }
