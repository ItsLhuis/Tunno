import { type ReactNode } from "react"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"
import { NotFound } from "@components/ui/NotFound"
import { Spinner } from "@components/ui/Spinner"

export type AsyncStateProps<TItem> = {
  data: TItem | boolean | null | undefined
  isLoading?: boolean
  isError?: boolean
  LoadingComponent?: ReactNode
  ErrorComponent?: ReactNode
  EmptyComponent?: ReactNode
  className?: string
  children: ReactNode | ((data: NonNullable<TItem>) => ReactNode)
}

const AsyncState = <TItem,>({
  data,
  isLoading = false,
  isError = false,
  LoadingComponent = (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <Spinner />
    </div>
  ),
  ErrorComponent = <NotFound />,
  EmptyComponent = <NotFound />,
  className,
  children
}: AsyncStateProps<TItem>) => {
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
    <Fade key={getStateKey()} className={cn("w-full", className)}>
      {getContent()}
    </Fade>
  )
}

export { AsyncState }
