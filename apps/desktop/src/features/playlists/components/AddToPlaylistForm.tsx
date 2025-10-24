import { useEffect, useMemo, useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import { createAddToPlaylistSchema, type AddToPlaylistType } from "@repo/schemas"

import { useAddSongsToPlaylist } from "../hooks/useAddSongsToPlaylist"

import { useFetchPlaylists } from "../hooks/useFetchPlaylists"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ScrollArea,
  VirtualizedSelect,
  type VirtualizedSelectOption
} from "@components/ui"

export type AddToPlaylistFormRenderProps = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<AddToPlaylistType>
  reset: () => void
}

type AddToPlaylistFormProps = {
  songIds: number[]
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: AddToPlaylistType) => void | Promise<void>
  children?: (props: AddToPlaylistFormRenderProps) => ReactNode
  asModal?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

const AddToPlaylistForm = ({
  songIds,
  trigger,
  title,
  onSubmit,
  children,
  asModal = true,
  open,
  onOpen
}: AddToPlaylistFormProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const addSongsToPlaylistMutation = useAddSongsToPlaylist()

  const { data: playlists, isLoading: isPlaylistsLoading } = useFetchPlaylists({
    orderBy: { column: "name", direction: "asc" }
  })

  const form = useForm<AddToPlaylistType>({
    resolver: zodResolver(createAddToPlaylistSchema(t)),
    mode: "onChange",
    defaultValues: {
      playlistIds: []
    }
  })

  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.isValid) {
      form.reset()
    }
  }, [form.formState.isSubmitted, form.formState.isValid])

  const playlistOptions = useMemo((): VirtualizedSelectOption[] => {
    return (playlists ?? []).map((playlist) => ({
      label: playlist.name,
      value: String(playlist.id)
    }))
  }, [playlists])

  const handleFormSubmit = async (values: AddToPlaylistType) => {
    if (onSubmit) {
      await onSubmit(values)
    } else {
      await addSongsToPlaylistMutation.mutateAsync({
        songIds,
        playlistIds: values.playlistIds
      })
    }

    if (asModal) {
      setIsOpen(false)
    }
  }

  const renderProps = {
    isSubmitting: form.formState.isSubmitting || addSongsToPlaylistMutation.isPending,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    reset: () => form.reset()
  } as AddToPlaylistFormRenderProps

  const FormContent = useMemo(() => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="playlistIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("playlists.title")}</FormLabel>
                <FormControl>
                  <VirtualizedSelect
                    multiple
                    modalPopover={asModal}
                    placeholder={t("playlists.title")}
                    options={playlistOptions}
                    loading={isPlaylistsLoading}
                    value={field.value.map(String) ?? []}
                    onValueChange={(value) => {
                      const playlistIds = value.map(Number)
                      field.onChange(playlistIds)
                    }}
                    minWidth={300}
                    maxHeight={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="hidden" />
          {children?.(renderProps)}
        </form>
      </Form>
    )
  }, [form, renderProps, playlistOptions, isPlaylistsLoading, asModal, t])

  if (!asModal) return FormContent

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!renderProps.isSubmitting) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-0 p-0">
        <DialogHeader className="shrink-0 border-b p-6">
          <DialogTitle>{title ?? t("form.titles.addToPlaylists")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex max-h-full flex-col">
          <div className="p-6">{FormContent}</div>
        </ScrollArea>
        <DialogFooter className="shrink-0 border-t p-6">
          <DialogClose asChild>
            <Button variant="outline" isLoading={renderProps.isSubmitting}>
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!renderProps.isValid || !renderProps.isDirty || renderProps.isSubmitting}
            isLoading={renderProps.isSubmitting}
            onClick={() => form.handleSubmit(handleFormSubmit)()}
          >
            {t("form.buttons.add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AddToPlaylistForm }
