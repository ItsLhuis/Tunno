import { BackIcon } from "@components/navigation"
import { AppBar, IconButton } from "@components/ui"

export default function Downloads() {
  return (
    <AppBar
      hideSearch
      title="Downloads"
      renderLeft={() => <BackIcon />}
      renderRight={() => <IconButton name="add" />}
    />
  )
}
