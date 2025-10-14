import { useEffect, useMemo, useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  createInsertAlbumSchema,
  createUpdateAlbumSchema,
  type InsertAlbumType,
  type UpdateAlbumType
} from "@repo/schemas"
import { useForm, type FieldErrors } from "react-hook-form"

import { useInsertAlbum } from "../hooks/useInsertAlbum"
import { useUpdateAlbum } from "../hooks/useUpdateAlbum"

import { useFetchAlbumByIdWithArtists } from "../hooks/useFetchAlbumByIdWithArtists"

import { useFetchArtists } from "@features/artists/hooks/useFetchArtists"

import { cn } from "@lib/utils"

import {
  AsyncState,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  IconButton,
  NumberInput,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  TextInput,
  UploadPicker,
  VirtualizedSelect
} from "@components/ui"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

export type AlbumFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertAlbumType : UpdateAlbumType>
  reset: () => void
}

type BaseAlbumFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertAlbumType | UpdateAlbumType) => void | Promise<void>
  children?: (props: AlbumFormRenderProps<"insert" | "update">) => ReactNode
  asModal?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

type InsertAlbumFormProps = BaseAlbumFormProps & {
  mode?: "insert"
  albumId?: never
}

type UpdateAlbumFormProps = BaseAlbumFormProps & {
  mode: "update"
  albumId: number
}

export type AlbumFormProps = InsertAlbumFormProps | UpdateAlbumFormProps

const AlbumForm = ({
  albumId,
  mode = "insert",
  trigger,
  title,
  onSubmit,
  children,
  asModal = true,
  open,
  onOpen
}: AlbumFormProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const {
    data: album,
    isLoading: isAlbumLoading,
    isError: isAlbumError
  } = useFetchAlbumByIdWithArtists(mode === "update" ? albumId : null)

  const createMutation = useInsertAlbum()
  const updateMutation = useUpdateAlbum()

  const currentMutation = mode === "insert" ? createMutation : updateMutation

  const formSchema = mode === "insert" ? createInsertAlbumSchema(t) : createUpdateAlbumSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: album?.name ?? "",
      thumbnail: album?.thumbnail ?? undefined,
      isFavorite: album?.isFavorite ?? false,
      albumType: album?.albumType ?? "album",
      releaseYear: album?.releaseYear ?? undefined,
      artists: album?.artists?.map((a) => a.artistId) ?? []
    }
  })

  useEffect(() => {
    if (album && mode === "update") {
      form.reset({
        name: album.name,
        thumbnail: album.thumbnail ?? undefined,
        isFavorite: album.isFavorite,
        albumType: album.albumType,
        releaseYear: album.releaseYear,
        artists: album.artists?.map((a) => a.artistId) ?? []
      })
    }
  }, [album, mode, form])

  const { data: artistsData, isLoading: isArtistsLoading } = useFetchArtists({
    orderBy: { column: "name", direction: "asc" }
  })

  useEffect(() => {
    if (form.formState.isSubmitted) {
      if (mode === "insert") {
        form.reset()
      }
    }
  }, [form.formState.isSubmitted])

  const handleFormSubmit = async (values: InsertAlbumType | UpdateAlbumType) => {
    if (onSubmit) {
      await onSubmit(values)
    } else if (mode === "insert") {
      await createMutation.mutateAsync(values as InsertAlbumType)
    } else if (album?.id) {
      const { thumbnail, artists, ...updates } = values

      let thumbnailAction: "keep" | "update" | "remove" = "keep"
      let thumbnailPath: string | undefined = undefined

      if (thumbnail === null || thumbnail === "") {
        thumbnailAction = "remove"
      } else if (thumbnail && thumbnail !== album.thumbnail) {
        thumbnailAction = "update"
        thumbnailPath = thumbnail
      }

      await updateMutation.mutateAsync({
        id: album.id,
        updates: {
          ...updates,
          isFavorite: album.isFavorite
        },
        thumbnailAction,
        thumbnailPath,
        artists
      })

      const formValues = form.getValues()
      form.reset(formValues)
    }

    if (asModal) {
      setIsOpen(false)
    }
  }

  const renderProps = {
    isSubmitting: form.formState.isSubmitting || currentMutation.isPending,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    reset: () => form.reset()
  } as AlbumFormRenderProps<"insert" | "update">

  const artistOptions = useMemo(() => {
    return (artistsData ?? []).map((artist) => ({
      label: artist.name,
      value: String(artist.id)
    }))
  }, [artistsData])

  const FormContent = useMemo(() => {
    return (
      <AsyncState
        data={mode === "update" ? album : true}
        isLoading={mode === "update" ? isAlbumLoading : false}
        isError={mode === "update" ? isAlbumError : false}
        loadingComponent={
          <div className="flex items-center justify-center p-8">
            <Spinner />
          </div>
        }
        errorComponent={
          <div className="flex items-center justify-center p-8">{t("common.noResultsFound")}</div>
        }
      >
        {() => (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.labels.name")}</FormLabel>
                          <FormControl>
                            <TextInput placeholder={t("form.labels.name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {mode === "insert" && (
                    <FormField
                      control={form.control}
                      name="isFavorite"
                      render={({ field }) => (
                        <FormItem className="pt-8">
                          <FormControl>
                            <IconButton
                              name="Heart"
                              variant="text"
                              isFilled={field.value}
                              tooltip={field.value ? t("common.unfavorite") : t("common.favorite")}
                              className={cn(field.value && "!text-primary")}
                              onClick={() => field.onChange(!field.value)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="albumType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("albums.filters.albumType")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("albums.filters.albumType")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">{t("albums.filters.single")}</SelectItem>
                            <SelectItem value="album">{t("albums.filters.album")}</SelectItem>
                            <SelectItem value="compilation">
                              {t("albums.filters.compilation")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="releaseYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.labels.releaseYear")}</FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder={new Date().getFullYear().toString()}
                            value={(field.value as number) || undefined}
                            onChange={field.onChange}
                            min={1900}
                            max={new Date().getFullYear()}
                            step={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="artists"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.artists")}</FormLabel>
                      <FormControl>
                        <VirtualizedSelect
                          multiple
                          modalPopover={asModal}
                          placeholder={t("form.labels.artists")}
                          options={artistOptions}
                          loading={isArtistsLoading}
                          value={field.value?.map(String) ?? []}
                          onValueChange={(value) => {
                            const newArtistIds = value.map(Number)
                            field.onChange(newArtistIds)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.thumbnail")}</FormLabel>
                      <UploadPicker
                        mode="file"
                        value={field.value}
                        onChange={field.onChange}
                        onError={(msg) => form.setError(field.name, { message: msg })}
                        accept={VALID_THUMBNAIL_FILE_EXTENSIONS}
                        storageDir="thumbnails"
                        displayName={
                          mode === "update" && album?.name
                            ? `${album.name} - ${t("form.labels.thumbnail")}`
                            : undefined
                        }
                      />
                      <FormDescription>{t("form.descriptions.thumbnail")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <button type="submit" className="hidden" />
              {children?.(renderProps)}
            </form>
          </Form>
        )}
      </AsyncState>
    )
  }, [form, mode, renderProps, album, isAlbumLoading, isAlbumError])

  if (!asModal) return FormContent

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) form.reset()
        if (!renderProps.isSubmitting) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-0 p-0">
        <DialogHeader className="shrink-0 border-b p-6">
          <DialogTitle>
            {title ??
              (mode === "insert" ? t("form.titles.createAlbum") : t("form.titles.updateAlbum"))}
          </DialogTitle>
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
            disabled={
              !renderProps.isValid ||
              !renderProps.isDirty ||
              renderProps.isSubmitting ||
              (mode === "update" && isAlbumLoading)
            }
            isLoading={renderProps.isSubmitting}
            onClick={() => form.handleSubmit(handleFormSubmit)()}
          >
            {mode === "insert" ? t("form.buttons.create") : t("form.buttons.update")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AlbumForm }
