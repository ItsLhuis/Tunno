import { useCallback, useRef, useState } from "react"

import { useCameraPermissions } from "expo-camera"

import { type SyncConnectionData } from "../types"

/**
 * Hook that manages QR code scanning for the sync feature.
 *
 * Handles camera permission requests, barcode scan parsing, validation of the
 * QR payload structure, and debouncing to prevent duplicate scans.
 *
 * @returns An object with permission state, scan handler, and scanned connection data.
 */
export function useQrScanner() {
  const [permission, requestPermission] = useCameraPermissions()

  const [scannedData, setScannedData] = useState<SyncConnectionData | null>(null)

  const lastScanRef = useRef<number>(0)

  const onBarcodeScanned = useCallback((result: { data: string }) => {
    const now = Date.now()

    if (now - lastScanRef.current < 2000) return

    lastScanRef.current = now

    try {
      const parsed = JSON.parse(result.data) as Record<string, unknown>

      if (
        typeof parsed.host !== "string" ||
        typeof parsed.port !== "number" ||
        typeof parsed.token !== "string" ||
        typeof parsed.url !== "string"
      ) {
        return
      }

      const connectionData: SyncConnectionData = {
        host: parsed.host,
        port: parsed.port,
        token: parsed.token,
        url: parsed.url
      }

      setScannedData(connectionData)
    } catch {
      // Invalid QR data — ignore and keep scanning
    }
  }, [])

  const reset = useCallback(() => {
    setScannedData(null)
    lastScanRef.current = 0
  }, [])

  return {
    hasPermission: permission?.granted ?? false,
    isPermissionLoading: !permission,
    requestPermission,
    onBarcodeScanned,
    scannedData,
    reset
  }
}
