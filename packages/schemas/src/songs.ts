import { schema } from "@repo/database"

import { type TFunction } from "@repo/i18n"

import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"

const { songs } = schema

export const createInsertSongSchema = (t: TFunction) => {
  const baseSchema = createInsertSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: z
      .string()
      .max(50, t("validation.thumbnail.max"))
      .optional()
      .or(z.literal("").transform(() => undefined)),
    fileName: z.string().min(1, t("validation.file.required")).max(50, t("validation.file.max")),
    duration: z
      .number(t("validation.duration.required"))
      .int()
      .min(0, t("validation.duration.min")),
    isFavorite: z.boolean().default(false),
    isSingle: z.boolean().default(false),
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
    artists: z.array(z.number()).min(1, t("validation.artists.min"))
  })

  return baseSchema.refine(
    (data) => {
      if (data.isSingle === false && (data.albumId === undefined || data.albumId === null)) {
        return false
      }
      return true
    },
    {
      message: t("validation.albumId.requiredIfNotSingle"),
      path: ["albumId"]
    }
  )
}

export type InsertSongType = z.infer<ReturnType<typeof createInsertSongSchema>>

export const createUpdateSongSchema = (t: TFunction) => {
  const baseSchema = createUpdateSchema(songs, {
    name: z.string().min(1, t("validation.name.required")).max(200, t("validation.name.max")),
    thumbnail: z
      .string()
      .max(50, t("validation.thumbnail.max"))
      .optional()
      .or(z.literal("").transform(() => undefined)),
    isFavorite: z.boolean(),
    isSingle: z.boolean(),
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
    artists: z.array(z.number()).min(1, t("validation.artists.min"))
  })

  return baseSchema.refine(
    (data) => {
      if (data.isSingle === false && (data.albumId === undefined || data.albumId === null)) {
        return false
      }
      return true
    },
    {
      message: t("validation.albumId.requiredIfNotSingle"),
      path: ["albumId"]
    }
  )
}

export type UpdateSongType = z.infer<ReturnType<typeof createUpdateSongSchema>>
