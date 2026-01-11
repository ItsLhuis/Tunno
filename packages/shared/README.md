<img src="../../assets/icon.png" width="100" height="100" />

# @repo/shared

The `@repo/shared` package is a **collection of fundamental, dependency-free code** that is shared
across multiple applications and packages within the Tunno monorepo. Its primary purpose is to
centralize reusable constants, types, and utility functions that do not introduce any runtime
overhead or specific framework dependencies.

---

## About

This package ensures consistency and promotes code reusability for core elements utilized throughout
the Tunno ecosystem. It currently provides:

- **Shared Constants**: Defines arrays of valid file extensions for common assets like thumbnail
  images and song audio files. These constants are crucial for ensuring uniform validation and file
  handling across different parts of the application (e.g., used by `@repo/schemas` for input
  validation).

By centralizing these basic building blocks, `@repo/shared` helps in maintaining a cohesive and
robust codebase while minimizing redundant definitions.

---

## Installation

This is an internal package within the Tunno monorepo and is not intended for external installation.
It is automatically available to other packages and applications within the monorepo via
`pnpm workspace`.

---

## Usage

The `@repo/shared` package is straightforward to use. Consumers can import specific constants or
utilities directly.

### Importing Constants

You can import the defined constants directly from the package or its `/constants` entry point.

```typescript
import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared"
// Or, if importing specifically from the constants entry point:
// import { VALID_SONG_FILE_EXTENSIONS } from '@repo/shared/constants';

console.log("Supported song file extensions:", VALID_SONG_FILE_EXTENSIONS) // ["opus", "m4a", "mp3", "flac", "wav", "aac", "ogg"]
console.log("Supported thumbnail file extensions:", VALID_THUMBNAIL_FILE_EXTENSIONS) // ["jpg", "jpeg", "png"]

// Example usage in a validation logic
function isValidAudioFile(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase()
  return extension ? VALID_SONG_FILE_EXTENSIONS.includes(extension) : false
}

console.log('Is "my_song.mp3" a valid audio file?', isValidAudioFile("my_song.mp3")) // true
```

---

## API Reference

### Exports

- **`VALID_THUMBNAIL_FILE_EXTENSIONS`**: `string[]` - An array of valid file extensions for
  thumbnail images (e.g., `['jpg', 'jpeg', 'png']`).
- **`VALID_SONG_FILE_EXTENSIONS`**: `string[]` - An array of valid file extensions for song audio
  files (e.g., `['opus', 'm4a', 'mp3', 'flac', 'wav', 'aac', 'ogg']`).

---

## Dependencies

This package has no runtime dependencies.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
