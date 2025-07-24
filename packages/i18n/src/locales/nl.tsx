import Nl from "../assets/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Dutch",
  flag: Nl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Geen resultaten gevonden",
      lessThanAnHourAgo: "Minder dan een uur geleden",
      hoursAgo: "{{count}} uur geleden",
      today: "Vandaag",
      yesterday: "Gisteren",
      goBack: "Terug",
      goFoward: "Verder",
      favorite: "Favoriet",
      unfavorite: "Niet meer favoriet",
      enableShuffle: "Schudmodus inschakelen",
      disableShuffle: "Schudmodus uitschakelen",
      previous: "Vorige",
      play: "Afspelen",
      pause: "Pauzeren",
      next: "Volgende",
      enableRepeat: "Herhalen inschakelen",
      enableRepeatOne: "Herhaal één inschakelen",
      disableRepeat: "Herhalen uitschakelen",
      mute: "Dempen",
      unmute: "Geluid aan",
      queue: "Wachtrij",
      title: "Titel",
      album: "Album",
      date: "Datum",
      duration: "Duur",
      search: "Zoeken",
      selectAll: "Alles selecteren",
      visibility: "Zichtbaarheid",
      columns: "Kolommen",
      clear: "Wissen",
      cancel: "Annuleren",
      more: "Meer"
    },
    form: {
      titles: {
        createSong: "Nummer aanmaken",
        updateSong: "Nummer bijwerken",
        deleteSong: "Nummer verwijderen",
        createArtist: "Artiest aanmaken",
        updateArtist: "Artiest bijwerken",
        deleteArtist: "Artiest verwijderen",
        createPlaylist: "Afspeellijst aanmaken",
        updatePlaylist: "Afpeellijst bijwerken",
        deletePlaylist: "Afpeellijst verwijderen",
        confirmation: "Bevestiging",
        warning: "Waarschuwing"
      },
      labels: {
        name: "Naam",
        thumbnail: "Miniatuur",
        file: "Bestand",
        releaseYear: "Uitgavejaar",
        album: "Album",
        artists: "Artiesten",
        isSingle: "Is single"
      },
      buttons: {
        cancel: "Annuleren",
        delete: "Verwijderen",
        update: "Bijwerken",
        create: "Aanmaken"
      },
      descriptions: {
        thumbnail: "Achtergrondafbeelding (optioneel)",
        fileSize: "Maximale grootte: {{size}}",
        supportedFormats: "Ondersteunde formaten: {{formats}}"
      },
      messages: {
        confirmDelete: "Weet je zeker dat je wilt verwijderen?",
        unsavedChanges: "Er zijn niet-opgeslagen wijzigingen"
      }
    },
    validation: {
      name: {
        required: "Naam is verplicht",
        max: "Naam mag maximaal 200 tekens bevatten"
      },
      file: {
        required: "Bestand is verplicht"
      },
      duration: {
        required: "Duur is verplicht",
        min: "Duur moet minimaal 0 zijn"
      },
      releaseYear: {
        invalid: "Ongeldig uitgavejaar",
        min: "Uitgavejaar moet minimaal 0 zijn",
        max: "Uitgavejaar kan niet in de toekomst liggen"
      },
      albumId: {
        invalid: "Ongeldig album",
        requiredIfNotSingle: "Album is verplicht als het geen single is"
      },
      artists: {
        min: "Minimaal één artiest is verplicht"
      }
    },
    update: {
      downloading: "Update downloaden en installeren",
      downloadingDescription:
        "Er is een nieuwe update beschikbaar en wordt automatisch geïnstalleerd",
      installedSuccess: "Update succesvol geïnstalleerd",
      failed: "Installatie van update mislukt"
    },
    breadcrumbs: {
      home: {
        title: "Startpagina"
      },
      songs: {
        title: "Nummers"
      },
      favorites: {
        title: "Favorieten"
      },
      playlists: {
        title: "Afspeellijsten"
      },
      artists: {
        title: "Artiesten"
      },
      fastUpload: {
        title: "Snelle upload"
      },
      settings: {
        title: "Instellingen",
        appearance: {
          title: "Weergave"
        },
        language: {
          title: "Taal"
        },
        sync: {
          title: "Synchronisatie"
        }
      }
    },
    home: {
      title: "Startpagina"
    },
    songs: {
      title: "Nummers",
      createdTitle: "Nummer succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Fout bij het aanmaken van nummer",
      updatedTitle: "Nummer succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Fout bij het bijwerken van nummer",
      deletedTitle: "Nummer succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Fout bij het verwijderen van nummer"
    },
    favorites: {
      title: "Favorieten",
      createdTitle: "Toegevoegd aan favorieten",
      createdDescription: "{{name}} is toegevoegd aan favorieten",
      createdFailedTitle: "Toevoegen aan favorieten mislukt",
      deletedTitle: "Verwijderd uit favorieten",
      deletedDescription: "{{name}} is verwijderd uit favorieten",
      deletedFailedTitle: "Verwijderen uit favorieten mislukt"
    },
    playlists: {
      title: "Afspeellijsten",
      createdTitle: "Afspeellijst succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Fout bij het aanmaken van afspeellijst",
      updatedTitle: "Afspeellijst succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Fout bij het bijwerken van afspeellijst",
      deletedTitle: "Afspeellijst succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Fout bij het verwijderen van afspeellijst"
    },
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Fout bij het aanmaken van artiest",
      updatedTitle: "Artiest succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Fout bij het bijwerken van artiest",
      deletedTitle: "Artiest succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Fout bij het verwijderen van artiest"
    },
    settings: {
      title: "Instellingen",
      appearance: {
        title: "Weergave",
        description: "Kies je voorkeur voor de weergavemodus",
        light: "Licht",
        dark: "Donker",
        system: "Systeem"
      },
      language: {
        title: "Taal",
        description: "Kies je voorkeurstaal"
      },
      sync: {
        title: "Synchronisatie",
        description: "Synchroniseer je gegevens op meerdere apparaten"
      }
    },
    fastUpload: {
      title: "Snelle upload"
    },
    languages: {
      da: "Deens",
      de: "Duits",
      en: "Engels",
      es: "Spaans",
      fi: "Fins",
      fr: "Frans",
      hi: "Hindi",
      it: "Italiaans",
      ja: "Japans",
      ko: "Koreaans",
      nl: "Nederlands",
      no: "Noors",
      pl: "Pools",
      pt: "Portugees",
      ru: "Russisch",
      sv: "Zweeds",
      tr: "Turks",
      uk: "Oekraïens",
      vi: "Vietnamees",
      zh: "Chinees"
    }
  }
}
