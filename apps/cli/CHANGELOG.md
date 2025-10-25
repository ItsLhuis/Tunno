# Changelog

All notable changes to the Tunno CLI project will be documented in this file.

## [1.5.0] - 2025-01-27

### Added

- 🔍 Added duplicate detection in `fast-upload` command based on song title validation
- 📊 Added informative feedback showing number of duplicates ignored during bundle creation

### Fixed

- 🖼️ Fixed thumbnail quality issues by always using Spotify album thumbnails instead of YouTube
  thumbnails
- ✂️ Eliminated thumbnail cropping problems caused by 16:9 aspect ratio from YouTube thumbnails
- 🎯 Improved visual consistency with 1:1 aspect ratio thumbnails across all tracks

### Changed

- 🔄 Simplified thumbnail logic to always use `track.album.thumbnail` for both track and album
  thumbnails
- 📝 Enhanced `fast-upload` validation to prevent duplicate tracks in bundles
- 🎨 Improved overall thumbnail quality and consistency in downloaded tracks

## [1.4.0] - 2025-10-22

### Added

- 📦 Added `fast-upload` command to create portable bundles from downloaded tracks
- 🎯 Bundle includes manifest.json with metadata and timestamped zip file
- 🔧 Added shared constants for audio and image extensions
- ⚙️ Added strict TypeScript compiler options for better code quality

### Fixed

- 🛠️ Fixed `set-path` command validating old path when setting a new one

### Changed

- 🔄 Refactored youtube command to use centralized audio extension constants
- ✨ Improved code consistency with shared utilities and constants

## [1.3.1] - 2025-10-06

### Enhanced

- 🚀 Improved YouTube download reliability with enhanced error handling and retry mechanisms
- 🎵 Added support for formats without thumbnail embedding (wav, opus, aac, ogg) with user warnings
- 🔧 Enhanced yt-dlp command with better error recovery and concurrent fragment handling
- 📊 Added format-specific logic for opus downloads with optimized parameters

## [1.3.0] - 2025-10-03

### Added

- 🎛️ Added `--add-metadata` flag to control metadata embedding in audio files
- 🔧 Enhanced flexibility for audio format selection and metadata control

### Changed

- 🎵 Improved extension logic: `m4a` is now the default format for `--basic` downloads (better
  metadata support)
- 🎵 `opus` remains the default format for regular downloads without `--basic`
- 🔄 Users can now combine any download mode with any audio format and metadata settings

### Fixed

- 🛠️ Fixed extension parameter not being respected when using `--ext` flag
- 🛠️ Fixed metadata embedding logic to work correctly with all audio formats

## [1.2.1] - 2025-10-02

### Fixed

- 🛠️ Updated YouTube URL format for better compatibility

## [1.2.0] - 2025-07-20

### Changed

- 🎵 The Album type now includes `releaseYear`, `albumType`, and `artists` fields for richer
  metadata.
- 🖼️ Artist thumbnails for both track and album are now always local file names, never URLs, and are
  deduplicated if the artist appears in both.

### Fixed

- 🛠️ Lyrics are now always `null` when not found, never `undefined`, for better type safety.

## [1.1.1] - 2025-07-19

### Features

- 🎤 Updated the output of `getLyrics` to return `plainLyrics` as an array of `{ text: string }` and
  `syncedLyrics` as an array of `{ text: string, startTime: number }`. Adjusted the corresponding
  types in `Lyrics` and `Song` to reflect this new structure.

## [1.1.0] - 2025-07-18

### Added

- 🎤 Added lyrics support: the CLI now returns song lyrics along with the other information

## [1.0.2] - 2025-05-11

### Changed

- 🔄 CLI version refactoring - now dynamically imported from package.json file
- 🔢 Replaced hardcoded version ("1.0.0") with dynamic reference to project version value

## [1.0.1] - 2025-05-10

### Fixed

- 🛠️ Fixed broken CLI binary: previously published with outdated filename `bin/wave.ts`
- 🧱 Renamed entry point to `bin/tunno.ts` and rebuilt project correctly before publishing
- ✅ Ensured `dist/bin/tunno.js` matches `bin` entry in `package.json`

## [1.0.0] - 2025-05-10

### Added

- 🎵 Complete YouTube audio download functionality
- 📋 Playlist download capabilities
- 🎵 Spotify integration for enhanced metadata
- 🖼️ Image processing for album covers
- 🔍 Manual metadata override options (title, artist, year)
- 📦 JSON metadata generation
- 🛠️ Command-line interface with intuitive commands
- 📂 Custom download path management
- 🔑 Spotify API credentials management
- 🎛️ Basic download option to skip metadata processing
- 📚 Comprehensive documentation and examples
