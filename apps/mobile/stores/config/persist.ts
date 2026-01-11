import { createMMKV, type MMKV } from "react-native-mmkv"

/**
 * A registry of `react-native-mmkv` storage instances, keyed by their unique name.
 * This ensures that only one instance of `MMKV` is created per named store.
 */
const storageInstances: { [key: string]: MMKV } = {}

/**
 * Retrieves an existing MMKV storage instance or creates a new one if it doesn't exist.
 * This ensures that multiple parts of the application can access the same named MMKV store.
 *
 * @param name - The unique name for the MMKV storage instance.
 * @returns A promise that resolves to an `MMKV` storage instance.
 */
async function getOrCreateMMKVStore(name: string): Promise<MMKV> {
  if (!storageInstances[name])
    storageInstances[name] = createMMKV({
      id: name
    })

  return storageInstances[name]
}

/**
 * Creates a custom storage object compatible with Zustand's `persist` middleware,
 * utilizing `react-native-mmkv` for efficient and fast key-value storage.
 *
 * This function returns an object with `getItem`, `setItem`, `removeItem`, and `clearAll`
 * methods that interact with a named `MMKV` instance, allowing Zustand stores to be
 * persisted to and rehydrated from native storage.
 *
 * @param name - The unique name for the persistence store (e.g., "player", "settings").
 * @returns A storage interface object for Zustand's `persist` middleware.
 */
export const persistStorage = (name: string) => ({
  getItem: async <T>(key: string): Promise<T | null> => {
    const store = await getOrCreateMMKVStore(name)
    const value = store.getString(key)
    return value ? (JSON.parse(value) as T) : null
  },
  setItem: async (key: string, value: unknown): Promise<void> => {
    const store = await getOrCreateMMKVStore(name)
    if (value !== undefined && value !== null) store.set(key, JSON.stringify(value))
  },
  removeItem: async (key: string): Promise<void> => {
    const store = await getOrCreateMMKVStore(name)
    store.remove(key)
  },
  clearAll: async (): Promise<void> => {
    const store = await getOrCreateMMKVStore(name)
    store.clearAll()
  }
})
