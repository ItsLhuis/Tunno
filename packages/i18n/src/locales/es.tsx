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
      hoursAgo: "{{count}} hora{{count, plural, one {} other{s}}} atrás",
      today: "Hoy",
      yesterday: "Ayer",
      goBack: "Volver",
      goFoward: "Avanzar",
      favorite: "Favorito",
      unfavorite: "Quitar de favoritos",
      enableShuffle: "Activar aleatorio",
      disableShuffle: "Desactivar aleatorio",
      previous: "Anterior",
      play: "Reproducir",
      pause: "Pausar",
      next: "Siguiente",
      enableRepeat: "Activar repetición",
      enableRepeatOne: "Repetir una vez",
      disableRepeat: "Desactivar repetición",
      mute: "Silenciar",
      unmute: "Activar sonido",
      queue: "Cola",
      title: "Título",
      album: "Álbum",
      date: "Fecha",
      duration: "Duración",
      search: "Buscar"
    },
    validation: {
      name: {
        required: "El nombre es obligatorio",
        max: "El nombre debe tener como máximo 200 caracteres"
      },
      file: {
        required: "El archivo es obligatorio",
        max: "El archivo debe tener como máximo 50 caracteres"
      },
      thumbnail: {
        max: "La miniatura debe tener como máximo 50 caracteres"
      },
      duration: {
        required: "La duración es obligatoria",
        min: "La duración debe ser al menos 0"
      },
      releaseYear: {
        invalid: "Año de lanzamiento inválido",
        min: "El año de lanzamiento debe ser al menos 0",
        max: "El año de lanzamiento no puede estar en el futuro"
      },
      albumId: {
        invalid: "Álbum inválido",
        requiredIfNotSingle: "El álbum es obligatorio si no es single"
      }
    },
    update: {
      downloading: "Descargando e instalando actualización",
      downloadingDescription: "Una nueva actualización está disponible y se está instalando automáticamente",
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
        title: "Listas de Reproducción"
      },
      artists: {
        title: "Artistas"
      },
      fastUpload: {
        title: "Carga Rápida"
      },
      settings: {
        title: "Ajustes",
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
    home: { title: "Inicio" },
    songs: {
      title: "Canciones",
      createdTitle: "Canción Creada con Éxito",
      createdDescription: "{{name}} ha sido creada",
      createdFailedTitle: "Error al Crear la Canción",
      updatedTitle: "Canción Actualizada con Éxito",
      updatedDescription: "{{name}} ha sido actualizada",
      updatedFailedTitle: "Error al Actualizar la Canción",
      deletedTitle: "Canción Eliminada con Éxito",
      deletedDescription: "{{name}} ha sido eliminada",
      deletedFailedTitle: "Error al Eliminar la Canción"
    },
    favorites: {
      title: "Favoritos",
      addedTitle: "Añadido a Favoritos",
      addedDescription: "{{name}} ha sido añadido a favoritos",
      addedFailedTitle: "Error al Añadir a Favoritos",
      removedTitle: "Eliminado de Favoritos",
      removedDescription: "{{name}} ha sido eliminado de favoritos",
      removedFailedTitle: "Error al Eliminar de Favoritos"
    },
    playlists: {
      title: "Listas de Reproducción",
      createdTitle: "Lista Creada con Éxito",
      createdDescription: "{{name}} ha sido creada",
      createdFailedTitle: "Error al Crear la Lista",
      updatedTitle: "Lista Actualizada con Éxito",
      updatedDescription: "{{name}} ha sido actualizada",
      updatedFailedTitle: "Error al Actualizar la Lista",
      deletedTitle: "Lista Eliminada con Éxito",
      deletedDescription: "{{name}} ha sido eliminada",
      deletedFailedTitle: "Error al Eliminar la Lista"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista Creado con Éxito",
      createdDescription: "{{name}} ha sido creado",
      createdFailedTitle: "Error al Crear Artista",
      updatedTitle: "Artista Actualizado con Éxito",
      updatedDescription: "{{name}} ha sido actualizado",
      updatedFailedTitle: "Error al Actualizar Artista",
      deletedTitle: "Artista Eliminado con Éxito",
      deletedDescription: "{{name}} ha sido eliminado",
      deletedFailedTitle: "Error al Eliminar Artista"
    },
    settings: {
      title: "Ajustes",
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
        description: "Sincronice sus datos entre dispositivos"
      }
    },
    fastUpload: {
      title: "Carga Rápida"
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
