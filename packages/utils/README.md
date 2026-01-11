<img src="../../assets/icon.png" width="100" height="100" />

# @repo/utils

The `@repo/utils` package is a **comprehensive collection of reusable utility functions and
classes** designed to perform common tasks across the Tunno monorepo. It centralizes various helpers
for data manipulation, formatting, caching, and UI logic, leveraging external libraries like
[`date-fns`](https://date-fns.org/) and [`culori`](https://culorijs.org/) while maintaining an
optional peer dependency on React for specific hooks.

---

## About

This package aims to reduce code duplication and ensure consistent behavior for frequently needed
functionalities. It provides a diverse set of utilities, including:

- **Caching**: An efficient Least Recently Used (LRU) cache implementation for managing data.
- **Formatting**: Functions for formatting arrays, dates (relative and absolute, localized), file
  sizes, numbers (with metric suffixes), and time durations (localized).
- **Color Management**: Advanced utilities for generating WCAG-compliant, accessible color palettes
  and ensuring sufficient color contrast, built on `culori`.
- **Selection Management**: A generic `SelectionManager` class and a React `useSelection` hook for
  robust and performant multi-item selection in UI components.

By consolidating these utilities, `@repo/utils` serves as a foundational library, promoting
efficiency, maintainability, and a consistent user experience across all Tunno applications.

---

## Installation

This is an internal package within the Tunno monorepo and is not intended for external installation.
It is automatically available to other packages and applications within the monorepo via
`pnpm workspace`.

---

## Usage

Consumers can import specific utilities as needed. Some utilities have dependencies on `@repo/i18n`
for localization or `@repo/shared` for common constants.

### LRU Cache

Manage frequently accessed data efficiently using the `LRUCache`.

```typescript
import { LRUCache } from "@repo/utils"

const albumCache = new LRUCache<number, { name: string }>(10) // Cache up to 10 albums

albumCache.set(1, { name: "Album One" })
albumCache.set(2, { name: "Album Two" })

console.log(albumCache.get(1)) // { name: 'Album One' }
console.log(albumCache.size) // 2
```

### Date and Time Formatting

Format dates and durations in a human-readable and localized manner.

```typescript
import { formatRelativeDate, formatDuration } from '@repo/utils';
import { useTranslation } from '@repo/i18n'; // Assuming useTranslation from @repo/i18n

function MyDateComponent() {
  const { t, i18n } = useTranslation();
  const someDate = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
  const longDuration = 3600 * 24 * 7 + 3665; // 1 week, 1 hour, 1 minute, 5 seconds

  return (
    <div>
      <p>Relative Date: {formatRelativeDate(someDate, i18n.language, t)}</p>
      <p>Duration: {formatDuration(longDuration, t, { maxParts: 3 })}</p>
    </div>
  );
}
```

### Color Palette Generation

Generate accessible color palettes from a base color.

```typescript
import { generateColorPalette } from "@repo/utils"

// Generate a palette from a blue RGB color
const bluePalette = generateColorPalette([60, 120, 200], "rgb")

console.log("Background:", bluePalette.background)
console.log("Primary:", bluePalette.primary)
console.log("Foreground:", bluePalette.foreground)

// Ensure a color has sufficient contrast on a given background
import { ensureReadableOnBackground } from "@repo/utils"

const foregroundColor = "#ff0000" // Red
const backgroundColor = "#ffffff" // White
const readableRed = ensureReadableOnBackground(foregroundColor, backgroundColor, 4.5)

console.log("Readable Red on White:", readableRed) // Will be adjusted to meet WCAG AA contrast
```

### Selection Management (React Hook)

Integrate efficient multi-item selection into your React components.

```typescript
import { useSelection, createSelectionManager } from '@repo/utils';

interface MyItem {
  id: string;
  name: string;
}

const initialItems: MyItem[] = [
  { id: '1', name: 'Item A' },
  { id: '2', name: 'Item B' },
  { id: '3', name: 'Item C' },
];

function MySelectionList() {
  const manager = createSelectionManager((item) => item.id, initialItems);
  const { controller, handleToggleItem, state } = useSelection(manager);

  return (
    <div>
      <button onClick={() => controller.selectAll()}>Select All</button>
      <button onClick={() => controller.clearSelection()}>Clear Selection</button>
      <p>Selected: {state.selectedCount} / {state.totalCount}</p>
      <ul>
        {initialItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={controller.selectedIds.includes(item.id)}
              onChange={() => handleToggleItem(item.id)}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## API Reference

### Exports

- **`LRUCache`**: Generic class for a Least Recently Used cache.
- **Formatting Functions**:
  - `shuffleArray<T>(array: T[])`: Shuffles an array randomly.
  - `formatRelativeDate(data: Date | string, lang: string, t: TFunction)`: Formats dates relatively.
  - `formatFilterDate(data: Date | string, lang: string)`: Formats dates for filters.
  - `getFileNameAndExtension(filePath: string)`: Extracts file name and extension.
  - `formatFileSize(bytes: number)`: Formats file sizes to human-readable strings.
  - `isImageExtension(extension: string)`: Checks if an extension is an image extension.
  - `calculateRetentionRate(...)`: Calculates song retention rate.
  - `formatNumber(num: number)`: Formats numbers with metric suffixes (K, M, B).
  - `calculateStreak(...)`: Calculates daily play streaks.
  - `formatTime(seconds: number | undefined)`: Formats seconds to `MM:SS` or `H:MM:SS`.
  - `parseTime(str: string)`: Parses time strings to seconds.
  - `formatDuration(seconds: number | undefined, t: TFunction, options?)`: Localized human-readable
    duration.
- **Color Utilities**:
  - `generateColorPalette(rgbColor: RGBTuple, format?: ColorFormat)`: Generates an accessible
    8-color palette.
  - `ensureReadableOnBackground(foreground: string, background: string, minRatio: number)`: Adjusts
    foreground color for contrast.
  - `getContrastRatio(colorA: string, colorB: string)`: Calculates WCAG contrast ratio.
- **Selection Management**:
  - `SelectionManager<TItem>`: Class for managing item selections.
  - `createSelectionManager<TItem>(keyExtractor, data)`: Factory for `SelectionManager`.
  - `useSelection<TItem>(manager, onSelectionChange?)`: React hook for selection integration.
- **Types**:
  - `SelectionChangeCallback`, `KeyExtractor`, `SelectionState`, `SelectionController` (for
    selection management).
  - `RGBTuple`, `Oklch`, `ColorFormat`, `Palette` (for colors).
  - `UseSelectionReturn` (for `useSelection` hook).

---

## Dependencies

This package depends on:

- [`@repo/i18n`](../i18n): For localization in date and time formatting.
- [`@repo/shared`](../shared): For shared constants like file extensions.
- [`culori`](https://culorijs.org/): A color library for advanced color manipulation and
  accessibility.
- [`date-fns`](https://date-fns.org/): A modern JavaScript date utility library.

---

## Peer Dependencies

- `react` (optional): Required if using React-specific hooks like `useSelection`.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
