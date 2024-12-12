import { Command } from "commander"

import chalk from "chalk"

import { getDownloadPath, setDownloadPath } from "../../src/utils/config"

export default function path(program: Command) {
  program
    .command("get-path")
    .description("Displays the current download directory.")
    .action(() => {
      const path = getDownloadPath()
      if (path) {
        console.log("")
        console.log(chalk.white("Current download path:"), chalk.yellow(path))
        console.log("")
      } else {
        console.log("")
        console.log(chalk.red("No download path set."))
        console.log("")
      }
    })
  program
    .command("set-path <PATH>")
    .description("Sets the download directory for media files.")
    .action((path: string) => {
      const newPath = setDownloadPath(path)
      console.log("")
      console.log(chalk.white("Download path set to:"), chalk.yellow(newPath))
      console.log("")
    })
}
