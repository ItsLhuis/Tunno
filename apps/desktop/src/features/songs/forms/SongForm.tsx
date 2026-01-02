import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { getAudioDuration } from "@services/audio"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  createInsertSongSchema,
  createUpdateSongSchema,
  type InsertSongType,
  type UpdateSongType
} from "@repo/schemas"
import { useForm, type FieldErrors } from "react-hook-form"

import { useInsertSong } from "../hooks/useInsertSong"
import { useUpdateSong } from "../hooks/useUpdateSong"

import { useFetchSongByIdWithMainRelations } from "../hooks/useFetchSongByIdWithMainRelations"

import { useFetchAlbumsByArtistsWithArtists } from "@features/albums/hooks/useFetchAlbumsByArtistsWithArtists"

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
  LyricsEditor,
  NumberInput,
  ScrollArea,
  Spinner,
  TextInput,
  UploadPicker,
  VirtualizedSelect
} from "@components/ui"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

export type SongFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertSongType : UpdateSongType>
  reset: () => void
}

type BaseSongFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertSongType | UpdateSongType) => void | Promise<void>
  children?: (props: SongFormRenderProps<"insert" | "update">) => ReactNode
  asModal?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

type InsertSongFormProps = BaseSongFormProps & {
  mode?: "insert"
  songId?: never
}

type UpdateSongFormProps = BaseSongFormProps & {
  mode: "update"
  songId: number
}

export type SongFormProps = InsertSongFormProps | UpdateSongFormProps

const SongForm = ({
  songId,
  mode = "insert",
  trigger,
  title,
  onSubmit,
  children,
  asModal = true,
  open,
  onOpen
}: SongFormProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const hasResetFormRef = useRef(false)
  const hasLoadedInitialDataRef = useRef(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const {
    data: song,
    isLoading: isSongLoading,
    isError: isSongError
  } = useFetchSongByIdWithMainRelations(mode === "update" ? songId : null)

  const createMutation = useInsertSong()
  const updateMutation = useUpdateSong()

  const currentMutation = mode === "insert" ? createMutation : updateMutation

  const formSchema = mode === "insert" ? createInsertSongSchema(t) : createUpdateSongSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: song?.name ?? "",
      thumbnail: song?.thumbnail ?? null,
      duration: song?.duration ?? 0,
      file: song?.file ?? undefined,
      isFavorite: song?.isFavorite ?? false,
      releaseYear: song?.releaseYear ?? null,
      albumId: song?.albumId ?? null,
      artists: song?.artists?.map((a) => a.artistId) ?? [],
      lyrics: song?.lyrics ?? null
    }
  })

  const selectedArtistIds = form.watch("artists")

  const { data: artistsData, isLoading: isArtistsLoading } = useFetchArtists({
    orderBy: { column: "name", direction: "asc" }
  })

  const { data: albumsData, isLoading: isAlbumsLoading } = useFetchAlbumsByArtistsWithArtists(
    selectedArtistIds?.length ? selectedArtistIds : [],
    {
      orderBy: { column: "name", direction: "asc" }
    }
  )

  useEffect(() => {
    if (mode === "insert") {
      hasResetFormRef.current = false
    }
  }, [mode])

  useEffect(() => {
    if (
      !isSongLoading &&
      !isAlbumsLoading &&
      song &&
      mode === "update" &&
      !hasResetFormRef.current
    ) {
      form.reset({
        name: song.name,
        thumbnail: song.thumbnail ?? null,
        duration: song.duration,
        file: song.file,
        isFavorite: song.isFavorite,
        releaseYear: song.releaseYear ?? null,
        albumId: song.albumId ?? null,
        artists: song.artists?.map((a) => a.artistId) ?? [],
        lyrics: song.lyrics ?? null
      })
      hasResetFormRef.current = true
      hasLoadedInitialDataRef.current = true
    }
  }, [isSongLoading, isAlbumsLoading, song, mode, form])

  useEffect(() => {
    if (
      form.formState.isSubmitted &&
      form.formState.isSubmitSuccessful &&
      form.formState.isValid &&
      mode === "insert"
    ) {
      form.reset()
    }
  }, [form.formState.isSubmitted, form.formState.isSubmitSuccessful, form.formState.isValid, mode])

  useEffect(() => {
    if (!isOpen && asModal && form.formState.isDirty && !form.formState.isSubmitSuccessful) {
      form.reset()
      hasResetFormRef.current = false
      hasLoadedInitialDataRef.current = false
    }
  }, [isOpen, asModal])

  const handleFormSubmit = async (values: InsertSongType | UpdateSongType) => {
    if (onSubmit) {
      await onSubmit(values)
    } else if (mode === "insert") {
      await createMutation.mutateAsync(values as InsertSongType)
    } else if (song?.id) {
      const { thumbnail, artists, ...updates } = values

      let thumbnailAction: "keep" | "update" | "remove" = "keep"
      let thumbnailPath: string | undefined = undefined

      if (thumbnail === null || thumbnail === "") {
        thumbnailAction = "remove"
      } else if (thumbnail && thumbnail !== song.thumbnail) {
        thumbnailAction = "update"
        thumbnailPath = thumbnail
      }

      await updateMutation.mutateAsync({
        id: song.id,
        updates: {
          ...updates,
          isFavorite: song.isFavorite
        },
        thumbnailAction,
        thumbnailPath,
        artists
      })
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
  } as SongFormRenderProps<"insert" | "update">

  const artistOptions = useMemo(() => {
    return (artistsData ?? []).map((artist) => ({
      label: artist.name,
      value: String(artist.id)
    }))
  }, [artistsData])

  const albumOptions = useMemo(() => {
    const list = albumsData ?? []
    return list.map((album) => ({
      label: album.name,
      value: String(album.id),
      group: album.artists?.length
        ? album.artists
            .map((link) => link.artist?.name)
            .filter((name): name is string => Boolean(name))
            .join(", ")
        : undefined
    }))
  }, [albumsData])

  const FormContent = useMemo(() => {
    return (
      <AsyncState
        data={mode === "update" ? song : true}
        isLoading={
          mode === "update"
            ? isSongLoading || (!hasLoadedInitialDataRef.current && isAlbumsLoading)
            : false
        }
        isError={mode === "update" ? isSongError : false}
        loadingComponent={
          <div className="flex items-center justify-center p-8">
            <Spinner />
          </div>
        }
        errorComponent={
          <div className="flex items-center justify-center p-8">{t("common.noResultsFound")}</div>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="w-full space-y-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.name")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <TextInput
                            className="flex-1"
                            placeholder={t("form.labels.name")}
                            {...field}
                            disabled={renderProps.isSubmitting}
                          />
                          {mode === "insert" && (
                            <IconButton
                              name="Heart"
                              variant="text"
                              isFilled={form.watch("isFavorite")}
                              tooltip={
                                form.watch("isFavorite")
                                  ? t("common.unfavorite")
                                  : t("common.favorite")
                              }
                              className={cn(form.watch("isFavorite") && "text-primary!")}
                              onClick={() =>
                                form.setValue("isFavorite", !form.watch("isFavorite"), {
                                  shouldDirty: true
                                })
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {mode === "insert" && (
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.labels.file")}</FormLabel>
                        <UploadPicker
                          mode="file"
                          value={field.value}
                          onBeforeSelect={async (filePath) => {
                            const durationSeconds = await getAudioDuration(filePath)
                            if (durationSeconds === 0) {
                              form.setError("file", {
                                type: "manual",
                                message: t("validation.file.invalid")
                              })
                              return false
                            }
                            form.setValue("duration", Math.round(durationSeconds), {
                              shouldValidate: true
                            })
                            return true
                          }}
                          onChange={field.onChange}
                          onError={(msg) => form.setError(field.name, { message: msg })}
                          accept={VALID_SONG_FILE_EXTENSIONS}
                          storageDir="songs"
                          disabled={renderProps.isSubmitting}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.thumbnail")}</FormLabel>
                      <UploadPicker
                        mode="file"
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        onError={(msg) => form.setError(field.name, { message: msg })}
                        accept={VALID_THUMBNAIL_FILE_EXTENSIONS}
                        storageDir="thumbnails"
                        displayName={
                          mode === "update" && song?.name
                            ? `${song.name} - ${t("form.labels.thumbnail")}`
                            : undefined
                        }
                        disabled={renderProps.isSubmitting}
                      />
                      <FormDescription>{t("form.descriptions.thumbnail")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="releaseYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.labels.releaseYear")}</FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder={new Date().getFullYear().toString()}
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        min={1900}
                        max={new Date().getFullYear()}
                        step={1}
                        disabled={renderProps.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

                          const currentAlbumId = form.getValues("albumId")

                          if (currentAlbumId && newArtistIds.length > 0) {
                            const currentAlbum = albumsData?.find(
                              (album) => album.id === currentAlbumId
                            )

                            if (currentAlbum) {
                              const albumArtistIds =
                                currentAlbum.artists
                                  ?.map((link) => link.artist?.id)
                                  .filter(Boolean) || []
                              const hasMatchingArtist = albumArtistIds.some((artistId) =>
                                newArtistIds.includes(artistId)
                              )

                              if (!hasMatchingArtist) {
                                form.setValue("albumId", null, {
                                  shouldValidate: true,
                                  shouldDirty: true
                                })
                              }
                            }
                          } else if (currentAlbumId && newArtistIds.length === 0) {
                            form.setValue("albumId", null, {
                              shouldValidate: true,
                              shouldDirty: true
                            })
                          }
                        }}
                        disabled={renderProps.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="albumId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.labels.album")}</FormLabel>
                        <FormControl>
                          <VirtualizedSelect
                            modalPopover={asModal}
                            placeholder={t("form.labels.album")}
                            options={albumOptions}
                            loading={isAlbumsLoading}
                            value={field.value !== null ? String(field.value) : ""}
                            onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                            minWidth={300}
                            maxHeight={200}
                            disabled={renderProps.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="lyrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.lyrics")}</FormLabel>
                      <FormControl>
                        <LyricsEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={t("form.labels.lyrics")}
                          className="min-h-50"
                          disabled={renderProps.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <button type="submit" className="hidden" />
            {children?.(renderProps)}
          </form>
        </Form>
      </AsyncState>
    )
  }, [form, mode, renderProps, song, isSongLoading, isSongError, isAlbumsLoading])

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
          <DialogTitle>
            {title ??
              (mode === "insert" ? t("form.titles.createSong") : t("form.titles.updateSong"))}
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
              (mode === "update" && (isSongLoading || isAlbumsLoading))
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

export { SongForm }
