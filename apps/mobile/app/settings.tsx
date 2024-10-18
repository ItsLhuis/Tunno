import { BackIcon } from "@components/navigation"
import { AppBar } from "@components/ui"

export default function Settings() {
  return <AppBar hideSearch title="Settings" renderLeft={() => <BackIcon />} />
}
