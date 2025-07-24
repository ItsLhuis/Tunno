import "@tauri-apps/api/core"

declare module "@tauri-apps/api/core" {
  interface InvokeArgs {
    start_server: void
    stop_server: void
    is_server_running: void
    get_server_info: void
    get_qr_data: void
    get_audio_duration: { filePath: string }
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
  }

  function invoke<T extends keyof InvokeArgs>(
    cmd: T,
    ...args: InvokeArgs[T] extends void ? [] : [InvokeArgs[T]]
  ): Promise<InvokeReturns[T]>
}
