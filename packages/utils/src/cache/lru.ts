export class LRUCache<K, V> {
  private maxSize: number
  private cache: Map<K, V>

  constructor(maxSize: number) {
    if (maxSize <= 0) {
      throw new Error("LRUCache: maxSize must be greater than 0")
    }
    this.maxSize = maxSize
    this.cache = new Map()
  }

  get(key: K): V | undefined {
    return this.cache.get(key)
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey)
      }
    }
  }

  has(key: K): boolean {
    return this.cache.has(key)
  }

  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  get size(): number {
    return this.cache.size
  }

  entries(): IterableIterator<[K, V]> {
    return this.cache.entries()
  }

  keys(): IterableIterator<K> {
    return this.cache.keys()
  }

  values(): IterableIterator<V> {
    return this.cache.values()
  }

  getMaxSize(): number {
    return this.maxSize
  }

  setMaxSize(newMaxSize: number): void {
    if (newMaxSize <= 0) {
      throw new Error("LRUCache: maxSize must be greater than 0")
    }

    this.maxSize = newMaxSize

    if (this.cache.size > this.maxSize) {
      const keysToDelete = this.cache.size - this.maxSize
      const iterator = this.cache.keys()

      for (let i = 0; i < keysToDelete; i++) {
        const key = iterator.next().value
        if (key !== undefined) {
          this.cache.delete(key)
        } else {
          break
        }
      }
    }
  }

  static from<K, V>(entries: Iterable<[K, V]>, maxSize: number): LRUCache<K, V> {
    const cache = new LRUCache<K, V>(maxSize)
    for (const [key, value] of entries) {
      cache.set(key, value)
    }
    return cache
  }
}
