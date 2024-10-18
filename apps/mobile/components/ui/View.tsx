import { View as RNView, type ViewProps as RNViewProps } from "react-native"

export type ViewProps = RNViewProps

export function View({ ...rest }: ViewProps) {
  return <RNView {...rest} />
}
