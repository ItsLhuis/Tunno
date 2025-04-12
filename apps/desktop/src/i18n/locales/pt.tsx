import Pt from "@assets/images/flags/pt.svg"

import { type Language } from "../types"

export const portuguese: Language = {
  code: "pt",
  name: "Português",
  flag: Pt,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nenhum resultado encontrado"
    },
    songs: {
      title: "Músicas",
      createdTitle: "Música Criada com Sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Falha ao Criar Música",
      updatedTitle: "Música Atualizada com Sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Falha ao Atualizar Música",
      deletedTitle: "Música Excluída com Sucesso",
      deletedDescription: "{{name}} foi excluída",
      deletedFailedTitle: "Falha ao Excluir Música"
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
      title: "Definições"
    }
  }
}
