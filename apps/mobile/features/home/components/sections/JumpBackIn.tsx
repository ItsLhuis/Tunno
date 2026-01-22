import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { SongItemCard } from "@features/songs/components"

import { type JumpBackIn as JumpBackInData } from "@repo/api"

type JumpBackInProps = {
  jumpBackIn: JumpBackInData
}

type JumpBackInItem = JumpBackInData["items"][number]

const JumpBackIn = ({ jumpBackIn }: JumpBackInProps) => {
  const styles = useStyles(jumpBackInStyles)

  const { t } = useTranslation()

  const keyExtractor = useCallback(
    (item: JumpBackInItem, index: number) => `${item.song.id}-${index}`,
    []
  )

  const renderItem = useCallback(
    ({ item }: { item: JumpBackInItem }) => (
      <View style={styles.carouselItem}>
        <SongItemCard song={item.song} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (jumpBackIn.totalItems === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.jumpBackIn.title")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.jumpBackIn.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={jumpBackIn.items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const jumpBackInStyles = createStyleSheet(({ theme }) => ({
  section: {
    gap: theme.space()
  },
  sectionHeader: {
    paddingHorizontal: theme.space("lg"),
    gap: theme.space("xs")
  },
  carouselContentContainer: {
    paddingHorizontal: theme.space("lg")
  },
  carouselItem: {
    width: 160
  }
}))

export { JumpBackIn }
