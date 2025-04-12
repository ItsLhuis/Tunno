import Es from "@assets/images/flags/es.svg"

import { type Language } from "../types"

export const spanish: Language = {
  code: "es",
  name: "Español",
  flag: Es,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "No se encontraron resultados"
    },
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
      title: "Favoritos"
    },
    playlists: {
      title: "Listas"
    },
    artists: {
      title: "Artistas"
    },
    settings: {
      title: "Ajustes"
    }
  }
}
