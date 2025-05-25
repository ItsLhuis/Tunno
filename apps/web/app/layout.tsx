import { type Metadata } from "next"

import { ThemeProvider } from "next-themes"

import "./global.css"

export const metadata: Metadata = {
  title: "Tunno",
  description: "Managing your personal music library across multiple platforms"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
