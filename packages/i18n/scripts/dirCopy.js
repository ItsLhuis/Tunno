import { promises as fs } from "fs"
import * as path from "path"

async function dirCopy(source, target) {
  await fs.mkdir(target, { recursive: true })
  const items = await fs.readdir(source, { withFileTypes: true })

  for (const item of items) {
    const sourcePath = path.join(source, item.name)
    const targetPath = path.join(target, item.name)

    if (item.isDirectory()) {
      await dirCopy(sourcePath, targetPath)
    } else {
      await fs.copyFile(sourcePath, targetPath)
    }
  }
}

const args = process.argv.slice(2)

const sourceDir = args[0]
const targetDir = args[1]

fs.access(sourceDir).then(() => {
  return dirCopy(sourceDir, targetDir)
})
