/**
 * Implements a Least Recently Used (LRU) cache.
 *
 * This cache stores key-value pairs and automatically removes the least recently
 * used items when the cache exceeds its maximum size.
 *
 * @template K - The type of the keys in the cache.
 * @template V - The type of the values in the cache.
 */
export class LRUCache<K, V> {
  private maxSize: number
  private cache: Map<K, V>

  /**
   * Creates an instance of LRUCache.
   * @param maxSize - The maximum number of items the cache can hold. Must be greater than 0.
   * @throws {Error} If `maxSize` is not greater than 0.
   */
  constructor(maxSize: number) {
    if (maxSize <= 0) {
      throw new Error("LRUCache: maxSize must be greater than 0")
    }
    this.maxSize = maxSize
    this.cache = new Map()
  }

  /**
   * Retrieves a value from the cache. If the key exists, it marks the entry as recently used.
   * @param key - The key of the item to retrieve.
   * @returns The value associated with the key, or `undefined` if the key is not found.
   */
  get(key: K): V | undefined {
    return this.cache.get(key)
  }

  /**
   * Adds or updates a key-value pair in the cache.
   * If the key already exists, its value is updated and it becomes the most recently used item.
   * If adding a new item causes the cache to exceed `maxSize`, the least recently used item is removed.
   * @param key - The key of the item to set.
   * @param value - The value to associate with the key.
   */
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

  /**
   * Checks if a key exists in the cache.
   * @param key - The key to check.
   * @returns `true` if the key exists, `false` otherwise.
   */
  has(key: K): boolean {
    return this.cache.has(key)
  }

  /**
   * Deletes a key-value pair from the cache.
   * @param key - The key of the item to delete.
   * @returns `true` if the item was deleted, `false` if the key was not found.
   */
  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clears all items from the cache.
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Gets the current number of items in the cache.
   */
  get size(): number {
    return this.cache.size
  }

  /**
   * Returns an iterable of [key, value] pairs for every entry in the cache.
   */
  entries(): IterableIterator<[K, V]> {
    return this.cache.entries()
  }

  /**
   * Returns an iterable of keys in the cache.
   */
  keys(): IterableIterator<K> {
    return this.cache.keys()
  }

  /**
   * Returns an iterable of values in the cache.
   */
  values(): IterableIterator<V> {
    return this.cache.values()
  }

  /**
   * Gets the maximum size of the cache.
   * @returns The maximum number of items the cache can hold.
   */
  getMaxSize(): number {
    return this.maxSize
  }

  /**
   * Sets a new maximum size for the cache.
   * If the new size is smaller than the current number of items,
   * the least recently used items will be removed until `maxSize` is satisfied.
   * @param newMaxSize - The new maximum size. Must be greater than 0.
   * @throws {Error} If `newMaxSize` is not greater than 0.
   */
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

  /**
   * Creates a new LRU cache from an iterable of key-value pairs
   *
   * @param entries - Iterable of [key, value] pairs to populate the cache
   * @param maxSize - Maximum number of entries the cache can hold
   * @returns New LRUCache instance with entries loaded in order
   */
  static from<K, V>(entries: Iterable<[K, V]>, maxSize: number): LRUCache<K, V> {
    const cache = new LRUCache<K, V>(maxSize)
    for (const [key, value] of entries) {
      cache.set(key, value)
    }
    return cache
  }
}
