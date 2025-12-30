import Es from "../assets/es.svg"

import { type Language } from "../types"

export const spanish: Language = {
  code: "es",
  name: "Español",
  flag: Es,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "No se encontraron resultados",
      lessThanAnHourAgo: "Hace menos de una hora",
      hoursAgo: "hace {count} hora{count, plural, one {} other{s}}",
      today: "Hoy",
      thisWeek: "Esta Semana",
      thisMonth: "Este Mes",
      yesterday: "Ayer",
      years: "{count} año{count, plural, one {} other{s}}",
      weeks: "{count} semana{count, plural, one {} other{s}}",
      days: "{count} día{count, plural, one {} other{s}}",
      hours: "{count} hora{count, plural, one {} other{s}}",
      minutes: "{count} minuto{count, plural, one {} other{s}}",
      seconds: "{count} segundo{count, plural, one {} other{s}}",
      goBack: "Volver",
      goForward: "Adelante",
      favorite: "Añadir a favoritos",
      unfavorite: "Quitar de favoritos",
      enableShuffle: "Activar aleatorio",
      disableShuffle: "Desactivar aleatorio",
      previous: "Anterior",
      play: "Reproducir",
      pause: "Pausa",
      next: "Siguiente",
      enableRepeat: "Activar repetición",
      enableRepeatOne: "Activar repetición de uno",
      disableRepeat: "Desactivar repetición",
      mute: "Silenciar",
      unmute: "Activar sonido",
      queue: "Cola",
      title: "Título",
      album: "Álbum",
      artist: "Artista",
      date: "Fecha",
      added: "Añadido",
      duration: "Duración",
      search: "Buscar",
      selectAll: "Seleccionar todo",
      clear: "Limpiar",
      cancel: "Cancelar",
      more: "Más",
      select: "Seleccionar",
      preview: "Vista previa",
      close: "Cerrar",
      playback: "Reproducción",
      playNext: "Reproducir siguiente",
      removeFromQueue: "Eliminar de la cola",
      removeFromPlaylist: "Quitar de la Lista de Reproducción",
      nowPlaying: "Reproduciendo ahora",
      noSongPlaying: "Nada reproduciendo",
      upNext: "A continuación",
      actions: "Acciones",
      addTo: "Agregar a",
      playlist: "Playlist",
      song: "Canción",
      lyrics: "Letra",
      openMiniplayer: "Abrir minireproductor",
      enterFullScreen: "Entrar en pantalla completa",
      exitFullScreen: "Salir de pantalla completa",
      goToSong: "Ir a la canción",
      goToAlbum: "Ir al álbum",
      goToPlaylist: "Ir a la playlist",
      goToArtist: "Ir al artista",
      shuffleAndPlay: "Mezclar y reproducir",
      unknown: "Desconocido",
      unknownAlbum: "Álbum desconocido",
      unknownArtist: "Artista desconocido",
      listenTime: "Tiempo de escucha",
      averageListenTime: "Tiempo promedio de escucha",
      retentionRate: "Tasa de retención",
      totalPlays: "Total de reproducciones",
      lastPlayed: "Última reproducción",
      neverPlayed: "Nunca reproducido",
      streak: "Racha",
      refresh: "Actualizar",
      showingOfTotal: "Mostrando {showing} de {total}",
      start: "Iniciar",
      completed: "Completado",
      songsPlayed: "{count} canción{count, plural, one {} other{es}}",
      appearsIn: "Aparece en",
      addToSidebar: "Añadir a la barra lateral",
      removeFromSidebar: "Quitar de la barra lateral",
      featured: "Destacado",
      stats: "Estadísticas"
    },
    form: {
      titles: {
        createSong: "Crear Canción",
        updateSong: "Actualizar Canción",
        deleteSong: "Eliminar Canción",
        createArtist: "Crear Artista",
        updateArtist: "Actualizar Artista",
        deleteArtist: "Eliminar Artista",
        createAlbum: "Crear Álbum",
        updateAlbum: "Actualizar Álbum",
        deleteAlbum: "Eliminar Álbum",
        createPlaylist: "Crear Playlist",
        updatePlaylist: "Actualizar Playlist",
        deletePlaylist: "Eliminar Playlist",
        addToPlaylist: "Agregar a Playlist",
        confirmation: "Confirmación",
        warning: "Advertencia",
        lyricsPreview: "Vista Previa de Letras"
      },
      labels: {
        name: "Nombre",
        thumbnail: "Miniatura",
        file: "Archivo",
        releaseYear: "Año de lanzamiento",
        album: "Álbum",
        albumType: "Tipo de álbum",
        artists: "Artistas",
        folder: "Carpeta",
        lyrics: "Letras"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Actualizar",
        create: "Crear",
        add: "Agregar"
      },
      descriptions: {
        thumbnail: "Imagen de fondo (opcional)",
        fileSize: "Tamaño máximo: {size}",
        supportedFormats: "Formatos compatibles: {formats}",
        lyricsPreview: "Visualiza cómo aparecen las letras sincronizadas con el tiempo"
      },
      badges: {
        lines: "{count} línea{count, plural, one {} other{s}}",
        duration: "Duración: {time}"
      },
      messages: {
        confirmDelete: "¿Estás seguro de que deseas eliminar?",
        unsavedChanges: "Hay cambios sin guardar",
        noLyrics: "Sin letras"
      }
    },
    validation: {
      name: {
        required: "El nombre es obligatorio",
        max: "El nombre debe tener como máximo 200 caracteres"
      },
      file: {
        required: "El archivo es obligatorio",
        invalid: "Archivo inválido o corrupto",
        max: "El archivo excede el tamaño máximo de {maxSize}"
      },
      duration: {
        required: "La duración es obligatoria",
        min: "La duración debe ser al menos 0"
      },
      releaseYear: {
        invalid: "Año de lanzamiento inválido",
        min: "El año de lanzamiento debe ser al menos 0",
        max: "El año de lanzamiento no puede ser en el futuro"
      },
      albumId: {
        invalid: "Álbum no válido"
      },
      artists: {
        invalid: "Artistas no válidos"
      },
      albumType: {
        invalid: "Tipo de álbum no válido"
      },
      playlistIds: {
        invalid: "Listas de reproducción inválidas"
      },
      album: {
        duplicate: "Ya existe un álbum con este nombre",
        integrity:
          "No se puede eliminar el artista del álbum porque hay canciones que pertenecen tanto a este álbum como a este artista"
      },
      artist: {
        duplicate: "Ya existe un artista con este nombre",
        integrity:
          "No se puede eliminar el artista porque hay canciones que pertenecen tanto a este artista como a álbumes que también incluyen a este artista"
      },
      playlist: {
        duplicate: "Ya existe una lista de reproducción con este nombre"
      }
    },
    update: {
      downloading: "Descargando e instalando actualización",
      downloadingDescription:
        "Una nueva actualización está disponible y se está instalando automáticamente",
      installedSuccess: "Actualización instalada con éxito",
      failed: "Error al instalar la actualización"
    },
    breadcrumbs: {
      home: {
        title: "Inicio"
      },
      songs: {
        title: "Canciones"
      },
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Álbumes"
      },
      artists: {
        title: "Artistas"
      },
      fastUpload: {
        title: "Carga rápida"
      },
      settings: {
        title: "Configuración",
        appearance: {
          title: "Apariencia"
        },
        language: {
          title: "Idioma"
        },
        equalizer: {
          title: "Ecualizador"
        },
        sync: {
          title: "Sincronización"
        },
        about: {
          title: "Acerca de"
        }
      },
      lyrics: {
        title: "Letra"
      }
    },
    home: {
      title: "Inicio",
      jumpBackIn: {
        title: "Retomar",
        description: "Continúa donde lo dejaste"
      },
      yourPlaylists: {
        title: "Hecho Para Ti",
        description: "Tus listas de reproducción personales"
      },
      onRepeat: {
        title: "En Repetición",
        description: "Canciones que no puedes dejar de reproducir"
      },
      newReleases: {
        title: "Nuevos Lanzamientos",
        description: "Música nueva de artistas que sigues"
      },
      favoriteArtists: {
        title: "Tus Artistas",
        description: "Artistas que más amas"
      },
      discover: {
        title: "Descubrir",
        description: "Nuevas recomendaciones musicales para ti"
      }
    },
    songs: {
      title: "Canciones",
      createdTitle: "Canción creada con éxito",
      createdDescription: "{name} ha sido creada",
      createdFailedTitle: "Error al crear la canción",
      updatedTitle: "Canción actualizada con éxito",
      updatedDescription: "{name} ha sido actualizada",
      updatedFailedTitle: "Error al actualizar la canción",
      deletedTitle: "Canción eliminada con éxito",
      deletedDescription: "{name} ha sido eliminada",
      deletedFailedTitle: "Error al eliminar la canción",
      filters: {
        title: "Filtros",
        clear: "Limpiar filtros activos",
        sortBy: "Ordenar por",
        favorites: "Solo favoritas",
        favoritesDescription: "Mostrar solo canciones favoritas",
        lyrics: "Con letras",
        lyricsDescription: "Mostrar solo canciones con letras",
        releaseYear: "Año de lanzamiento",
        duration: "Duración",
        durationMin: "Mínimo",
        durationMax: "Máximo",
        playCount: "Reproducciones",
        playCountMin: "Mínimo",
        playCountMax: "Máximo",
        lastPlayed: "Última reproducción",
        lastPlayedAfter: "Después de",
        lastPlayedBefore: "Antes de",
        selectDate: "Seleccionar fecha",
        sortOptions: {
          name: "Nombre",
          duration: "Duración",
          favorites: "Favoritas",
          year: "Año",
          playCount: "Reproducciones",
          lastPlayed: "Última reproducción",
          createdAt: "Fecha de creación",
          updatedAt: "Fecha de actualización"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist creada con éxito",
      createdDescription: "{name} ha sido creada",
      createdFailedTitle: "Error al crear la playlist",
      updatedTitle: "Playlist actualizada con éxito",
      updatedDescription: "{name} ha sido actualizada",
      updatedFailedTitle: "Error al actualizar la playlist",
      deletedTitle: "Playlist eliminada con éxito",
      deletedDescription: "{name} ha sido eliminada",
      deletedFailedTitle: "Error al eliminar la playlist",
      filters: {
        title: "Filtros",
        clear: "Limpiar filtros activos",
        sortBy: "Ordenar por",
        favorites: "Solo favoritas",
        favoritesDescription: "Mostrar solo playlists favoritas",
        playCount: "Reproducciones",
        playCountMin: "Reproducciones mínimas",
        playCountMax: "Reproducciones máximas",
        totalTracks: "Total de pistas",
        totalTracksMin: "Pistas mínimas",
        totalTracksMax: "Pistas máximas",
        totalDuration: "Duración total",
        totalDurationMin: "Duración mínima",
        totalDurationMax: "Duración máxima",
        lastPlayed: "Última reproducción",
        lastPlayedAfter: "Después de",
        lastPlayedBefore: "Antes de",
        selectDate: "Seleccionar fecha",
        sortOptions: {
          name: "Nombre",
          favorites: "Favoritas",
          playCount: "Reproducciones",
          totalTracks: "Total de pistas",
          totalDuration: "Duración total",
          lastPlayed: "Última reproducción",
          createdAt: "Fecha de creación",
          updatedAt: "Fecha de actualización"
        }
      }
    },
    albums: {
      title: "Álbumes",
      createdTitle: "Álbum creado con éxito",
      createdDescription: "{name} ha sido creado",
      createdFailedTitle: "Error al crear el álbum",
      updatedTitle: "Álbum actualizado con éxito",
      updatedDescription: "{name} ha sido actualizado",
      updatedFailedTitle: "Error al actualizar el álbum",
      deletedTitle: "Álbum eliminado con éxito",
      deletedDescription: "{name} ha sido eliminado",
      deletedFailedTitle: "Error al eliminar el álbum",
      filters: {
        title: "Filtros",
        clear: "Limpiar filtros activos",
        sortBy: "Ordenar por",
        favorites: "Solo favoritos",
        favoritesDescription: "Mostrar solo álbumes favoritos",
        albumType: "Tipo de álbum",
        all: "Todos los tipos",
        single: "Single",
        album: "Álbum",
        compilation: "Compilación",
        releaseYear: "Año de lanzamiento",
        releaseYearMin: "Año mínimo",
        releaseYearMax: "Año máximo",
        playCount: "Reproducciones",
        playCountMin: "Reproducciones mínimas",
        playCountMax: "Reproducciones máximas",
        totalTracks: "Total de pistas",
        totalTracksMin: "Pistas mínimas",
        totalTracksMax: "Pistas máximas",
        totalDuration: "Duración total",
        totalDurationMin: "Duración mínima",
        totalDurationMax: "Duración máxima",
        lastPlayed: "Última reproducción",
        lastPlayedAfter: "Reproducido después de",
        lastPlayedBefore: "Reproducido antes de",
        selectDate: "Seleccionar fecha",
        sortOptions: {
          name: "Nombre",
          releaseYear: "Año de lanzamiento",
          favorites: "Favoritos",
          playCount: "Reproducciones",
          totalTracks: "Total de pistas",
          totalDuration: "Duración total",
          lastPlayed: "Última reproducción",
          createdAt: "Creado",
          updatedAt: "Actualizado"
        }
      }
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista creado con éxito",
      createdDescription: "{name} ha sido creado",
      createdFailedTitle: "Error al crear el artista",
      updatedTitle: "Artista actualizado con éxito",
      updatedDescription: "{name} ha sido actualizado",
      updatedFailedTitle: "Error al actualizar el artista",
      deletedTitle: "Artista eliminado con éxito",
      deletedDescription: "{name} ha sido eliminado",
      deletedFailedTitle: "Error al eliminar el artista",
      filters: {
        title: "Filtros",
        clear: "Limpiar filtros activos",
        sortBy: "Ordenar por",
        favorites: "Solo favoritos",
        favoritesDescription: "Mostrar solo artistas favoritos",
        playCount: "Reproducciones",
        playCountMin: "Mínimo",
        playCountMax: "Máximo",
        totalTracks: "Total de canciones",
        totalTracksMin: "Mínimo",
        totalTracksMax: "Máximo",
        totalDuration: "Duración total",
        totalDurationMin: "Mínimo",
        totalDurationMax: "Máximo",
        lastPlayed: "Última reproducción",
        lastPlayedAfter: "Después de",
        lastPlayedBefore: "Antes de",
        selectDate: "Seleccionar fecha",
        sortOptions: {
          name: "Nombre",
          favorites: "Favoritos",
          playCount: "Reproducciones",
          totalTracks: "Total de canciones",
          totalDuration: "Duración total",
          lastPlayed: "Última reproducción",
          createdAt: "Fecha de creación",
          updatedAt: "Fecha de actualización"
        }
      }
    },
    favorites: {
      createdTitle: "Agregado a favoritos",
      createdDescription: "{name} ha sido agregado a favoritos",
      createdFailedTitle: "Error al agregar a favoritos",
      deletedTitle: "Eliminado de favoritos",
      deletedDescription: "{name} ha sido eliminado de favoritos",
      deletedFailedTitle: "Error al eliminar de favoritos"
    },
    sidebar: {
      addedTitle: "Añadido a la barra lateral",
      addedDescription: "{name} ha sido añadido a la barra lateral",
      addedFailedTitle: "Error al añadir a la barra lateral",
      removedTitle: "Eliminado de la barra lateral",
      removedDescription: "{name} ha sido eliminado de la barra lateral"
    },
    settings: {
      title: "Configuración",
      appearance: {
        title: "Apariencia",
        description: "Defina las preferencias de apariencia de la aplicación.",
        theme: {
          title: "Tema",
          description: "Seleccione el tema de la aplicación",
          light: "Claro",
          dark: "Oscuro",
          system: "Sistema"
        },
        zoom: {
          title: "Zoom",
          description: "Ajuste el nivel de zoom de la aplicación"
        }
      },
      language: {
        title: "Idioma",
        description: "Elija su idioma preferido"
      },
      equalizer: {
        title: "Ecualizador",
        enable: {
          title: "Activar Ecualizador",
          description: "Activar o desactivar el ecualizador de audio",
          enabled: "Activado",
          disabled: "Desactivado"
        },
        presets: {
          title: "Preajustes del Ecualizador",
          description: "Elija entre configuraciones predefinidas del ecualizador",
          flat: {
            label: "Plano",
            description: "Sin ajustes"
          },
          rock: {
            label: "Rock",
            description: "Graves y agudos mejorados"
          },
          pop: {
            label: "Pop",
            description: "Equilibrado con ligero refuerzo"
          },
          jazz: {
            label: "Jazz",
            description: "Énfasis suave en las frecuencias medias"
          },
          classical: {
            label: "Clásico",
            description: "Sonido natural"
          },
          electronic: {
            label: "Electrónico",
            description: "Graves pesados y agudos nítidos"
          },
          vocal: {
            label: "Vocal",
            description: "Refuerzo en frecuencias medias para claridad"
          },
          bass: {
            label: "Graves",
            description: "Énfasis pesado en las bajas frecuencias"
          },
          treble: {
            label: "Agudos",
            description: "Énfasis en las altas frecuencias"
          }
        },
        bands: {
          title: "Bandas de Frecuencia",
          description: "Ajustar bandas de frecuencia individuales"
        },
        reset: {
          title: "Restablecer Ecualizador",
          description: "Restablecer todas las bandas a plano (0 dB)",
          button: "Restablecer a Plano"
        }
      },
      sync: {
        title: "Sincronización",
        description: "Sincronice sus datos en varios dispositivos",
        export: {
          title: "Exportar biblioteca",
          description:
            "Exporte su biblioteca como un archivo de paquete para respaldo o para usar en otro dispositivo",
          selectDestination: "Seleccionar destino",
          exportingSongs: "Exportando {count} canción{count, plural, one {} other{es}}",
          preparingExport: "Preparando exportación",
          exportingMessage: "Esto puede tardar un momento",
          exportSuccess: "Biblioteca exportada exitosamente",
          showFolder: "Mostrar carpeta",
          exportAgain: "Exportar de nuevo",
          exportFailed: "Error al exportar",
          tryAgain: "Intentar de nuevo",
          noSongs: "No hay canciones para exportar",
          libraryEmpty: "Tu biblioteca está vacía",
          noValidSongs: "No hay canciones válidas para exportar",
          missingAlbumInfo: "Todas las canciones carecen de información del álbum",
          songsExported:
            "{count} canción{count, plural, one {} other{es}} exportada{count, plural, one {} other{s}} al paquete"
        }
      },
      about: {
        title: "Acerca de",
        description: "Información de la aplicación y detalles de versión",
        version: "Versión",
        whatsNew: {
          title: "Novedades",
          description: "Consulta las últimas funciones y mejoras",
          newRelease: "Nueva versión",
          viewChangelog: "Ver changelog"
        },
        storage: {
          title: "Almacenamiento y Datos",
          description: "Gestionar datos de la aplicación y configuración",
          openDataFolder: "Abrir carpeta de datos"
        },
        legal: {
          title: "Legal y Derechos de Autor",
          description: "Información de licencia y documentos legales",
          copyright: "Derechos de Autor",
          licensed: "Licenciado bajo licencia MIT",
          viewLicense: "Ver licencia",
          viewOnGitHub: "Ver en GitHub"
        }
      }
    },
    fastUpload: {
      title: "Carga rápida",
      description: "Importa paquetes del CLI o exportados desde",
      cliTooltip: "Abrir documentación del CLI de Tunno",
      selectBundle: "Seleccionar paquete",
      changeBundle: "Cambiar paquete",
      status: {
        pending: "Pendiente",
        processing: "Procesando",
        success: "Éxito",
        error: "Error",
        skipped: "Omitido"
      },
      completed: {
        allSuccess: {
          title: "¡Importación Completada!",
          description:
            "{count} canción{count, plural, one {} other{s}} importada{count, plural, one {} other{s}} exitosamente"
        },
        withErrors: {
          title: "Importación Completada con Errores",
          description: "{successCount} importadas, {errorCount} fallaron, {skippedCount} omitidas"
        },
        withSkipped: {
          title: "Importación Completada",
          description: "{successCount} importadas, {skippedCount} omitidas"
        }
      }
    },
    lyrics: {
      title: "Letra"
    },
    languages: {
      da: "Danés",
      de: "Alemán",
      en: "Inglés",
      es: "Español",
      fi: "Finlandés",
      fr: "Francés",
      hi: "Hindi",
      it: "Italiano",
      ja: "Japonés",
      ko: "Coreano",
      nl: "Neerlandés",
      no: "Noruego",
      pl: "Polaco",
      pt: "Portugués",
      ru: "Ruso",
      sv: "Sueco",
      tr: "Turco",
      uk: "Ucraniano",
      vi: "Vietnamita",
      zh: "Chino"
    }
  }
}
