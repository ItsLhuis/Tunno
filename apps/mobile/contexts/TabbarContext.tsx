import { createContext, useContext, useState, type PropsWithChildren } from "react"

import { type LayoutChangeEvent } from "react-native"

/**
 * Represents the state managed by the {@link TabbarContext}.
 */
type TabbarContextState = {
  height: number
  onLayout: (event: LayoutChangeEvent) => void
}

const TabbarContext = createContext<TabbarContextState | undefined>(undefined)

/**
 * Provides the tab bar's layout information (e.g., height) to its children components.
 *
 * This provider manages the height of the tab bar component and exposes an `onLayout`
 * callback that should be attached to the actual tab bar UI element. This allows
 * descendant components to react to changes in the tab bar's height.
 *
 * @param props - React children to be rendered within the context of this provider.
 */
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

/**
 * A hook to consume the height of the tab bar component from the {@link TabbarContext}.
 *
 * @returns The current height of the tab bar, or `0` if the context is not yet available.
 */
function useTabbarHeight() {
  const context = useContext(TabbarContext)

  return context?.height ?? 0
}

/**
 * A hook to consume the `onLayout` callback from the {@link TabbarContext}.
 *
 * This callback should be attached to the tab bar component's `onLayout` prop
 * to dynamically update its height in the context.
 *
 * @returns The `onLayout` function from the context.
 * @throws {Error} If `useTabbarLayout` is used outside of a `TabbarProvider`.
 */
function useTabbarLayout() {
  const context = useContext(TabbarContext)

  if (!context) throw new Error("useTabbarLayout must be used within a TabbarProvider")

  return context.onLayout
}

export { TabbarProvider, useTabbarHeight, useTabbarLayout }
