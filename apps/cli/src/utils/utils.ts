import fs from "fs"

import axios from "axios"

import sharp from "sharp"
sharp.cache(false)

import { spawn, exec } from "child_process"

import { promisify } from "util"

import { JaroWinklerDistance } from "natural"
import natural from "natural"

const TfIdf = natural.TfIdf

export const downloadThumbnail = async (
  url: string,
  filePath: string,
  size: number
): Promise<void> => {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  const imageBuffer = Buffer.from(response.data)

  const image = await sharp(imageBuffer)
    .resize(size, size, {
      fit: "cover"
    })
    .jpeg({ quality: 90 })
    .toBuffer()

  await fs.promises.writeFile(filePath, image)
}

export const runCommand = (command: string, args: string[]): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(command, args, { stdio: "inherit", shell: true })

    process.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const execPromise = promisify(exec)

const cleanTrackName = (trackName: string): string => {
  return trackName
    .toLowerCase()
    .replace(/[\(\)\[\]\{\}]/g, "")
    .replace(/"[^"]+"/g, "")
    .replace(/\b(ft|feat|official|video|version|audio|prod|explicit|live|lyrics)\b/gi, "")
    .replace(/[^\w\s]/g, "")
    .trim()
}

const tokenizeTrackName = (trackName: string): string[] => {
  return cleanTrackName(trackName).split(/\s+/)
}

const calculateTfIdfSimilarity = (track1: string, track2: string): number => {
  const tfidf = new TfIdf()
  tfidf.addDocument(track1)
  tfidf.addDocument(track2)

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  tfidf.listTerms(0).forEach((term) => {
    const tfidfTrack1 = tfidf.tfidf(term.term, 0)
    const tfidfTrack2 = tfidf.tfidf(term.term, 1)

    dotProduct += tfidfTrack1 * tfidfTrack2
    magnitude1 += Math.pow(tfidfTrack1, 2)
    magnitude2 += Math.pow(tfidfTrack2, 2)
  })

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2))
  return similarity
}

export const calculateTrackSimilarity = (track1: string, track2: string): number => {
  const cleanedTrack1 = cleanTrackName(track1)
  const tokens1 = tokenizeTrackName(track1)
  const track2Lower = track2.toLowerCase()

  const jaroScore = JaroWinklerDistance(cleanedTrack1, track2Lower)

  const commonWords = tokens1.filter((word) => track2Lower.includes(word)).length
  const wordMatchScore = commonWords / Math.max(tokens1.length, track2Lower.split(/\s+/).length)

  const tfidfScore = calculateTfIdfSimilarity(track1, track2)

  return jaroScore * 0.6 + wordMatchScore * 0.2 + tfidfScore * 0.3
}
