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
      hoursAgo: "{count} ora{count, plural, one {} other{s}} fa",
      today: "Oggi",
      yesterday: "Ieri",
      goBack: "Torna indietro",
      goFoward: "Avanti",
      favorite: "Preferito",
      unfavorite: "Rimuovi dai preferiti",
      enableShuffle: "Abilita riproduzione casuale",
      disableShuffle: "Disabilita riproduzione casuale",
      previous: "Precedente",
      play: "Riproduci",
      pause: "Pausa",
      next: "Successivo",
      enableRepeat: "Abilita ripeti",
      enableRepeatOne: "Abilita ripeti uno",
      disableRepeat: "Disabilita ripeti",
      mute: "Disattiva audio",
      unmute: "Attiva audio",
      queue: "Coda",
      title: "Titolo",
      album: "Album",
      date: "Data",
      duration: "Durata",
      search: "Cerca",
      selectAll: "Seleziona tutto",
      visibility: "Visibilità",
      columns: "Colonne",
      clear: "Pulisci",
      cancel: "Annulla",
      more: "Altro",
      select: "Seleziona",
      preview: "Anteprima",
      close: "Chiudi"
    },
    form: {
      titles: {
        createSong: "Crea Canzone",
        updateSong: "Aggiorna Canzone",
        deleteSong: "Elimina Canzone",
        createArtist: "Crea Artista",
        updateArtist: "Aggiorna Artista",
        deleteArtist: "Elimina Artista",
        createPlaylist: "Crea Playlist",
        updatePlaylist: "Aggiorna Playlist",
        deletePlaylist: "Elimina Playlist",
        confirmation: "Conferma",
        warning: "Avviso",
        lyricsPreview: "Anteprima Testo"
      },
      labels: {
        name: "Nome",
        thumbnail: "Miniatura",
        file: "File",
        releaseYear: "Anno di rilascio",
        album: "Album",
        artists: "Artisti",
        isSingle: "È singolo",
        folder: "Cartella",
        lyrics: "Testo"
      },
      buttons: {
        cancel: "Annulla",
        delete: "Elimina",
        update: "Aggiorna",
        create: "Crea"
      },
      descriptions: {
        thumbnail: "Immagine di sfondo (opzionale)",
        fileSize: "Dimensione massima: {size}",
        supportedFormats: "Formati supportati: {formats}",
        lyricsPreview: "Visualizza come il testo appare sincronizzato con il tempo"
      },
      badges: {
        lines: "{count} riga{count, plural, one {} other{s}}",
        duration: "Durata: {time}"
      },
      messages: {
        confirmDelete: "Sei sicuro di voler eliminare?",
        unsavedChanges: "Ci sono modifiche non salvate",
        noLyrics: "Nessun testo"
      }
    },
    validation: {
      name: {
        required: "Il nome è obbligatorio",
        max: "Il nome deve contenere al massimo 200 caratteri"
      },
      file: {
        required: "Il file è obbligatorio",
        invalid: "File non valido o corrotto",
        max: "Il file supera la dimensione massima di {maxSize}"
      },
      duration: {
        required: "La durata è obbligatoria",
        min: "La durata deve essere almeno 0"
      },
      releaseYear: {
        invalid: "Anno di rilascio non valido",
        min: "L'anno di rilascio deve essere almeno 0",
        max: "L'anno di rilascio non può essere nel futuro"
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
      downloading: "Download e installazione aggiornamento in corso",
      downloadingDescription:
        "È disponibile un nuovo aggiornamento che viene installato automaticamente",
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
        title: "Caricamento veloce"
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
      createdDescription: "{name} è stata creata",
      createdFailedTitle: "Creazione canzone fallita",
      updatedTitle: "Canzone aggiornata con successo",
      updatedDescription: "{name} è stata aggiornata",
      updatedFailedTitle: "Aggiornamento canzone fallito",
      deletedTitle: "Canzone eliminata con successo",
      deletedDescription: "{name} è stata eliminata",
      deletedFailedTitle: "Eliminazione canzone fallita"
    },
    favorites: {
      title: "Preferiti",
      createdTitle: "Aggiunto ai preferiti",
      createdDescription: "{name} è stato aggiunto ai preferiti",
      createdFailedTitle: "Aggiunta ai preferiti fallita",
      deletedTitle: "Rimosso dai preferiti",
      deletedDescription: "{name} è stato rimosso dai preferiti",
      deletedFailedTitle: "Rimozione dai preferiti fallita"
    },
    playlists: {
      title: "Playlist",
      createdTitle: "Playlist creata con successo",
      createdDescription: "{name} è stata creata",
      createdFailedTitle: "Creazione playlist fallita",
      updatedTitle: "Playlist aggiornata con successo",
      updatedDescription: "{name} è stata aggiornata",
      updatedFailedTitle: "Aggiornamento playlist fallito",
      deletedTitle: "Playlist eliminata con successo",
      deletedDescription: "{name} è stata eliminata",
      deletedFailedTitle: "Eliminazione playlist fallita"
    },
    artists: {
      title: "Artisti",
      createdTitle: "Artista creato con successo",
      createdDescription: "{name} è stato creato",
      createdFailedTitle: "Creazione artista fallita",
      updatedTitle: "Artista aggiornato con successo",
      updatedDescription: "{name} è stato aggiornato",
      updatedFailedTitle: "Aggiornamento artista fallito",
      deletedTitle: "Artista eliminato con successo",
      deletedDescription: "{name} è stato eliminato",
      deletedFailedTitle: "Eliminazione artista fallita"
    },
    settings: {
      title: "Impostazioni",
      appearance: {
        title: "Aspetto",
        description: "Seleziona la modalità di visualizzazione preferita",
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
      title: "Caricamento veloce"
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
