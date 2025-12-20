import { type NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tunno",
  assetPrefix: "/tunno/",
  images: {
    unoptimized: true
  }
}

export default nextConfig
