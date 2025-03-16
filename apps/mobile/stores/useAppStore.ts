import { create } from "zustand"

import { RefObject, createRef } from "react"

import { BottomSheetModal } from "@gorhom/bottom-sheet"

type AppState = {
  playerRef: RefObject<BottomSheetModal>
}

export const useAppStore = create<AppState>((set) => ({
  playerRef: createRef<BottomSheetModal>()
}))
