import { useCallback, useEffect, useMemo, useState } from "react"

import type { VirtualizedListController } from "../types"

export function useSelection<TItem>(
  data: TItem[],
  keyExtractor: (item: TItem, index: number) => string,
  onSelectionChange?: (selectedIds: string[], selectedItems: TItem[]) => void
) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const dataIds = useMemo(
    () => data.map((item, index) => keyExtractor(item, index)),
    [data, keyExtractor]
  )

  const itemById = useMemo(() => {
    const map = new Map<string, TItem>()
    data.forEach((item, idx) => map.set(dataIds[idx], item))
    return map
  }, [data, dataIds])

  const selectedCount = selectedIds.size
  const totalCount = data.length
  const isAllSelected = selectedCount === totalCount && totalCount > 0
  const hasSelection = selectedCount > 0

  const handleToggleItem = useCallback((id: string, additive = true) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (!additive) {
        next.clear()
        next.add(id)
        return next
      }

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(dataIds))
  }, [dataIds])

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const selectedIdsArray = useMemo(() => Array.from(selectedIds), [selectedIds])

  const controller = useMemo<VirtualizedListController<TItem>>(
    () => ({
      data,
      selectedIds: selectedIdsArray,
      isAllSelected,
      hasSelection,
      selectedCount,
      toggleSelect: handleToggleItem,
      selectAll: handleSelectAll,
      clearSelection: handleClearSelection
    }),
    [
      data,
      selectedIdsArray,
      isAllSelected,
      hasSelection,
      selectedCount,
      handleToggleItem,
      handleSelectAll,
      handleClearSelection
    ]
  )

  useEffect(() => {
    if (!onSelectionChange) return

    const selectedItems = Array.from(selectedIds)
      .map((id) => itemById.get(id))
      .filter(Boolean) as TItem[]

    onSelectionChange(selectedIdsArray, selectedItems)
  }, [onSelectionChange, selectedIds, selectedIdsArray, itemById])

  return {
    selectedIds,
    controller,
    handleToggleItem
  }
}
