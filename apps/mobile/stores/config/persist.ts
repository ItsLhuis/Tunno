import * as SecureStore from "expo-secure-store"
import * as Crypto from "expo-crypto"

import { MMKV } from "react-native-mmkv"

const storageInstances: { [key: string]: MMKV } = {}

async function generateEncryptionKey(): Promise<string> {
  const randomBytes = await Crypto.getRandomBytesAsync(16)
  return Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

async function getOrCreateEncryptionKey(): Promise<string> {
  let encryptionKey = await SecureStore.getItemAsync("encryptionKey")
  if (!encryptionKey) {
    encryptionKey = await generateEncryptionKey()
    await SecureStore.setItemAsync("encryptionKey", encryptionKey)
  }
  return encryptionKey
}

async function initializeIfNeeded(id: string): Promise<MMKV> {
  if (!storageInstances[id]) {
    const encryptionKey = await getOrCreateEncryptionKey()
    storageInstances[id] = new MMKV({
      id,
      encryptionKey: encryptionKey
    })
  }
  return storageInstances[id]
}

export const persistStorage = (id: string) => ({
  getItem: async <T>(key: string): Promise<T | null> => {
    const storage = await initializeIfNeeded(id)
    const value = storage.getString(key)
    return value ? (JSON.parse(value) as T) : null
  },
  setItem: async (key: string, value: unknown): Promise<void> => {
    const storage = await initializeIfNeeded(id)
    if (value !== undefined && value !== null) {
      storage.set(key, JSON.stringify(value))
    }
  },
  removeItem: async (key: string): Promise<void> => {
    const storage = await initializeIfNeeded(id)
    storage.delete(key)
  },
  clearAll: async (): Promise<void> => {
    const storage = await initializeIfNeeded(id)
    storage.clearAll()
  }
})
