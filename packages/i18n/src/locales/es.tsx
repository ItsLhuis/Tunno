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
      yesterday: "Ayer",
      goBack: "Volver",
      goFoward: "Adelante",
      favorite: "Favorito",
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
      date: "Fecha",
      duration: "Duración",
      search: "Buscar",
      selectAll: "Seleccionar todo",
      visibility: "Visibilidad",
      columns: "Columnas",
      clear: "Limpiar",
      cancel: "Cancelar",
      more: "Más",
      select: "Seleccionar",
      preview: "Vista previa",
      close: "Cerrar"
    },
    form: {
      titles: {
        createSong: "Crear canción",
        updateSong: "Actualizar canción",
        deleteSong: "Eliminar canción",
        createArtist: "Crear artista",
        updateArtist: "Actualizar artista",
        deleteArtist: "Eliminar artista",
        createPlaylist: "Crear lista de reproducción",
        updatePlaylist: "Actualizar lista de reproducción",
        deletePlaylist: "Eliminar lista de reproducción",
        confirmation: "Confirmación",
        warning: "Advertencia",
        lyricsPreview: "Vista previa de letras"
      },
      labels: {
        name: "Nombre",
        thumbnail: "Miniatura",
        file: "Archivo",
        releaseYear: "Año de lanzamiento",
        album: "Álbum",
        artists: "Artistas",
        folder: "Carpeta",
        lyrics: "Letras"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Actualizar",
        create: "Crear"
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
      favorites: {
        title: "Favoritos"
      },
      playlists: {
        title: "Listas de reproducción"
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
        sync: {
          title: "Sincronización"
        }
      }
    },
    home: {
      title: "Inicio"
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
      deletedFailedTitle: "Error al eliminar la canción"
    },
    favorites: {
      title: "Favoritos",
      createdTitle: "Agregado a favoritos",
      createdDescription: "{name} ha sido agregado a favoritos",
      createdFailedTitle: "Error al agregar a favoritos",
      deletedTitle: "Eliminado de favoritos",
      deletedDescription: "{name} ha sido eliminado de favoritos",
      deletedFailedTitle: "Error al eliminar de favoritos"
    },
    playlists: {
      title: "Listas de reproducción",
      createdTitle: "Lista creada con éxito",
      createdDescription: "{name} ha sido creada",
      createdFailedTitle: "Error al crear la lista",
      updatedTitle: "Lista actualizada con éxito",
      updatedDescription: "{name} ha sido actualizada",
      updatedFailedTitle: "Error al actualizar la lista",
      deletedTitle: "Lista eliminada con éxito",
      deletedDescription: "{name} ha sido eliminada",
      deletedFailedTitle: "Error al eliminar la lista"
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
      deletedFailedTitle: "Error al eliminar el artista"
    },
    settings: {
      title: "Configuración",
      appearance: {
        title: "Apariencia",
        description: "Seleccione su modo de apariencia preferido",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema"
      },
      language: {
        title: "Idioma",
        description: "Elija su idioma preferido"
      },
      sync: {
        title: "Sincronización",
        description: "Sincronice sus datos en varios dispositivos"
      }
    },
    fastUpload: {
      title: "Carga rápida"
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
