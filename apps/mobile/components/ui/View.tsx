import { View as RNView, type ViewProps as RNViewProps } from "react-native"

export type ViewProps = RNViewProps

export function View({ style, ...rest }: ViewProps) {
  return <RNView style={style} {...rest} />
}
