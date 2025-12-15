import { useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { useDeletePlaylist } from "../hooks/useDeletePlaylist"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@components/ui"

import { type Playlist } from "@repo/api"

type DeletePlaylistDialogProps = {
  playlist: Playlist
  trigger?: ReactNode
  open?: boolean
  onOpen?: (open: boolean) => void
}

const DeletePlaylistDialog = ({ playlist, trigger, open, onOpen }: DeletePlaylistDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const deletePlaylistMutation = useDeletePlaylist()

  const handleDeletePlaylist = async () => {
    await deletePlaylistMutation.mutateAsync({ id: playlist.id })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!deletePlaylistMutation.isPending) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.titles.deletePlaylist")}</DialogTitle>
          <DialogDescription>{t("form.messages.confirmDelete")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={deletePlaylistMutation.isPending}
              isLoading={deletePlaylistMutation.isPending}
            >
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeletePlaylist}
            disabled={deletePlaylistMutation.isPending}
            isLoading={deletePlaylistMutation.isPending}
          >
            {t("form.buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeletePlaylistDialog }
