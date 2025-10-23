import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { formatNumber } from "@repo/utils"

import { Progress, Typography } from "@components/ui"

type ProgressSectionProps = {
  className?: string
}

const ProgressSection = ({ className }: ProgressSectionProps) => {
  const { t } = useTranslation()

  const { status, currentTrackIndex, totalTracks } = useFastUploadStore(
    useShallow((state) => ({
      status: state.status,
      currentTrackIndex: state.currentTrackIndex,
      totalTracks: state.totalTracks
    }))
  )

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
