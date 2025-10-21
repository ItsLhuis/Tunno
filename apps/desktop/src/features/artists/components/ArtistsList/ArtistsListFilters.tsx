import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

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

const ArtistsListFilters = () => {
  const { t } = useTranslation()

  const { filters, orderBy, setFilters, clearFilters, setOrderBy } = useArtistsStore(
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
            tooltip={t("artists.filters.title")}
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Icon name="Filter" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-0 p-0">
          <SheetHeader className="flex max-h-full flex-col items-start justify-between p-6">
            <SheetTitle>{t("artists.filters.title")}</SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="h-full">
            <div className="space-y-8 p-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("artists.filters.sortBy")}</Label>
                <div className="flex gap-2">
                  <Select
                    value={(orderBy?.column as string) || "createdAt"}
                    onValueChange={(column) =>
                      setOrderBy({
                        column: column as any,
                        direction: orderBy?.direction || "desc"
                      })
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t("artists.filters.sortOptions.name")}</SelectItem>
                      <SelectItem value="isFavorite">
                        {t("artists.filters.sortOptions.favorites")}
                      </SelectItem>
                      <SelectItem value="playCount">
                        {t("artists.filters.sortOptions.playCount")}
                      </SelectItem>
                      <SelectItem value="lastPlayedAt">
                        {t("artists.filters.sortOptions.lastPlayed")}
                      </SelectItem>
                      <SelectItem value="createdAt">
                        {t("artists.filters.sortOptions.createdAt")}
                      </SelectItem>
                      <SelectItem value="updatedAt">
                        {t("artists.filters.sortOptions.updatedAt")}
                      </SelectItem>
                      <SelectItem value="totalTracks">
                        {t("artists.filters.sortOptions.totalTracks")}
                      </SelectItem>
                      <SelectItem value="totalDuration">
                        {t("artists.filters.sortOptions.totalDuration")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={orderBy?.direction || "desc"}
                    onValueChange={(direction) =>
                      setOrderBy({
                        column: (orderBy?.column as any) || "createdAt",
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
                  {t("artists.filters.favorites")}
                  <Typography affects={["small", "muted"]}>
                    {t("artists.filters.favoritesDescription")}
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
              <div>
                <Label className="text-sm font-medium">{t("artists.filters.playCount")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.playCountMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minPlayCount ?? undefined}
                      onChange={(value) => setFilters({ minPlayCount: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.playCountMax")}
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
              <div>
                <Label className="text-sm font-medium">{t("artists.filters.totalTracks")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.totalTracksMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minTotalTracks ?? undefined}
                      onChange={(value) => setFilters({ minTotalTracks: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.totalTracksMax")}
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
              <div>
                <Label className="text-sm font-medium">{t("artists.filters.totalDuration")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.totalDurationMin")}
                    </Label>
                    <NumberInput
                      placeholder="0"
                      value={filters.minTotalDuration ?? undefined}
                      onChange={(value) => setFilters({ minTotalDuration: value })}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("artists.filters.totalDurationMax")}
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
                  {t("artists.filters.clear")}
                </Button>
              </SheetFooter>
            </Fade>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { ArtistsListFilters }
