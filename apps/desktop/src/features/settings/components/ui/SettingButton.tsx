import { type ReactNode } from "react"

import { cn } from "@lib/utils"

import { Typography } from "@components/ui"

export type SettingButtonProps = {
  title: string | ReactNode
  description?: string | ReactNode
  renderLeft?: () => ReactNode
  renderRight?: () => ReactNode
  className?: string
  children?: ReactNode
}

const SettingButton = ({
  title,
  description,
  renderLeft,
  renderRight,
  className,
  children
}: SettingButtonProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-3 transition-colors", className)}>
      <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3">
        {renderLeft && <div>{renderLeft()}</div>}
        <div className="min-w-0 space-y-1 text-left">
          {typeof title === "string" ? (
            <Typography variant="h6" className="wrap-break-word">
              {title}
            </Typography>
          ) : (
            <div className="wrap-break-word">{title}</div>
          )}
          {description && (
            <div className="wrap-break-word">
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
