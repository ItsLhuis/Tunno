"use client"

import { memo, useMemo, type ComponentProps, type ReactNode } from "react"

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
  children?: ReactNode
  className?: string
  href?: string
  align?: "left" | "center" | "right" | "justify" | "char"
}

const MarkdownComponent = ({ content, className }: MarkdownProps) => {
  const components = useMemo(
    () => ({
      code({ className, children, ...props }: MarkdownComponentProps & ComponentProps<"code">) {
        const inline = !className?.includes("language-")
        const match = /language-(\w+)/.exec(className || "")
        const language = match ? match[1] : ""

        if (!inline && language) {
          return <CodeBlock language={language}>{String(children).replace(/\n$/, "")}</CodeBlock>
        }

        return (
          <code
            className={cn(
              "bg-muted/50 relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
              className
            )}
            {...props}
          >
            {children}
          </code>
        )
      },
      h1: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h1" className="mt-8 mb-3 first:mt-0">
          {children}
        </Typography>
      ),
      h2: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h2" className="mt-8 mb-3 first:mt-0">
          {children}
        </Typography>
      ),
      h3: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h3" className="mt-6 mb-3 first:mt-0">
          {children}
        </Typography>
      ),
      h4: ({ children }: MarkdownComponentProps) => (
        <Typography variant="h4" className="mt-6 mb-3 first:mt-0">
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
        <div className="my-6 w-full overflow-y-auto rounded border">
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
        <tr className="focus-within:bg-muted/50 hover:bg-muted/50 data-[state=selected]:bg-muted/50 m-0 border-b p-0 transition-colors">
          {children}
        </tr>
      ),
      th: ({ children, align }: MarkdownComponentProps) => (
        <th
          className={cn(
            "text-muted-foreground p-3 font-medium",
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
          className="text-primary hover:text-primary/80 font-medium underline underline-offset-3 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      hr: () => <hr className="border-border my-8" />,
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
