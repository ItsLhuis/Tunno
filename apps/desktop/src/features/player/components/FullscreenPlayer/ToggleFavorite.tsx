import { emit } from "@tauri-apps/api/event"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { IconButton } from "@components/ui"

const ToggleFavorite = () => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const handleToggleFavorite = async () => {
    if (currentTrack?.id) {
      await emit("player:toggle-favorite", currentTrack.id)
    }
  }

  return (
    <IconButton
      name="Heart"
      isFilled={currentTrack?.isFavorite}
      tooltip={currentTrack?.isFavorite ? t("common.unfavorite") : t("common.favorite")}
      variant="text"
      className="size-[4vh] shrink-0 [&_svg]:size-[2vh]"
      disabled={!currentTrack}
      onClick={handleToggleFavorite}
    />
  )
}

export { ToggleFavorite }
