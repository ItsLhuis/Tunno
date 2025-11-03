import { Fragment } from "react"

import { Close, Maximize, Minimize, Restore } from "./icons"

import { ControlButton } from "../ControlButton"

type WindowsProps = {
  isWindowMaximized: boolean
  onMinimize?: () => void
  onMaximize?: () => void
  onClose: () => void
  orientation?: "horizontal" | "vertical"
}

const Windows = ({
  isWindowMaximized,
  onMinimize,
  onMaximize,
  onClose,
  orientation = "horizontal"
}: WindowsProps) => {
  const isVertical = orientation === "vertical"

  const windowsButtonClassNameHorizontal =
    "h-full w-[46px] flex items-center justify-center hover:bg-accent active:bg-accent/70 focus-visible:bg-accent [&_svg]:size-auto"

  const windowsButtonClassNameVertical =
    "h-8 w-full flex items-center justify-center hover:bg-accent active:bg-accent/70 focus-visible:bg-accent [&_svg]:size-auto"

  const windowsCloseButtonClassNameHorizontal =
    "flex h-full w-[46px] items-center justify-center hover:bg-[#c42b1c] hover:text-white focus-visible:bg-[#c42b1c] focus-visible:text-white active:bg-[#c42b1c]/70 active:text-white [&_svg]:size-auto"

  const windowsCloseButtonClassNameVertical =
    "flex h-8 w-full items-center justify-center hover:bg-[#c42b1c] hover:text-white focus-visible:bg-[#c42b1c] focus-visible:text-white active:bg-[#c42b1c]/70 active:text-white [&_svg]:size-auto"

  const buttons = (
    <Fragment>
      {onMinimize && (
        <ControlButton
          onClick={onMinimize}
          aria-label="Minimize"
          className={isVertical ? windowsButtonClassNameVertical : windowsButtonClassNameHorizontal}
        >
          <Minimize />
        </ControlButton>
      )}
      {onMaximize && (
        <ControlButton
          onClick={onMaximize}
          aria-label={isWindowMaximized ? "Restore" : "Maximize"}
          className={isVertical ? windowsButtonClassNameVertical : windowsButtonClassNameHorizontal}
        >
          {isWindowMaximized ? <Restore /> : <Maximize />}
        </ControlButton>
      )}
      <ControlButton
        onClick={onClose}
        aria-label="Close"
        className={
          isVertical ? windowsCloseButtonClassNameVertical : windowsCloseButtonClassNameHorizontal
        }
      >
        <Close />
      </ControlButton>
    </Fragment>
  )

  if (isVertical) {
    return <div className="flex w-full flex-col">{buttons}</div>
  }

  return <Fragment>{buttons}</Fragment>
}

export { Windows }
