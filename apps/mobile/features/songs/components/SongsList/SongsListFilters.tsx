import { useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { formatFilterDate, formatTime, parseTime } from "@repo/utils"

import {
  Badge,
  Button,
  Calendar,
  Fade,
  Icon,
  IconButton,
  KeyboardSpacer,
  Label,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverView,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetScrollView,
  SheetTitle,
  SheetTrigger,
  Switch,
  Text
} from "@components/ui"

import { type OrderableSongColumns } from "@repo/api"

const SongsListFilters = () => {
  const styles = useStyles(songsListFiltersStyles)

  const { t, i18n } = useTranslation()

  const [playedAfterOpen, setPlayedAfterOpen] = useState(false)
  const [playedBeforeOpen, setPlayedBeforeOpen] = useState(false)

  const { filters, orderBy, setFilters, clearFilters, setOrderBy } = useSongsStore(
    useShallow((state) => ({
      filters: state.filters,
      orderBy: state.orderBy,
      setFilters: state.setFilters,
      clearFilters: state.clearFilters,
      setOrderBy: state.setOrderBy
    }))
  )

  const defaultOrderBy = { column: "createdAt", direction: "desc" }
  const isOrderByDefault =
    !orderBy ||
    (orderBy.column === defaultOrderBy.column && orderBy.direction === defaultOrderBy.direction)

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    return key !== "search" && value !== undefined && value !== null && value !== ""
  }).length

  const hasActiveFilters = activeFiltersCount > 0 || !isOrderByDefault

  return (
    <View style={styles.container}>
      <Sheet>
        {hasActiveFilters && (
          <Badge
            variant="muted"
            style={styles.badge}
            title={(activeFiltersCount + (!isOrderByDefault ? 1 : 0)).toString()}
          />
        )}
        <SheetTrigger asChild>
          <IconButton name="Funnel" variant="ghost" />
        </SheetTrigger>
        <SheetContent enableDynamicSizing={false} snapPoints={["100%"]}>
          <View style={styles.sheetContainer}>
            <SheetHeader>
              <SheetTitle>{t("songs.filters.title")}</SheetTitle>
            </SheetHeader>
            <Separator />
            <SheetScrollView>
              <View style={styles.content}>
                <View style={styles.section}>
                  <Label>{t("songs.filters.sortBy")}</Label>
                  <View style={styles.sortRow}>
                    <View style={styles.sortColumn}>
                      <Select
                        value={orderBy?.column || "createdAt"}
                        onValueChange={(column) =>
                          setOrderBy({
                            column: column as OrderableSongColumns,
                            direction: orderBy?.direction || "desc"
                          })
                        }
                        getDisplayValue={(value) => {
                          const values = {
                            name: t("songs.filters.sortOptions.name"),
                            duration: t("songs.filters.sortOptions.duration"),
                            isFavorite: t("songs.filters.sortOptions.favorites"),
                            releaseYear: t("songs.filters.sortOptions.year"),
                            playCount: t("songs.filters.sortOptions.playCount"),
                            lastPlayedAt: t("songs.filters.sortOptions.lastPlayed"),
                            createdAt: t("songs.filters.sortOptions.createdAt"),
                            updatedAt: t("songs.filters.sortOptions.updatedAt")
                          }

                          return values[value as keyof typeof values] || value
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name" title={t("songs.filters.sortOptions.name")} />
                          <SelectItem
                            value="duration"
                            title={t("songs.filters.sortOptions.duration")}
                          />
                          <SelectItem
                            value="isFavorite"
                            title={t("songs.filters.sortOptions.favorites")}
                          />
                          <SelectItem
                            value="releaseYear"
                            title={t("songs.filters.sortOptions.year")}
                          />
                          <SelectItem
                            value="playCount"
                            title={t("songs.filters.sortOptions.playCount")}
                          />
                          <SelectItem
                            value="lastPlayedAt"
                            title={t("songs.filters.sortOptions.lastPlayed")}
                          />
                          <SelectItem
                            value="createdAt"
                            title={t("songs.filters.sortOptions.createdAt")}
                          />
                          <SelectItem
                            value="updatedAt"
                            title={t("songs.filters.sortOptions.updatedAt")}
                          />
                        </SelectContent>
                      </Select>
                    </View>
                    <View style={styles.sortDirection}>
                      <Select
                        value={orderBy?.direction || "desc"}
                        onValueChange={(direction) =>
                          setOrderBy({
                            column: orderBy?.column || "createdAt",
                            direction: direction as "asc" | "desc"
                          })
                        }
                        getDisplayValue={(value) => (
                          <Icon name={value === "asc" ? "ArrowUp" : "ArrowDown"} size="sm" />
                        )}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">
                            <Icon name="ArrowUp" size="sm" />
                          </SelectItem>
                          <SelectItem value="desc">
                            <Icon name="ArrowDown" size="sm" />
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRow}>
                  <View style={styles.switchLabel}>
                    <Label>{t("songs.filters.favorites")}</Label>
                    <Text size="xs" color="mutedForeground">
                      {t("songs.filters.favoritesDescription")}
                    </Text>
                  </View>
                  <Switch
                    checked={filters.isFavorite || false}
                    onCheckedChange={(checked) => setFilters({ isFavorite: checked || undefined })}
                  />
                </View>
                <View style={styles.switchRow}>
                  <View style={styles.switchLabel}>
                    <Label>{t("songs.filters.lyrics")}</Label>
                    <Text size="xs" color="mutedForeground">
                      {t("songs.filters.lyricsDescription")}
                    </Text>
                  </View>
                  <Switch
                    checked={filters.hasLyrics || false}
                    onCheckedChange={(checked) => setFilters({ hasLyrics: checked || undefined })}
                  />
                </View>
                <View style={styles.section}>
                  <Label>{t("songs.filters.releaseYear")}</Label>
                  <NumberInput
                    placeholder={t("songs.filters.releaseYear")}
                    value={
                      Array.isArray(filters.releaseYear)
                        ? undefined
                        : (filters.releaseYear ?? undefined)
                    }
                    onChange={(value) => setFilters({ releaseYear: value })}
                    min={1900}
                    max={new Date().getFullYear()}
                    step={1}
                  />
                </View>
                <View style={styles.section}>
                  <Label>{t("songs.filters.playCount")}</Label>
                  <View style={styles.rangeRow}>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.playCountMin")}
                      </Text>
                      <NumberInput
                        placeholder="0"
                        value={filters.minPlayCount ?? undefined}
                        onChange={(value) => setFilters({ minPlayCount: value })}
                        min={0}
                        step={1}
                      />
                    </View>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.playCountMax")}
                      </Text>
                      <NumberInput
                        placeholder="100"
                        value={filters.maxPlayCount ?? undefined}
                        onChange={(value) => setFilters({ maxPlayCount: value })}
                        min={0}
                        step={1}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.section}>
                  <Label>{t("songs.filters.duration")}</Label>
                  <View style={styles.rangeRow}>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.durationMin")}
                      </Text>
                      <NumberInput
                        placeholder="0:00"
                        value={filters.minDuration ?? undefined}
                        onChange={(value) => setFilters({ minDuration: value })}
                        min={0}
                        step={1}
                        format={formatTime}
                        parse={parseTime}
                      />
                    </View>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.durationMax")}
                      </Text>
                      <NumberInput
                        placeholder="5:00"
                        value={filters.maxDuration ?? undefined}
                        onChange={(value) => setFilters({ maxDuration: value })}
                        min={0}
                        step={1}
                        format={formatTime}
                        parse={parseTime}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.section}>
                  <Label>{t("songs.filters.lastPlayed")}</Label>
                  <View style={styles.rangeRow}>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.lastPlayedAfter")}
                      </Text>
                      <Popover open={playedAfterOpen} onOpenChange={setPlayedAfterOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            leftIcon="Calendar"
                            title={
                              filters.playedAfter
                                ? formatFilterDate(filters.playedAfter, i18n.language)
                                : t("songs.filters.selectDate")
                            }
                            containerStyle={styles.calendarButton}
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverView>
                            <Calendar
                              selected={filters.playedAfter}
                              onSelect={(date) => {
                                setFilters({ playedAfter: date })
                                setPlayedAfterOpen(false)
                              }}
                            />
                          </PopoverView>
                        </PopoverContent>
                      </Popover>
                    </View>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("songs.filters.lastPlayedBefore")}
                      </Text>
                      <Popover open={playedBeforeOpen} onOpenChange={setPlayedBeforeOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            leftIcon="Calendar"
                            title={
                              filters.playedBefore
                                ? formatFilterDate(filters.playedBefore, i18n.language)
                                : t("songs.filters.selectDate")
                            }
                            containerStyle={styles.calendarButton}
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverView>
                            <Calendar
                              selected={filters.playedBefore}
                              onSelect={(date) => {
                                setFilters({ playedBefore: date })
                                setPlayedBeforeOpen(false)
                              }}
                            />
                          </PopoverView>
                        </PopoverContent>
                      </Popover>
                    </View>
                  </View>
                </View>
              </View>
            </SheetScrollView>
            {hasActiveFilters && (
              <Fade style={styles.footer}>
                <Separator />
                <SheetFooter>
                  <Button
                    title={t("songs.filters.clear")}
                    variant="outline"
                    onPress={clearFilters}
                    leftIcon="Trash2"
                  />
                </SheetFooter>
              </Fade>
            )}
          </View>
          <KeyboardSpacer />
        </SheetContent>
      </Sheet>
    </View>
  )
}

const songsListFiltersStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  sheetContainer: {
    flex: 1
  },
  badge: {
    marginRight: theme.space("xs")
  },
  content: {
    gap: theme.space("lg"),
    padding: theme.space("lg")
  },
  section: {
    gap: theme.space("sm")
  },
  sortRow: {
    flexDirection: "row",
    gap: theme.space("sm")
  },
  sortColumn: {
    flex: 1
  },
  sortDirection: {
    width: theme.size(20)
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchLabel: {
    flex: 1,
    gap: theme.space("xs")
  },
  rangeRow: {
    flexDirection: "row",
    gap: theme.space("sm")
  },
  rangeInput: {
    flex: 1,
    gap: theme.space("xs")
  },
  calendarButton: {
    alignSelf: "stretch"
  },
  footer: {
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  }
}))

export { SongsListFilters }
