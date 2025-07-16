import It from "../assets/it.svg"

import { type Language } from "../types"

export const italian: Language = {
  code: "it",
  name: "Italiano",
  flag: It,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nessun risultato trovato",
      lessThanAnHourAgo: "Meno di un'ora fa",
      hoursAgo: "{{count}} ora{{count, plural, one {} other{e}}} fa",
      today: "Oggi",
      yesterday: "Ieri",
      goBack: "Indietro",
      goFoward: "Avanti",
      favorite: "Preferito",
      unfavorite: "Rimuovi dai preferiti",
      enableShuffle: "Attiva casuale",
      disableShuffle: "Disattiva casuale",
      previous: "Precedente",
      play: "Riproduci",
      pause: "Pausa",
      next: "Successiva",
      enableRepeat: "Attiva ripetizione",
      enableRepeatOne: "Ripeti una volta",
      disableRepeat: "Disattiva ripetizione",
      mute: "Disattiva audio",
      unmute: "Attiva audio",
      queue: "Coda"
    },
    update: {
      downloading: "Scaricamento e installazione dell'aggiornamento",
      downloadingDescription: "Un nuovo aggiornamento è disponibile e viene installato automaticamente",
      installedSuccess: "Aggiornamento installato con successo",
      failed: "Impossibile installare l'aggiornamento"
    },
    breadcrumbs: {
      home: {
        title: "Home"
      },
      songs: {
        title: "Canzoni"
      },
      favorites: {
        title: "Preferiti"
      },
      playlists: {
        title: "Playlist"
      },
      artists: {
        title: "Artisti"
      },
      fastUpload: {
        title: "Caricamento Rapido"
      },
      settings: {
        title: "Impostazioni",
        appearance: {
          title: "Aspetto"
        },
        language: {
          title: "Lingua"
        },
        sync: {
          title: "Sincronizzazione"
        }
      }
    },
    home: { title: "Home" },
    songs: {
      title: "Canzoni",
      createdTitle: "Canzone Creata con Successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile Creare la Canzone",
      updatedTitle: "Canzone Aggiornata con Successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile Aggiornare la Canzone",
      deletedTitle: "Canzone Eliminata con Successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile Eliminare la Canzone"
    },
    favorites: {
      title: "Preferiti",
      addedTitle: "Aggiunto ai Preferiti",
      addedDescription: "{{name}} è stato aggiunto ai preferiti",
      addedFailedTitle: "Impossibile Aggiungere ai Preferiti",
      removedTitle: "Rimosso dai Preferiti",
      removedDescription: "{{name}} è stato rimosso dai preferiti",
      removedFailedTitle: "Impossibile Rimuovere dai Preferiti"
    },
    playlists: {
      title: "Playlist",
      createdTitle: "Playlist Creata con Successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile Creare la Playlist",
      updatedTitle: "Playlist Aggiornata con Successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile Aggiornare la Playlist",
      deletedTitle: "Playlist Eliminata con Successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile Eliminare la Playlist"
    },
    artists: {
      title: "Artisti",
      createdTitle: "Artista Creato con Successo",
      createdDescription: "{{name}} è stato creato",
      createdFailedTitle: "Impossibile Creare l'Artista",
      updatedTitle: "Artista Aggiornato con Successo",
      updatedDescription: "{{name}} è stato aggiornato",
      updatedFailedTitle: "Impossibile Aggiornare l'Artista",
      deletedTitle: "Artista Eliminato con Successo",
      deletedDescription: "{{name}} è stato eliminato",
      deletedFailedTitle: "Impossibile Eliminare l'Artista"
    },
    settings: {
      title: "Impostazioni",
      appearance: {
        title: "Aspetto",
        description: "Seleziona la modalità di aspetto preferita",
        light: "Chiaro",
        dark: "Scuro",
        system: "Sistema"
      },
      language: {
        title: "Lingua",
        description: "Scegli la tua lingua preferita"
      },
      sync: {
        title: "Sincronizzazione",
        description: "Sincronizza i tuoi dati tra dispositivi"
      }
    },
    fastUpload: {
      title: "Caricamento Rapido"
    },
    languages: {
      da: "Danese",
      de: "Tedesco",
      en: "Inglese",
      es: "Spagnolo",
      fi: "Finlandese",
      fr: "Francese",
      hi: "Hindi",
      it: "Italiano",
      ja: "Giapponese",
      ko: "Coreano",
      nl: "Olandese",
      no: "Norvegese",
      pl: "Polacco",
      pt: "Portoghese",
      ru: "Russo",
      sv: "Svedese",
      tr: "Turco",
      uk: "Ucraino",
      vi: "Vietnamita",
      zh: "Cinese"
    }
  }
}
