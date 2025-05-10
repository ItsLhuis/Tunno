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
      yesterday: "Ayer"
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
      title: "Favoritos",
      addedTitle: "Añadido a Favoritos",
      addedDescription: "{{name}} ha sido añadido a favoritos",
      addedFailedTitle: "Error al Añadir a Favoritos",
      removedTitle: "Eliminado de Favoritos",
      removedDescription: "{{name}} ha sido eliminado de favoritos",
      removedFailedTitle: "Error al Eliminar de Favoritos"
    },
    playlists: {
      title: "Listas",
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
      title: "Ajustes"
    }
  }
}
