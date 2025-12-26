import { createContext, useContext, useState, type ReactNode } from "react"

type SidebarProviderState = {
  open: boolean
  setOpen: (open: boolean) => void
  isCompact: boolean
}

const SidebarProviderContext = createContext<SidebarProviderState | undefined>(undefined)

const SidebarProvider = ({ children, isCompact }: { children: ReactNode; isCompact: boolean }) => {
  const [open, setOpen] = useState(false)

  const value = {
    open,
    setOpen,
    isCompact
  }

  return <SidebarProviderContext.Provider value={value}>{children}</SidebarProviderContext.Provider>
}

function useSidebar() {
  const context = useContext(SidebarProviderContext)

  if (context === undefined) throw new Error("useSidebar must be used within a SidebarProvider")

  return context
}

export { SidebarProvider, useSidebar }
