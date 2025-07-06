# Changelog

All notable changes to the Tunno CLI project will be documented in this file.

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
