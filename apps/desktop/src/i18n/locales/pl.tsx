import Pl from "@assets/images/flags/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polski",
  flag: Pl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nie znaleziono wyników"
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
      title: "Ulubione"
    },
    playlists: {
      title: "Listy odtwarzania"
    },
    artists: {
      title: "Artyści"
    },
    settings: {
      title: "Ustawienia"
    }
  }
}
