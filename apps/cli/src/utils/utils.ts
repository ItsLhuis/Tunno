import fs from "fs"

import axios from "axios"

import sharp from "sharp"
sharp.cache(false)

export const downloadThumbnail = async (url: string, filePath: string, size: number) => {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  const imageBuffer = Buffer.from(response.data)

  const image = sharp(imageBuffer)
  const imageInfo = await image.metadata()

  const width = imageInfo.width ? (imageInfo.width >= size ? size : imageInfo.width) : size

  await image.resize(width).jpeg({ quality: 90 }).toBuffer()

  await fs.promises.writeFile(filePath, image)
}
