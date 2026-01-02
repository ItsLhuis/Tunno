import { useState, type ReactNode } from "react"

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
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const DeleteSongDialog = ({ song, trigger, open, onOpenChange }: DeleteSongDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

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
              title={t("form.buttons.cancel")}
              variant="outline"
              onPress={handleCancel}
              disabled={deleteSongMutation.isPending}
              isLoading={deleteSongMutation.isPending}
            />
          </DialogClose>
          <Button
            title={t("form.buttons.delete")}
            variant="destructive"
            onPress={handleDeleteSong}
            disabled={deleteSongMutation.isPending}
            isLoading={deleteSongMutation.isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteSongDialog }
