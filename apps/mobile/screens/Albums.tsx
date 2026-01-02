import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
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

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

const MOCK_ALBUMS = Array.from({ length: 50 }, (_, i) => ({
  id: String(i),
  title: `Album ${i + 1}`,
  artist: `Artist ${i + 1}`,
  year: 2020 + (i % 5)
}))

type Album = (typeof MOCK_ALBUMS)[0]

const Albums = () => {
  const styles = useStyles(albumsStyles)

  const { t } = useTranslation()

  const numColumns = useResponsiveColumns({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
    "2xl": 7
  })

  const renderItem = ({ item, index }: { item: Album; index: number }) => (
    <Pressable style={styles.albumItem(index, numColumns)}>
      <View style={styles.albumCover}>
        <Icon name="Music" size="3xl" color="mutedForeground" />
      </View>
      <View style={styles.albumInfoRow}>
        <View style={styles.albumInfo}>
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
      </View>
    </Pressable>
  )

  return (
    <FadingScreen style={styles.container}>
      <FlashListWithHeaders
        data={MOCK_ALBUMS}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("albums.title")}
              </Text>
            }
            headerLeft={
              <View style={styles.headerLeft}>
                <IconButton name="Plus" variant="ghost" onPress={() => console.log("Add album")} />
                <FadingView opacity={showHeader}>
                  <IconButton
                    name="Shuffle"
                    variant="text"
                    onPress={() => console.log("Shuffle")}
                  />
                </FadingView>
              </View>
            }
            headerRight={
              <View style={styles.viewModeContainer}>
                <IconButton
                  name="Grid3x3"
                  variant="ghost"
                  containerStyle={styles.viewModeActive}
                  onPress={() => console.log("Grid view")}
                />
                <IconButton name="List" variant="ghost" onPress={() => console.log("List view")} />
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
                {t("albums.title")}
              </Text>
            </View>
            <View style={styles.viewModeContainer}>
              <IconButton
                name="Grid3x3"
                variant="ghost"
                containerStyle={styles.viewModeActive}
                onPress={() => console.log("Grid view")}
              />
              <IconButton name="List" variant="ghost" onPress={() => console.log("List view")} />
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
    </FadingScreen>
  )
}

const albumsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1
  },
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
  albumItem: (index: number, numColumns: number) => {
    const itemSpacing = theme.space("lg")
    return viewStyle({
      flexDirection: "column",
      gap: theme.space("sm"),
      marginRight: itemSpacing,
      marginTop: index >= numColumns ? itemSpacing : 0
    })
  },
  albumCover: {
    aspectRatio: 1,
    borderRadius: theme.radius("md"),
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  albumInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  albumInfo: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { Albums }
