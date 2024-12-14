<img src="assets/appicon.png" width="100" height="100" />

# Wave CLI

**Wave CLI** is a command-line tool for managing your personal music library. It allows you to download, organize, and manage media files efficiently with a set of user-friendly commands.

---

## Features

- **YouTube Integration**: Download audio and metadata directly from YouTube videos.
- **Customizable Paths**: Set or view the download directory for your media.
- **Image Processing**: Process and enhance album covers.
- **JSON Metadata**: Generate metadata files with details such as artist, album, track name,...

---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js (version 16 or higher) installed on your system.

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

---

## Folder Structure

The project follows a organized structure:

```
wave-cli/
├── bin/                # Executable scripts
│   └── wave.ts         # Main CLI script
├── src/                # Source code
│   └── commands/       # Individual commands (e.g., youtube, set-path)
│   └── utils/          # Utility functions (e.g., file handling, path resolution)
├── dist/               # Compiled JavaScript files (output of TypeScript build)
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
...
```

---

## Example Workflow

1. **Set Path**: Define the directory for downloads:

   ```bash
   wave set-path /home/user/Music/Wave
   ```

2. **Download Audio**: Fetch a track from YouTube:

   ```bash
   wave youtube --id VIDEO_ID
   ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Important Notice

While this tool allows you to download audio from YouTube for personal use, please be aware that downloading YouTube content may violate YouTube's [Terms of Service](https://www.youtube.com/t/terms). It is your responsibility to ensure compliance with any applicable laws or regulations. This tool is intended for personal use only, and the authors do not endorse or support using it for unauthorized purposes. Use it responsibly.
