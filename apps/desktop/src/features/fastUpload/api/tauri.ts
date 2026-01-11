import { invoke } from "@tauri-apps/api/core"

/**
 * Invokes the Tauri backend to copy the music bundle from its original location
 * to a temporary cache directory for processing.
 *
 * @param bundlePath - The absolute path to the music bundle directory.
 * @returns A Promise that resolves to the path of the created cache directory.
 */
export async function copyBundleToCache(bundlePath: string): Promise<string> {
  return await invoke<string>("fast_upload_copy_bundle_to_cache", { bundlePath })
}

/**
 * Invokes the Tauri backend to extract the manifest JSON content from the specified cache path.
 * This manifest typically contains metadata about the tracks within the bundle.
 *
 * @param cachePath - The path to the cache directory where the manifest is located.
 * @returns A Promise that resolves to the JSON content of the manifest as a string.
 */
export async function extractManifest(cachePath: string): Promise<string> {
  return await invoke<string>("fast_upload_extract_manifest", { cachePath })
}

/**
 * Invokes the Tauri backend to clean up (delete) the specified cache directory.
 *
 * @param cachePath - The path to the cache directory to be cleaned up.
 * @returns A Promise that resolves when the cleanup operation is complete.
 */
export async function cleanupCacheDirectory(cachePath: string): Promise<void> {
  return await invoke<void>("fast_upload_cleanup_cache_directory", { cachePath })
}

/**
 * Invokes the Tauri backend to check if a cache directory exists at the given path.
 *
 * @param cachePath - The path to the cache directory to check.
 * @returns A Promise that resolves to `true` if the cache directory exists, `false` otherwise.
 */
export async function checkCacheExists(cachePath: string): Promise<boolean> {
  return await invoke<boolean>("fast_upload_check_cache_exists", { cachePath })
}

/**
 * Invokes the Tauri backend to clean up all temporary cache directories related to fast uploads.
 *
 * @returns A Promise that resolves when the cleanup operation is complete.
 */
export async function cleanupAllFastUploadCache(): Promise<void> {
  return await invoke<void>("fast_upload_cleanup_all_cache")
}
