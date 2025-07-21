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
      hoursAgo: "{{count}} or{{count, plural, one {a} other {e}}} fa",
      today: "Oggi",
      yesterday: "Ieri",
      goBack: "Indietro",
      goFoward: "Avanti",
      favorite: "Preferito",
      unfavorite: "Rimuovi dai preferiti",
      enableShuffle: "Abilita riproduzione casuale",
      disableShuffle: "Disabilita riproduzione casuale",
      previous: "Precedente",
      play: "Riproduci",
      pause: "Pausa",
      next: "Successivo",
      enableRepeat: "Abilita ripetizione",
      enableRepeatOne: "Ripeti singolo",
      disableRepeat: "Disabilita ripetizione",
      mute: "Silenzia",
      unmute: "Riattiva audio",
      queue: "Coda",
      title: "Titolo",
      album: "Album",
      date: "Data",
      duration: "Durata",
      search: "Cerca",
      selectAll: "Seleziona tutto",
      visibility: "Visibilità",
      columns: "Colonne",
      clear: "Cancella",
      cancel: "Annulla",
      more: "Altro"
    },
    form: {
      titles: {
        createSong: "Crea canzone",
        updateSong: "Modifica canzone",
        deleteSong: "Elimina canzone",
        createArtist: "Crea artista",
        updateArtist: "Modifica artista",
        deleteArtist: "Elimina artista",
        createPlaylist: "Crea playlist",
        updatePlaylist: "Modifica playlist",
        deletePlaylist: "Elimina playlist",
        confirmation: "Conferma",
        warning: "Avviso"
      },
      labels: {
        name: "Nome",
        thumbnail: "Miniatura",
        file: "File",
        releaseYear: "Anno di uscita",
        album: "Album",
        artists: "Artisti",
        isSingle: "È un singolo"
      },
      buttons: {
        cancel: "Annulla",
        delete: "Elimina",
        update: "Aggiorna",
        create: "Crea"
      },
      descriptions: {
        thumbnail: "Immagine di sfondo (opzionale)",
        dragAndDrop: "Trascina e rilascia il file qui",
        fileSize: "Dimensione massima: {{size}}",
        supportedFormats: "Formati supportati: {{formats}}"
      },
      messages: {
        confirmDelete: "Sei sicuro di voler eliminare?",
        unsavedChanges: "Ci sono modifiche non salvate"
      }
    },
    validation: {
      name: {
        required: "Il nome è obbligatorio",
        max: "Il nome deve essere al massimo di 200 caratteri"
      },
      file: {
        required: "Il file è obbligatorio",
        max: "Il file deve essere al massimo di 50 caratteri"
      },
      thumbnail: {
        max: "La miniatura deve essere al massimo di 50 caratteri"
      },
      duration: {
        required: "La durata è obbligatoria",
        min: "La durata deve essere almeno 0"
      },
      releaseYear: {
        invalid: "Anno di uscita non valido",
        min: "L'anno di uscita deve essere almeno 0",
        max: "L'anno di uscita non può essere nel futuro"
      },
      albumId: {
        invalid: "Album non valido",
        requiredIfNotSingle: "L'album è obbligatorio se non è un singolo"
      },
      artists: {
        min: "È richiesto almeno un artista"
      }
    },
    update: {
      downloading: "Download e installazione aggiornamento",
      downloadingDescription:
        "Un nuovo aggiornamento è disponibile e viene installato automaticamente",
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
        title: "Caricamento rapido"
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
    home: {
      title: "Home"
    },
    songs: {
      title: "Canzoni",
      createdTitle: "Canzone creata con successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile creare la canzone",
      updatedTitle: "Canzone aggiornata con successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile aggiornare la canzone",
      deletedTitle: "Canzone eliminata con successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile eliminare la canzone"
    },
    favorites: {
      title: "Preferiti",
      createdTitle: "Aggiunto ai preferiti",
      createdDescription: "{{name}} è stato aggiunto ai preferiti",
      createdFailedTitle: "Impossibile aggiungere ai preferiti",
      deletedTitle: "Rimosso dai preferiti",
      deletedDescription: "{{name}} è stato rimosso dai preferiti",
      deletedFailedTitle: "Impossibile rimuovere dai preferiti"
    },
    playlists: {
      title: "Playlist",
      createdTitle: "Playlist creata con successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile creare la playlist",
      updatedTitle: "Playlist aggiornata con successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile aggiornare la playlist",
      deletedTitle: "Playlist eliminata con successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile eliminare la playlist"
    },
    artists: {
      title: "Artisti",
      createdTitle: "Artista creato con successo",
      createdDescription: "{{name}} è stato creato",
      createdFailedTitle: "Impossibile creare l'artista",
      updatedTitle: "Artista aggiornato con successo",
      updatedDescription: "{{name}} è stato aggiornato",
      updatedFailedTitle: "Impossibile aggiornare l'artista",
      deletedTitle: "Artista eliminato con successo",
      deletedDescription: "{{name}} è stato eliminato",
      deletedFailedTitle: "Impossibile eliminare l'artista"
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
        description: "Sincronizza i tuoi dati tra i dispositivi"
      }
    },
    fastUpload: {
      title: "Caricamento rapido"
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
