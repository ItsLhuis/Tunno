import { Window } from "@tauri-apps/api/window"

export async function getOverlayWindow() {
  const overlayWindow = await Window.getByLabel("overlay")
  return overlayWindow
}

export async function showOverlayWindow() {
  const overlayWindow = await getOverlayWindow()
  if (overlayWindow) {
    await overlayWindow.setFocus()
    await overlayWindow.show()
  }
}

export async function hideOverlayWindow() {
  const overlayWindow = await getOverlayWindow()
  if (overlayWindow) {
    await overlayWindow.hide()
  }
}

