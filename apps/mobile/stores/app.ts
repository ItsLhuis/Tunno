import { create } from "zustand"

type AppProps = {
  playerHeight: number
  setPlayerHeight: (height: number) => void
}

export const useApp = create<AppProps>((set) => ({
  playerHeight: 0,
  setPlayerHeight: (height) => set({ playerHeight: height })
}))
