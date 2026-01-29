import { useTranslation } from "@repo/i18n"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { formatNumber } from "@repo/utils"

import { Progress, Typography } from "@components/ui"

type ProgressSectionProps = {
  className?: string
}

const ProgressSection = ({ className }: ProgressSectionProps) => {
  const { t } = useTranslation()

  const status = useFastUploadStore((state) => state.status)
  const currentTrackIndex = useFastUploadStore((state) => state.currentTrackIndex)
  const totalTracks = useFastUploadStore((state) => state.totalTracks)

  const progress = totalTracks > 0 ? (currentTrackIndex / totalTracks) * 100 : 0

  if (status === "idle" || status === "error" || totalTracks === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex w-full flex-col gap-2">
        <Progress value={progress} />
        <Typography affects={["small", "muted"]} className="ml-auto">
          {progress >= 100 && `${t("common.completed")} •`}{" "}
          {`${formatNumber(currentTrackIndex)} / ${formatNumber(totalTracks)}`}
        </Typography>
      </div>
    </div>
  )
}

export { ProgressSection }
