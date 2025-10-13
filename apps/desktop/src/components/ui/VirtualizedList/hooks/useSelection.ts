import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import type { VirtualizedListController } from "../types"

export function useSelection<TItem>(
  data: TItem[],
  keyExtractor: (item: TItem, index: number) => string,
  onSelectionChange?: (selectedIds: string[], selectedItems: TItem[]) => void
) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const cacheRef = useRef<{
    data: TItem[]
    dataIds: string[]
    itemById: Map<string, TItem>
  }>({ data: [], dataIds: [], itemById: new Map() })

  if (cacheRef.current.data !== data) {
    const dataIds: string[] = []
    const itemById = new Map<string, TItem>()

    for (let i = 0; i < data.length; i++) {
      const id = keyExtractor(data[i], i)
      dataIds.push(id)
      itemById.set(id, data[i])
    }

    cacheRef.current = { data, dataIds, itemById }
  }

  const { itemById } = cacheRef.current

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
    setSelectedIds(new Set(cacheRef.current.dataIds))
  }, [])

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

    const selectedItems: TItem[] = []
    for (const id of selectedIds) {
      const item = itemById.get(id)
      if (item) selectedItems.push(item)
    }

    onSelectionChange(selectedIdsArray, selectedItems)
  }, [onSelectionChange, selectedIds, selectedIdsArray, itemById])

  return {
    selectedIds,
    controller,
    handleToggleItem
  }
}
