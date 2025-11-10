import { invoke } from "@tauri-apps/api/core"

export async function copyBundleToCache(bundlePath: string): Promise<string> {
  return await invoke<string>("fast_upload_copy_bundle_to_cache", { bundlePath })
}

export async function extractManifest(cachePath: string): Promise<string> {
  return await invoke<string>("fast_upload_extract_manifest", { cachePath })
}

export async function cleanupCacheDirectory(cachePath: string): Promise<void> {
  return await invoke<void>("fast_upload_cleanup_cache_directory", { cachePath })
}

export async function checkCacheExists(cachePath: string): Promise<boolean> {
  return await invoke<boolean>("fast_upload_check_cache_exists", { cachePath })
}

export async function cleanupAllFastUploadCache(): Promise<void> {
  return await invoke<void>("fast_upload_cleanup_all_cache")
}
