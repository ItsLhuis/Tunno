import { useEffect, useRef, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { isCustomError } from "@repo/api"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  createInsertArtistSchema,
  createUpdateArtistSchema,
  type InsertArtistType,
  type UpdateArtistType
} from "@repo/schemas"
import { useForm, type FieldErrors } from "react-hook-form"

import { useInsertArtist } from "../hooks/useInsertArtist"
import { useUpdateArtist } from "../hooks/useUpdateArtist"

import { useFetchArtistById } from "../hooks/useFetchArtistById"

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

export type ArtistFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertArtistType : UpdateArtistType>
  reset: () => void
  submit: () => void
}

type BaseArtistFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertArtistType | UpdateArtistType) => void | Promise<void>
  children?: (props: ArtistFormRenderProps<"insert" | "update">) => ReactNode
  asSheet?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

type InsertArtistFormProps = BaseArtistFormProps & {
  mode?: "insert"
  artistId?: never
}

type UpdateArtistFormProps = BaseArtistFormProps & {
  mode: "update"
  artistId: number
}

export type ArtistFormProps = InsertArtistFormProps | UpdateArtistFormProps

const ArtistForm = ({
  artistId,
  mode = "insert",
  trigger,
  title,
  onSubmit,
  children,
  asSheet = true,
  open,
  onOpen
}: ArtistFormProps) => {
  const styles = useStyles(artistFormStyles)

  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const hasResetFormRef = useRef(false)
  const hasLoadedInitialDataRef = useRef(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const {
    data: artist,
    isLoading: isArtistLoading,
    isError: isArtistError
  } = useFetchArtistById(mode === "update" ? artistId : null)

  const createMutation = useInsertArtist()
  const updateMutation = useUpdateArtist()

  const currentMutation = mode === "insert" ? createMutation : updateMutation

  const formSchema = mode === "insert" ? createInsertArtistSchema(t) : createUpdateArtistSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: artist?.name ?? "",
      thumbnail: artist?.thumbnail ?? null,
      isFavorite: artist?.isFavorite ?? false
    }
  })

  useEffect(() => {
    if (mode === "insert") {
      hasResetFormRef.current = false
    }
  }, [mode])

  useEffect(() => {
    if (!isArtistLoading && artist && mode === "update" && !hasResetFormRef.current) {
      form.reset({
        name: artist.name,
        thumbnail: artist.thumbnail ?? null,
        isFavorite: artist.isFavorite
      })
      hasResetFormRef.current = true
      hasLoadedInitialDataRef.current = true
    }
  }, [isArtistLoading, artist, mode, form])

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

  const handleFormSubmit = async (values: InsertArtistType | UpdateArtistType) => {
    try {
      if (mode === "insert") {
        await createMutation.mutateAsync(values as InsertArtistType)
      } else if (artist?.id) {
        const { thumbnail, ...updates } = values

        let thumbnailAction: "keep" | "update" | "remove" = "keep"
        let thumbnailPath: string | undefined = undefined

        if (thumbnail === null || thumbnail === "") {
          thumbnailAction = "remove"
        } else if (thumbnail && thumbnail !== artist.thumbnail) {
          thumbnailAction = "update"
          thumbnailPath = thumbnail
        }

        await updateMutation.mutateAsync({
          id: artist.id,
          updates: {
            ...updates,
            isFavorite: artist.isFavorite
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
  } as ArtistFormRenderProps<"insert" | "update">

  const FormContent = (
    <AsyncState
      data={mode === "update" ? artist : true}
      isLoading={mode === "update" ? isArtistLoading || !hasLoadedInitialDataRef.current : false}
      isError={mode === "update" ? isArtistError : false}
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
                      mode === "update" && artist?.name
                        ? `${artist.name} - ${t("form.labels.thumbnail")}`
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
                (mode === "insert" ? t("form.titles.createArtist") : t("form.titles.updateArtist"))}
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
                (mode === "update" && isArtistLoading)
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

const artistFormStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { ArtistForm }
