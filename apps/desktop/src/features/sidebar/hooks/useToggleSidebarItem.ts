import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, sidebarKeys, type SidebarEntityType } from "@repo/api"

import { toggleSidebar } from "../api/mutations"

import { toast } from "@components/ui"

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
