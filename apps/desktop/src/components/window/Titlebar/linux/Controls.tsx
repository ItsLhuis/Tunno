import { cn } from "@lib/utils"

import { Close, Maximize, Minimize, Restore } from "./icons"

import { ControlButton } from "../ControlButton"

type LinuxProps = {
  isWindowMaximized: boolean
  isWindowFocused: boolean
  onMinimize?: () => void
  onMaximize?: () => void
  onClose: () => void
  orientation?: "horizontal" | "vertical"
}

const Linux = ({
  isWindowMaximized,
  isWindowFocused,
  onMinimize,
  onMaximize,
  onClose,
  orientation = "horizontal"
}: LinuxProps) => {
  const isVertical = orientation === "vertical"

  const linuxButtonClassName = `h-6 w-6 rounded-full [&_svg]:size-auto ${
    isWindowFocused
      ? "bg-[#dadada] text-black dark:bg-[#373737] dark:text-white hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:hover:bg-[#424242] dark:active:bg-[#565656] focus-visible:bg-[#d1d1d1] dark:focus-visible:bg-[#424242]"
      : "bg-transparent dark:bg-transparent"
  }`

  return (
    <div
      className={cn(
        "mr-3 flex h-full items-center",
        isVertical ? "m-0 mt-1 flex-col space-y-3" : "space-x-3"
      )}
    >
      {onMinimize && (
        <ControlButton
          onClick={onMinimize}
          aria-label="Minimize"
          className={cn(linuxButtonClassName, !isVertical && "items-end pb-[8px]")}
        >
          <Minimize />
        </ControlButton>
      )}
      {onMaximize && (
        <ControlButton
          onClick={onMaximize}
          aria-label={isWindowMaximized ? "Restore" : "Maximize"}
          className={linuxButtonClassName}
        >
          {isWindowMaximized ? <Restore /> : <Maximize />}
        </ControlButton>
      )}
      <ControlButton onClick={onClose} aria-label="Close" className={linuxButtonClassName}>
        <Close />
      </ControlButton>
    </div>
  )
}

export { Linux }
