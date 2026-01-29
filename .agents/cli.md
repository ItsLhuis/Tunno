# CLI Tool

## Overview

The Tunno CLI downloads music from YouTube, enriches metadata via Spotify API, and creates portable
bundles for import into desktop/mobile apps.

**Package**: `@tunno/cli` (published to npm)

## Prerequisites

External tools (must be installed separately):

- **yt-dlp**: YouTube downloading
- **ffmpeg**: Audio processing (used by yt-dlp)

## Installation

```bash
npm install -g @tunno/cli
# or
pnpm add -g @tunno/cli
```

## Commands

### Configuration

```bash
# Set download directory
tunno set-path /your/custom/path

# View current download path
tunno get-path

# Set Spotify API credentials (required for metadata enrichment)
tunno credentials --spotify-client-id YOUR_ID --spotify-client-secret YOUR_SECRET
```

### YouTube Download

```bash
# Download single track with metadata enrichment
tunno youtube --id VIDEO_ID

# Download with manual metadata override for Spotify search
tunno youtube --id VIDEO_ID --title "Song Name" --artist "Artist Name" --year 2023

# Basic download (audio only, no metadata processing)
tunno youtube --id VIDEO_ID --basic

# Download with embedded metadata
tunno youtube --id VIDEO_ID --add-metadata

# Specify audio format (opus, m4a, mp3, flac, wav)
tunno youtube --id VIDEO_ID --ext m4a

# Download entire playlist
tunno youtube --playlist-id PLAYLIST_ID

# Basic playlist download
tunno youtube --playlist-id PLAYLIST_ID --basic
```

### Fast Upload (Bundle Creation)

```bash
# Create portable bundle from downloaded tracks
tunno fast-upload

# Specify output directory
tunno fast-upload -o /path/to/output
```

The bundle is a ZIP file containing:

- `manifest.json` - Metadata about all tracks
- `tracks/` - Individual track folders with audio, metadata JSON, and thumbnails

## Workflow Example

```bash
# 1. Configure
tunno set-path ~/Music/Tunno
tunno credentials --spotify-client-id xxx --spotify-client-secret xxx

# 2. Download tracks
tunno youtube --id dQw4w9WgXcQ
tunno youtube --id abc123xyz --title "Custom Title" --artist "Artist"

# 3. Create bundle for import
tunno fast-upload -o ~/Desktop
```

## Development

```bash
# From monorepo root
pnpm --filter @tunno/cli build      # Compile TypeScript
pnpm --filter @tunno/cli dev        # Watch mode

# Local testing
cd apps/cli
pnpm link --global
tunno --help
```

## Tech Stack

- **CLI Framework**: Commander.js
- **YouTube**: yt-dlp (external process via shell)
- **Spotify**: @spotify/web-api-ts-sdk
- **Image Processing**: Sharp
- **Archive**: archiver (ZIP creation)
- **UI**: chalk (colors), ora (spinners), inquirer (prompts)

## Project Structure

```
apps/cli/
├── src/
│   ├── index.ts         # CLI entry point
│   ├── commands/        # Command implementations
│   │   ├── youtube.ts   # YouTube download command
│   │   ├── fast-upload.ts
│   │   └── credentials.ts
│   ├── services/        # Business logic
│   │   ├── youtube.ts   # yt-dlp wrapper
│   │   ├── spotify.ts   # Spotify API client
│   │   └── metadata.ts  # Metadata processing
│   └── utils/           # Helpers
└── package.json
```

Reference: `apps/cli/README.md` for complete documentation
