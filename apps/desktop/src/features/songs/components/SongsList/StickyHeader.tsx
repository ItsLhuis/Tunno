import { useTranslation } from "@repo/i18n"

import { SongForm } from "../../forms"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithRelations } from "@repo/api"

type StickyHeaderComponentProps = {
  list: VirtualizedListController<SongWithRelations>
}

const StickyHeaderComponent = ({ list }: StickyHeaderComponentProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className="flex items-center gap-3">
      <SongForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createSong")}
          />
        }
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        disabled={hasSelectedRows}
        tooltip={t("common.shuffleAndPlay")}
      />
      <Typography variant="h4" className="truncate">
        {t("songs.title")}
      </Typography>
    </StickyHeader>
  )
}

export { StickyHeaderComponent }
