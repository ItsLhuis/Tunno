import { useState, type ReactNode } from "react"

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
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const DeleteAlbumDialog = ({ album, trigger, open, onOpenChange }: DeleteAlbumDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

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
              title={t("form.buttons.cancel")}
              variant="outline"
              onPress={handleCancel}
              disabled={deleteAlbumMutation.isPending}
              isLoading={deleteAlbumMutation.isPending}
            />
          </DialogClose>
          <Button
            title={t("form.buttons.delete")}
            variant="destructive"
            onPress={handleDeleteAlbum}
            disabled={deleteAlbumMutation.isPending}
            isLoading={deleteAlbumMutation.isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteAlbumDialog }
