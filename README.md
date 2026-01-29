<img src="assets/icon.png" width="100" height="100" />

# Tunno

**Tunno** is a complete ecosystem for managing, organizing, and listening to your personal music
library—anywhere, on your terms. Tunno empowers you with modern tools to download, organize, play,
and synchronize your music collection across all your devices, giving you full control over your
music.

## Why Tunno?

Most streaming services limit your control over your own music. Tunno is built for music lovers who
want true ownership: you decide what to download, how to organize, and where to listen—without being
locked into closed platforms.

## How does it work?

Tunno is made up of three main applications, each playing a key role in the ecosystem:

- **CLI**: A command-line tool for downloading music from YouTube, enriching metadata via Spotify,
  processing album covers, and organizing files locally. Perfect for building and maintaining your
  collection with precision and automation.
- **Desktop**: An application for organizing, playing, and managing your music library on your
  computer. Import music downloaded with the CLI, create playlists, mark favorites, edit
  information, and more—all in one place.
- **Mobile**: An app to access and listen to your library on the go. Sync your music with the
  desktop app manually or automatically by connecting both apps, so your collection is always with
  you.

## Key Features

- **Comprehensive Music Management**: Add, edit, organize, and remove songs, albums, artists, and
  playlists. Manage favorites, play counts, and playback history.
- **Listen Anywhere**: Enjoy your music on desktop or mobile, with seamless playback, favorites, and
  detailed listening stats.
- **Playlists & Favorites**: Create custom playlists and mark songs, albums, and artists as
  favorites for quick access.
- **Smart Downloading**: Download songs and playlists from YouTube, with rich metadata powered by
  Spotify integration.
- **Device Sync**: Keep your library in sync between desktop and mobile, automatically when both
  apps are connected.
- **Full Data Ownership**: All your data is stored locally and remains under your control—portable,
  private, and secure.

## Project Structure

This monorepo includes:

- [CLI](./apps/cli/README.md): Command-line tool for downloading and organizing music.
- [Desktop](./apps/desktop/README.md): Desktop app for organizing and listening to your collection.
- [Mobile](./apps/mobile/README.md): Mobile app for listening and syncing your library.
- [Web](./apps/web/README.md): Official landing page, centralizing information and demos.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
