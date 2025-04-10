export const songKeys = {
  all: ["songs"] as const,
  infinite: () => [...songKeys.all, "infinite"] as const,
  details: (id: number) => [...songKeys.all, "details", id] as const
}
