import { getCurrentWindow } from "@tauri-apps/api/window"

const appWindow = getCurrentWindow()

export async function getWindowTitle() {
  return await appWindow.title()
}

export async function showCurrentWindow() {
  if (appWindow) {
    appWindow.show()
  }
}

export async function hideCurrentWindow() {
  if (appWindow) {
    appWindow.hide()
  }
}

export async function minimizeCurrentWindow() {
  return await appWindow.minimize()
}

export async function toggleMaximizeCurrentWindow() {
  return await appWindow.toggleMaximize()
}

export async function isCurrentWindowMaximized() {
  return await appWindow.isMaximized()
}
