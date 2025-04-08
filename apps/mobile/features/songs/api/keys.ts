export const songKeys = {
  all: ["songs"] as const,
  details: (id: number) => [...songKeys.all, "details", id] as const,
};
