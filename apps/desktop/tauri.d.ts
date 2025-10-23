import "@tauri-apps/api/core"

declare module "@tauri-apps/api/core" {
  interface InvokeArgs {
    start_server: void
    stop_server: void
    is_server_running: void
    get_server_info: void
    get_qr_data: void
    get_audio_duration: { filePath: string }
    fast_upload_copy_bundle_to_cache: { bundlePath: string }
    fast_upload_extract_manifest: { cachePath: string }
    fast_upload_cleanup_cache_directory: { cachePath: string }
    fast_upload_check_cache_exists: { cachePath: string }
    fast_upload_cleanup_all_cache: void
  }

  interface InvokeReturns {
    start_server: {
      ip: string
      port: number
      url: string
      endpoints: string[]
    }
    stop_server: void
    is_server_running: boolean
    get_server_info: {
      ip: string
      port: number
      url: string
      endpoints: string[]
    } | null
    get_qr_data: string | null
    get_audio_duration: number
    fast_upload_copy_bundle_to_cache: string
    fast_upload_extract_manifest: string
    fast_upload_cleanup_cache_directory: void
    fast_upload_check_cache_exists: boolean
    fast_upload_cleanup_all_cache: void
  }

  function invoke<T extends keyof InvokeArgs>(
    cmd: T,
    ...args: InvokeArgs[T] extends void ? [] : [InvokeArgs[T]]
  ): Promise<InvokeReturns[T]>
}
