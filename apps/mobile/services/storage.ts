import { Directory, File } from "expo-file-system"

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
    const directory = new Directory(dir)
    if (!directory.exists) {
      directory.create()
    }
  }
}

export async function getFilePath(dir: keyof AppPaths, fileName: string) {
  const dirs = await getPaths()
  return `${dirs[dir]}/${fileName}`
}

export async function saveFile(
  dir: keyof AppPaths,
  fileName: string,
  content: string | Uint8Array
) {
  const path = await getFilePath(dir, fileName)
  const file = new File(path)

  file.write(content)
}

export async function saveFileFromPath(dir: keyof AppPaths, fileName: string, sourcePath: string) {
  const destinationPath = await getFilePath(dir, fileName)
  const sourceFile = new File(sourcePath)
  const destinationFile = new File(destinationPath)

  sourceFile.copy(destinationFile)
}

export async function updateFileFromPath(
  dir: keyof AppPaths,
  oldFileName: string,
  newFileName: string,
  sourcePath: string
) {
  const oldPath = await getFilePath(dir, oldFileName)
  const oldFile = new File(oldPath)

  if (oldFile.exists) {
    oldFile.delete()
  }

  await saveFileFromPath(dir, newFileName, sourcePath)
}

export async function deleteFile(dir: keyof AppPaths, fileName: string) {
  const path = await getFilePath(dir, fileName)
  const file = new File(path)

  if (file.exists) {
    file.delete()
  }
}

export async function generateUniqueFileName(filePath: string): Promise<string> {
  const match = filePath.match(/\.([^.]+)$/)
  const extension = match ? match[1] : ""
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
    const oldFile = new File(oldPath)

    if (oldFile.exists) {
      oldFile.delete()
    }
  }

  await saveFileFromPath(dir, newUniqueFileName, sourcePath)
  return newUniqueFileName
}

export async function getRenderableFileSrc(fileName: string, dir: keyof AppPaths): Promise<string> {
  const dirs = await getPaths()
  const fullPath = `${dirs[dir]}/${fileName}`

  return fullPath
}
