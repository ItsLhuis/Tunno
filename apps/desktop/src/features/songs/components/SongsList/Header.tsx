import { useTranslation } from "@repo/i18n"

import { SongForm } from "../../forms"

import { Header, IconButton, Typography, type VirtualizedListController } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type HeaderComponentProps = {
  list: VirtualizedListController<SongWithMainRelations>
}

const HeaderComponent = ({ list }: HeaderComponentProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex items-center gap-3">
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
        className="h-11 w-11 shrink-0 rounded-full [&_svg]:size-5"
        disabled={hasSelectedRows}
        tooltip={t("common.shuffleAndPlay")}
      />
      <Typography variant="h1" className="truncate">
        {t("songs.title")}
      </Typography>
    </Header>
  )
}

export { HeaderComponent }

