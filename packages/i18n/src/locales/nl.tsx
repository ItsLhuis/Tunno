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
      hoursAgo: "{{count}} uur geleden",
      today: "Vandaag",
      yesterday: "Gisteren",
      goBack: "Ga terug",
      goFoward: "Ga verder",
      favorite: "Favoriet",
      unfavorite: "Verwijder favoriet",
      enableShuffle: "Shuffle inschakelen",
      disableShuffle: "Shuffle uitschakelen",
      previous: "Vorige",
      play: "Afspelen",
      pause: "Pauzeren",
      next: "Volgende",
      enableRepeat: "Herhalen inschakelen",
      enableRepeatOne: "Eén herhaling inschakelen",
      disableRepeat: "Herhalen uitschakelen",
      mute: "Dempen",
      unmute: "Dempen opheffen",
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
      select: "Selecteer"
    },
    form: {
      titles: {
        createSong: "Lied maken",
        updateSong: "Lied bijwerken",
        deleteSong: "Lied verwijderen",
        createArtist: "Artiest maken",
        updateArtist: "Artiest bijwerken",
        deleteArtist: "Artiest verwijderen",
        createPlaylist: "Afspeellijst maken",
        updatePlaylist: "Afspeellijst bijwerken",
        deletePlaylist: "Afspeellijst verwijderen",
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
        isSingle: "Is single",
        folder: "Map"
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
        confirmDelete: "Weet je zeker dat je dit wilt verwijderen?",
        unsavedChanges: "Er zijn niet-opgeslagen wijzigingen"
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
        max: "Bestand overschrijdt de maximale grootte van {{maxSize}}"
      },
      duration: {
        required: "Duur is verplicht",
        min: "Duur moet minimaal 0 zijn"
      },
      releaseYear: {
        invalid: "Ongeldig uitgavejaar",
        min: "Uitgavejaar moet minimaal 0 zijn",
        max: "Uitgavejaar kan geen toekomst zijn"
      },
      albumId: {
        invalid: "Ongeldig album",
        requiredIfNotSingle: "Album is verplicht als het geen single is"
      },
      artists: {
        min: "Minimaal één artiest vereist"
      }
    },
    update: {
      downloading: "Update downloaden en installeren",
      downloadingDescription:
        "Er is een nieuwe update beschikbaar en deze wordt automatisch geïnstalleerd",
      installedSuccess: "Update succesvol geïnstalleerd",
      failed: "Installatie van update mislukt"
    },
    breadcrumbs: {
      home: { title: "Home" },
      songs: { title: "Liedjes" },
      favorites: { title: "Favorieten" },
      playlists: { title: "Afspeellijsten" },
      artists: { title: "Artiesten" },
      fastUpload: { title: "Snelle upload" },
      settings: {
        title: "Instellingen",
        appearance: { title: "Thema" },
        language: { title: "Taal" },
        sync: { title: "Synchronisatie" }
      }
    },
    home: { title: "Home" },
    songs: {
      title: "Liedjes",
      createdTitle: "Lied aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Lied maken mislukt",
      updatedTitle: "Lied bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Lied bijwerken mislukt",
      deletedTitle: "Lied verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Lied verwijderen mislukt"
    },
    favorites: {
      title: "Favorieten",
      createdTitle: "Toegevoegd aan favorieten",
      createdDescription: "{{name}} is toegevoegd aan je favorieten",
      createdFailedTitle: "Toevoegen aan favorieten mislukt",
      deletedTitle: "Favoriet verwijderd",
      deletedDescription: "{{name}} is verwijderd uit je favorieten",
      deletedFailedTitle: "Verwijderen uit favorieten mislukt"
    },
    playlists: {
      title: "Afspeellijsten",
      createdTitle: "Afspeellijst aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Afspeellijst maken mislukt",
      updatedTitle: "Afspeellijst bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Afspeellijst bijwerken mislukt",
      deletedTitle: "Afspeellijst verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Afspeellijst verwijderen mislukt"
    },
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Artiest maken mislukt",
      updatedTitle: "Artiest bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Artiest bijwerken mislukt",
      deletedTitle: "Artiest verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Artiest verwijderen mislukt"
    },
    settings: {
      title: "Instellingen",
      appearance: {
        title: "Thema",
        description: "Kies je voorkeursthema",
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
        description: "Synchroniseer gegevens tussen apparaten"
      }
    },
    fastUpload: { title: "Snelle upload" },
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
