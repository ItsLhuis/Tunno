import { type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { Fade } from "@components/ui/Fade"
import { NotFound } from "@components/ui/NotFound"
import { Spinner } from "@components/ui/Spinner"

const DefaultLoadingComponent = () => {
  const styles = useStyles(asyncStateStyles)

  return (
    <View style={styles.centered}>
      <Spinner />
    </View>
  )
}

export type AsyncStateProps<TItem> = {
  data: TItem | boolean | null | undefined
  isLoading?: boolean
  isError?: boolean
  LoadingComponent?: ReactNode
  ErrorComponent?: ReactNode
  EmptyComponent?: ReactNode
  style?: StyleProp<ViewStyle>
  children: ReactNode | ((data: NonNullable<TItem>) => ReactNode)
}

const AsyncState = <TItem,>({
  data,
  isLoading = false,
  isError = false,
  LoadingComponent = <DefaultLoadingComponent />,
  ErrorComponent = <NotFound />,
  EmptyComponent = <NotFound />,
  style,
  children
}: AsyncStateProps<TItem>) => {
  const styles = useStyles(asyncStateStyles)

  const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true
    if (typeof value === "boolean" && !value) return true
    if (Array.isArray(value) && value.length === 0) return true
    if (typeof value === "object" && Object.keys(value).length === 0) return true
    if (typeof value === "string" && value.trim() === "") return true
    return false
  }

  const getContent = () => {
    if (isLoading) return LoadingComponent
    if (isError) return ErrorComponent
    if (isEmpty(data)) return EmptyComponent
    if (typeof children === "function") {
      return children(data as NonNullable<TItem>)
    }
    return children
  }

  const getStateKey = () => {
    if (isLoading) return "loading"
    if (isError) return "error"
    if (isEmpty(data)) return "empty"
    return "data"
  }

  return (
    <Fade key={getStateKey()} style={[styles.container, style]}>
      {getContent()}
    </Fade>
  )
}

const asyncStateStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    width: "100%"
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(4)
  }
}))

export { AsyncState }
