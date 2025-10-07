import { type ReactNode } from "react"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"
import { NotFound } from "@components/ui/NotFound"
import { Spinner } from "@components/ui/Spinner"

export type AsyncStateProps<TItem> = {
  data?: TItem | null
  isLoading?: boolean
  isError?: boolean
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  emptyComponent?: ReactNode
  className?: string
  children: (data: NonNullable<TItem>) => ReactNode
}

const AsyncState = <TItem,>({
  data,
  isLoading = false,
  isError = false,
  loadingComponent = <Spinner />,
  errorComponent = <NotFound />,
  emptyComponent = <NotFound />,
  className,
  children
}: AsyncStateProps<TItem>) => {
  const getContent = () => {
    if (isLoading) return loadingComponent
    if (isError) return errorComponent
    if (!data) return emptyComponent
    return children(data as NonNullable<TItem>)
  }

  return (
    <Fade
      key={isLoading ? "loading" : isError ? "error" : !data ? "empty" : "data"}
      className={cn("flex w-full flex-col items-center justify-center", className)}
    >
      {getContent()}
    </Fade>
  )
}

export { AsyncState }
