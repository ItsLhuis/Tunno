"use client"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import NotFoundLottie from "@assets/lotties/NotFound.json"
import Lottie from "lottie-react"

import { Typography } from "@components/ui/Typography"

import { type ComponentProps } from "react"

export type NotFoundProps = ComponentProps<"div"> & {
  message?: string
}

const NotFound = ({ className, message, ...props }: NotFoundProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn("relative flex h-full flex-col items-center justify-center", className)}
      {...props}
    >
      <div className="relative -mt-8 -mb-4 size-40 overflow-hidden">
        <Lottie
          animationData={NotFoundLottie}
          className="absolute inset-0 h-full w-full"
          style={{
            transform: "scale(1.5)",
            transformOrigin: "center"
          }}
        />
      </div>
      <Typography affects="muted">{message ?? t("common.noResultsFound")}</Typography>
    </div>
  )
}

export { NotFound }
