<img src="../../assets/icon.png" width="100" height="100" />

# @repo/schemas

The `@repo/schemas` package is the **central repository for all Zod validation schemas** within the
Tunno monorepo. It provides robust, type-safe validation for data related to core entities like
songs, albums, artists, and playlists, leveraging [`Zod`](https://zod.dev/) and
[`drizzle-zod`](https://www.npmjs.com/package/drizzle-zod) for seamless integration with the Drizzle
ORM schema.

---

## About

This package ensures data integrity and consistency across all applications by providing
standardized validation rules. It offers:

- **Type-Safe Validation**: All schemas are defined using Zod, allowing for powerful runtime
  validation and compile-time type inference.
- **Drizzle ORM Integration**: Utilizes `drizzle-zod` to automatically generate base Zod schemas
  directly from the `@repo/database` Drizzle schema, reducing boilerplate and ensuring
  synchronization.
- **Internationalized Error Messages**: Validation messages are integrated with `@repo/i18n`,
  providing localized feedback to users.
- **Entity-Specific Schemas**: Provides `createInsertSchema` and `createUpdateSchema` functions for
  `Song`, `Artist`, `Album`, and `Playlist` entities, tailored for their respective data models and
  validation rules (e.g., file extensions, release years, array of associated IDs).
- **Reusable Validation Logic**: Centralizes common validation patterns (e.g., file extension
  checks, range validations) for reusability.

By centralizing validation schemas, `@repo/schemas` helps maintain high data quality and simplifies
form handling and API request validation across the entire monorepo.

---

## Installation

This is an internal package within the Tunno monorepo and is not intended for external installation.
It is automatically available to other packages and applications within the monorepo via
`pnpm workspace`.

---

## Usage

The `@repo/schemas` package is primarily used in application code (e.g., API handlers, form
components) to validate input data.

### Creating and Using Insert/Update Schemas

Each entity has `createInsert[Entity]Schema` and `createUpdate[Entity]Schema` functions. These
functions take an i18n `t` function to localize error messages.

```typescript
import { createInsertSongSchema, type InsertSongType } from '@repo/schemas';
import { useTranslation } from '@repo/i18n'; // Assuming a React context for this example

function SongCreationForm() {
  const { t } = useTranslation();
  const insertSongSchema = createInsertSongSchema(t);

  const handleSubmit = (formData: InsertSongType) => {
    try {
      const validatedData = insertSongSchema.parse(formData);
      console.log('Validated song data for insertion:', validatedData);
      // Proceed with API call or database insertion
    } catch (error) {
      if (error instanceof Zod.ZodError) {
        console.error('Validation errors:', error.errors);
        // Display errors to the user
      }
    }
  };

  // ... form rendering with input fields for song data
  return (
    <form onSubmit={e => {
      e.preventDefault();
      const data = {
        name: 'New Song',
        file: '/path/to/song.mp3',
        duration: 200,
        releaseYear: 2023,
        artists: [1, 2] // Example data
      };
      handleSubmit(data as InsertSongType); // Cast for demonstration, typically derived from form state
    }}>
      {/* Form fields */}
      <button type="submit">Create Song</button>
    </form>
  );
}
```

### Inferring Types

The package also exports inferred types for convenience, ensuring your data structures match the
schema.

```typescript
import { type UpdatePlaylistType } from "@repo/schemas"

const playlistUpdateData: UpdatePlaylistType = {
  name: "My Awesome Playlist (Updated)",
  isFavorite: true
}

// This will be type-checked against the UpdatePlaylistType schema
// updatePlaylist(playlistId, playlistUpdateData);
```

---

## API Reference

### Exports

- **`createInsertSongSchema(t: TFunction)`**: Creates a Zod schema for inserting new song data.
- **`createUpdateSongSchema(t: TFunction)`**: Creates a Zod schema for updating existing song data.
- **`createInsertArtistSchema(t: TFunction)`**: Creates a Zod schema for inserting new artist data.
- **`createUpdateArtistSchema(t: TFunction)`**: Creates a Zod schema for updating existing artist
  data.
- **`createInsertAlbumSchema(t: TFunction)`**: Creates a Zod schema for inserting new album data.
- **`createUpdateAlbumSchema(t: TFunction)`**: Creates a Zod schema for updating existing album
  data.
- **`createInsertPlaylistSchema(t: TFunction)`**: Creates a Zod schema for inserting new playlist
  data.
- **`createUpdatePlaylistSchema(t: TFunction)`**: Creates a Zod schema for updating existing
  playlist data.
- **`createAddToPlaylistSchema(t: TFunction)`**: Creates a Zod schema for validating data to add
  songs to a playlist.
- **Types**:
  - `InsertSongType`, `UpdateSongType`
  - `InsertArtistType`, `UpdateArtistType`
  - `InsertAlbumType`, `UpdateAlbumType`
  - `InsertPlaylistType`, `UpdatePlaylistType`
  - `AddToPlaylistType`

---

## Dependencies

This package depends on:

- [`@repo/database`](../database): Provides the Drizzle ORM schema for base schema generation.
- [`@repo/i18n`](../i18n): Provides the translation function (`TFunction`) for localized validation
  messages.
- [`@repo/shared`](../shared): Provides shared constants (e.g., file extensions) used in validation
  logic.
- [`zod`](https://zod.dev/): The primary library for schema definition and validation.
- [`drizzle-zod`](https://www.npmjs.com/package/drizzle-zod): Integrates Zod with Drizzle ORM for
  automatic schema derivation.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
