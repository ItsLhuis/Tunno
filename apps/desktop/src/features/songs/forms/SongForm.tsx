import { type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { getAudioDuration } from "@services/audio"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import {
  createInsertSongSchema,
  createUpdateSongSchema,
  type InsertSongType,
  type UpdateSongType
} from "@repo/schemas"

import { cn } from "@lib/utils"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  IconButton,
  LyricsEditor,
  MultiSelect,
  NumberInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextInput,
  UploadPicker
} from "@components/ui"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type Song } from "@repo/api"

export type SongFormRenderProps<T extends "insert" | "update"> = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<T extends "insert" ? InsertSongType : UpdateSongType>
  reset: () => void
}

type SongFormDefaultValues = Song & { artists: number[] }

export type SongInsertFormProps = {
  song?: SongFormDefaultValues
  mode?: "insert"
  onSubmit: (values: InsertSongType) => void | Promise<void>
  children?: (props: SongFormRenderProps<"insert">) => ReactNode
}

export type SongUpdateFormProps = {
  song?: SongFormDefaultValues
  mode: "update"
  onSubmit: (values: UpdateSongType) => void | Promise<void>
  children?: (props: SongFormRenderProps<"update">) => ReactNode
}

export type SongFormProps = SongInsertFormProps | SongUpdateFormProps

const SongForm = ({ song, mode = "insert", onSubmit, children }: SongFormProps) => {
  const { t } = useTranslation()

  const formSchema = mode === "insert" ? createInsertSongSchema(t) : createUpdateSongSchema(t)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: song?.name ?? "",
      thumbnail: song?.thumbnail ?? undefined,
      duration: song?.duration ?? 0,
      file: song?.file ?? undefined,
      isFavorite: song?.isFavorite ?? false,
      releaseYear: song?.releaseYear ?? undefined,
      albumId: song?.albumId ?? undefined,
      artists: song?.artists ?? [],
      lyrics: song?.lyrics ?? undefined
    }
  })

  const handleFormSubmit = async (values: InsertSongType | UpdateSongType) => {
    await onSubmit(values as any)
  }

  const renderProps = {
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    reset: () => form.reset()
  } as SongFormRenderProps<typeof mode>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="space-y-4">
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
            <FormField
              control={form.control}
              name="isFavorite"
              render={({ field }) => (
                <FormItem className="pt-8">
                  <FormControl>
                    <IconButton
                      name="Heart"
                      variant="ghost"
                      isFilled={field.value}
                      tooltip={field.value ? t("common.unfavorite") : t("common.favorite")}
                      className={cn(field.value && "!text-primary")}
                      onClick={() => field.onChange(!field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {mode === "insert" && (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.file")}</FormLabel>
                  <UploadPicker
                    mode="file"
                    onBeforeSelect={async (filePath) => {
                      const durationSeconds = await getAudioDuration(filePath)
                      if (durationSeconds === 0) {
                        form.setError("file", {
                          type: "manual",
                          message: t("validation.file.invalid")
                        })
                        return false
                      }
                      form.setValue("duration", Math.floor(durationSeconds), {
                        shouldValidate: true
                      })
                      return true
                    }}
                    onChange={field.onChange}
                    onError={(msg) => form.setError(field.name, { message: msg })}
                    accept={VALID_SONG_FILE_EXTENSIONS}
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
                  defaultValue={form.formState.defaultValues?.thumbnail}
                  onChange={field.onChange}
                  onError={(msg) => form.setError(field.name, { message: msg })}
                  accept={VALID_THUMBNAIL_FILE_EXTENSIONS}
                />
                <FormDescription>{t("form.descriptions.thumbnail")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="releaseYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.releaseYear")}</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder={new Date().getFullYear().toString()}
                      value={field.value}
                      onChange={field.onChange}
                      min={0}
                      max={new Date().getFullYear()}
                      step={1}
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
                    <MultiSelect
                      placeholder={t("form.labels.artists")}
                      options={[
                        { label: "Artista 1", value: "1" },
                        { label: "Artista 2", value: "2" }
                      ]}
                      onValueChange={(value) => field.onChange(value.map(Number))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="albumId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.album")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.labels.album")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Album 1</SelectItem>
                        <SelectItem value="2">Album 2</SelectItem>
                      </SelectContent>
                    </Select>
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
                    className="min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button type="submit" className="hidden" />
        {children?.(renderProps)}
      </form>
    </Form>
  )
}

export { SongForm }
