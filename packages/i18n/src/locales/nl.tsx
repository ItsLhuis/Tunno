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
      favorite: "Toevoegen aan favorieten",
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
      unmute: "Geluid aanzetten",
      queue: "Wachtrij",
      title: "Titel",
      album: "Album",
      artist: "Kunstenaar",
      date: "Datum",
      duration: "Duur",
      search: "Zoeken",
      selectAll: "Alles selecteren",
      clear: "Wissen",
      cancel: "Annuleren",
      more: "Meer",
      select: "Selecteren",
      preview: "Voorbeeld",
      close: "Sluiten",
      playback: "Afspelen",
      playNext: "Volgende afspelen",
      actions: "Acties",
      addTo: "Toevoegen aan",
      playlist: "Afspeellijst",
      lyrics: "Songtekst",
      openMiniplayer: "Minispeler openen",
      enterFullScreen: "Volledig scherm activeren",
      exitFullScreen: "Volledig scherm verlaten",
      goToAlbum: "Ga naar album",
      goToArtist: "Ga naar artiest",
      shuffleAndPlay: "Schudden en afspelen",
      unknown: "Onbekend",
      unknownAlbum: "Onbekend album",
      unknownArtist: "Onbekende artiest"
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
      playlists: {
        title: "Afspellijsten"
      },
      albums: {
        title: "Albums"
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
      deletedFailedTitle: "Nummer verwijderen mislukt",
      filters: {
        title: "Filters",
        clear: "Actieve filters wissen",
        sortBy: "Sorteren op",
        favorites: "Alleen favorieten",
        favoritesDescription: "Toon alleen favoriete nummers",
        lyrics: "Met tekst",
        lyricsDescription: "Toon alleen nummers met tekst",
        releaseYear: "Uitgavejaar",
        duration: "Duur",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Aantal afspelingen",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Laatst afgespeeld",
        lastPlayedAfter: "Na",
        lastPlayedBefore: "Voor",
        selectDate: "Datum selecteren",
        sortOptions: {
          name: "Naam",
          duration: "Duur",
          favorites: "Favorieten",
          year: "Jaar",
          playCount: "Afspelingen",
          lastPlayed: "Laatst afgespeeld",
          createdAt: "Aanmaakdatum",
          updatedAt: "Bijwerkdatum"
        }
      }
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
    albums: {
      title: "Albums",
      createdTitle: "Album succesvol aangemaakt",
      createdDescription: "{name} is aangemaakt",
      createdFailedTitle: "Album aanmaken mislukt",
      updatedTitle: "Album succesvol bijgewerkt",
      updatedDescription: "{name} is bijgewerkt",
      updatedFailedTitle: "Album bijwerken mislukt",
      deletedTitle: "Album succesvol verwijderd",
      deletedDescription: "{name} is verwijderd",
      deletedFailedTitle: "Album verwijderen mislukt"
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
    favorites: {
      createdTitle: "Toegevoegd aan favorieten",
      createdDescription: "{name} is toegevoegd aan favorieten",
      createdFailedTitle: "Toevoegen aan favorieten mislukt",
      deletedTitle: "Verwijderd uit favorieten",
      deletedDescription: "{name} is verwijderd uit favorieten",
      deletedFailedTitle: "Verwijderen uit favorieten mislukt"
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
