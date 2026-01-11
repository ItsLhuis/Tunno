import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { artists } = schema

/**
 * Zod schema for validating artist thumbnail file paths.
 * Ensures the file extension is one of the supported thumbnail formats.
 * @param t - The i18n translation function.
 */
function artistThumbnailSchema(t: TFunction) {
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
 * Defines the base fields to pick from the Drizzle schema for artist operations.
 */
const baseArtistPick = {
  name: true,
  thumbnail: true,
  isFavorite: true
} as const

/**
 * Creates a Zod schema for inserting new artist data.
 * Includes validations for name, thumbnail, and favorite status.
 * @param t - The i18n translation function.
 */
export function createInsertArtistSchema(t: TFunction) {
  const baseSchema = createInsertSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: artistThumbnailSchema(t),
    isFavorite: z.boolean().default(false)
  })

  return baseSchema.pick(baseArtistPick)
}

/**
 * Inferred type for inserting a new artist, based on `createInsertArtistSchema`.
 */
export type InsertArtistType = z.infer<ReturnType<typeof createInsertArtistSchema>>

/**
 * Creates a Zod schema for updating existing artist data.
 * Includes validations for name, thumbnail, and favorite status.
 * @param t - The i18n translation function.
 */
export function createUpdateArtistSchema(t: TFunction) {
  const baseSchema = createUpdateSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: artistThumbnailSchema(t),
    isFavorite: z.boolean()
  })

  return baseSchema.pick(baseArtistPick)
}

/**
 * Inferred type for updating an existing artist, based on `createUpdateArtistSchema`.
 */
export type UpdateArtistType = z.infer<ReturnType<typeof createUpdateArtistSchema>>
