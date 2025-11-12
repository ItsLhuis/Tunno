import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import {
  Badge,
  Button,
  Fade,
  Icon,
  Label,
  NumberInput,
  ScrollArea,
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
  SheetTitle,
  SheetTrigger,
  Switch,
  Typography
} from "@components/ui"

import { type OrderableAlbumColumns } from "@repo/api"

const AlbumsListFilters = () => {
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

  const defaultOrderBy = { column: "createdAt", direction: "desc" as const }
  const isOrderByDefault =
    !orderBy ||
    (orderBy.column === defaultOrderBy.column && orderBy.direction === defaultOrderBy.direction)

  const hasActiveFilters =
    Object.entries(filters).some(([key, value]) => {
      return key !== "search" && value !== undefined && value !== null && value !== ""
    }) || !isOrderByDefault

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        {hasActiveFilters && (
          <Badge variant="muted">
            {Object.entries(filters).filter(([key, value]) => {
              return key !== "search" && value !== undefined && value !== null && value !== ""
            }).length + (!isOrderByDefault ? 1 : 0)}
          </Badge>
        )}
        <SheetTrigger asChild>
          <Button
            tooltip={t("albums.filters.title")}
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Icon name="Filter" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-0 p-0">
          <SheetHeader className="flex max-h-full flex-col items-start justify-between p-6">
            <SheetTitle>{t("albums.filters.title")}</SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="h-full">
            <div className="space-y-8 p-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.sortBy")}</Label>
                <div className="flex gap-2">
                  <Select
                    value={(orderBy?.column as string) || "createdAt"}
                    onValueChange={(column) =>
                      setOrderBy({
                        column: column as OrderableAlbumColumns,
                        direction: orderBy?.direction || "desc"
                      })
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t("albums.filters.sortOptions.name")}</SelectItem>
                      <SelectItem value="isFavorite">
                        {t("albums.filters.sortOptions.favorites")}
                      </SelectItem>
                      <SelectItem value="playCount">
                        {t("albums.filters.sortOptions.playCount")}
                      </SelectItem>
                      <SelectItem value="lastPlayedAt">
                        {t("albums.filters.sortOptions.lastPlayed")}
                      </SelectItem>
                      <SelectItem value="createdAt">
                        {t("albums.filters.sortOptions.createdAt")}
                      </SelectItem>
                      <SelectItem value="updatedAt">
                        {t("albums.filters.sortOptions.updatedAt")}
                      </SelectItem>
                      <SelectItem value="totalTracks">
                        {t("albums.filters.sortOptions.totalTracks")}
                      </SelectItem>
                      <SelectItem value="totalDuration">
                        {t("albums.filters.sortOptions.totalDuration")}
                      </SelectItem>
                      <SelectItem value="releaseYear">
                        {t("albums.filters.sortOptions.releaseYear")}
                      </SelectItem>
                      <SelectItem value="albumType">{t("albums.filters.albumType")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={orderBy?.direction || "desc"}
                    onValueChange={(direction) =>
                      setOrderBy({
                        column: (orderBy?.column as OrderableAlbumColumns) || "createdAt",
                        direction: direction as "asc" | "desc"
                      })
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">
                        <Icon name="ArrowUp" />
                      </SelectItem>
                      <SelectItem value="desc">
                        <Icon name="ArrowDown" />
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="favorites" className="flex flex-col gap-2">
                  {t("albums.filters.favorites")}
                  <Typography affects={["small", "muted"]}>
                    {t("albums.filters.favoritesDescription")}
                  </Typography>
                </Label>
                <Switch
                  id="favorites"
                  checked={filters.isFavorite || false}
                  onCheckedChange={(checked: boolean) =>
                    setFilters({ isFavorite: checked || undefined })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.albumType")}</Label>
                <Select
                  value={(filters.albumType as string) || "all"}
                  onValueChange={(value) =>
                    setFilters({
                      albumType:
                        value === "all" ? undefined : (value as "single" | "album" | "compilation")
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("albums.filters.all")}</SelectItem>
                    <SelectItem value="single">{t("albums.filters.single")}</SelectItem>
                    <SelectItem value="album">{t("albums.filters.album")}</SelectItem>
                    <SelectItem value="compilation">{t("albums.filters.compilation")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.releaseYear")}</Label>
                <NumberInput
                  placeholder="2023"
                  value={(filters.releaseYear as number) || undefined}
                  onChange={(value) => setFilters({ releaseYear: value })}
                  min={1900}
                  max={new Date().getFullYear()}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.playCount")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.playCountMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minPlayCount ?? undefined}
                      onChange={(value) => setFilters({ minPlayCount: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.playCountMax")}
                    </Label>
                    <NumberInput
                      placeholder="100"
                      value={filters.maxPlayCount ?? undefined}
                      onChange={(value) => setFilters({ maxPlayCount: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.totalTracks")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.totalTracksMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minTotalTracks ?? undefined}
                      onChange={(value) => setFilters({ minTotalTracks: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.totalTracksMax")}
                    </Label>
                    <NumberInput
                      placeholder="100"
                      value={filters.maxTotalTracks ?? undefined}
                      onChange={(value) => setFilters({ maxTotalTracks: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("albums.filters.totalDuration")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.totalDurationMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minTotalDuration ?? undefined}
                      onChange={(value) => setFilters({ minTotalDuration: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {t("albums.filters.totalDurationMax")}
                    </Label>
                    <NumberInput
                      placeholder="3600"
                      value={filters.maxTotalDuration ?? undefined}
                      onChange={(value) => setFilters({ maxTotalDuration: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          {hasActiveFilters && (
            <Fade>
              <Separator />
              <SheetFooter className="p-6">
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <Icon name="Trash2" />
                  {t("albums.filters.clear")}
                </Button>
              </SheetFooter>
            </Fade>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { AlbumsListFilters }
