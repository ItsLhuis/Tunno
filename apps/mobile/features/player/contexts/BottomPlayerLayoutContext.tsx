import { createContext, useCallback, useContext, useState, type PropsWithChildren } from "react"

import { type LayoutChangeEvent } from "react-native"

/**
 * Represents the state managed by the {@link BottomPlayerLayoutContext}.
 */
type BottomPlayerLayoutContextState = {
  height: number
  onLayout: (event: LayoutChangeEvent, extraHeight?: number) => void
  resetHeight: () => void
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

  const onLayout = useCallback((event: LayoutChangeEvent, extraHeight = 0) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    setHeight(layoutHeight + extraHeight)
  }, [])

  const resetHeight = useCallback(() => {
    setHeight(0)
  }, [])

  const value = {
    height,
    onLayout,
    resetHeight
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
 * @param extraHeight - Optional extra height to add to the measured height
 * @returns The `onLayout` function from the context.
 * @throws {Error} If `useBottomPlayerLayout` is used outside of a `BottomPlayerLayoutProvider`.
 */
function useBottomPlayerLayout() {
  const context = useContext(BottomPlayerLayoutContext)

  if (!context)
    throw new Error("useBottomPlayerLayout must be used within a BottomPlayerLayoutProvider")

  return context.onLayout
}

/**
 * A hook to reset the bottom player height to 0.
 *
 * This is useful when you need to clear the player's height, for example when
 * the player is unmounted or hidden.
 *
 * @returns A function to reset the height to 0.
 * @throws {Error} If used outside of a `BottomPlayerLayoutProvider`.
 */
function useResetBottomPlayerHeight() {
  const context = useContext(BottomPlayerLayoutContext)

  if (!context)
    throw new Error("useResetBottomPlayerHeight must be used within a BottomPlayerLayoutProvider")

  return context.resetHeight
}

export {
  BottomPlayerLayoutProvider,
  useBottomPlayerHeight,
  useBottomPlayerLayout,
  useResetBottomPlayerHeight
}
