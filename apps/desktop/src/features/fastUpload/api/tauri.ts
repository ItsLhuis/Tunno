import { invoke } from "@tauri-apps/api/core"

export const copyBundleToCache = async (bundlePath: string): Promise<string> => {
  return await invoke<string>("fast_upload_copy_bundle_to_cache", { bundlePath })
}

export const extractManifest = async (cachePath: string): Promise<string> => {
  return await invoke<string>("fast_upload_extract_manifest", { cachePath })
}

export const cleanupCacheDirectory = async (cachePath: string): Promise<void> => {
  return await invoke<void>("fast_upload_cleanup_cache_directory", { cachePath })
}

export const checkCacheExists = async (cachePath: string): Promise<boolean> => {
  return await invoke<boolean>("fast_upload_check_cache_exists", { cachePath })
}

export const cleanupAllFastUploadCache = async (): Promise<void> => {
  return await invoke<void>("fast_upload_cleanup_all_cache")
}
