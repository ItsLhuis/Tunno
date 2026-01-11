import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, sidebarKeys, type SidebarEntityType } from "@repo/api"

import { toggleSidebar } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for toggling an item's presence in the sidebar.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * addition or removal of an entity from the sidebar. It provides user feedback via toasts
 * and invalidates relevant queries to keep the UI in sync.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query`. The `mutate` function
 *          expects an object with `entityType`, `entityId`, and `name` (for display in toasts).
 *
 * @example
 * ```tsx
 * const { mutate: toggleItem, isLoading } = useToggleSidebarItem();
 *
 * const handlePinClick = (album) => {
 *   toggleItem({
 *     entityType: "album",
 *     entityId: album.id,
 *     name: album.name,
 *   });
 * };
 *
 * return (
 *   <Button onClick={() => handlePinClick(album)} disabled={isLoading}>
 *     Pin to Sidebar
 *   </Button>
 * );
 * ```
 */
export function useToggleSidebarItem() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({
      entityType,
      entityId
    }: {
      entityType: SidebarEntityType
      entityId: number
      name: string
    }) => toggleSidebar(entityType, entityId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: sidebarKeys.all })
    },
    onSuccess: (added, { name }) => {
      toast.success(added ? t("sidebar.addedTitle") : t("sidebar.removedTitle"), {
        description: added
          ? t("sidebar.addedDescription", { name })
          : t("sidebar.removedDescription", { name })
      })
    },
    onError: () => {
      toast.error(t("sidebar.addedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "sidebar")
    }
  })
}
