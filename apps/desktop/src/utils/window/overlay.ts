import { Window } from "@tauri-apps/api/window"

let overlayWindow: Window | null = null

export async function initializeOverlayWindow() {
  overlayWindow = await Window.getByLabel("overlay")
}

export { overlayWindow }

export async function showOverlayWindow() {
  if (overlayWindow) {
    await overlayWindow.setFocus()
    await overlayWindow.show()
  }
}

export async function hideOverlayWindow() {
  if (overlayWindow) {
    await overlayWindow.hide()
  }
}
