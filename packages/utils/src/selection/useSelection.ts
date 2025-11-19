import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  SelectionManager,
  type KeyExtractor,
  type SelectionController,
  type SelectionState
} from "./SelectionManager"

export type UseSelectionReturn<TItem> = Readonly<{
  selectedIds: ReadonlySet<string>
  controller: SelectionController<TItem>
  handleToggleItem: (id: string, additive?: boolean) => void
  state: SelectionState
}>

export function useSelection<TItem>(
  manager: SelectionManager<TItem>,
  onSelectionChange?: (selectedIds: readonly string[], selectedItems: readonly TItem[]) => void
): UseSelectionReturn<TItem> {
  const [state, setState] = useState<SelectionState>(() => manager.getState())

  const onSelectionChangeRef = useRef(onSelectionChange)

  onSelectionChangeRef.current = onSelectionChange

  useEffect(() => {
    const unsubscribe = manager.subscribe((selectedIds, selectedItems) => {
      setState(manager.getState())
      onSelectionChangeRef.current?.(selectedIds, selectedItems)
    })

    return unsubscribe
  }, [manager])

  const controller = useMemo<SelectionController<TItem>>(
    () => manager.getController(),
    [manager, state]
  )

  const handleToggleItem = useCallback(
    (id: string, additive?: boolean) => {
      manager.toggleSelect(id, additive)
    },
    [manager]
  )

  return {
    selectedIds: state.selectedIds,
    controller,
    handleToggleItem,
    state
  } as const
}

export function createSelectionManager<TItem>(
  keyExtractor: KeyExtractor<TItem>,
  data: readonly TItem[] = []
): SelectionManager<TItem> {
  return new SelectionManager(keyExtractor, data)
}
