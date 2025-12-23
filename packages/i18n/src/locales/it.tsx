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
      thisWeek: "Questa Settimana",
      thisMonth: "Questo Mese",
      yesterday: "Ieri",
      years: "{count} anno{count, plural, one {} other{i}}",
      weeks: "{count} settimana{count, plural, one {} other{e}}",
      days: "{count} giorno{count, plural, one {} other{i}}",
      hours: "{count} ora{count, plural, one {} other{e}}",
      minutes: "{count} minuto{count, plural, one {} other{i}}",
      seconds: "{count} secondo{count, plural, one {} other{i}}",
      goBack: "Torna indietro",
      goForward: "Avanti",
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
      removeFromQueue: "Rimuovi dalla coda",
      removeFromPlaylist: "Rimuovi dalla Playlist",
      nowPlaying: "In riproduzione",
      noSongPlaying: "Niente in riproduzione",
      upNext: "Prossimo",
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
      goToPlaylist: "Vai alla playlist",
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
      refresh: "Aggiorna",
      showingOfTotal: "Visualizzazione di {showing} su {total}",
      start: "Avvia",
      completed: "Completato",
      songsPlayed: "{count} brano{count, plural, one {} other{i}}",
      appearsIn: "Appare in",
      addToSidebar: "Aggiungi alla barra laterale",
      removeFromSidebar: "Rimuovi dalla barra laterale"
    },
    form: {
      titles: {
        createSong: "Crea Canzone",
        updateSong: "Aggiorna Canzone",
        deleteSong: "Elimina Canzone",
        createArtist: "Crea Artista",
        updateArtist: "Aggiorna Artista",
        deleteArtist: "Elimina Artista",
        createAlbum: "Crea Album",
        updateAlbum: "Aggiorna Album",
        deleteAlbum: "Elimina Album",
        createPlaylist: "Crea Playlist",
        updatePlaylist: "Aggiorna Playlist",
        deletePlaylist: "Elimina Playlist",
        addToPlaylist: "Aggiungi alla Playlist",
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
        albumType: "Tipo di album",
        artists: "Artisti",
        folder: "Cartella",
        lyrics: "Testo"
      },
      buttons: {
        cancel: "Annulla",
        delete: "Elimina",
        update: "Aggiorna",
        create: "Crea",
        add: "Aggiungi"
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
      },
      albumType: {
        invalid: "Tipo di album non valido"
      },
      playlistIds: {
        invalid: "Playlist non valide"
      },
      album: {
        duplicate: "Esiste già un album con questo nome",
        integrity:
          "Impossibile rimuovere l'artista dall'album perché ci sono canzoni che appartengono sia a questo album che a questo artista"
      },
      artist: {
        duplicate: "Esiste già un artista con questo nome",
        integrity:
          "Impossibile eliminare l'artista perché ci sono canzoni che appartengono sia a questo artista che ad album che includono anche questo artista"
      },
      playlist: {
        duplicate: "Esiste già una playlist con questo nome"
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
        },
        about: {
          title: "Informazioni"
        }
      },
      lyrics: {
        title: "Testo"
      }
    },
    home: {
      title: "Home",
      jumpBackIn: {
        title: "Riprendi",
        description: "Riprendi da dove hai lasciato"
      },
      yourPlaylists: {
        title: "Fatto Per Te",
        description: "Le tue playlist personali"
      },
      onRepeat: {
        title: "In Ripetizione",
        description: "Canzoni che non riesci a smettere di ascoltare"
      },
      newReleases: {
        title: "Nuove Uscite",
        description: "Musica fresca dagli artisti che segui"
      },
      favoriteArtists: {
        title: "I Tuoi Artisti",
        description: "Artisti che ami di più"
      },
      topAlbums: {
        title: "Top Album",
        description: "I tuoi album più ascoltati"
      },
      recentlyAdded: {
        title: "Aggiunti Di Recente",
        description: "Ultimi aggiunti alla tua libreria"
      },
      hiddenGems: {
        title: "Gemme Nascoste",
        description: "Riscopri i tuoi preferiti dimenticati"
      },
      discover: {
        title: "Scopri",
        description: "Nuove raccomandazioni musicali per te"
      },
      yourStats: {
        title: "La Tua Musica",
        description: "Le tue statistiche e insights di ascolto",
        topSong: "Brano Top",
        topAlbum: "Album Top",
        topArtist: "Artista Top",
        topPlaylist: "Playlist Top"
      }
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
      deletedFailedTitle: "Eliminazione playlist fallita",
      filters: {
        title: "Filtri",
        clear: "Cancella filtri attivi",
        sortBy: "Ordina per",
        favorites: "Solo preferiti",
        favoritesDescription: "Mostra solo playlist preferite",
        playCount: "Riproduzioni",
        playCountMin: "Riproduzioni minime",
        playCountMax: "Riproduzioni massime",
        totalTracks: "Totale tracce",
        totalTracksMin: "Tracce minime",
        totalTracksMax: "Tracce massime",
        totalDuration: "Durata totale",
        totalDurationMin: "Durata minima",
        totalDurationMax: "Durata massima",
        lastPlayed: "Ultima riproduzione",
        lastPlayedAfter: "Dopo",
        lastPlayedBefore: "Prima",
        selectDate: "Seleziona data",
        sortOptions: {
          name: "Nome",
          favorites: "Preferiti",
          playCount: "Riproduzioni",
          totalTracks: "Totale tracce",
          totalDuration: "Durata totale",
          lastPlayed: "Ultima riproduzione",
          createdAt: "Data di creazione",
          updatedAt: "Data di aggiornamento"
        }
      }
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
      deletedFailedTitle: "Eliminazione album fallita",
      filters: {
        title: "Filtri",
        clear: "Cancella filtri attivi",
        sortBy: "Ordina per",
        favorites: "Solo preferiti",
        favoritesDescription: "Mostra solo album preferiti",
        albumType: "Tipo di album",
        all: "Tutti i tipi",
        single: "Singolo",
        album: "Album",
        compilation: "Compilation",
        releaseYear: "Anno di rilascio",
        releaseYearMin: "Anno minimo",
        releaseYearMax: "Anno massimo",
        playCount: "Riproduzioni",
        playCountMin: "Riproduzioni minime",
        playCountMax: "Riproduzioni massime",
        totalTracks: "Totale tracce",
        totalTracksMin: "Tracce minime",
        totalTracksMax: "Tracce massime",
        totalDuration: "Durata totale",
        totalDurationMin: "Durata minima",
        totalDurationMax: "Durata massima",
        lastPlayed: "Ultima riproduzione",
        lastPlayedAfter: "Riprodotto dopo",
        lastPlayedBefore: "Riprodotto prima",
        selectDate: "Seleziona data",
        sortOptions: {
          name: "Nome",
          releaseYear: "Anno di rilascio",
          favorites: "Preferiti",
          playCount: "Riproduzioni",
          totalTracks: "Totale tracce",
          totalDuration: "Durata totale",
          lastPlayed: "Ultima riproduzione",
          createdAt: "Creato",
          updatedAt: "Aggiornato"
        }
      }
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
    sidebar: {
      addedTitle: "Aggiunto alla barra laterale",
      addedDescription: "{name} è stato aggiunto alla barra laterale",
      addedFailedTitle: "Aggiunta alla barra laterale non riuscita",
      removedTitle: "Rimosso dalla barra laterale",
      removedDescription: "{name} è stato rimosso dalla barra laterale"
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
        description: "Sincronizza i tuoi dati tra i dispositivi",
        export: {
          title: "Esporta libreria",
          description:
            "Esporta la tua libreria come file bundle per il backup o per usarla su un altro dispositivo",
          selectDestination: "Seleziona destinazione",
          exportingSongs: "Esportazione di {count} brano{count, plural, one {} other{i}}",
          preparingExport: "Preparazione esportazione",
          exportingMessage: "Potrebbe richiedere un momento",
          exportSuccess: "Libreria esportata con successo",
          showFolder: "Mostra cartella",
          exportAgain: "Esporta di nuovo",
          exportFailed: "Esportazione fallita",
          tryAgain: "Riprova",
          noSongs: "Nessuna canzone da esportare",
          libraryEmpty: "La tua libreria è vuota",
          noValidSongs: "Nessuna canzone valida da esportare",
          missingAlbumInfo: "Tutte le canzoni mancano di informazioni sull'album",
          songsExported:
            "{count} canzon{count, plural, one {e} other{i}} esportat{count, plural, one {a} other{e}} nel bundle"
        }
      },
      about: {
        title: "Informazioni",
        description: "Informazioni sull'applicazione e dettagli della versione",
        whatsNew: {
          title: "Novità",
          description: "Scopri le ultime funzionalità e miglioramenti",
          newRelease: "Nuova versione",
          viewChangelog: "Visualizza changelog"
        },
        storage: {
          title: "Archiviazione e Dati",
          description: "Gestisci dati dell'applicazione e impostazioni",
          openDataFolder: "Apri cartella dati"
        },
        legal: {
          title: "Legale e Copyright",
          description: "Informazioni sulla licenza e documenti legali",
          copyright: "Copyright",
          licensed: "Concesso in licenza sotto licenza MIT",
          viewLicense: "Visualizza licenza",
          viewOnGitHub: "Visualizza su GitHub"
        }
      }
    },
    fastUpload: {
      title: "Caricamento veloce",
      description: "Importa pacchetti dal CLI o esportati da",
      cliTooltip: "Apri documentazione CLI Tunno",
      selectBundle: "Seleziona pacchetto",
      changeBundle: "Cambia pacchetto",
      status: {
        pending: "In attesa",
        processing: "Elaborazione",
        success: "Successo",
        error: "Errore",
        skipped: "Saltato"
      },
      completed: {
        allSuccess: {
          title: "Importazione Completata!",
          description:
            "{count} traccia{count, plural, one {} other{s}} importata{count, plural, one {} other{s}} con successo"
        },
        withErrors: {
          title: "Importazione Completata con Errori",
          description: "{successCount} importate, {errorCount} fallite, {skippedCount} saltate"
        },
        withSkipped: {
          title: "Importazione Completata",
          description: "{successCount} importate, {skippedCount} saltate"
        }
      }
    },
    lyrics: {
      title: "Testo"
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
