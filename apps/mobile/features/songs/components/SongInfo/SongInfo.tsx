import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useLocalSearchParams } from "expo-router"

import { useFetchSongByIdWithAllRelations } from "../../hooks/useFetchSongByIdWithAllRelations"

import { formatTime } from "@repo/utils"

import { AsyncState, ScrollViewWithHeaders, Text, type ScrollHeaderProps } from "@components/ui"

import { SongItemList } from "../SongItem"
import { SongInfoHeader } from "./SongInfoHeader"
import { SongInfoStickyHeader } from "./SongInfoStickyHeader"

const SongInfo = () => {
  const styles = useStyles(songInfoStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const { t } = useTranslation()

  const {
    data: song,
    isLoading: isSongLoading,
    isError: isSongError
  } = useFetchSongByIdWithAllRelations(Number(id))

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
          absoluteHeader
          contentContainerStyle={styles.content}
        >
          <View style={styles.section}>
            <SongItemList song={data} allSongIds={[data.id]} />
          </View>
          {/* {data.album && (
            <View style={styles.section}>
              <Text variant="h3">{t("common.album")}</Text>
              <AlbumItemCard album={data.album} />
            </View>
          )} */}
          {/* {data.artists.length > 0 && (
            <View style={styles.section}>
              <Text variant="h3">{t("artists.title")}</Text>
              <Carousel>
                {data.artists.map((artist) => (
                  <ArtistItemCard key={artist.artistId} artist={artist.artist} />
                ))}
              </Carousel>
            </View>
          )} */}
          {/* {data.playlists && data.playlists.length > 0 && (
            <View style={styles.section}>
              <Text variant="h3">{t("common.appearsIn")}</Text>
              <Carousel>
                {data.playlists.map((playlist) => (
                  <PlaylistItemCard key={playlist.playlistId} playlist={playlist.playlist} />
                ))}
              </Carousel>
            </View>
          )} */}
          {data.lyrics && Array.isArray(data.lyrics) && data.lyrics.length > 0 && (
            <View style={styles.section}>
              <Text variant="h3">{t("form.labels.lyrics")}</Text>
              <View style={styles.lyricsContainer}>
                {data.lyrics.map((line, index) => (
                  <View key={index} style={styles.lyricLine}>
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
        </ScrollViewWithHeaders>
      )}
    </AsyncState>
  )
}

const songInfoStyles = createStyleSheet(({ theme }) => ({
  content: {
    padding: theme.space("lg"),
    gap: theme.space("lg")
  },
  section: {
    gap: theme.space()
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
