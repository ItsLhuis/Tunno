import { convertFileSrc } from "@tauri-apps/api/core"
import { extname, join } from "@tauri-apps/api/path"
import { exists, mkdir, readFile, remove, writeFile } from "@tauri-apps/plugin-fs"

import { v4 as uuidv4 } from "uuid"

import { getAppPaths, type AppPaths } from "@lib/appStorage"

let paths: AppPaths | null = null

async function getPaths() {
  if (!paths) paths = await getAppPaths()
  return paths
}

export async function initializeStorage() {
  const dirs = await getPaths()

  for (const dir of Object.values(dirs)) {
    if (!(await exists(dir))) {
      await mkdir(dir, { recursive: true })
    }
  }
}

export async function getFilePath(dir: keyof AppPaths, fileName: string) {
  const dirs = await getPaths()
  return await join(dirs[dir], fileName)
}

export async function saveFile(
  dir: keyof AppPaths,
  fileName: string,
  content: string | Uint8Array
) {
  const path = await getFilePath(dir, fileName)
  const data = typeof content === "string" ? new TextEncoder().encode(content) : content
  await writeFile(path, data)
}

export async function saveFileFromPath(dir: keyof AppPaths, fileName: string, sourcePath: string) {
  const destinationPath = await getFilePath(dir, fileName)

  const fileData = await readFile(sourcePath)

  await writeFile(destinationPath, fileData)
}

export async function updateFileFromPath(
  dir: keyof AppPaths,
  oldFileName: string,
  newFileName: string,
  sourcePath: string
) {
  const oldPath = await getFilePath(dir, oldFileName)

  if (await exists(oldPath)) {
    await remove(oldPath)
  }

  await saveFileFromPath(dir, newFileName, sourcePath)
}

export async function deleteFile(dir: keyof AppPaths, fileName: string) {
  const path = await getFilePath(dir, fileName)
  if (await exists(path)) {
    await remove(path)
  }
}

export async function generateUniqueFileName(filePath: string): Promise<string> {
  const extension = await extname(filePath)
  return `${uuidv4()}.${extension}`
}

export async function saveFileWithUniqueNameFromPath(
  dir: keyof AppPaths,
  sourcePath: string
): Promise<string> {
  const uniqueFileName = await generateUniqueFileName(sourcePath)
  await saveFileFromPath(dir, uniqueFileName, sourcePath)
  return uniqueFileName
}

export async function updateFileWithUniqueNameFromPath(
  dir: keyof AppPaths,
  oldFileName: string | null,
  sourcePath: string
): Promise<string> {
  const newUniqueFileName = await generateUniqueFileName(sourcePath)

  if (oldFileName) {
    const oldPath = await getFilePath(dir, oldFileName)
    if (await exists(oldPath)) {
      await remove(oldPath)
    }
  }

  await saveFileFromPath(dir, newUniqueFileName, sourcePath)
  return newUniqueFileName
}

export async function getRenderableFileSrc(fileName: string, dir: keyof AppPaths): Promise<string> {
  const dirs = await getPaths()
  const fullPath = await join(dirs[dir], fileName)
  return convertFileSrc(fullPath)
}
