import * as SecureStore from "expo-secure-store"
import * as Random from "expo-random"

import { MMKV } from "react-native-mmkv"

async function generateEncryptionKey(): Promise<string> {
  const randomBytes = await Random.getRandomBytesAsync(16)
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

async function initializeStorage() {
  const encryptionKey = await getOrCreateEncryptionKey()
  return new MMKV({
    id: "wave-storage",
    encryptionKey: encryptionKey
  })
}

let storage: MMKV

export const setItem = async (key: string, value: unknown): Promise<void> => {
  if (!storage) {
    storage = await initializeStorage()
  }
  if (value !== undefined && value !== null) {
    storage.set(key, JSON.stringify(value))
  }
}

export const getItem = async <T>(key: string): Promise<T | null> => {
  if (!storage) {
    storage = await initializeStorage()
  }
  const value = storage.getString(key)
  return value ? (JSON.parse(value) as T) : null
}

export const removeItem = async (key: string): Promise<void> => {
  if (!storage) {
    storage = await initializeStorage()
  }
  storage.delete(key)
}

export const clearStorage = async (): Promise<void> => {
  if (!storage) {
    storage = await initializeStorage()
  }
  storage.clearAll()
}
