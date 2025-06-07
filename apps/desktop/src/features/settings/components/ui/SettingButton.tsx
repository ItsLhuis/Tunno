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
}

const SettingButton = ({
  title,
  description,
  renderLeft,
  renderRight,
  onClick,
  className
}: SettingButtonProps) => {
  return (
    <div
      className={cn("flex w-full items-center rounded bg-transparent transition", className)}
      onClick={onClick}
    >
      {renderLeft && <div className="mr-4 flex-shrink-0">{renderLeft()}</div>}
      <div className="flex-1 text-left">
        {typeof title === "string" ? (
          <Typography variant="h6" affects={["bold"]}>
            {title}
          </Typography>
        ) : (
          title
        )}
        {description && (
          <div>
            {typeof description === "string" ? (
              <Typography affects={["muted"]}>{description}</Typography>
            ) : (
              description
            )}
          </div>
        )}
      </div>
      {renderRight && <div className="ml-4 flex-shrink-0">{renderRight()}</div>}
    </div>
  )
}

export { SettingButton }
