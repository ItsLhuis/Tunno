import { type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { invoke } from "@tauri-apps/api/core"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import {
  createInsertSongSchema,
  createUpdateSongSchema,
  type InsertSongType,
  type UpdateSongType
} from "@repo/schemas"

import {
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

import type { Song } from "@repo/api"

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
      thumbnail: mode === "insert" ? undefined : (song?.thumbnail ?? undefined),
      duration: song?.duration ?? 0,
      file: mode === "insert" ? undefined : (song?.file ?? undefined),
      isFavorite: song?.isFavorite ?? false,
      isSingle: song?.isSingle ?? false,
      releaseYear: song?.releaseYear ?? undefined,
      albumId: song?.albumId ?? undefined,
      artists: song?.artists ?? undefined,
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
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.labels.file")}</FormLabel>
              <UploadPicker
                hasError={!!form.formState.errors[field.name]}
                mode="file"
                onBeforeSelect={async (filePath) => {
                  const durationSeconds = await invoke<number>("get_audio_duration", {
                    filePath
                  })

                  if (durationSeconds === 0) {
                    form.setError("file", {
                      type: "manual",
                      message: t("validation.file.invalid")
                    })
                    return false
                  }

                  form.clearErrors("file")
                  form.setValue("duration", Math.floor(durationSeconds), { shouldValidate: true })

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
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>{t("form.labels.thumbnail")}</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="file"
                  accept={VALID_THUMBNAIL_FILE_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    onChange(file || undefined)
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                />
              </FormControl>
              <FormDescription>
                {t("form.descriptions.supportedFormats", {
                  formats: VALID_THUMBNAIL_FILE_EXTENSIONS.join(", ")
                })}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Year</FormLabel>
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
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="isFavorite"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">Música Favorita</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSingle"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">{t("form.labels.isSingle")}</FormLabel>
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
                <MultiSelect
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
        {!form.watch("isSingle") && (
          <FormField
            control={form.control}
            name="albumId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Album</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecionar album..." />
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
        )}
        <button type="submit" className="hidden" />
        {children?.(renderProps)}
      </form>
    </Form>
  )
}

export { SongForm }
