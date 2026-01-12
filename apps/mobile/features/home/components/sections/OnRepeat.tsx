import { useMemo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Text } from "@components/ui"

import { SongItemList } from "@features/songs/components"

import { type OnRepeat as OnRepeatData } from "@repo/api"

type OnRepeatProps = {
  onRepeat: OnRepeatData
}

const OnRepeat = ({ onRepeat }: OnRepeatProps) => {
  const styles = useStyles(onRepeatStyles)

  const { t } = useTranslation()

  const allSongIds = useMemo(() => onRepeat.songs.map((song) => song.id), [onRepeat.songs])

  if (onRepeat.totalSongs === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.onRepeat.title", "On Repeat")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.onRepeat.description")}
        </Text>
      </View>
      <View style={styles.songsList}>
        {onRepeat.songs.map((song, index) => (
          <SongItemList key={`${song.id}-${index}`} song={song} allSongIds={allSongIds} />
        ))}
      </View>
    </View>
  )
}

const onRepeatStyles = createStyleSheet(({ theme }) => ({
  section: {
    gap: theme.space()
  },
  sectionHeader: {
    paddingHorizontal: theme.space("lg"),
    gap: theme.space("xs")
  },
  songsList: {
    paddingHorizontal: theme.space("lg"),
    gap: theme.space()
  }
}))

export { OnRepeat }
