import { useEffect, useMemo, useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

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
  ScrollArea,
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
}

type BaseArtistFormProps = {
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: InsertArtistType | UpdateArtistType) => void | Promise<void>
  children?: (props: ArtistFormRenderProps<"insert" | "update">) => ReactNode
  asModal?: boolean
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
  asModal = true,
  open,
  onOpen
}: ArtistFormProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

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
      name: "",
      thumbnail: null,
      isFavorite: false
    }
  })

  useEffect(() => {
    if (artist && mode === "update") {
      form.reset({
        name: artist.name,
        thumbnail: artist.thumbnail ?? null,
        isFavorite: artist.isFavorite
      })
    }
  }, [artist, mode])

  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.isValid && mode === "insert") {
      form.reset()
    }
  }, [form.formState.isSubmitted, form.formState.isValid, mode])

  const handleFormSubmit = async (values: InsertArtistType | UpdateArtistType) => {
    if (onSubmit) {
      await onSubmit(values)
    } else if (mode === "insert") {
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
  } as ArtistFormRenderProps<"insert" | "update">

  const FormContent = useMemo(() => {
    return (
      <AsyncState
        data={mode === "update" ? artist : true}
        isLoading={mode === "update" ? isArtistLoading : false}
        isError={mode === "update" ? isArtistError : false}
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
      </AsyncState>
    )
  }, [form, mode, renderProps, artist, isArtistLoading, isArtistError])

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
              (mode === "insert" ? t("form.titles.createArtist") : t("form.titles.updateArtist"))}
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
              (mode === "update" && isArtistLoading)
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

export { ArtistForm }
