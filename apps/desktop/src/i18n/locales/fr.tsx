import Fr from "@assets/images/flags/fr.svg"

import { type Language } from "../types"

export const french: Language = {
  code: "fr",
  name: "Français",
  flag: Fr,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Aucun résultat trouvé"
    },
    songs: {
      title: "Chansons",
      createdTitle: "Chanson Créée avec Succès",
      createdDescription: "{{name}} a été créée",
      createdFailedTitle: "Échec de la Création de la Chanson",
      updatedTitle: "Chanson Mise à Jour avec Succès",
      updatedDescription: "{{name}} a été mise à jour",
      updatedFailedTitle: "Échec de la Mise à Jour de la Chanson",
      deletedTitle: "Chanson Supprimée avec Succès",
      deletedDescription: "{{name}} a été supprimée",
      deletedFailedTitle: "Échec de la Suppression de la Chanson"
    },
    favorites: {
      title: "Favoris"
    },
    playlists: {
      title: "Listes"
    },
    artists: {
      title: "Artistes"
    },
    settings: {
      title: "Paramètres"
    }
  }
}
