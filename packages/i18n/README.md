<img src="../../assets/icon.png" width="100" height="100" />

# @repo/i18n

The `@repo/i18n` package provides the **internationalization (i18n) solution** for the Tunno
monorepo. It centralizes all translation configurations, resources, and utilities, leveraging
[`i18next`](https://www.i18next.com/) and [`react-i18next`](https://react.i18next.com/) to offer a
robust and type-safe approach to multi-language support.

---

## About

This package ensures that all applications within the Tunno ecosystem can easily integrate
internationalization capabilities. It offers:

- **Centralized Configuration**: All `i18next` initialization and configuration are managed here,
  including setting up default languages, fallback languages, and interpolation via `i18next-icu`.
- **Structured Translation Resources**: A systematic way to load and manage translation files for
  various locales, ensuring that translation keys are consistently organized.
- **Locale Management**: Definitions of all supported locales, including their codes, names, flags,
  and RTL support.
- **Type-Safe Translations**: Comprehensive TypeScript types (`Translations`) are automatically
  generated to reflect the structure of translation keys, providing compile-time safety when using
  the `t` function.
- **Custom `useTranslation` Hook**: An extended React hook that simplifies accessing translation
  functions and locale information within React components.

By centralizing i18n logic, `@repo/i18n` guarantees a consistent and maintainable multilingual
experience across all Tunno applications.

---

## Installation

This is an internal package within the Tunno monorepo and is not intended for external installation.
It is automatically available to other packages and applications within the monorepo via
`pnpm workspace`.

---

## Usage

The `@repo/i18n` package is primarily consumed by React applications to provide translation
capabilities.

### Initializing in a React Application

To make translations available throughout your React application, ensure that your root component is
wrapped with the `I18nextProvider` and the `i18n` instance from this package is provided.

```typescript
// src/main.tsx or App.tsx (example for a React application)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@repo/i18n'; // Import the configured i18n instance

import App from './App'; // Your main application component

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
);
```

### Using the `useTranslation` Hook

The custom `useTranslation` hook simplifies access to translation functions (`t`) and locale
information.

```typescript
import { useTranslation } from '@repo/i18n';

function MyComponent() {
  const { t, i18n, locales } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('common.welcomeMessage', { name: 'User' })}</h1>
      <p>{t('home.title')}</p>

      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('en')}>English</button>

      <h2>Available Locales:</h2>
      <ul>
        {Object.values(locales).map((locale) => (
          <li key={locale.code}>
            {locale.flag} {locale.name} ({locale.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Accessing Locale Definitions

You can directly access the `Locales` object and `getLocales` function for a list of supported
languages.

```typescript
import { Locales, getLocales, type LocaleKeys } from "@repo/i18n"

// Get a specific locale's information
const englishLocale = Locales.en
console.log(`English Name: ${englishLocale.name}, Flag: ${englishLocale.flag}`)

// Iterate over all locales
const allLocales = getLocales()
for (const localeCode in allLocales) {
  const locale = allLocales[localeCode as LocaleKeys]
  console.log(`${locale.name} (${locale.code}) - RTL: ${locale.isRtl}`)
}
```

---

## API Reference

### Exports

- **`i18n`**: The configured `i18next` instance.
- **`useTranslation`**: A custom React hook providing `t` function, `i18n` instance, and locales.
- **`Locales`**: A constant object mapping locale codes to `Language` objects.
- **`getLocales`**: A function returning the `Locales` object for programmatic access.
- **`getTranslationResources`**: Function to get i18next-compatible translation resources.
- **`TFunction`**: Re-exported `i18next` type for a strongly typed translation function.
- **`LocaleKeys`**: Type representing all supported locale codes.
- **`Language`**: Type defining the structure of a language configuration.
- **`Translations`**: Deeply nested type defining the structure of all translation keys and values.

---

## Dependencies

This package depends on:

- [`i18next`](https://www.i18next.com/): The core internationalization framework.
- [`i18next-icu`](https://github.com/i18next/i18next-icu): Plugin for ICU MessageFormat support.
- [`intl-messageformat`](https://formatjs.io/docs/intl-messageformat/): ICU MessageFormat
  implementation.
- [`react-i18next`](https://react.i18next.com/): React integration for i18next.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
