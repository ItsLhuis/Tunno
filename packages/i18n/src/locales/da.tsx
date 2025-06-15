import Da from "../assets/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Dansk",
  flag: Da,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater fundet",
      lessThanAnHourAgo: "Mindre end en time siden",
      hoursAgo: "{{count}} time{{count, plural, one {} other{r}}} siden",
      today: "I dag",
      yesterday: "I går"
    },
    update: {
      downloading: "Downloading and installing update",
      downloadingDescription: "A new update is available and being installed automatically",
      installedSuccess: "Update installed successfully",
      failed: "Failed to install update"
    },
    home: { title: "Home" },
    songs: {
      title: "Sange",
      createdTitle: "Sang Oprettet med Succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Sang",
      updatedTitle: "Sang Opdateret med Succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Sang",
      deletedTitle: "Sang Slettet med Succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang"
    },
    favorites: {
      title: "Favoritter",
      addedTitle: "Tilføjet til Favoritter",
      addedDescription: "{{name}} er blevet tilføjet til favoritter",
      addedFailedTitle: "Kunne Ikke Tilføje til Favoritter",
      removedTitle: "Fjernet fra Favoritter",
      removedDescription: "{{name}} er blevet fjernet fra favoritter",
      removedFailedTitle: "Kunne Ikke Fjerne fra Favoritter"
    },
    playlists: {
      title: "Playlister",
      createdTitle: "Playliste Oprettet med Succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Playliste",
      updatedTitle: "Playliste Opdateret med Succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Playliste",
      deletedTitle: "Playliste Slettet med Succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Playliste"
    },
    artists: {
      title: "Kunstnere",
      createdTitle: "Kunstner Oprettet med Succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Kunstner",
      updatedTitle: "Kunstner Opdateret med Succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Kunstner",
      deletedTitle: "Kunstner Slettet med Succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Kunstner"
    },
    settings: {
      title: "Indstillinger",
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
