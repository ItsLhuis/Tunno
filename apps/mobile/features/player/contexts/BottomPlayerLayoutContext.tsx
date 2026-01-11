import { createContext, useContext, useState, type PropsWithChildren } from "react"

import { type LayoutChangeEvent } from "react-native"

/**
 * Represents the state managed by the {@link BottomPlayerLayoutContext}.
 */
type BottomPlayerLayoutContextState = {
  /**
   * The current height of the bottom player component.
   */
  height: number
  /**
   * Callback function to be invoked on layout changes of the bottom player component.
   * It updates the `height` in the context.
   * @param event - The layout change event from React Native.
   */
  onLayout: (event: LayoutChangeEvent) => void
}

const BottomPlayerLayoutContext = createContext<BottomPlayerLayoutContextState | undefined>(
  undefined
)

/**
 * Provides the bottom player's layout information (e.g., height) to its children components.
 *
 * This provider manages the height of the bottom player component and exposes an `onLayout`
 * callback that should be attached to the actual bottom player UI element. This allows
 * descendant components to react to changes in the player's height.
 *
 * @param props - React children to be rendered within the context of this provider.
 */
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

/**
 * A hook to consume the height of the bottom player component from the {@link BottomPlayerLayoutContext}.
 *
 * @returns The current height of the bottom player, or `0` if the context is not yet available.
 */
function useBottomPlayerHeight() {
  const context = useContext(BottomPlayerLayoutContext)

  return context?.height ?? 0
}

/**
 * A hook to consume the `onLayout` callback from the {@link BottomPlayerLayoutContext}.
 *
 * This callback should be attached to the bottom player component's `onLayout` prop
 * to dynamically update its height in the context.
 *
 * @returns The `onLayout` function from the context.
 * @throws {Error} If `useBottomPlayerLayout` is used outside of a `BottomPlayerLayoutProvider`.
 */
function useBottomPlayerLayout() {
  const context = useContext(BottomPlayerLayoutContext)

  if (!context)
    throw new Error("useBottomPlayerLayout must be used within a BottomPlayerLayoutProvider")

  return context.onLayout
}

export { BottomPlayerLayoutProvider, useBottomPlayerHeight, useBottomPlayerLayout }
