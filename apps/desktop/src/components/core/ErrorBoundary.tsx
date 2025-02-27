import { Component, type ErrorInfo, type ReactNode } from "react"

import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Typography,
  Linkify,
  ScrollArea
} from "@components/ui"

import { motion } from "motion/react"

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
  }

  formatStackTrace(stack: string): string {
    return stack
      .split("\n")
      .filter((line) => line.includes("at "))
      .map((line) => line.trim())
      .join("\n")
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollArea className="h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {process.env.NODE_ENV === "development" ? (
              <div className="w-full flex flex-col items-center">
                <div className="relative rounded-md bg-sidebar shadow-2xl transition-[background-color]">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-destructive rounded-tl-md rounded-tr-md" />
                  <div className="text-destructive p-4 pt-6 pb-0 rounded-md ">
                    <Typography variant="h2">
                      {this.state.error && this.state.error.toString()}
                    </Typography>
                  </div>
                  <div className="p-4 pb-0">
                    <Linkify
                      text={this.state.error ? this.state.error.stack || "" : ""}
                      className="whitespace-pre-wrap leading-relaxed"
                    />
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details" className="border-b-0">
                        <AccordionTrigger>
                          <Typography variant="h6">Error Details</Typography>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Linkify
                            text={
                              this.state.errorInfo && this.state.errorInfo.componentStack
                                ? this.formatStackTrace(this.state.errorInfo.componentStack)
                                : ""
                            }
                            className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container m-auto flex flex-col items-center p-4 text-center">
                <Typography variant="h2">An unexpected error occurred!</Typography>
                <Typography variant="p">
                  Please reload the app. If the problem persists, contact support.
                </Typography>
              </div>
            )}
          </motion.div>
        </ScrollArea>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
