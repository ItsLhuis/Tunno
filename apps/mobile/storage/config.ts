import * as SecureStore from "expo-secure-store"
import * as Crypto from "expo-crypto"

import { MMKV } from "react-native-mmkv"

let storage: MMKV | null = null

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

async function initializeIfNeeded(): Promise<void> {
  if (!storage) {
    const encryptionKey = await getOrCreateEncryptionKey()
    storage = new MMKV({
      id: "wave-storage",
      encryptionKey: encryptionKey
    })
  }
}

export const setItem = async (key: string, value: unknown): Promise<void> => {
  await initializeIfNeeded()
  if (value !== undefined && value !== null) {
    storage?.set(key, JSON.stringify(value))
  }
}

export const getItem = async <T>(key: string): Promise<T | null> => {
  await initializeIfNeeded()
  const value = storage?.getString(key)
  return value ? (JSON.parse(value) as T) : null
}

export const removeItem = async (key: string): Promise<void> => {
  await initializeIfNeeded()
  storage?.delete(key)
}

export const clearStorage = async (): Promise<void> => {
  await initializeIfNeeded()
  storage?.clearAll()
}
