import { BackIcon } from "@components/navigation"
import { AppBar } from "@components/ui"

export default function Downloads() {
  return <AppBar hideSearch title="Downloads" renderLeft={() => <BackIcon />} />
}
