import { useTranslation } from "@repo/i18n"

import { Table } from "@tanstack/react-table"

import { SongForm } from "../../forms"

import { Header as HeaderUI, IconButton, Typography } from "@components/ui"

import { type SongWithRelations } from "@repo/api"

const Header = ({ table }: { table: Table<SongWithRelations> }) => {
  const { t } = useTranslation()

  const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

  return (
    <HeaderUI className="flex items-center gap-3">
      <SongForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={{ children: t("form.titles.createSong"), side: "bottom" }}
          />
        }
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
    </HeaderUI>
  )
}

export { Header }
