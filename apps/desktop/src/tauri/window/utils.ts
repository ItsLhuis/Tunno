import { currentMonitor, getCurrentWindow, LogicalPosition, Window } from "@tauri-apps/api/window"

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

export const showOverlayWindow = async (): Promise<void> => {
  const overlayWindow = await getOverlayWindow()
  await overlayWindow.unminimize()
  await overlayWindow.show()
  await overlayWindow.setFocus()
}

export const moveCurrentWindowToCorner = async (
  corner: "bottom-left" | "bottom-right" | "top-left" | "top-right"
): Promise<void> => {
  const monitor = await currentMonitor()

  if (monitor) {
    const { position, size, scaleFactor } = monitor

    const currentWindow = getCurrentWindow()

    const isCurrentWindowMaximized = await currentWindow.isMaximized()
    if (isCurrentWindowMaximized) await currentWindow.toggleMaximize()

    const windowSize = await currentWindow.outerSize()

    let newX = position.x
    let newY = position.y

    switch (corner) {
      case "bottom-left":
        newX = position.x + 10
        newY = position.y + size.height - windowSize.height - 10
        break
      case "bottom-right":
        newX = position.x + size.width - windowSize.width - 10
        newY = position.y + size.height - windowSize.height - 10
        break
      case "top-left":
        newX = position.x + 10
        newY = position.y + 10
        break
      case "top-right":
        newX = position.x + size.width - windowSize.width - 10
        newY = position.y + 10
        break
    }

    newX = Math.max(newX, position.x)
    newY = Math.max(newY, position.y)

    const newPosition = new LogicalPosition(
      Math.floor(newX / scaleFactor),
      Math.floor(newY / scaleFactor)
    )

    await getCurrentWindow().setPosition(newPosition)
  }
}
