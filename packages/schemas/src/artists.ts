import { schema } from "@repo/database"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

import { type TFunction } from "@repo/i18n"

const { artists } = schema

export const createInsertArtistSchema = (t: TFunction) => {
  return createInsertSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: z
      .string()
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
      ),
    isFavorite: z.boolean().default(false)
  })
}

export type InsertArtistType = z.infer<ReturnType<typeof createInsertArtistSchema>>

export const createUpdateArtistSchema = (t: TFunction) => {
  return createUpdateSchema(artists, {
    name: z.string().min(1, t("validation.name.required")).max(100, t("validation.name.max")),
    thumbnail: z
      .string()
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
      ),
    isFavorite: z.boolean()
  })
}

export type UpdateArtistType = z.infer<ReturnType<typeof createUpdateArtistSchema>>
