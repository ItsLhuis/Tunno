import Nl from "../assets/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Nederlands",
  flag: Nl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Geen resultaten gevonden",
      lessThanAnHourAgo: "Minder dan een uur geleden",
      hoursAgo: "{count} uur geleden",
      today: "Vandaag",
      yesterday: "Gisteren",
      goBack: "Ga terug",
      goFoward: "Ga vooruit",
      favorite: "Favoriet",
      unfavorite: "Favoriet verwijderen",
      enableShuffle: "Schud afspelen inschakelen",
      disableShuffle: "Schud afspelen uitschakelen",
      previous: "Vorige",
      play: "Afspelen",
      pause: "Pauzeren",
      next: "Volgende",
      enableRepeat: "Herhalen inschakelen",
      enableRepeatOne: "Eén keer herhalen inschakelen",
      disableRepeat: "Herhalen uitschakelen",
      mute: "Dempen",
      unmute: "Dempen uitzetten",
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
      more: "Meer",
      select: "Selecteren",
      preview: "Voorbeeld",
      close: "Sluiten"
    },
    form: {
      titles: {
        createSong: "Nummer aanmaken",
        updateSong: "Nummer bijwerken",
        deleteSong: "Nummer verwijderen",
        createArtist: "Artiest aanmaken",
        updateArtist: "Artiest bijwerken",
        deleteArtist: "Artiest verwijderen",
        createPlaylist: "Afspellijst aanmaken",
        updatePlaylist: "Afspellijst bijwerken",
        deletePlaylist: "Afspellijst verwijderen",
        confirmation: "Bevestiging",
        warning: "Waarschuwing",
        lyricsPreview: "Songtekstvoorbeeld"
      },
      labels: {
        name: "Naam",
        thumbnail: "Miniatuur",
        file: "Bestand",
        releaseYear: "Uitgavejaar",
        album: "Album",
        artists: "Artiesten",
        folder: "Map",
        lyrics: "Songtekst"
      },
      buttons: {
        cancel: "Annuleren",
        delete: "Verwijderen",
        update: "Bijwerken",
        create: "Aanmaken"
      },
      descriptions: {
        thumbnail: "Achtergrondafbeelding (optioneel)",
        fileSize: "Maximale grootte: {size}",
        supportedFormats: "Ondersteunde formaten: {formats}",
        lyricsPreview: "Bekijk hoe de songtekst gesynchroniseerd wordt weergegeven"
      },
      badges: {
        lines: "{count} regel{count, plural, one {} other{s}}",
        duration: "Duur: {time}"
      },
      messages: {
        confirmDelete: "Weet je zeker dat je dit wilt verwijderen?",
        unsavedChanges: "Er zijn niet-opgeslagen wijzigingen",
        noLyrics: "Geen songtekst"
      }
    },
    validation: {
      name: {
        required: "Naam is verplicht",
        max: "Naam mag maximaal 200 tekens bevatten"
      },
      file: {
        required: "Bestand is verplicht",
        invalid: "Ongeldig of beschadigd bestand",
        max: "Bestand overschrijdt de maximale grootte van {maxSize}"
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
        invalid: "Ongeldig album"
      },
      artists: {
        invalid: "Ongeldige artiesten"
      }
    },
    update: {
      downloading: "Update wordt gedownload en geïnstalleerd",
      downloadingDescription:
        "Er is een nieuwe update beschikbaar die automatisch wordt geïnstalleerd",
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
        title: "Afspellijsten"
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
          title: "Uiterlijk"
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
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Nummer aanmaken mislukt",
      updatedTitle: "Nummer succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Nummer bijwerken mislukt",
      deletedTitle: "Nummer succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Nummer verwijderen mislukt"
    },
    favorites: {
      title: "Favorieten",
      createdTitle: "Toegevoegd aan favorieten",
      createdDescription: "{name} is toegevoegd aan favorieten",
      createdFailedTitle: "Toevoegen aan favorieten mislukt",
      deletedTitle: "Verwijderd uit favorieten",
      deletedDescription: "{name} is verwijderd uit favorieten",
      deletedFailedTitle: "Verwijderen uit favorieten mislukt"
    },
    playlists: {
      title: "Afspellijsten",
      createdTitle: "Afspellijst succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Afspellijst aanmaken mislukt",
      updatedTitle: "Afspellijst succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Afspellijst bijwerken mislukt",
      deletedTitle: "Afspellijst succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Afspellijst verwijderen mislukt"
    },
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Artiest aanmaken mislukt",
      updatedTitle: "Artiest succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Artiest bijwerken mislukt",
      deletedTitle: "Artiest succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Artiest verwijderen mislukt"
    },
    settings: {
      title: "Instellingen",
      appearance: {
        title: "Uiterlijk",
        description: "Selecteer je voorkeursweergavemodus",
        light: "Licht",
        dark: "Donker",
        system: "Systeem"
      },
      language: {
        title: "Taal",
        description: "Kies je voorkeurs taal"
      },
      sync: {
        title: "Synchronisatie",
        description: "Synchroniseer je gegevens tussen apparaten"
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
