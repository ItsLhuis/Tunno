import { createContext, useContext, useState, type PropsWithChildren } from "react"

import { type LayoutChangeEvent } from "react-native"

type TabbarContextState = {
  height: number
  onLayout: (event: LayoutChangeEvent) => void
}

const TabbarContext = createContext<TabbarContextState | undefined>(undefined)

const TabbarProvider = ({ children }: PropsWithChildren) => {
  const [height, setHeight] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    setHeight(layoutHeight)
  }

  const value = {
    height,
    onLayout
  }

  return <TabbarContext.Provider value={value}>{children}</TabbarContext.Provider>
}

function useTabbarHeight() {
  const context = useContext(TabbarContext)

  return context?.height ?? 0
}

function useTabbarLayout() {
  const context = useContext(TabbarContext)

  if (context === undefined) {
    throw new Error("useTabbarLayout must be used within a TabbarProvider")
  }

  return context.onLayout
}

export { TabbarProvider, useTabbarHeight, useTabbarLayout }
