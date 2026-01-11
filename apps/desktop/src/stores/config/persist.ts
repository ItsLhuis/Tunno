import { load, Store } from "@tauri-apps/plugin-store"

/**
 * A registry of `@tauri-apps/plugin-store` instances, keyed by their unique name.
 * This ensures that only one instance of `Store` is created per named store.
 */
const storageInstances: { [key: string]: Store } = {}

/**
 * Retrieves an existing Tauri Store instance or creates a new one if it doesn't exist.
 * This ensures that multiple parts of the application can access the same named Tauri Store.
 *
 * @param name - The unique name for the Tauri Store instance.
 * @returns A promise that resolves to a `Store` instance.
 */
async function getOrCreateTauriStore(name: string): Promise<Store> {
  if (!storageInstances[name])
    storageInstances[name] = await load(name, { defaults: {}, autoSave: true })
  return storageInstances[name]
}

/**
 * Creates a custom storage object compatible with Zustand's `persist` middleware,
 * utilizing `@tauri-apps/plugin-store` for efficient and fast key-value storage in Tauri.
 *
 * This function returns an object with `getItem`, `setItem`, `removeItem`, and `clearAll`
 * methods that interact with a named Tauri `Store` instance, allowing Zustand stores to be
 * persisted to and rehydrated from the native Tauri filesystem.
 *
 * @param name - The unique name for the persistence store (e.g., "player", "settings").
 * @returns A storage interface object for Zustand's `persist` middleware.
 */
export function persistStorage(name: string) {
  return {
    /**
     * Retrieves an item from the Tauri Store.
     * @param key - The key of the item to retrieve.
     * @returns A Promise that resolves to the retrieved value, or `null` if not found.
     */
    getItem: async <T>(key: string): Promise<T | null> => {
      const store = await getOrCreateTauriStore(name)
      const value = await store.get<string>(key)
      return value ? (value as T) : null
    },
    /**
     * Sets an item in the Tauri Store.
     * @param key - The key of the item to set.
     * @param value - The value to store.
     * @returns A Promise that resolves when the item has been set.
     */
    setItem: async (key: string, value: unknown): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      if (value !== undefined && value !== null) store.set(key, value)
    },
    /**
     * Removes an item from the Tauri Store.
     * @param key - The key of the item to remove.
     * @returns A Promise that resolves when the item has been removed.
     */
    removeItem: async (key: string): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      await store.delete(key)
    },
    /**
     * Clears all items from the Tauri Store.
     * @returns A Promise that resolves when the store has been cleared.
     */
    clearAll: async (): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      await store.clear()
    }
  }
}
