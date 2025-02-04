import { Command } from "commander"

import chalk from "chalk"

import { getDownloadPath, setDownloadPath, setEnvKey } from "../utils/config"

export default function path(program: Command) {
  program
    .command("get-path")
    .description("Displays the current download directory")
    .action(async () => {
      const path = await getDownloadPath()
      console.log("Current download path:", chalk.green(path))
    })
  program
    .command("set-path <PATH>")
    .description("Sets the download directory for media files")
    .action(async (path: string) => {
      const newPath = await setDownloadPath(path)
      console.log("Download path set to:", chalk.green(newPath))
    })
  program
    .command("credentials")
    .description("Sets the Spotify client credentials")
    .requiredOption("--client-id <SPOTIFY_CLIENT_ID>", "Spotify Client ID")
    .requiredOption("--client-secret <SPOTIFY_CLIENT_SECRET>", "Spotify Client Secret")
    .action(async (cmd) => {
      const { clientId, clientSecret } = cmd

      await setEnvKey("SPOTIFY_CLIENT_ID", clientId)
      await setEnvKey("SPOTIFY_CLIENT_SECRET", clientSecret)

      console.log(chalk.green("Spotify credentials have been set successfully."))
    })
}
