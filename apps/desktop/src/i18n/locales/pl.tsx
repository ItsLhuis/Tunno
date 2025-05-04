import Pl from "@assets/images/flags/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polski",
  flag: Pl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nie znaleziono wyników",
      lessThanAnHourAgo: "Mniej niż godzinę temu",
      hoursAgo: "{{count}} godzina{{count, plural, one {} other{y}}} temu",
      today: "Dziś",
      yesterday: "Wczoraj"
    },
    songs: {
      title: "Utwory",
      createdTitle: "Utwór Został Pomyślnie Utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie Udało się Utworzyć Utworu",
      updatedTitle: "Utwór Został Pomyślnie Zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie Udało się Zaktualizować Utworu",
      deletedTitle: "Utwór Został Pomyślnie Usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie Udało się Usunąć Utworu"
    },
    favorites: {
      title: "Ulubione",
      addedTitle: "Dodano do Ulubionych",
      addedDescription: "{{name}} został dodany do ulubionych",
      addedFailedTitle: "Nie Udało się Dodać do Ulubionych",
      removedTitle: "Usunięto z Ulubionych",
      removedDescription: "{{name}} został usunięty z ulubionych",
      removedFailedTitle: "Nie Udało się Usunąć z Ulubionych"
    },
    playlists: {
      title: "Listy odtwarzania",
      createdTitle: "Utwór Został Pomyślnie Utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie Udało się Utworzyć Utworu",
      updatedTitle: "Utwór Został Pomyślnie Zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie Udało się Zaktualizować Utworu",
      deletedTitle: "Utwór Został Pomyślnie Usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie Udało się Usunąć Utworu"
    },
    artists: {
      title: "Artyści",
      createdTitle: "Artysta Został Pomyślnie Utworzony",
      createdDescription: "{{name}} został utworzony",
      createdFailedTitle: "Nie Udało się Utworzyć Artysty",
      updatedTitle: "Artysta Został Pomyślnie Zaktualizowany",
      updatedDescription: "{{name}} został zaktualizowany",
      updatedFailedTitle: "Nie Udało się Zaktualizować Artysty",
      deletedTitle: "Artysta Został Pomyślnie Usunięty",
      deletedDescription: "{{name}} został usunięty",
      deletedFailedTitle: "Nie Udało się Usunąć Artysty"
    },
    settings: {
      title: "Ustawienia"
    }
  }
}
