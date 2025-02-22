import { Fragment } from "react"

import { Close, Maximize, Minimize, Restore } from "./icons"

import { ControlButton } from "../ControlButton"

type WindowsProps = {
  isWindowMaximized: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

function Windows({ isWindowMaximized, onMinimize, onMaximize, onClose }: WindowsProps) {
  const windowsButtonClassName =
    "h-full w-[46px] flex items-center justify-center hover:bg-accent active:bg-accent/70 focus-visible:bg-accent [&_svg]:size-auto"

  return (
    <Fragment>
      <ControlButton onClick={onMinimize} aria-label="Minimize" className={windowsButtonClassName}>
        <Minimize />
      </ControlButton>
      <ControlButton
        onClick={onMaximize}
        aria-label={isWindowMaximized ? "Restore" : "Maximize"}
        className={windowsButtonClassName}
      >
        {isWindowMaximized ? <Restore /> : <Maximize />}
      </ControlButton>
      <ControlButton
        onClick={onClose}
        aria-label="Close"
        className={
          "h-full w-[46px] flex items-center justify-center hover:bg-[#c42b1c] hover:text-white focus-visible:bg-[#c42b1c] focus-visible:text-white active:bg-[#c42b1c]/70 active:text-white [&_svg]:size-auto"
        }
      >
        <Close />
      </ControlButton>
    </Fragment>
  )
}

export default Windows
