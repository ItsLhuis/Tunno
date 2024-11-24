import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "@contexts/ThemeContext"

import App from "./App"

import "../index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
