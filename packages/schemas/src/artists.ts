import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { artists } = schema

const artistThumbnailSchema = (t: TFunction) =>
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

const baseArtistPick = {
  name: true,
  thumbnail: true,
  isFavorite: true
} as const

export const createInsertArtistSchema = (t: TFunction) => {
  const baseSchema = createInsertSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: artistThumbnailSchema(t),
    isFavorite: z.boolean().default(false)
  })

  return baseSchema.pick(baseArtistPick)
}

export type InsertArtistType = z.infer<ReturnType<typeof createInsertArtistSchema>>

export const createUpdateArtistSchema = (t: TFunction) => {
  const baseSchema = createUpdateSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: artistThumbnailSchema(t),
    isFavorite: z.boolean()
  })

  return baseSchema.pick(baseArtistPick)
}

export type UpdateArtistType = z.infer<ReturnType<typeof createUpdateArtistSchema>>
