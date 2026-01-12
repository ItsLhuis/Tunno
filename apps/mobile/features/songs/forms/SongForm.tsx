import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

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

import {
  AsyncState,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  IconButton,
  KeyboardSpacer,
  LyricsEditor,
  NotFound,
  NumberInput,
  Select,
  SelectCheckboxItem,
  SelectContent,
  SelectFlashList,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetScrollView,
  SheetTitle,
  SheetTrigger,
  Spinner,
  TextInput,
  UploadPicker
} from "@components/ui"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

export type SongFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertSongType : UpdateSongType>
  reset: () => void
  submit: () => void
}

type BaseSongFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertSongType | UpdateSongType) => void | Promise<void>
  children?: (props: SongFormRenderProps<"insert" | "update">) => ReactNode
  asSheet?: boolean
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
  asSheet = true,
  open,
  onOpen
}: SongFormProps) => {
  const styles = useStyles(songFormStyles)

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
    if (!isOpen && asSheet && form.formState.isDirty && !form.formState.isSubmitSuccessful) {
      form.reset()
      hasResetFormRef.current = false
      hasLoadedInitialDataRef.current = false
    }
  }, [isOpen, asSheet])

  const handleFormSubmit = async (values: InsertSongType | UpdateSongType) => {
    if (mode === "insert") {
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

    await onSubmit?.(values)

    if (asSheet) {
      setIsOpen(false)
    }
  }

  const { isSubmitting, isDirty, isValid, errors } = form.formState

  const renderProps = {
    isSubmitting: isSubmitting || currentMutation.isPending,
    isDirty,
    isValid,
    errors,
    reset: () => form.reset(),
    submit: () => form.handleSubmit(handleFormSubmit)()
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

  const FormContent = (
    <AsyncState
      data={mode === "update" ? song : true}
      isLoading={
        mode === "update"
          ? isSongLoading || (!hasLoadedInitialDataRef.current && isAlbumsLoading)
          : false
      }
      isError={mode === "update" ? isSongError : false}
      LoadingComponent={
        <View style={styles.loadingContainer}>
          <Spinner />
        </View>
      }
    >
      <Form {...form}>
        <View style={styles.formContent}>
          <View style={styles.section}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.name")}</FormLabel>
                  <FormControl>
                    <View style={styles.nameRow}>
                      <TextInput
                        style={styles.nameInput}
                        placeholder={t("form.labels.name")}
                        value={field.value}
                        onChangeText={field.onChange}
                        disabled={renderProps.isSubmitting}
                      />
                      {mode === "insert" && (
                        <IconButton
                          name="Heart"
                          variant="ghost"
                          isFilled={form.watch("isFavorite")}
                          iconColor={form.watch("isFavorite") ? "primary" : undefined}
                          onPress={() =>
                            form.setValue("isFavorite", !form.watch("isFavorite"), {
                              shouldDirty: true
                            })
                          }
                        />
                      )}
                    </View>
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
          </View>
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
                  <Select
                    multiple
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
                            currentAlbum.artists?.map((link) => link.artist?.id).filter(Boolean) ||
                            []
                          const hasMatchingArtist = albumArtistIds.some((artistId) =>
                            newArtistIds.includes(artistId as number)
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
                  >
                    <SelectTrigger disabled={renderProps.isSubmitting}>
                      <SelectValue placeholder={t("form.labels.artists")} />
                    </SelectTrigger>
                    <SelectContent virtualized>
                      <SelectFlashList
                        data={artistOptions}
                        keyExtractor={(item) => item.value}
                        contentContainerStyle={styles.selectContent(artistOptions.length === 0)}
                        renderItem={({ item }) => (
                          <SelectCheckboxItem value={item.value} title={item.label} />
                        )}
                        ListEmptyComponent={
                          isArtistsLoading ? (
                            <View style={styles.emptySelect}>
                              <Spinner />
                            </View>
                          ) : (
                            <NotFound />
                          )
                        }
                      />
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="albumId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.labels.album")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value !== null ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                  >
                    <SelectTrigger disabled={renderProps.isSubmitting}>
                      <SelectValue placeholder={t("form.labels.album")} />
                    </SelectTrigger>
                    <SelectContent virtualized>
                      <SelectFlashList
                        data={albumOptions}
                        keyExtractor={(item) => item.value}
                        contentContainerStyle={styles.selectContent(albumOptions.length === 0)}
                        renderItem={({ item }) => (
                          <SelectItem value={item.value} title={item.label} />
                        )}
                        ListEmptyComponent={
                          isAlbumsLoading ? (
                            <View style={styles.emptySelect}>
                              <Spinner />
                            </View>
                          ) : (
                            <NotFound />
                          )
                        }
                      />
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={renderProps.isSubmitting}
                    insideBottomSheet={asSheet}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        {children?.(renderProps)}
      </Form>
      <KeyboardSpacer />
    </AsyncState>
  )

  if (!asSheet) return FormContent

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!renderProps.isSubmitting) setIsOpen(open)
      }}
    >
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent enableDynamicSizing={false} snapPoints={["100%"]}>
        <View style={styles.sheetContainer}>
          <SheetHeader>
            <SheetTitle>
              {title ??
                (mode === "insert" ? t("form.titles.createSong") : t("form.titles.updateSong"))}
            </SheetTitle>
          </SheetHeader>
          <SheetScrollView contentContainerStyle={styles.scrollContent}>
            {FormContent}
          </SheetScrollView>
          <SheetFooter>
            <Button
              title={t("form.buttons.cancel")}
              variant="outline"
              isLoading={renderProps.isSubmitting}
              onPress={() => setIsOpen(false)}
            />
            <Button
              title={mode === "insert" ? t("form.buttons.create") : t("form.buttons.update")}
              disabled={
                !renderProps.isValid ||
                !renderProps.isDirty ||
                renderProps.isSubmitting ||
                (mode === "update" && (isSongLoading || isAlbumsLoading))
              }
              isLoading={renderProps.isSubmitting}
              onPress={() => form.handleSubmit(handleFormSubmit)()}
            />
          </SheetFooter>
        </View>
      </SheetContent>
    </Sheet>
  )
}

const songFormStyles = createStyleSheet(({ theme, runtime }) => ({
  sheetContainer: {
    flex: 1,
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  },
  scrollContent: {
    padding: theme.space("lg")
  },
  formContent: {
    gap: theme.space("xl")
  },
  section: {
    gap: theme.space("lg")
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2)
  },
  nameInput: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(8)
  },
  emptySelect: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(6)
  },
  selectContent: (isEmpty: boolean) =>
    viewStyle({
      ...(isEmpty && {
        flex: 1,
        paddingVertical: theme.space("lg"),
        paddingBottom: runtime.insets.bottom + theme.space("lg")
      })
    })
}))

export { SongForm }
