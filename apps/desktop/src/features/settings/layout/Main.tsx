import { useSearchParams } from "react-router-dom"

import { Appearance, Language, Sync } from "@features/settings/pages"

import { AnimatePresence, motion } from "motion/react"

function Main() {
  const [searchParams] = useSearchParams()

  const tab = searchParams.get("tab") || "appearance"

  const renderContent = () => {
    switch (tab) {
      case "appearance":
        return <Appearance />
      case "language":
        return <Language />
      case "sync":
        return <Sync />
      default:
        return <Appearance />
    }
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.main
        key={tab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex w-full flex-1"
      >
        {renderContent()}
      </motion.main>
    </AnimatePresence>
  )
}

export default Main
