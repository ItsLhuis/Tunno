import React, { forwardRef } from "react"
import { View as RNView, type ViewProps as RNViewProps } from "react-native"

export type ViewProps = RNViewProps

export const View = forwardRef<RNView, ViewProps>(({ ...rest }, ref) => {
  return <RNView ref={ref} {...rest} />
})
