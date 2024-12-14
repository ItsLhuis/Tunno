import { Command } from "commander"

import chalk from "chalk"

import { getDownloadPath, setDownloadPath } from "../../src/utils/config"

export default function path(program: Command) {
  program
    .command("get-path")
    .description("Displays the current download directory.")
    .action(async () => {
      const path = await getDownloadPath()
      if (path) {
        console.log("")
        console.log("Current download path:", chalk.green(path))
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
    .action(async (path: string) => {
      const newPath = await setDownloadPath(path)
      console.log("")
      console.log("Download path set to:", chalk.green(newPath))
      console.log("")
    })
}
