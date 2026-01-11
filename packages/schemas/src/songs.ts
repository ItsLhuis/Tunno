import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { songs } = schema

/**
 * Zod schema for validating song thumbnail file paths.
 * Ensures the file extension is one of the supported thumbnail formats.
 * @param t - The i18n translation function.
 */
function thumbnailSchema(t: TFunction) {
  return z
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
}

/**
 * Zod schema for validating song file paths.
 * Ensures the file extension is one of the supported song formats.
 * @param t - The i18n translation function.
 */
function songFileSchema(t: TFunction) {
  return z
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
}

/**
 * Zod schema for validating song duration.
 * Ensures the duration is a non-negative integer.
 * @param t - The i18n translation function.
 */
function durationSchema(t: TFunction) {
  return z.number(t("validation.duration.required")).int().min(0, t("validation.duration.min"))
}

/**
 * Zod schema for validating song release year.
 * Ensures the year is an integer, non-negative, and not in the future.
 * @param t - The i18n translation function.
 */
function releaseYearSchema(t: TFunction) {
  return z
    .number(t("validation.releaseYear.invalid"))
    .int(t("validation.releaseYear.invalid"))
    .min(0, t("validation.releaseYear.min"))
    .max(new Date().getFullYear(), t("validation.releaseYear.max"))
    .optional()
    .nullable()
}

/**
 * Zod schema for validating album ID associated with a song.
 * Ensures the ID is an integer.
 * @param t - The i18n translation function.
 */
function albumIdSchema(t: TFunction) {
  return z
    .number(t("validation.albumId.invalid"))
    .int(t("validation.albumId.invalid"))
    .optional()
    .nullable()
}

/**
 * Zod schema for validating song lyrics.
 * Expects an array of objects, each with a `text` (string) and `startTime` (number).
 */
function lyricsSchema() {
  return z
    .array(
      z.object({
        text: z.string(),
        startTime: z.number()
      })
    )
    .optional()
    .nullable()
}

/**
 * Zod schema for validating an array of artist IDs associated with a song.
 * Ensures each ID is a positive integer.
 * @param t - The i18n translation function.
 */
function baseArtistSchema(t: TFunction) {
  return z.array(z.number().int().positive(t("validation.artists.invalid")))
}

/**
 * Creates a Zod schema for inserting new song data.
 * Includes validations for name, thumbnail, file, duration, favorite status,
 * release year, album ID, lyrics, and associated artists.
 * @param t - The i18n translation function.
 */
export function createInsertSongSchema(t: TFunction) {
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

/**
 * Inferred type for inserting a new song, based on `createInsertSongSchema`.
 */
export type InsertSongType = z.infer<ReturnType<typeof createInsertSongSchema>>

/**
 * Creates a Zod schema for updating existing song data.
 * Includes validations for name, thumbnail, file, duration, favorite status,
 * release year, album ID, lyrics, and associated artists.
 * All fields are optional for updates except for `name` validation.
 * @param t - The i18n translation function.
 */
export function createUpdateSongSchema(t: TFunction) {
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

/**
 * Inferred type for updating an existing song, based on `createUpdateSongSchema`.
 */
export type UpdateSongType = z.infer<ReturnType<typeof createUpdateSongSchema>>
