import { MMKV } from "react-native-mmkv"

const storageInstances: { [key: string]: MMKV } = {}

async function getOrCreateMMKVStore(name: string): Promise<MMKV> {
  if (!storageInstances[name])
    storageInstances[name] = new MMKV({
      id: name
    })

  return storageInstances[name]
}

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
    store.delete(key)
  },
  clearAll: async (): Promise<void> => {
    const store = await getOrCreateMMKVStore(name)
    store.clearAll()
  }
})
