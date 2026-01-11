export type SelectionChangeCallback<TItem> = (
  selectedIds: readonly string[],
  selectedItems: readonly TItem[]
) => void

export type KeyExtractor<TItem> = (item: TItem, index: number) => string

export type SelectionState = Readonly<{
  selectedIds: ReadonlySet<string>
  selectedCount: number
  totalCount: number
  isAllSelected: boolean
  hasSelection: boolean
}>

export type SelectionController<TItem> = Readonly<{
  data: readonly TItem[]
  selectedIds: readonly string[]
  isAllSelected: boolean
  hasSelection: boolean
  selectedCount: number
  toggleSelect: (id: string, additive?: boolean) => void
  selectAll: () => void
  clearSelection: () => void
}>

type CacheData<TItem> = {
  data: TItem[]
  dataIds: readonly string[]
  itemById: ReadonlyMap<string, TItem>
  dataLength: number
}

type SelectedItemsCache<TItem> = {
  selectedItems: TItem[]
  selectedIdsArray: string[]
  arrayRef: string[] | null
  size: number
}

const SMALL_ARRAY_THRESHOLD = 10

/**
 * Manages selection state for a collection of items with caching optimizations
 *
 * Provides efficient selection operations with O(1) lookups for checking if an
 * item is selected. Maintains caches for frequently accessed data like selected
 * items arrays and IDs. Subscribes to selection changes to notify listeners.
 *
 * Performance optimizations:
 * - Caches selected items array and invalidates only when selection changes
 * - Uses reference equality for small arrays to avoid full comparison
 * - Pre-allocates selected items array to avoid reallocation
 *
 * @template TItem - Type of items being managed
 *
 * @example
 * ```ts
 * const manager = new SelectionManager(item => item.id, items)
 *
 * // Subscribe to changes
 * const unsubscribe = manager.subscribe((ids, items) => {
 *   console.log('Selection changed:', ids, items)
 * })
 *
 * // Toggle selection
 * manager.toggleSelect(item1.id)
 *
 * // Select all
 * manager.selectAll()
 *
 * // Get state
 * const state = manager.getState()
 * console.log(state.selectedCount)
 *
 * unsubscribe()
 * ```
 */
export class SelectionManager<TItem> {
  private readonly keyExtractor: KeyExtractor<TItem>

  private data: TItem[] = []
  private selectedIds: Set<string> = new Set()
  private readonly callbacks = new Set<SelectionChangeCallback<TItem>>()

  private cache: CacheData<TItem> = {
    data: [],
    dataIds: [],
    itemById: new Map(),
    dataLength: 0
  }

  private allSelectedSet: Set<string> | null = null
  private selectedIdsArrayCache: string[] | null = null
  private selectedIdsSetRef: Set<string> | null = null
  private selectedItemsCache: SelectedItemsCache<TItem> = {
    selectedItems: [],
    selectedIdsArray: [],
    arrayRef: null,
    size: 0
  }

  constructor(keyExtractor: KeyExtractor<TItem>, data: readonly TItem[] = []) {
    this.keyExtractor = keyExtractor
    this.setData(data)
  }

  /**
   * Updates the data items and rebuilds the ID lookup cache
   *
   * Caches are invalidated when data changes. The cache stores data IDs and
   * a Map for O(1) item lookup by ID, which is used by getSelectedItems.
   *
   * @param data - New array of items to track
   */
  setData(data: readonly TItem[]): void {
    const dataLength = data.length
    const shouldRecache = this.cache.data !== data || this.cache.dataLength !== dataLength

    if (shouldRecache) {
      const dataIds: string[] = []
      const itemById = new Map<string, TItem>()

      for (let i = 0; i < dataLength; i++) {
        const id = this.keyExtractor(data[i], i)
        dataIds.push(id)
        itemById.set(id, data[i])
      }

      this.cache = {
        data: [...data],
        dataIds: Object.freeze(dataIds),
        itemById,
        dataLength
      }
      this.invalidateCaches()
    }

    this.data = [...data]
  }

  /**
   * Returns the current selection state
   *
   * State includes selected IDs, counts, and boolean flags for convenience.
   * The returned object is read-only to prevent direct mutation.
   *
   * @returns Current selection state
   */
  getState(): SelectionState {
    const selectedCount = this.selectedIds.size
    const totalCount = this.cache.dataLength

    return {
      selectedIds: this.selectedIds,
      selectedCount,
      totalCount,
      isAllSelected: selectedCount === totalCount && totalCount > 0,
      hasSelection: selectedCount > 0
    } as const
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id)
  }

  /**
   * Toggles selection for a single item
   *
   * In additive mode (default), adds/removes the item from selection. If this
   * would leave exactly one item selected, clears selection instead to avoid
   * accidental single selections.
   *
   * In non-additive mode, selects only this item and deselects all others.
   * If this item is already the only one selected, does nothing.
   *
   * @param id - Item ID to toggle
   * @param additive - If true (default), add/remove from selection. If false, select only this item
   */
  toggleSelect(id: string, additive = true): void {
    const prev = this.selectedIds

    if (!additive) {
      if (prev.size === 1 && prev.has(id)) {
        return
      }

      const next = new Set<string>()
      next.add(id)
      this.setSelectedIds(next)

      return
    }

    const hasId = prev.has(id)

    if (hasId && prev.size === 1) {
      this.setSelectedIds(new Set<string>())
      return
    }

    const next = new Set(prev)

    if (hasId) {
      next.delete(id)
    } else {
      next.add(id)
    }

    this.setSelectedIds(next)
  }

  /**
   * Selects all items in the current data set
   *
   * Caches the "all selected" Set to avoid recreating it on repeated calls.
   * The cache is invalidated when data changes or selection is cleared.
   */
  selectAll(): void {
    const { dataIds } = this.cache
    const totalCount = this.cache.dataLength

    if (!this.allSelectedSet || this.allSelectedSet.size !== totalCount) {
      this.allSelectedSet = new Set(dataIds)
    }

    this.setSelectedIds(this.allSelectedSet)
  }

  /**
   * Clears all selections and resets the "all selected" cache
   */
  clearSelection(): void {
    this.setSelectedIds(new Set())
    this.allSelectedSet = null
  }

  /**
   * Returns selected IDs as an array with caching
   *
   * The cached result is returned if the selectedIds Set reference hasn't
   * changed, avoiding unnecessary array conversion.
   *
   * @returns Array of selected item IDs
   */
  getSelectedIds(): readonly string[] {
    if (this.selectedIdsSetRef === this.selectedIds && this.selectedIdsArrayCache) {
      return this.selectedIdsArrayCache
    }

    const array = Array.from(this.selectedIds)

    this.selectedIdsArrayCache = array
    this.selectedIdsSetRef = this.selectedIds

    return array
  }

  /**
   * Returns selected items with caching for performance
   *
   * Looks up selected IDs in the cached itemById Map. Pre-allocates the
   * result array to the expected size for efficiency. The cache is
   * invalidated when selection changes.
   *
   * @returns Array of selected items
   */
  getSelectedItems(): readonly TItem[] {
    const selectedIdsArray = this.getSelectedIds()
    const currentSize = selectedIdsArray.length
    const cache = this.selectedItemsCache

    if (this.isCacheValid(cache, selectedIdsArray, currentSize)) {
      return cache.selectedItems
    }

    const selectedItems: TItem[] = []
    selectedItems.length = currentSize
    let itemIndex = 0

    for (const id of selectedIdsArray) {
      const item = this.cache.itemById.get(id)
      if (item) {
        selectedItems[itemIndex++] = item
      }
    }

    selectedItems.length = itemIndex

    cache.selectedItems = selectedItems
    cache.selectedIdsArray = [...selectedIdsArray]
    cache.arrayRef = selectedIdsArray as string[]
    cache.size = currentSize

    return selectedItems
  }

  /**
   * Returns a controller with methods to manipulate selection
   *
   * The controller provides a convenient API that doesn't require direct
   * access to the manager instance. Useful for passing selection controls
   * to components.
   *
   * @returns Selection controller with current data and control methods
   */
  getController(): SelectionController<TItem> {
    const state = this.getState()
    const selectedIdsArray = this.getSelectedIds()

    return {
      data: this.data,
      selectedIds: selectedIdsArray,
      isAllSelected: state.isAllSelected,
      hasSelection: state.hasSelection,
      selectedCount: state.selectedCount,
      toggleSelect: (id: string, additive?: boolean) => {
        this.toggleSelect(id, additive)
      },
      selectAll: () => {
        this.selectAll()
      },
      clearSelection: () => {
        this.clearSelection()
      }
    } as const
  }

  /**
   * Subscribes to selection changes
   *
   * The callback receives both selected IDs and selected items. Returns an
   * unsubscribe function that removes the callback.
   *
   * @param callback - Function to call when selection changes
   * @returns Unsubscribe function
   */
  subscribe(callback: SelectionChangeCallback<TItem>): () => void {
    this.callbacks.add(callback)

    return () => {
      this.callbacks.delete(callback)
    }
  }

  private isCacheValid(
    cache: SelectedItemsCache<TItem>,
    selectedIdsArray: readonly string[],
    currentSize: number
  ): boolean {
    if (cache.arrayRef === selectedIdsArray) {
      return true
    }

    if (cache.size !== currentSize || cache.selectedIdsArray.length !== currentSize) {
      return false
    }

    if (currentSize === 0) {
      return true
    }

    if (currentSize <= SMALL_ARRAY_THRESHOLD) {
      return (
        cache.selectedIdsArray[0] === selectedIdsArray[0] &&
        cache.selectedIdsArray[currentSize - 1] === selectedIdsArray[currentSize - 1]
      )
    }

    return cache.selectedIdsArray.every((id, i) => id === selectedIdsArray[i])
  }

  private invalidateCaches(): void {
    this.allSelectedSet = null
    this.selectedIdsArrayCache = null
    this.selectedIdsSetRef = null
  }

  private setSelectedIds(newSet: Set<string>): void {
    if (this.selectedIds === newSet) {
      return
    }

    this.selectedIds = newSet
    this.invalidateCaches()
    this.notifyCallbacks()
  }

  private notifyCallbacks(): void {
    if (this.callbacks.size === 0) {
      return
    }

    const selectedIdsArray = this.getSelectedIds()
    const selectedItems = this.getSelectedItems()

    for (const callback of this.callbacks) {
      callback(selectedIdsArray, selectedItems)
    }
  }
}
