import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { songs } = schema

const thumbnailSchema = (t: TFunction) =>
  z
    .string()
    .optional()
    .nullable()
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
    )

const songFileSchema = (t: TFunction) =>
  z
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
    )

const durationSchema = (t: TFunction) =>
  z.number(t("validation.duration.required")).int().min(0, t("validation.duration.min"))

const releaseYearSchema = (t: TFunction) =>
  z
    .number(t("validation.releaseYear.invalid"))
    .int(t("validation.releaseYear.invalid"))
    .min(0, t("validation.releaseYear.min"))
    .max(new Date().getFullYear(), t("validation.releaseYear.max"))
    .optional()
    .nullable()

const albumIdSchema = (t: TFunction) =>
  z
    .number(t("validation.albumId.invalid"))
    .int(t("validation.albumId.invalid"))
    .optional()
    .nullable()

const lyricsSchema = () =>
  z
    .array(
      z.object({
        text: z.string(),
        startTime: z.number()
      })
    )
    .optional()
    .nullable()

const baseArtistSchema = (t: TFunction) =>
  z.array(z.number().int().positive(t("validation.artists.invalid")))

export const createInsertSongSchema = (t: TFunction) => {
  const baseSchema = createInsertSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: thumbnailSchema(t),
    file: songFileSchema(t),
    duration: durationSchema(t),
    isFavorite: z.boolean().default(false),
    releaseYear: releaseYearSchema(t),
    albumId: albumIdSchema(t),
    lyrics: lyricsSchema()
  })

  return baseSchema
    .pick({
      name: true,
      thumbnail: true,
      file: true,
      duration: true,
      isFavorite: true,
      releaseYear: true,
      albumId: true,
      lyrics: true
    })
    .extend({
      artists: baseArtistSchema(t)
    })
}

export type InsertSongType = z.infer<ReturnType<typeof createInsertSongSchema>>

export const createUpdateSongSchema = (t: TFunction) => {
  const baseSchema = createUpdateSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: thumbnailSchema(t),
    file: songFileSchema(t).optional(),
    duration: durationSchema(t).optional(),
    isFavorite: z.boolean(),
    releaseYear: releaseYearSchema(t),
    albumId: albumIdSchema(t),
    lyrics: lyricsSchema()
  })

  return baseSchema
    .pick({
      name: true,
      thumbnail: true,
      file: true,
      duration: true,
      isFavorite: true,
      releaseYear: true,
      albumId: true,
      lyrics: true
    })
    .extend({
      artists: baseArtistSchema(t)
    })
}

export type UpdateSongType = z.infer<ReturnType<typeof createUpdateSongSchema>>
