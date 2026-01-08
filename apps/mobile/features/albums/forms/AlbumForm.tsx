import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

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

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

export type AlbumFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertAlbumType : UpdateAlbumType>
  reset: () => void
  submit: () => void
}

type BaseAlbumFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertAlbumType | UpdateAlbumType) => void | Promise<void>
  children?: (props: AlbumFormRenderProps<"insert" | "update">) => ReactNode
  asSheet?: boolean
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
  asSheet = true,
  open,
  onOpen
}: AlbumFormProps) => {
  const styles = useStyles(albumFormStyles)

  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const hasResetFormRef = useRef(false)
  const hasLoadedInitialDataRef = useRef(false)

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
      thumbnail: album?.thumbnail ?? null,
      isFavorite: album?.isFavorite ?? false,
      albumType: album?.albumType ?? "album",
      releaseYear: album?.releaseYear ?? null,
      artists: album?.artists?.map((a) => a.artistId) ?? []
    }
  })

  const { data: artistsData, isLoading: isArtistsLoading } = useFetchArtists({
    orderBy: { column: "name", direction: "asc" }
  })

  useEffect(() => {
    if (mode === "insert") {
      hasResetFormRef.current = false
    }
  }, [mode])

  useEffect(() => {
    if (!isAlbumLoading && album && mode === "update" && !hasResetFormRef.current) {
      form.reset({
        name: album.name,
        thumbnail: album.thumbnail ?? null,
        isFavorite: album.isFavorite,
        albumType: album.albumType,
        releaseYear: album.releaseYear ?? null,
        artists: album.artists?.map((a) => a.artistId) ?? []
      })
      hasResetFormRef.current = true
      hasLoadedInitialDataRef.current = true
    }
  }, [isAlbumLoading, album, mode, form])

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

  const handleFormSubmit = async (values: InsertAlbumType | UpdateAlbumType) => {
    if (mode === "insert") {
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
        isLoading={mode === "update" ? isAlbumLoading || !hasLoadedInitialDataRef.current : false}
        isError={mode === "update" ? isAlbumError : false}
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
                        mode === "update" && album?.name
                          ? `${album.name} - ${t("form.labels.thumbnail")}`
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
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <FormField
                  control={form.control}
                  name="albumType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("albums.filters.albumType")}</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger disabled={renderProps.isSubmitting}>
                            <SelectValue placeholder={t("albums.filters.albumType")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single" title={t("albums.filters.single")} />
                            <SelectItem value="album" title={t("albums.filters.album")} />
                            <SelectItem
                              value="compilation"
                              title={t("albums.filters.compilation")}
                            />
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </View>
              <View style={styles.rowItem}>
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
              </View>
            </View>
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
          </View>
          {children?.(renderProps)}
        </Form>
        <KeyboardSpacer />
      </AsyncState>
    )
  }, [form, mode, renderProps, album, isAlbumLoading, isAlbumError, asSheet])

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
                (mode === "insert" ? t("form.titles.createAlbum") : t("form.titles.updateAlbum"))}
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
                (mode === "update" && isAlbumLoading)
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

const albumFormStyles = createStyleSheet(({ theme, runtime }) => ({
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
  row: {
    flexDirection: "row",
    gap: theme.space()
  },
  rowItem: {
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

export { AlbumForm }
