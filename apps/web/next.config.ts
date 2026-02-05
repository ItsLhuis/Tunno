import { type NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Tunno",
  assetPrefix: "/Tunno/",
  images: {
    unoptimized: true
  }
}

export default nextConfig
