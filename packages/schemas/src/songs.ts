import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { songs } = schema

export const createInsertSongSchema = (t: TFunction) => {
  return createInsertSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true
          const ext = value.split(".").pop()?.toLowerCase()
          return ext !== undefined && VALID_THUMBNAIL_FILE_EXTENSIONS.includes(ext)
        },
        {
          message: t("form.descriptions.supportedFormats", {
            formats: VALID_THUMBNAIL_FILE_EXTENSIONS.join(", ")
          })
        }
      ),
    file: z
      .string(t("validation.file.required"))
      .min(1, { message: t("validation.file.required") })
      .refine(
        (value) => {
          const ext = value.split(".").pop()?.toLowerCase()
          return ext !== undefined && VALID_SONG_FILE_EXTENSIONS.includes(ext)
        },
        {
          message: t("form.descriptions.supportedFormats", {
            formats: VALID_SONG_FILE_EXTENSIONS.join(", ")
          })
        }
      ),
    duration: z
      .number(t("validation.duration.required"))
      .int()
      .min(0, t("validation.duration.min")),
    isFavorite: z.boolean().default(false),
    releaseYear: z
      .number(t("validation.releaseYear.invalid"))
      .int(t("validation.releaseYear.invalid"))
      .min(0, t("validation.releaseYear.min"))
      .max(new Date().getFullYear(), t("validation.releaseYear.max"))
      .optional(),
    albumId: z
      .number(t("validation.albumId.invalid"))
      .int(t("validation.albumId.invalid"))
      .optional()
  }).extend({
    artists: z.array(z.number().int().positive(t("validation.artists.invalid")))
  })
}

export type InsertSongType = z.infer<ReturnType<typeof createInsertSongSchema>>

export const createUpdateSongSchema = (t: TFunction) => {
  return createUpdateSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true
          const ext = value.split(".").pop()?.toLowerCase()
          return ext !== undefined && VALID_THUMBNAIL_FILE_EXTENSIONS.includes(ext)
        },
        {
          message: t("form.descriptions.supportedFormats", {
            formats: VALID_THUMBNAIL_FILE_EXTENSIONS.join(", ")
          })
        }
      ),
    isFavorite: z.boolean(),
    releaseYear: z
      .number(t("validation.releaseYear.invalid"))
      .int(t("validation.releaseYear.invalid"))
      .min(0, t("validation.releaseYear.min"))
      .max(new Date().getFullYear(), t("validation.releaseYear.max"))
      .optional(),
    albumId: z
      .number(t("validation.albumId.invalid"))
      .int(t("validation.albumId.invalid"))
      .optional()
  }).extend({
    artists: z.array(z.number().int().positive(t("validation.artists.invalid")))
  })
}

export type UpdateSongType = z.infer<ReturnType<typeof createUpdateSongSchema>>
