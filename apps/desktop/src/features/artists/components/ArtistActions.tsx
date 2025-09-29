import { Fragment, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconButton,
  type VirtualizedListController
} from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistActionsProps = {
  artist?: Artist
  list?: VirtualizedListController<Artist>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditArtist?: (artist: Artist) => void
  onDeleteArtist?: (artist: Artist) => void
}

const ArtistActions = ({ variant = "dropdown", children, className }: ArtistActionsProps) => {
  const { t } = useTranslation()

  const renderFormActions = () => {
    return (
      <Fragment>
        {variant === "context" ? (
          <ContextMenuItem>
            <Icon name="Edit" />
            {t("form.buttons.update")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem>
            <Icon name="Edit" />
            {t("form.buttons.update")}
          </DropdownMenuItem>
        )}
        {variant === "context" ? (
          <ContextMenuItem>
            <Icon name="Trash2" />
            {t("form.buttons.delete")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem>
            <Icon name="Trash2" />
            {t("form.buttons.delete")}
          </DropdownMenuItem>
        )}
      </Fragment>
    )
  }

  const renderContent = () => {
    if (variant === "context") {
      return (
        <ContextMenu>
          <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
            {renderFormActions()}
          </ContextMenuContent>
        </ContextMenu>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children || <IconButton name="MoreHorizontal" variant="ghost" className={className} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
          {renderFormActions()}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return <Fragment>{renderContent()}</Fragment>
}

export { ArtistActions }
