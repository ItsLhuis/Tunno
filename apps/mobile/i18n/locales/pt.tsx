import Pt from "@assets/images/flags/pt.svg"

import { type Language } from "../types"

export const portuguese: Language = {
  code: "pt",
  name: "Português",
  flag: Pt,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nenhum resultado encontrado",
      lessThanAnHourAgo: "Menos de uma hora atrás",
      hoursAgo: "{{count}} hora{{count, plural, one {} other{s}}} atrás",
      today: "Hoje",
      yesterday: "Ontem"
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
      title: "Favoritos",
      addedTitle: "Adicionado aos Favoritos",
      addedDescription: "{{name}} foi adicionado aos favoritos",
      addedFailedTitle: "Erro ao Adicionar aos Favoritos",
      removedTitle: "Removido dos Favoritos",
      removedDescription: "{{name}} foi removido dos favoritos",
      removedFailedTitle: "Erro ao Remover dos Favoritos"
    },
    playlists: {
      title: "Músicas",
      createdTitle: "Música Criada com Sucesso",
      createdDescription: "{{name}} foi criada",
      createdFailedTitle: "Erro ao Criar Música",
      updatedTitle: "Música Atualizada com Sucesso",
      updatedDescription: "{{name}} foi atualizada",
      updatedFailedTitle: "Erro ao Atualizar Música",
      deletedTitle: "Música Excluída com Sucesso",
      deletedDescription: "{{name}} foi excluída",
      deletedFailedTitle: "Erro ao Excluir Música"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista Criado com Sucesso",
      createdDescription: "{{name}} foi criado",
      createdFailedTitle: "Erro ao Criar Artista",
      updatedTitle: "Artista Atualizado com Sucesso",
      updatedDescription: "{{name}} foi atualizado",
      updatedFailedTitle: "Erro ao Atualizar Artista",
      deletedTitle: "Artista Excluído com Sucesso",
      deletedDescription: "{{name}} foi excluído",
      deletedFailedTitle: "Erro ao Excluir Artista"
    },
    settings: {
      title: "Definições"
    }
  }
}
