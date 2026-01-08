import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import {
  Badge,
  Button,
  Fade,
  Icon,
  IconButton,
  KeyboardSpacer,
  Label,
  NumberInput,
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

import { type OrderableAlbumColumns } from "@repo/api"

const AlbumsListFilters = () => {
  const styles = useStyles(albumsListFiltersStyles)

  const { t } = useTranslation()

  const { filters, orderBy, setFilters, clearFilters, setOrderBy } = useAlbumsStore(
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
              <SheetTitle>{t("albums.filters.title")}</SheetTitle>
            </SheetHeader>
            <Separator />
            <SheetScrollView>
              <View style={styles.content}>
                <View style={styles.section}>
                  <Label>{t("albums.filters.sortBy")}</Label>
                  <View style={styles.sortRow}>
                    <View style={styles.sortColumn}>
                      <Select
                        value={orderBy?.column || "createdAt"}
                        onValueChange={(column) =>
                          setOrderBy({
                            column: column as OrderableAlbumColumns,
                            direction: orderBy?.direction || "desc"
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name" title={t("albums.filters.sortOptions.name")} />
                          <SelectItem
                            value="isFavorite"
                            title={t("albums.filters.sortOptions.favorites")}
                          />
                          <SelectItem
                            value="playCount"
                            title={t("albums.filters.sortOptions.playCount")}
                          />
                          <SelectItem
                            value="lastPlayedAt"
                            title={t("albums.filters.sortOptions.lastPlayed")}
                          />
                          <SelectItem
                            value="createdAt"
                            title={t("albums.filters.sortOptions.createdAt")}
                          />
                          <SelectItem
                            value="updatedAt"
                            title={t("albums.filters.sortOptions.updatedAt")}
                          />
                          <SelectItem
                            value="totalTracks"
                            title={t("albums.filters.sortOptions.totalTracks")}
                          />
                          <SelectItem
                            value="totalDuration"
                            title={t("albums.filters.sortOptions.totalDuration")}
                          />
                          <SelectItem
                            value="releaseYear"
                            title={t("albums.filters.sortOptions.releaseYear")}
                          />
                          <SelectItem value="albumType" title={t("albums.filters.albumType")} />
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
                    <Label>{t("albums.filters.favorites")}</Label>
                    <Text size="xs" color="mutedForeground">
                      {t("albums.filters.favoritesDescription")}
                    </Text>
                  </View>
                  <Switch
                    checked={filters.isFavorite || false}
                    onCheckedChange={(checked) => setFilters({ isFavorite: checked || undefined })}
                  />
                </View>
                <View style={styles.section}>
                  <Label>{t("albums.filters.albumType")}</Label>
                  <Select
                    value={(filters.albumType as string) || "all"}
                    onValueChange={(value) =>
                      setFilters({
                        albumType:
                          value === "all"
                            ? undefined
                            : (value as "single" | "album" | "compilation")
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" title={t("albums.filters.all")} />
                      <SelectItem value="single" title={t("albums.filters.single")} />
                      <SelectItem value="album" title={t("albums.filters.album")} />
                      <SelectItem value="compilation" title={t("albums.filters.compilation")} />
                    </SelectContent>
                  </Select>
                </View>
                <View style={styles.section}>
                  <Label>{t("albums.filters.releaseYear")}</Label>
                  <NumberInput
                    placeholder={t("albums.filters.releaseYear")}
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
                  <Label>{t("albums.filters.playCount")}</Label>
                  <View style={styles.rangeRow}>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("albums.filters.playCountMin")}
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
                        {t("albums.filters.playCountMax")}
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
                  <Label>{t("albums.filters.totalTracks")}</Label>
                  <View style={styles.rangeRow}>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("albums.filters.totalTracksMin")}
                      </Text>
                      <NumberInput
                        placeholder="0"
                        value={filters.minTotalTracks ?? undefined}
                        onChange={(value) => setFilters({ minTotalTracks: value })}
                        min={0}
                        step={1}
                      />
                    </View>
                    <View style={styles.rangeInput}>
                      <Text size="xs" color="mutedForeground">
                        {t("albums.filters.totalTracksMax")}
                      </Text>
                      <NumberInput
                        placeholder="100"
                        value={filters.maxTotalTracks ?? undefined}
                        onChange={(value) => setFilters({ maxTotalTracks: value })}
                        min={0}
                        step={1}
                      />
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
                    title={t("albums.filters.clear")}
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

const albumsListFiltersStyles = createStyleSheet(({ theme, runtime }) => ({
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
  footer: {
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  }
}))

export { AlbumsListFilters }
