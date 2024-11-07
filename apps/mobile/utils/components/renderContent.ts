import { ReactNode } from "react"

export function renderContent(content?: ReactNode | (() => ReactNode)) {
  return typeof content === "function" ? content() : content
}
