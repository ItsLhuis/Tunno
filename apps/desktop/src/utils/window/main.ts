import { getCurrentWindow } from "@tauri-apps/api/window"

export const mainWindow = getCurrentWindow()

export async function getWindowTitle() {
  return await mainWindow.title()
}

export async function showCurrentWindow() {
  if (mainWindow) {
    mainWindow.show()
  }
}

export async function hideCurrentWindow() {
  if (mainWindow) {
    mainWindow.hide()
  }
}

export async function minimizeCurrentWindow() {
  return await mainWindow.minimize()
}

export async function toggleMaximizeCurrentWindow() {
  return await mainWindow.toggleMaximize()
}

export async function isCurrentWindowMaximized() {
  return await mainWindow.isMaximized()
}
