import { load, Store } from "@tauri-apps/plugin-store"

const storageInstances: { [key: string]: Store } = {}

async function getOrCreateTauriStore(name: string): Promise<Store> {
  if (!storageInstances[name])
    storageInstances[name] = await load(name, { defaults: {}, autoSave: true })
  return storageInstances[name]
}

export function persistStorage(name: string) {
  return {
    getItem: async <T>(key: string): Promise<T | null> => {
      const store = await getOrCreateTauriStore(name)
      const value = await store.get<string>(key)
      return value ? (value as T) : null
    },
    setItem: async (key: string, value: unknown): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      if (value !== undefined && value !== null) store.set(key, value)
    },
    removeItem: async (key: string): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      await store.delete(key)
    },
    clearAll: async (): Promise<void> => {
      const store = await getOrCreateTauriStore(name)
      await store.clear()
    }
  }
}
