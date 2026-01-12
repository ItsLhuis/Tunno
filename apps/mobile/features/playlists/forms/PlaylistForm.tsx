import { useEffect, useRef, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { isCustomError } from "@repo/api"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  createInsertPlaylistSchema,
  createUpdatePlaylistSchema,
  type InsertPlaylistType,
  type UpdatePlaylistType
} from "@repo/schemas"
import { useForm, type FieldErrors } from "react-hook-form"

import { useInsertPlaylist } from "../hooks/useInsertPlaylist"
import { useUpdatePlaylist } from "../hooks/useUpdatePlaylist"

import { useFetchPlaylistById } from "../hooks/useFetchPlaylistById"

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

export type PlaylistFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertPlaylistType : UpdatePlaylistType>
  reset: () => void
  submit: () => void
}

type BasePlaylistFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertPlaylistType | UpdatePlaylistType) => void | Promise<void>
  children?: (props: PlaylistFormRenderProps<"insert" | "update">) => ReactNode
  asSheet?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

type InsertPlaylistFormProps = BasePlaylistFormProps & {
  mode?: "insert"
  playlistId?: never
}

type UpdatePlaylistFormProps = BasePlaylistFormProps & {
  mode: "update"
  playlistId: number
}

export type PlaylistFormProps = InsertPlaylistFormProps | UpdatePlaylistFormProps

const PlaylistForm = ({
  playlistId,
  mode = "insert",
  trigger,
  title,
  onSubmit,
  children,
  asSheet = true,
  open,
  onOpen
}: PlaylistFormProps) => {
  const styles = useStyles(playlistFormStyles)

  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const hasResetFormRef = useRef(false)
  const hasLoadedInitialDataRef = useRef(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError
  } = useFetchPlaylistById(mode === "update" ? playlistId : null)

  const createMutation = useInsertPlaylist()
  const updateMutation = useUpdatePlaylist()

  const currentMutation = mode === "insert" ? createMutation : updateMutation

  const formSchema =
    mode === "insert" ? createInsertPlaylistSchema(t) : createUpdatePlaylistSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: playlist?.name ?? "",
      thumbnail: playlist?.thumbnail ?? null,
      isFavorite: playlist?.isFavorite ?? false
    }
  })

  useEffect(() => {
    if (mode === "insert") {
      hasResetFormRef.current = false
    }
  }, [mode])

  useEffect(() => {
    if (!isPlaylistLoading && playlist && mode === "update" && !hasResetFormRef.current) {
      form.reset({
        name: playlist.name,
        thumbnail: playlist.thumbnail ?? null,
        isFavorite: playlist.isFavorite
      })
      hasResetFormRef.current = true
      hasLoadedInitialDataRef.current = true
    }
  }, [isPlaylistLoading, playlist, mode, form])

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

  const handleFormSubmit = async (values: InsertPlaylistType | UpdatePlaylistType) => {
    try {
      if (mode === "insert") {
        await createMutation.mutateAsync(values as InsertPlaylistType)
      } else if (playlist?.id) {
        const { thumbnail, ...updates } = values

        let thumbnailAction: "keep" | "update" | "remove" = "keep"
        let thumbnailPath: string | undefined = undefined

        if (thumbnail === null || thumbnail === "") {
          thumbnailAction = "remove"
        } else if (thumbnail && thumbnail !== playlist.thumbnail) {
          thumbnailAction = "update"
          thumbnailPath = thumbnail
        }

        await updateMutation.mutateAsync({
          id: playlist.id,
          updates: {
            ...updates,
            isFavorite: playlist.isFavorite
          },
          thumbnailAction,
          thumbnailPath
        })
      }

      await onSubmit?.(values)

      if (asSheet) {
        setIsOpen(false)
      }
    } catch (error: unknown) {
      if (isCustomError(error)) {
        form.setError(error.field as Parameters<typeof form.setError>[0], {
          message: error.message
        })
      } else {
        throw error
      }
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
  } as PlaylistFormRenderProps<"insert" | "update">

  const FormContent = (
    <AsyncState
      data={mode === "update" ? playlist : true}
      isLoading={mode === "update" ? isPlaylistLoading || !hasLoadedInitialDataRef.current : false}
      isError={mode === "update" ? isPlaylistError : false}
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
                      mode === "update" && playlist?.name
                        ? `${playlist.name} - ${t("form.labels.thumbnail")}`
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
                (mode === "insert"
                  ? t("form.titles.createPlaylist")
                  : t("form.titles.updatePlaylist"))}
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
                (mode === "update" && isPlaylistLoading)
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

const playlistFormStyles = createStyleSheet(({ theme, runtime }) => ({
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
  }
}))

export { PlaylistForm }
