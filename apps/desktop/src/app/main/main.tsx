import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "@contexts/ThemeContext"

import App from "./App"

import "../../global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
