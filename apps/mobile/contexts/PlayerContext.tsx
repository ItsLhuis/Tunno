import React, { ReactNode, createContext, useContext, useState } from "react"

interface PlayerContextType {
  bottomPlayerHeight: number
  setBottomPlayerHeight: (height: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bottomPlayerHeight, setBottomPlayerHeight] = useState<number>(0)

  return (
    <PlayerContext.Provider value={{ bottomPlayerHeight, setBottomPlayerHeight }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }

  return context
}
