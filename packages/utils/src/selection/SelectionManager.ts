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

  selectAll(): void {
    const { dataIds } = this.cache
    const totalCount = this.cache.dataLength

    if (!this.allSelectedSet || this.allSelectedSet.size !== totalCount) {
      this.allSelectedSet = new Set(dataIds)
    }

    this.setSelectedIds(this.allSelectedSet)
  }

  clearSelection(): void {
    this.setSelectedIds(new Set())
    this.allSelectedSet = null
  }

  getSelectedIds(): readonly string[] {
    if (this.selectedIdsSetRef === this.selectedIds && this.selectedIdsArrayCache) {
      return this.selectedIdsArrayCache
    }

    const array = Array.from(this.selectedIds)

    this.selectedIdsArrayCache = array
    this.selectedIdsSetRef = this.selectedIds

    return array
  }

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
