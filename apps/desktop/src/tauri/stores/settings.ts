import { load, Store } from "@tauri-apps/plugin-store"

let store: Store | null = null

export async function getSettingsStore(): Promise<Store> {
  if (!store) {
    store = await load(".settings.json", { autoSave: true })
  }
  return store
}
