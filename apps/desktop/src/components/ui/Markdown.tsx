"use client"

import { memo, useMemo, type ComponentPropsWithoutRef } from "react"

import { cn } from "@lib/utils"

import { CodeBlock } from "@components/ui/CodeBlock"
import { Typography } from "@components/ui/Typography"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownProps = {
  content: string
  className?: string
}

type MarkdownComponentProps = {
  children?: React.ReactNode
  className?: string
  href?: string
  align?: "left" | "center" | "right" | "justify" | "char"
}

function MarkdownComponent({ content, className }: MarkdownProps) {
  const components = useMemo(
    () => ({
      code({
        className,
        children,
        ...props
      }: MarkdownComponentProps & ComponentPropsWithoutRef<"code">) {
        const inline = !className?.includes("language-")
        const match = /language-(\w+)/.exec(className || "")
        const language = match ? match[1] : ""

        if (!inline && language) {
          return <CodeBlock language={language}>{String(children).replace(/\n$/, "")}</CodeBlock>
        }

        return (
          <code
            className={cn(
              "relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
              className
            )}
            {...props}
          >
            {children}
          </code>
        )
      },
      h1: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h1" className="mb-3 mt-8 first:mt-0">
          {children}
        </Typography>
      ),
      h2: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h2" className="mb-3 mt-8 first:mt-0">
          {children}
        </Typography>
      ),
      h3: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h3" className="mb-3 mt-6 first:mt-0">
          {children}
        </Typography>
      ),
      h4: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h4" className="mb-3 mt-6 first:mt-0">
          {children}
        </Typography>
      ),
      p: ({ children }: MarkdownComponentProps) => (
        <Typography variant="p" affects={["removePMargin"]} className="my-3">
          {children}
        </Typography>
      ),
      ul: ({ children }: MarkdownComponentProps) => (
        <ul className="my-3 ml-6 list-disc space-y-2 [&>li]:mt-0">{children}</ul>
      ),
      ol: ({ children }: MarkdownComponentProps) => (
        <ol className="my-3 ml-6 list-decimal space-y-2 [&>li]:mt-0">{children}</ol>
      ),
      li: ({ children }: MarkdownComponentProps) => <li className="leading-7">{children}</li>,
      blockquote: ({ children }: MarkdownComponentProps) => (
        <Typography variant="blockquote" className="my-3">
          {children}
        </Typography>
      ),
      table: ({ children }: MarkdownComponentProps) => (
        <div className="my-6 w-full overflow-y-auto rounded-md border">
          <table className="w-full caption-bottom text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }: MarkdownComponentProps) => (
        <thead className="bg-muted/50 [&_tr]:border-b">{children}</thead>
      ),
      tbody: ({ children }: MarkdownComponentProps) => (
        <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
      ),
      tr: ({ children }: MarkdownComponentProps) => (
        <tr className="m-0 border-b p-0 transition-colors focus-within:bg-muted/50 hover:bg-muted/50 data-[state=selected]:bg-muted/50">
          {children}
        </tr>
      ),
      th: ({ children, align }: MarkdownComponentProps) => (
        <th
          className={cn(
            "p-3 font-medium text-muted-foreground",
            align === "center" && "text-center",
            align === "right" && "text-right",
            !align && "text-left"
          )}
        >
          {children}
        </th>
      ),
      td: ({ children, align }: MarkdownComponentProps) => (
        <td
          className={cn(
            "p-3 py-2",
            align === "center" && "text-center",
            align === "right" && "text-right",
            !align && "text-left"
          )}
        >
          {children}
        </td>
      ),
      a: ({ children, href }: MarkdownComponentProps) => (
        <a
          href={href}
          className="underline-offset-3 font-medium text-primary underline transition-colors hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      hr: () => <hr className="my-8 border-border" />,
      strong: ({ children }: MarkdownComponentProps) => (
        <Typography variant="span" affects={["bold"]}>
          {children}
        </Typography>
      ),
      em: ({ children }: MarkdownComponentProps) => (
        <Typography variant="span" affects={["italic"]}>
          {children}
        </Typography>
      ),
      pre: ({ children }: MarkdownComponentProps) => <pre className="my-3">{children}</pre>
    }),
    []
  )

  const remarkPlugins = useMemo(() => [remarkGfm], [])

  return (
    <div className={cn("w-full max-w-none", className)}>
      <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export const Markdown = memo(MarkdownComponent)
