import { useTranslation } from "@repo/i18n"

import { Table } from "@tanstack/react-table"

import { IconButton, StickyHeader, Typography } from "@components/ui"

import { type SongWithRelations } from "@repo/api"

const StickyHeaderComponent = ({ table }: { table: Table<SongWithRelations> }) => {
  const { t } = useTranslation()

  const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

  return (
    <StickyHeader className="flex items-center gap-3">
      <IconButton
        name="Plus"
        className="[&_svg]:size-5"
        variant="ghost"
        tooltip={{ children: "Add song", side: "bottom" }}
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        disabled={hasSelectedRows}
        tooltip={{ children: "Shuffle and play", side: "bottom" }}
      />
      <Typography variant="h4" className="truncate">
        {t("songs.title")}
      </Typography>
    </StickyHeader>
  )
}

export { StickyHeaderComponent }
