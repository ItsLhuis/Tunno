import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { formatNumber } from "@repo/utils"

import { View } from "react-native"

import { FlashList } from "@shopify/flash-list"

import { FadingScreen } from "@components/navigation"
import {
  Header,
  Icon,
  IconButton,
  LargeHeader,
  Pressable,
  ScrollViewWithHeaders,
  Text
} from "@components/ui"

import { useRouter } from "expo-router"

const MOCK_STATS = {
  totalSongs: 1234,
  totalAlbums: 456,
  totalPlaylists: 23,
  totalArtists: 567,
  totalPlayCount: 45678,
  totalPlayTime: 234567890
}

const MOCK_SONGS = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`
}))

const MOCK_PLAYLISTS = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  title: `Playlist ${i + 1}`,
  songCount: Math.floor(Math.random() * 50) + 10
}))

const MOCK_ALBUMS = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  title: `Album ${i + 1}`,
  artist: `Artist ${i + 1}`,
  year: 2020 + (i % 5)
}))

const MOCK_ARTISTS = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  name: `Artist ${i + 1}`,
  albumCount: Math.floor(Math.random() * 20) + 5
}))

const Home = () => {
  const styles = useStyles(homeStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const renderStatsSection = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text variant="h1">{t("home.yourStats.title")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.yourStats.description")}
        </Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="Music" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              {t("songs.title")}
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalSongs)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="Disc" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              {t("albums.title")}
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalAlbums)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="List" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              {t("playlists.title")}
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalPlaylists)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="Users" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              {t("artists.title")}
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalArtists)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="Play" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              Total Plays
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalPlayCount)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="Clock" size="lg" color="mutedForeground" />
            <Text size="xs" weight="bold" color="mutedForeground">
              Listen Time
            </Text>
          </View>
          <Text weight="bold" size="lg">
            {formatNumber(MOCK_STATS.totalPlayTime)}
          </Text>
        </View>
      </View>
    </View>
  )

  const renderSongItem = ({ item, index }: { item: (typeof MOCK_SONGS)[0]; index: number }) => (
    <Pressable style={styles.cardItem(index)}>
      <View style={styles.cardThumbnail}>
        <Icon name="Music" size="xl" color="mutedForeground" />
      </View>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfo}>
          <Text numberOfLines={1} weight="medium" size="sm">
            {item.title}
          </Text>
          <Text numberOfLines={1} size="xs" color="mutedForeground">
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

  const renderPlaylistItem = ({
    item,
    index
  }: {
    item: (typeof MOCK_PLAYLISTS)[0]
    index: number
  }) => (
    <Pressable style={styles.cardItem(index)}>
      <View style={styles.cardThumbnail}>
        <Icon name="List" size="xl" color="mutedForeground" />
      </View>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfo}>
          <Text numberOfLines={1} weight="medium" size="sm">
            {item.title}
          </Text>
          <Text numberOfLines={1} size="xs" color="mutedForeground">
            {item.songCount} songs
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

  const renderAlbumItem = ({ item, index }: { item: (typeof MOCK_ALBUMS)[0]; index: number }) => (
    <Pressable style={styles.cardItem(index)}>
      <View style={styles.cardThumbnail}>
        <Icon name="Disc" size="xl" color="mutedForeground" />
      </View>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfo}>
          <Text numberOfLines={1} weight="medium" size="sm">
            {item.title}
          </Text>
          <Text numberOfLines={1} size="xs" color="mutedForeground">
            {item.artist} • {item.year}
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

  const renderArtistItem = ({ item, index }: { item: (typeof MOCK_ARTISTS)[0]; index: number }) => (
    <Pressable style={styles.artistItem(index)}>
      <View style={styles.artistThumbnail}>
        <Icon name="User" size="2xl" color="mutedForeground" />
      </View>
      <View style={styles.artistInfoRow}>
        <View style={styles.artistInfo}>
          <Text numberOfLines={1} weight="medium" size="sm">
            {item.name}
          </Text>
          <Text numberOfLines={1} size="xs" color="mutedForeground">
            {item.albumCount} albums
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

  const renderHorizontalSection = (
    title: string,
    description: string,
    data: any[],
    renderItem: any
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h1">{title}</Text>
        <Text size="sm" color="mutedForeground">
          {description}
        </Text>
      </View>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
      />
    </View>
  )

  return (
    <FadingScreen style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("home.title")}
              </Text>
            }
            headerRight={
              <IconButton
                name="Settings"
                variant="ghost"
                onPress={() => router.push("/settings")}
              />
            }
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader style={styles.largeHeader}>
            <Text size="8xl" weight="bold" style={styles.largeHeaderTitle}>
              {t("home.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        {renderStatsSection()}
        {renderHorizontalSection(
          t("home.jumpBackIn.title"),
          t("home.jumpBackIn.description"),
          MOCK_SONGS,
          renderSongItem
        )}
        {renderHorizontalSection(
          t("home.onRepeat.title"),
          t("home.onRepeat.description"),
          MOCK_SONGS.slice(0, 5),
          renderSongItem
        )}
        {renderHorizontalSection(
          t("home.yourPlaylists.title"),
          t("home.yourPlaylists.description"),
          MOCK_PLAYLISTS,
          renderPlaylistItem
        )}
        {renderHorizontalSection(
          t("home.newReleases.title"),
          t("home.newReleases.description"),
          MOCK_ALBUMS,
          renderAlbumItem
        )}
        {renderHorizontalSection(
          t("home.favoriteArtists.title"),
          t("home.favoriteArtists.description"),
          MOCK_ARTISTS,
          renderArtistItem
        )}
        {renderHorizontalSection(
          t("home.topAlbums.title"),
          t("home.topAlbums.description"),
          MOCK_ALBUMS,
          renderAlbumItem
        )}
        {renderHorizontalSection(
          t("home.hiddenGems.title"),
          t("home.hiddenGems.description"),
          MOCK_SONGS.slice(0, 10),
          renderSongItem
        )}
        {renderHorizontalSection(
          t("home.recentlyAdded.title"),
          t("home.recentlyAdded.description"),
          MOCK_SONGS.slice(0, 10),
          renderSongItem
        )}
        {renderHorizontalSection(
          t("home.discover.title"),
          t("home.discover.description"),
          MOCK_SONGS.slice(0, 10),
          renderSongItem
        )}
      </ScrollViewWithHeaders>
    </FadingScreen>
  )
}

const homeStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingBottom: theme.space("lg")
  },
  largeHeader: {
    paddingHorizontal: theme.space("lg")
  },
  largeHeaderTitle: {
    lineHeight: undefined
  },
  section: {
    marginTop: theme.space("lg")
  },
  sectionHeader: {
    marginBottom: theme.space(),
    paddingHorizontal: theme.space("lg")
  },
  horizontalListContent: {
    paddingHorizontal: theme.space("lg")
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.space("lg"),
    gap: theme.space()
  },
  statItem: {
    flex: 1,
    minWidth: "30%",
    padding: theme.space(),
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius(),
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    gap: theme.space()
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("xs")
  },
  cardItem: (index: number) => {
    const itemSpacing = theme.space()
    return viewStyle({
      width: 140,
      gap: theme.space("sm"),
      marginLeft: index > 0 ? itemSpacing : 0
    })
  },
  cardThumbnail: {
    aspectRatio: 1,
    borderRadius: theme.radius(),
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  cardInfo: {
    flex: 1,
    gap: theme.space("xs")
  },
  artistItem: (index: number) => {
    const itemSpacing = theme.space()
    return viewStyle({
      width: 140,
      gap: theme.space("sm"),
      alignItems: "center",
      marginLeft: index > 0 ? itemSpacing : 0
    })
  },
  artistThumbnail: {
    width: 140,
    height: 140,
    borderRadius: theme.radius("full"),
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.muted,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  artistInfoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  artistInfo: {
    flex: 1,
    alignItems: "center"
  }
}))

export { Home }
