import React, { ReactNode, createContext, useContext, useState } from "react"

interface PlayerContextType {
  playerHeight: number
  setPlayerHeight: (height: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerHeight, setPlayerHeight] = useState<number>(0)

  return (
    <PlayerContext.Provider value={{ playerHeight, setPlayerHeight }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = (): PlayerContextType => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider")
  }

  return context
}
