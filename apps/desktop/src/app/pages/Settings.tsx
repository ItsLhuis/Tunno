import { Main, Sidebar } from "@features/settings/layout"

function Settings() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <Main />
    </div>
  )
}

export default Settings
