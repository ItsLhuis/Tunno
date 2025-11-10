"use client"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import NotFoundLottie from "@assets/lotties/NotFound.json"
import Lottie from "lottie-react"

import { Typography } from "@components/ui/Typography"

import { type ComponentProps } from "react"

export type NotFoundProps = ComponentProps<"div">

const NotFound = ({ className, ...props }: NotFoundProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn("flex h-full w-full flex-col items-center justify-center", className)}
      {...props}
    >
      <Lottie
        animationData={NotFoundLottie}
        className="h-[240px] w-[240px]"
        style={{
          marginTop: "-70px",
          marginBottom: "-70px"
        }}
      />
      <Typography affects={"muted"}>{t("common.noResultsFound")}</Typography>
    </div>
  )
}

export { NotFound }
