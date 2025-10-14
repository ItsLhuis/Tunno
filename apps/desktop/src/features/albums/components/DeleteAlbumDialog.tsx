import { useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDeleteAlbum } from "../hooks/useDeleteAlbum"

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

import { type Album } from "@repo/api"

type DeleteAlbumDialogProps = {
  album: Album
  trigger?: React.ReactNode
  open?: boolean
  onOpen?: (open: boolean) => void
}

const DeleteAlbumDialog = ({ album, trigger, open, onOpen }: DeleteAlbumDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const deleteAlbumMutation = useDeleteAlbum()

  const handleDeleteAlbum = async () => {
    await deleteAlbumMutation.mutateAsync({ id: album.id })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!deleteAlbumMutation.isPending) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.titles.deleteAlbum")}</DialogTitle>
          <DialogDescription>{t("form.messages.confirmDelete")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={deleteAlbumMutation.isPending}
              isLoading={deleteAlbumMutation.isPending}
            >
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteAlbum}
            disabled={deleteAlbumMutation.isPending}
            isLoading={deleteAlbumMutation.isPending}
          >
            {t("form.buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteAlbumDialog }
