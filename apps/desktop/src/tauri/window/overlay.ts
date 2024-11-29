import { Window } from "@tauri-apps/api/window"

let overlayWindow: Window | null = null

export async function getOverlayWindow(): Promise<Window> {
  if (!overlayWindow) {
    overlayWindow = await Window.getByLabel("overlay")
    if (!overlayWindow) {
      throw new Error("Overlay window could not be created or retrieved.")
    }
  }
  return overlayWindow
}
