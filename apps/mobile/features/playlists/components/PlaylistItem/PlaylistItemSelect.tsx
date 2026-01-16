import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { formatDuration } from "@repo/utils"

import { buttonStyles, Checkbox, Pressable, Text, Thumbnail } from "@components/ui"

import { type Playlist } from "@repo/api"

type PlaylistItemSelectProps = {
  playlist: Playlist
  selected?: boolean
  onToggle?: () => void
}

const PlaylistItemSelect = memo(
  ({ playlist, selected = false, onToggle }: PlaylistItemSelectProps) => {
    const styles = useStyles(playlistItemSelectStyles)

    const buttonStyle = useStyles(buttonStyles)

    const { t } = useTranslation()

    return (
      <Pressable style={buttonStyle.button({ variant: "outline" })} onPress={onToggle}>
        <View style={styles.content}>
          <View style={styles.checkboxContainer}>
            <Checkbox checked={selected} onCheckedChange={onToggle} />
          </View>
          <Thumbnail
            fileName={playlist.thumbnail}
            placeholderIcon="ListMusic"
            recyclingKey={String(playlist.id)}
          />
          <View style={styles.infoContainer}>
            <Text weight="medium" numberOfLines={1}>
              {playlist.name}
            </Text>
            <Text size="xs" color="mutedForeground" numberOfLines={1}>
              {t("common.songsPlayed", { count: playlist.totalTracks })}
              {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }
)

const playlistItemSelectStyles = createStyleSheet(({ theme }) => ({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(3)
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { PlaylistItemSelect }
