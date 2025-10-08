import { useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDeleteSong } from "../hooks/useDeleteSong"

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

import { type SongWithMainRelations } from "@repo/api"

type DeleteSongDialogProps = {
  song: SongWithMainRelations
  trigger?: React.ReactNode
  open?: boolean
  onOpen?: (open: boolean) => void
}

export const DeleteSongDialog = ({ song, trigger, open, onOpen }: DeleteSongDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const deleteSongMutation = useDeleteSong()

  const handleDeleteSong = async () => {
    await deleteSongMutation.mutateAsync({ id: song.id })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!deleteSongMutation.isPending) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.titles.deleteSong")}</DialogTitle>
          <DialogDescription>{t("form.messages.confirmDelete")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={deleteSongMutation.isPending}
              isLoading={deleteSongMutation.isPending}
            >
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteSong}
            disabled={deleteSongMutation.isPending}
            isLoading={deleteSongMutation.isPending}
          >
            {t("form.buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
