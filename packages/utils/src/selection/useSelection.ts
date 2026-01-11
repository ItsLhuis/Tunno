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

/**
 * React hook for managing selection state with a SelectionManager
 *
 * Subscribes to selection changes from the manager and provides a controller
 * for toggling selections, selecting all, and clearing selections. The hook
 * maintains a local state copy that updates when the manager notifies changes.
 *
 * @param manager - SelectionManager instance to connect to
 * @param onSelectionChange - Optional callback invoked when selection changes
 * @returns Selection state and controller
 *
 * @example
 * ```ts
 * const manager = createSelectionManager(item => item.id, items)
 * const { selectedIds, controller, handleToggleItem } = useSelection(manager)
 *
 * // In render
 * <button onClick={() => handleToggleItem(item.id)}>Toggle</button>
 * ```
 */
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

/**
 * Factory function to create a SelectionManager instance
 *
 * @param keyExtractor - Function to extract a unique string key from each item
 * @param data - Initial array of items to track
 * @returns New SelectionManager instance
 *
 * @example
 * ```ts
 * const manager = createSelectionManager(item => item.id, items)
 * ```
 */
export function createSelectionManager<TItem>(
  keyExtractor: KeyExtractor<TItem>,
  data: readonly TItem[] = []
): SelectionManager<TItem> {
  return new SelectionManager(keyExtractor, data)
}
