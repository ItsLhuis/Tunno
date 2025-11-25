import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { albums } = schema

const albumThumbnailSchema = (t: TFunction) =>
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

const albumReleaseYearSchema = (t: TFunction) =>
  z
    .number(t("validation.releaseYear.invalid"))
    .int(t("validation.releaseYear.invalid"))
    .min(0, t("validation.releaseYear.min"))
    .max(new Date().getFullYear(), t("validation.releaseYear.max"))
    .optional()
    .nullable()

const albumArtistsSchema = (t: TFunction) =>
  z.array(z.number().int().positive(t("validation.artists.invalid")))

const baseAlbumPick = {
  name: true,
  thumbnail: true,
  isFavorite: true,
  albumType: true,
  releaseYear: true
} as const

export const createInsertAlbumSchema = (t: TFunction) => {
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

export type InsertAlbumType = z.infer<ReturnType<typeof createInsertAlbumSchema>>

export const createUpdateAlbumSchema = (t: TFunction) => {
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

export type UpdateAlbumType = z.infer<ReturnType<typeof createUpdateAlbumSchema>>
