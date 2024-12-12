import { Command } from "commander"

import chalk from "chalk"

export default function help(program: Command) {
  program
    .command("help")
    .description("Display help information for Wave commands")
    .action(() => {
      console.log("")
      console.log(chalk.blue("Available Commands:"))
      console.log("")

      console.log(chalk.yellow("  wave get-path"))
      console.log(chalk.white("    Displays the current download directory."))
      console.log("")

      console.log(chalk.yellow("  wave set-path <PATH>"))
      console.log(chalk.white("    Sets the download directory for media files."))
      console.log("")

      console.log(chalk.yellow("  wave youtube --id <VIDEO_ID>"))
      console.log(chalk.white("    Downloads the audio from the YouTube video with the given ID."))
      console.log("")

      console.log(chalk.blue("Options:"))
      console.log("")

      console.log(chalk.yellow("  -h, --help"))
      console.log(chalk.white("    Displays this help message."))
      console.log("")

      console.log(chalk.blue("Examples:"))
      console.log("")
      console.log(chalk.white("  wave set-path /home/user/Music/Wave"))
      console.log(chalk.white("  wave youtube --id dQw4w9WgXcQ"))
      console.log("")
    })
}
