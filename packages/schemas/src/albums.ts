import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { albums } = schema

/**
 * Zod schema for validating album thumbnail file paths.
 * Ensures the file extension is one of the supported thumbnail formats.
 * @param t - The i18n translation function.
 */
function albumThumbnailSchema(t: TFunction) {
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
 * Zod schema for validating album release years.
 * Ensures the year is an integer, non-negative, and not in the future.
 * @param t - The i18n translation function.
 */
function albumReleaseYearSchema(t: TFunction) {
  return z
    .number(t("validation.releaseYear.invalid"))
    .int(t("validation.releaseYear.invalid"))
    .min(0, t("validation.releaseYear.min"))
    .max(new Date().getFullYear(), t("validation.releaseYear.max"))
    .optional()
    .nullable()
}

/**
 * Zod schema for validating an array of artist IDs associated with an album.
 * Ensures each ID is a positive integer.
 * @param t - The i18n translation function.
 */
function albumArtistsSchema(t: TFunction) {
  return z.array(z.number().int().positive(t("validation.artists.invalid")))
}

/**
 * Defines the base fields to pick from the Drizzle schema for album operations.
 */
const baseAlbumPick = {
  name: true,
  thumbnail: true,
  isFavorite: true,
  albumType: true,
  releaseYear: true
} as const

/**
 * Creates a Zod schema for inserting new album data.
 * Includes validations for name, thumbnail, favorite status, album type, release year, and associated artists.
 * @param t - The i18n translation function.
 */
export function createInsertAlbumSchema(t: TFunction) {
  const baseSchema = createInsertSchema(albums, {
    name: z.string().min(1, t("validation.name.required")).max(150, t("validation.name.max")),
    thumbnail: albumThumbnailSchema(t),
    isFavorite: z.boolean().default(false),
    albumType: z.enum(["single", "album", "compilation"], {
      message: "Invalid album type"
    }),
    releaseYear: albumReleaseYearSchema(t)
  })

  return baseSchema.pick(baseAlbumPick).extend({
    artists: albumArtistsSchema(t)
  })
}

/**
 * Inferred type for inserting a new album, based on `createInsertAlbumSchema`.
 */
export type InsertAlbumType = z.infer<ReturnType<typeof createInsertAlbumSchema>>

/**
 * Creates a Zod schema for updating existing album data.
 * Includes validations for name, thumbnail, favorite status, album type, release year, and associated artists.
 * @param t - The i18n translation function.
 */
export function createUpdateAlbumSchema(t: TFunction) {
  const baseSchema = createUpdateSchema(albums, {
    name: z.string().min(1, t("validation.name.required")).max(150, t("validation.name.max")),
    thumbnail: albumThumbnailSchema(t),
    isFavorite: z.boolean(),
    albumType: z.enum(["single", "album", "compilation"], {
      message: "Invalid album type"
    }),
    releaseYear: albumReleaseYearSchema(t)
  })

  return baseSchema.pick(baseAlbumPick).extend({
    artists: albumArtistsSchema(t)
  })
}

/**
 * Inferred type for updating an existing album, based on `createUpdateAlbumSchema`.
 */
export type UpdateAlbumType = z.infer<ReturnType<typeof createUpdateAlbumSchema>>
