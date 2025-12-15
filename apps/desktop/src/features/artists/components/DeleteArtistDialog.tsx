import { useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { useDeleteArtist } from "../hooks/useDeleteArtist"

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

import { type Artist } from "@repo/api"

type DeleteArtistDialogProps = {
  artist: Artist
  trigger?: ReactNode
  open?: boolean
  onOpen?: (open: boolean) => void
}

const DeleteArtistDialog = ({ artist, trigger, open, onOpen }: DeleteArtistDialogProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const deleteArtistMutation = useDeleteArtist()

  const handleDeleteArtist = async () => {
    await deleteArtistMutation.mutateAsync({ id: artist.id })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!deleteArtistMutation.isPending) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.titles.deleteArtist")}</DialogTitle>
          <DialogDescription>{t("form.messages.confirmDelete")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={deleteArtistMutation.isPending}
              isLoading={deleteArtistMutation.isPending}
            >
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteArtist}
            disabled={deleteArtistMutation.isPending}
            isLoading={deleteArtistMutation.isPending}
          >
            {t("form.buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteArtistDialog }
