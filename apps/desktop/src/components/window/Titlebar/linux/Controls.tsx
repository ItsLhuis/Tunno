import { cn } from "@lib/utils"

import { Close, Maximize, Minimize, Restore } from "./icons"

import { ControlButton } from "../ControlButton"

type LinuxProps = {
  isWindowMaximized: boolean
  isWindowFocused: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

function Linux({
  isWindowMaximized,
  isWindowFocused,
  onMinimize,
  onMaximize,
  onClose
}: LinuxProps) {
  const linuxButtonClassName = `h-6 w-6 rounded-full [&_svg]:size-auto ${
    isWindowFocused
      ? "bg-[#dadada] text-black dark:bg-[#373737] dark:text-white hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:hover:bg-[#424242] dark:active:bg-[#565656] focus-visible:bg-[#d1d1d1] dark:focus-visible:bg-[#424242]"
      : "bg-transparent dark:bg-transparent"
  }`

  return (
    <div className="mr-3 flex h-full items-center space-x-3">
      <ControlButton
        onClick={onMinimize}
        aria-label="Minimize"
        className={cn(linuxButtonClassName, "items-end pb-[8px]")}
      >
        <Minimize />
      </ControlButton>
      <ControlButton
        onClick={onMaximize}
        aria-label={isWindowMaximized ? "Restore" : "Maximize"}
        className={linuxButtonClassName}
      >
        {isWindowMaximized ? <Restore /> : <Maximize />}
      </ControlButton>
      <ControlButton onClick={onClose} aria-label="Close" className={linuxButtonClassName}>
        <Close />
      </ControlButton>
    </div>
  )
}

export default Linux
