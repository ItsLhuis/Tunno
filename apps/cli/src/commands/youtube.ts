import { Command } from "commander"

import { download } from "../../src/utils/youtube"

export default function youtube(program: Command) {
  program
    .command("youtube")
    .description("Download audio from a YouTube video.")
    .requiredOption("--id <videoId>", "YouTube video ID")
    .action(async (options) => {
      const { id: videoId } = options
      download(videoId)
    })
}
