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
  Label,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
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

import { type OrderableSongColumns } from "@repo/api"

const SongsListFilters = () => {
  const { t, i18n } = useTranslation()

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
            tooltip={t("songs.filters.title")}
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Icon name="Filter" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-96 flex-col gap-0 p-0">
          <SheetHeader className="flex max-h-full flex-col items-start justify-between p-6">
            <SheetTitle>{t("songs.filters.title")}</SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="h-full">
            <div className="space-y-8 p-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("songs.filters.sortBy")}</Label>
                <div className="flex gap-2">
                  <Select
                    value={orderBy?.column || "createdAt"}
                    onValueChange={(column) =>
                      setOrderBy({
                        column: column as OrderableSongColumns,
                        direction: orderBy?.direction || "desc"
                      })
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t("songs.filters.sortOptions.name")}</SelectItem>
                      <SelectItem value="duration">
                        {t("songs.filters.sortOptions.duration")}
                      </SelectItem>
                      <SelectItem value="isFavorite">
                        {t("songs.filters.sortOptions.favorites")}
                      </SelectItem>
                      <SelectItem value="releaseYear">
                        {t("songs.filters.sortOptions.year")}
                      </SelectItem>
                      <SelectItem value="playCount">
                        {t("songs.filters.sortOptions.playCount")}
                      </SelectItem>
                      <SelectItem value="lastPlayedAt">
                        {t("songs.filters.sortOptions.lastPlayed")}
                      </SelectItem>
                      <SelectItem value="createdAt">
                        {t("songs.filters.sortOptions.createdAt")}
                      </SelectItem>
                      <SelectItem value="updatedAt">
                        {t("songs.filters.sortOptions.updatedAt")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={orderBy?.direction || "desc"}
                    onValueChange={(direction) =>
                      setOrderBy({
                        column: orderBy?.column || "createdAt",
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
                  {t("songs.filters.favorites")}
                  <Typography affects={["small", "muted"]}>
                    {t("songs.filters.favoritesDescription")}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="lyrics" className="flex flex-col gap-2">
                  {t("songs.filters.lyrics")}
                  <Typography affects={["small", "muted"]}>
                    {t("songs.filters.lyricsDescription")}
                  </Typography>
                </Label>
                <Switch
                  id="lyrics"
                  checked={filters.hasLyrics || false}
                  onCheckedChange={(checked: boolean) =>
                    setFilters({ hasLyrics: checked || undefined })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("songs.filters.releaseYear")}</Label>
                <NumberInput
                  placeholder={t("songs.filters.releaseYear")}
                  value={
                    Array.isArray(filters.releaseYear)
                      ? undefined
                      : (filters.releaseYear ?? undefined)
                  }
                  onChange={(value) => setFilters({ releaseYear: value })}
                  min={0}
                  max={new Date().getFullYear()}
                  step={1}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">{t("songs.filters.duration")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("songs.filters.durationMin")}
                    </Label>
                    <NumberInput
                      placeholder="0:00"
                      value={filters.minDuration ?? undefined}
                      onChange={(value) => setFilters({ minDuration: value })}
                      min={0}
                      step={1}
                      format={formatTime}
                      parse={parseTime}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("songs.filters.durationMax")}
                    </Label>
                    <NumberInput
                      placeholder="5:00"
                      value={filters.maxDuration ?? undefined}
                      onChange={(value) => setFilters({ maxDuration: value })}
                      min={0}
                      step={1}
                      format={formatTime}
                      parse={parseTime}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">{t("songs.filters.playCount")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("songs.filters.playCountMin")}
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
                      {t("songs.filters.playCountMax")}
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
                <Label className="text-sm font-medium">{t("songs.filters.lastPlayed")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("songs.filters.lastPlayedAfter")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Calendar" />
                          {filters.playedAfter
                            ? formatFilterDate(filters.playedAfter, i18n.language)
                            : t("songs.filters.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.playedAfter}
                          onSelect={(date) => setFilters({ playedAfter: date || undefined })}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {t("songs.filters.lastPlayedBefore")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Calendar" />
                          {filters.playedBefore
                            ? formatFilterDate(filters.playedBefore, i18n.language)
                            : t("songs.filters.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.playedBefore}
                          onSelect={(date) => setFilters({ playedBefore: date || undefined })}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                  <Icon name="X" />
                  {t("songs.filters.clear")}
                </Button>
              </SheetFooter>
            </Fade>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { SongsListFilters }
