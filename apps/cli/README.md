<img src="assets/appicon.png" width="100" height="100" />

# Wave CLI

**Wave CLI** is a command-line tool for managing your personal music library. It allows you to download, organize, and manage media files efficiently with a set of user-friendly commands.

---

## Features

- **YouTube Integration**: Download audio and metadata directly from YouTube videos.
- **Spotify Integration**: Refine metadata and ensure accurate and precise music information using Spotify's API.
- **Download Playlists**: Download entire playlists from YouTube.
- **Image Processing**: Process and enhance album covers, including images from the track, album and author whenever possible.
- **Manual Spotify Search Fields**: Provide optional fields to manually refine the search for metadata on Spotify (e.g., title, artist, year).
- **JSON Metadata**: Generate metadata files with details such as artist, album, track name,...

---

## Installation

### Prerequisites

Before using **Wave CLI**, make sure you have the following installed on your system:

- **Node.js**: Ensure you have Node.js (version 16 or higher) installed on your system.

- **yt-dlp**: You need to have **yt-dlp** installed for downloading YouTube content. You can install it using:

  - On Linux: `sudo apt install yt-dlp`
  - On macOS (using [Homebrew](https://brew.sh/)): `brew install yt-dlp`
  - On Windows (using [Chocolatey](https://chocolatey.org/)): `choco install yt-dlp`

  Alternatively, you can download it from the [yt-dlp GitHub](https://github.com/yt-dlp/yt-dlp) page.

- **ffmpeg**: **ffmpeg** is required for audio processing. You can install it using:

  - On Linux: `sudo apt install ffmpeg`
  - On macOS (using [Homebrew](https://brew.sh/)): `brew install ffmpeg`
  - On Windows (using [Chocolatey](https://chocolatey.org/)): `choco install ffmpeg`

  Alternatively, you can download it from [FFmpeg](https://ffmpeg.org/download.html) and follow the installation instructions.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ItsLhuis/Wave-CLI.git
   cd Wave-CLI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript project:

   ```bash
   npm run build
   ```

4. Install the CLI globally:

   ```bash
   npm install -g .
   ```

---

## Usage

### General Commands

- **Help**: View available commands and usage:

  ```bash
  wave -h
  ```

- **Set Download Path**: Define the directory for storing downloaded media:

  ```bash
  wave set-path /your/custom/path
  ```

- **View Current Path**: Check the current download directory:

  ```bash
  wave get-path
  ```

- **Set Spotify Credentials**: Provide your Spotify Client ID and Client Secret:

  ```bash
  wave credentials --client-id SPOTIFY_CLIENT_ID --client-secret SPOTIFY_CLIENT_SECRET
  ```

### YouTube Download

- **Download Audio from YouTube**:

  ```bash
  wave youtube --id YOUR_VIDEO_ID
  ```

  Example:

  ```bash
  wave youtube --id dQw4w9WgXcQ
  ```

  This command downloads the audio, processes the album cover, and generates a JSON file with metadata.

  **Note**: For more accurate and complete results, search directly on [YouTube Music](https://music.youtube.com) to find tracks similar to those on Spotify.

- **Download Playlist from YouTube**:

  ```bash
  wave youtube --playlist-id YOUR_PLAYLIST_ID
  ```

  Example:

  ```bash
  wave youtube --playlist-id PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI
  ```

  This command downloads all audio tracks from the specified playlist.

- **Override Metadata for Spotify Search**:

  You can refine the metadata used for Spotify search by providing optional fields:

  ```bash
  wave youtube --id YOUR_VIDEO_ID --title "Custom Title" --artist "Custom Artist" --year 2023
  ```

  Example:

  ```bash
  wave youtube --id dQw4w9WgXcQ --title "Never Gonna Give You Up" --artist "Rick Astley" --year 1987
  ```

  This command overrides the default metadata with the provided title, artist, and year.

- **Basic Download**:

  If you want to download only the audio without any metadata processing:

  ```bash
  wave youtube --id YOUR_VIDEO_ID --basic
  ```

  Example:

  ```bash
  wave youtube --id dQw4w9WgXcQ --basic
  ```

  This command downloads the audio without processing metadata or album covers.

- **Basic Playlist Download**:

  If you want to download only the audio from a playlist without any metadata processing:

  ```bash
  wave youtube --playlist-id YOUR_PLAYLIST_ID --basic
  ```

  Example:

  ```bash
  wave youtube --playlist-id PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI --basic
  ```

  This command downloads all audio tracks from the specified playlist without processing metadata or album covers.

---

### Spotify Integration

- **Refine Metadata with Spotify**:

  By providing valid Spotify Client ID and Client Secret credentials with the `wave credentials` command, Wave CLI can utilize the Spotify Web API to retrieve precise music data. This enhances the accuracy of artist, album, and other metadata for the tracks you download.

  **Note**: If you do not use the `--basic` command to download only the audio, providing Spotify credentials is mandatory to obtain enhanced metadata.

## Example Workflow

1. **Set Path**: Define the directory for downloads:

   ```bash
   wave set-path /home/user/Music/Wave
   ```

2. **Set Spotify Credentials**: Provide your Spotify Client ID and Client Secret:

   ```bash
   wave credentials --client-id SPOTIFY_CLIENT_ID --client-secret SPOTIFY_CLIENT_SECRET
   ```

3. **Download Audio**: Fetch a track from YouTube:

   ```bash
   wave youtube --id VIDEO_ID
   ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Important Notice

While this tool allows you to download audio from YouTube for personal use, please be aware that downloading YouTube content may violate YouTube's [Terms of Service](https://www.youtube.com/t/terms). It is your responsibility to ensure compliance with any applicable laws or regulations. This tool is intended for personal use only, and the authors do not endorse or support using it for unauthorized purposes. Use it responsibly.
