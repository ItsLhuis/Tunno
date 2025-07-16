import { type ReactNode } from "react"

import { cn } from "@lib/utils"

import { Typography } from "@components/ui"

export type SettingButtonProps = {
  title: string | ReactNode
  description?: string | ReactNode
  renderLeft?: () => ReactNode
  renderRight?: () => ReactNode
  onClick?: () => void
  className?: string
  children?: ReactNode
}

const SettingButton = ({
  title,
  description,
  renderLeft,
  renderRight,
  onClick,
  className,
  children
}: SettingButtonProps) => {
  return (
    <div
      className={cn("flex w-full flex-col gap-3 transition-colors", className)}
      onClick={onClick}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3">
        {renderLeft && <div>{renderLeft()}</div>}
        <div className="min-w-0 text-left">
          {typeof title === "string" ? (
            <Typography variant="h6" affects={["bold"]} className="break-words">
              {title}
            </Typography>
          ) : (
            <div className="break-words">{title}</div>
          )}
          {description && (
            <div className="break-words">
              {typeof description === "string" ? (
                <Typography affects={["muted"]}>{description}</Typography>
              ) : (
                description
              )}
            </div>
          )}
        </div>
        {renderRight && <div>{renderRight()}</div>}
      </div>
      {children}
    </div>
  )
}

export { SettingButton }
