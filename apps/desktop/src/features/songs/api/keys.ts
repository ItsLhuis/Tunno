export const songKeys = {
  all: ["songs"] as const,
  withRelations: ["withRelations"] as const,
  listWithRelations: () => [...songKeys.all, "list", ...songKeys.withRelations] as const,
  detailsWithRelations: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withRelations] as const
}
