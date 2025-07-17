import { useTranslation } from "@repo/i18n"

import { Table } from "@tanstack/react-table"

import { Header, IconButton, Typography } from "@components/ui"

import { type SongWithRelations } from "@repo/api"

const ListHeader = (table: Table<SongWithRelations>) => {
  const { t } = useTranslation()

  const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

  return (
    <Header className="flex items-center gap-3">
      <IconButton
        name="Plus"
        className="[&_svg]:size-5"
        variant="ghost"
        tooltip={{ children: "Add song", side: "bottom" }}
      />
      <IconButton
        name="Shuffle"
        className="h-11 w-11 shrink-0 rounded-full [&_svg]:size-5"
        disabled={hasSelectedRows}
        tooltip={{ children: "Shuffle and play", side: "bottom" }}
      />
      <Typography variant="h1" className="truncate">
        {t("songs.title")}
      </Typography>
    </Header>
  )
}

export { ListHeader }
