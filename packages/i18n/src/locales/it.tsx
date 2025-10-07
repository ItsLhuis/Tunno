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
      years: "{count} anno{count, plural, one {} other{i}}",
      weeks: "{count} settimana{count, plural, one {} other{e}}",
      days: "{count} giorno{count, plural, one {} other{i}}",
      hours: "{count} ora{count, plural, one {} other{e}}",
      minutes: "{count} minuto{count, plural, one {} other{i}}",
      seconds: "{count} secondo{count, plural, one {} other{i}}",
      goBack: "Torna indietro",
      goFoward: "Avanti",
      favorite: "Aggiungi ai preferiti",
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
      unmute: "Riattiva audio",
      queue: "Coda",
      title: "Titolo",
      album: "Album",
      artist: "Artista",
      date: "Data",
      added: "Aggiunto",
      duration: "Durata",
      search: "Cerca",
      selectAll: "Seleziona tutto",
      clear: "Pulisci",
      cancel: "Annulla",
      more: "Altro",
      select: "Seleziona",
      preview: "Anteprima",
      close: "Chiudi",
      playback: "Riproduzione",
      playNext: "Riproduci successivo",
      actions: "Azioni",
      addTo: "Aggiungi a",
      playlist: "Playlist",
      song: "Canzone",
      lyrics: "Testo",
      openMiniplayer: "Apri miniplayer",
      enterFullScreen: "Entra a schermo intero",
      exitFullScreen: "Esci da schermo intero",
      goToSong: "Vai alla canzone",
      goToAlbum: "Vai all'album",
      goToArtist: "Vai all'artista",
      shuffleAndPlay: "Mescola e riproduci",
      unknown: "Sconosciuto",
      unknownAlbum: "Album sconosciuto",
      unknownArtist: "Artista sconosciuto",
      listenTime: "Tempo di ascolto",
      averageListenTime: "Tempo medio di ascolto",
      retentionRate: "Tasso di ritenzione",
      totalPlays: "Riproduzioni totali",
      lastPlayed: "Ultima riproduzione",
      neverPlayed: "Mai riprodotto",
      streak: "Serie",
      refresh: "Aggiorna"
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
        invalid: "Album non valido"
      },
      artists: {
        invalid: "Artisti non validi"
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
      playlists: {
        title: "Playlist"
      },
      albums: {
        title: "Album"
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
        equalizer: {
          title: "Equalizzatore"
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
      deletedFailedTitle: "Eliminazione canzone fallita",
      filters: {
        title: "Filtri",
        clear: "Cancella filtri attivi",
        sortBy: "Ordina per",
        favorites: "Solo preferiti",
        favoritesDescription: "Mostra solo canzoni preferite",
        lyrics: "Con testi",
        lyricsDescription: "Mostra solo canzoni con testi",
        releaseYear: "Anno di uscita",
        duration: "Durata",
        durationMin: "Minimo",
        durationMax: "Massimo",
        playCount: "Riproduzioni",
        playCountMin: "Minimo",
        playCountMax: "Massimo",
        lastPlayed: "Ultima riproduzione",
        lastPlayedAfter: "Dopo",
        lastPlayedBefore: "Prima",
        selectDate: "Seleziona data",
        sortOptions: {
          name: "Nome",
          duration: "Durata",
          favorites: "Preferiti",
          year: "Anno",
          playCount: "Riproduzioni",
          lastPlayed: "Ultima riproduzione",
          createdAt: "Data di creazione",
          updatedAt: "Data di aggiornamento"
        }
      }
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
    albums: {
      title: "Album",
      createdTitle: "Album creato con successo",
      createdDescription: "{name} è stato creato",
      createdFailedTitle: "Creazione album fallita",
      updatedTitle: "Album aggiornato con successo",
      updatedDescription: "{name} è stato aggiornato",
      updatedFailedTitle: "Aggiornamento album fallito",
      deletedTitle: "Album eliminato con successo",
      deletedDescription: "{name} è stato eliminato",
      deletedFailedTitle: "Eliminazione album fallita"
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
      deletedFailedTitle: "Eliminazione artista fallita",
      filters: {
        title: "Filtri",
        clear: "Cancella filtri attivi",
        sortBy: "Ordina per",
        favorites: "Solo preferiti",
        favoritesDescription: "Mostra solo artisti preferiti",
        playCount: "Conteggio riproduzioni",
        playCountMin: "Minimo",
        playCountMax: "Massimo",
        totalTracks: "Totale canzoni",
        totalTracksMin: "Minimo",
        totalTracksMax: "Massimo",
        totalDuration: "Durata totale",
        totalDurationMin: "Minimo",
        totalDurationMax: "Massimo",
        lastPlayed: "Ultima riproduzione",
        lastPlayedAfter: "Dopo",
        lastPlayedBefore: "Prima",
        selectDate: "Seleziona data",
        sortOptions: {
          name: "Nome",
          favorites: "Preferiti",
          playCount: "Conteggio riproduzioni",
          totalTracks: "Totale canzoni",
          totalDuration: "Durata totale",
          lastPlayed: "Ultima riproduzione",
          createdAt: "Data creazione",
          updatedAt: "Data aggiornamento"
        }
      }
    },
    favorites: {
      createdTitle: "Aggiunto ai preferiti",
      createdDescription: "{name} è stato aggiunto ai preferiti",
      createdFailedTitle: "Aggiunta ai preferiti fallita",
      deletedTitle: "Rimosso dai preferiti",
      deletedDescription: "{name} è stato rimosso dai preferiti",
      deletedFailedTitle: "Rimozione dai preferiti fallita"
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
      equalizer: {
        title: "Equalizzatore",
        enable: {
          title: "Attiva Equalizzatore",
          description: "Attiva o disattiva l'equalizzatore audio",
          enabled: "Attivato",
          disabled: "Disattivato"
        },
        presets: {
          title: "Preimpostazioni Equalizzatore",
          description: "Scegli tra impostazioni predefinite dell'equalizzatore",
          flat: {
            label: "Piatto",
            description: "Nessun aggiustamento"
          },
          rock: {
            label: "Rock",
            description: "Bassi e acuti potenziati"
          },
          pop: {
            label: "Pop",
            description: "Bilanciato con leggero boost"
          },
          jazz: {
            label: "Jazz",
            description: "Enfasi dolce sulle frequenze medie"
          },
          classical: {
            label: "Classico",
            description: "Suono naturale"
          },
          electronic: {
            label: "Elettronico",
            description: "Bassi pesanti e acuti nitidi"
          },
          vocal: {
            label: "Vocale",
            description: "Boost delle frequenze medie per chiarezza"
          },
          bass: {
            label: "Bassi",
            description: "Enfasi pesante sulle basse frequenze"
          },
          treble: {
            label: "Acuti",
            description: "Enfasi sulle alte frequenze"
          }
        },
        bands: {
          title: "Bande di Frequenza",
          description: "Regola le singole bande di frequenza"
        },
        reset: {
          title: "Reimposta Equalizzatore",
          description: "Reimposta tutte le bande a piatto (0 dB)",
          button: "Reimposta a Piatto"
        }
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
