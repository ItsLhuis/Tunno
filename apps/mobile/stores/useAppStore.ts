import { create } from "zustand"

import { RefObject, createRef } from "react"

import { BottomSheetModal } from "@gorhom/bottom-sheet"

type AppProps = {
  playerRef: RefObject<BottomSheetModal>
}

export const useAppStore = create<AppProps>((set) => ({
  playerRef: createRef<BottomSheetModal>()
}))
