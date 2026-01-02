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

const MOCK_ARTISTS = Array.from({ length: 50 }, (_, i) => ({
  id: String(i),
  name: `Artist ${i + 1}`,
  albums: Math.floor(Math.random() * 20) + 1,
  songs: Math.floor(Math.random() * 100) + 10
}))

type Artist = (typeof MOCK_ARTISTS)[0]

const Artists = () => {
  const styles = useStyles(artistsStyles)

  const { t } = useTranslation()

  const numColumns = useResponsiveColumns({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
    "2xl": 7
  })

  const renderItem = ({ item, index }: { item: Artist; index: number }) => (
    <Pressable style={styles.artistItem(index, numColumns)}>
      <View style={styles.artistAvatar}>
        <Icon name="User" size="3xl" color="mutedForeground" />
      </View>
      <View style={styles.artistInfoRow}>
        <View style={styles.artistInfo}>
          <Text numberOfLines={1} weight="medium">
            {item.name}
          </Text>
          <Text size="xs" color="mutedForeground" numberOfLines={1}>
            {item.albums} {item.albums === 1 ? "album" : "albums"}
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
        data={MOCK_ARTISTS}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("artists.title")}
              </Text>
            }
            headerLeft={
              <View style={styles.headerLeft}>
                <IconButton name="Plus" variant="ghost" onPress={() => console.log("Add artist")} />
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
                {t("artists.title")}
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

const artistsStyles = createStyleSheet(({ theme }) => ({
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
  artistItem: (index: number, numColumns: number) => {
    const itemSpacing = theme.space("lg")
    return viewStyle({
      flexDirection: "column",
      gap: theme.space("sm"),
      marginRight: itemSpacing,
      marginTop: index >= numColumns ? itemSpacing : 0
    })
  },
  artistAvatar: {
    aspectRatio: 1,
    borderRadius: theme.radius("full"),
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  artistInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  artistInfo: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { Artists }
