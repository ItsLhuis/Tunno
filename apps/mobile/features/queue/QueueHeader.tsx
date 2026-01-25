import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { LargeHeader, Text } from "@components/ui"

import { formatNumber } from "@repo/utils"

type QueueHeaderProps = {
  songCount: number
  totalInQueue: number
}

const QueueHeader = ({ songCount, totalInQueue }: QueueHeaderProps) => {
  const styles = useStyles(queueHeaderStyles)

  const { t } = useTranslation()

  return (
    <LargeHeader>
      <View style={styles.container}>
        <Text variant="h1">{t("common.queue")}</Text>
        <Text size="sm" color="mutedForeground">
          {songCount === totalInQueue
            ? t("common.songsPlayed", { count: totalInQueue })
            : t("common.showingOfTotal", {
                showing: formatNumber(songCount),
                total: formatNumber(totalInQueue)
              })}
        </Text>
      </View>
    </LargeHeader>
  )
}

const queueHeaderStyles = createStyleSheet(() => ({
  container: {
    flex: 1,
    gap: 8
  }
}))

export { QueueHeader }
