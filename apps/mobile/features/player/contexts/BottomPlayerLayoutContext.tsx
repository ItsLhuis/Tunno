import { createContext, useContext, useState, type PropsWithChildren } from "react"

import { type LayoutChangeEvent } from "react-native"

type BottomPlayerLayoutContextState = {
  height: number
  onLayout: (event: LayoutChangeEvent) => void
}

const BottomPlayerLayoutContext = createContext<BottomPlayerLayoutContextState | undefined>(
  undefined
)

const BottomPlayerLayoutProvider = ({ children }: PropsWithChildren) => {
  const [height, setHeight] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    setHeight(layoutHeight)
  }

  const value = {
    height,
    onLayout
  }

  return (
    <BottomPlayerLayoutContext.Provider value={value}>
      {children}
    </BottomPlayerLayoutContext.Provider>
  )
}

function useBottomPlayerHeight() {
  const context = useContext(BottomPlayerLayoutContext)

  return context?.height ?? 0
}

function useBottomPlayerLayout() {
  const context = useContext(BottomPlayerLayoutContext)

  if (context === undefined) {
    throw new Error("useBottomPlayerLayout must be used within a BottomPlayerLayoutProvider")
  }

  return context.onLayout
}

export { BottomPlayerLayoutProvider, useBottomPlayerHeight, useBottomPlayerLayout }
