import { Player } from "@features/songs/components/Player/Player"

function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t bg-sidebar transition-[background-color,border-color]">
      <Player />
    </footer>
  )
}

export { Footer }

