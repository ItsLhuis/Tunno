import { create } from "zustand"

import { RefObject, createRef } from "react"

import { BottomSheetModal } from "@gorhom/bottom-sheet"

type UIState = {
  playerRef: RefObject<BottomSheetModal>
}

export const useUIStore = create<UIState>(() => ({
  playerRef: createRef<BottomSheetModal>()
}))
