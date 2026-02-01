import { useCallback, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useLocalSearchParams } from "expo-router"

import { useFetchSongByIdWithAllRelations } from "../../hooks/useFetchSongByIdWithAllRelations"

import { formatTime } from "@repo/utils"

import {
  AsyncState,
  Carousel,
  CarouselContent,
  RefreshControl,
  ScrollViewWithHeaders,
  Text,
  type ScrollHeaderProps
} from "@components/ui"

import { AlbumItemCard } from "@features/albums/components/AlbumItem"
import { ArtistItemCard } from "@features/artists/components/ArtistItem"
import { PlaylistItemCard } from "@features/playlists/components/PlaylistItem"

import { SongItemList } from "../SongItem"
import { SongInfoHeader } from "./SongInfoHeader"
import { SongInfoStickyHeader } from "./SongInfoStickyHeader"

const SongInfo = () => {
  const styles = useStyles(songInfoStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const { t } = useTranslation()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: song,
    isLoading: isSongLoading,
    isError: isSongError,
    refetch
  } = useFetchSongByIdWithAllRelations(Number(id))

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }, [refetch])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => {
      if (!song) return null
      return <SongInfoStickyHeader song={song} scrollY={scrollY} showHeader={showHeader} />
    },
    [song]
  )

  const LargeHeaderComponent = useCallback(() => {
    if (!song) return null
    return <SongInfoHeader song={song} />
  }, [song])

  return (
    <AsyncState data={song} isLoading={isSongLoading} isError={isSongError}>
      {(data) => (
        <ScrollViewWithHeaders
          HeaderComponent={HeaderComponent}
          LargeHeaderComponent={LargeHeaderComponent}
          disableAutoFixScroll
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        >
          <View style={styles.content}>
            <View style={[styles.section, styles.sectionPadded]}>
              <SongItemList song={data} allSongIds={[data.id]} />
            </View>
            {data.album && (
              <View style={[styles.section, styles.sectionPadded]}>
                <Text variant="h3">{t("common.album")}</Text>
                <View style={styles.albumContainer}>
                  <AlbumItemCard album={data.album} />
                </View>
              </View>
            )}
            {data.artists.length > 0 && (
              <View style={styles.section}>
                <Text variant="h3" style={styles.sectionTitle}>
                  {t("artists.title")}
                </Text>
                <Carousel>
                  <CarouselContent
                    data={data.artists}
                    contentContainerStyle={styles.carouselContentContainer}
                    renderItem={({ item }) => (
                      <View style={styles.carouselItem}>
                        <ArtistItemCard artist={item.artist} />
                      </View>
                    )}
                  />
                </Carousel>
              </View>
            )}
            {data.playlists && data.playlists.length > 0 && (
              <View style={styles.section}>
                <Text variant="h3" style={styles.sectionTitle}>
                  {t("common.appearsIn")}
                </Text>
                <Carousel>
                  <CarouselContent
                    data={data.playlists}
                    contentContainerStyle={styles.carouselContentContainer}
                    renderItem={({ item }) => (
                      <View style={styles.carouselItem}>
                        <PlaylistItemCard playlist={item.playlist} />
                      </View>
                    )}
                  />
                </Carousel>
              </View>
            )}
            {data.lyrics && Array.isArray(data.lyrics) && data.lyrics.length > 0 && (
              <View style={[styles.section, styles.sectionPadded]}>
                <Text variant="h3">{t("form.labels.lyrics")}</Text>
                <View style={styles.lyricsContainer}>
                  {data.lyrics.map((line) => (
                    <View key={line.startTime} style={styles.lyricLine}>
                      <Text size="sm" color="mutedForeground">
                        [{formatTime(line.startTime)}]
                      </Text>
                      <Text size="sm">-</Text>
                      <Text size="sm" style={styles.lyricText}>
                        {line.text || "..."}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollViewWithHeaders>
      )}
    </AsyncState>
  )
}

const songInfoStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1
  },
  content: {
    paddingBottom: theme.space("lg") + runtime.insets.bottom,
    gap: theme.space("lg")
  },
  section: {
    gap: theme.space()
  },
  sectionPadded: {
    paddingHorizontal: theme.space("lg")
  },
  sectionTitle: {
    paddingHorizontal: theme.space("lg")
  },
  albumContainer: {
    width: 180
  },
  carouselContentContainer: {
    paddingHorizontal: theme.space("lg")
  },
  carouselItem: {
    width: 180
  },
  lyricsContainer: {
    gap: theme.space("sm")
  },
  lyricLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.space("sm")
  },
  lyricText: {
    flex: 1
  }
}))

export { SongInfo }
