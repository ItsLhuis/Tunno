import Pt from "../assets/pt.svg"

import { type Language } from "../types"

export const portuguese: Language = {
  code: "pt",
  name: "Português",
  flag: Pt,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nenhum resultado encontrado",
      lessThanAnHourAgo: "Há menos de uma hora",
      hoursAgo: "há {count} hora{count, plural, one {} other{s}}",
      today: "Hoje",
      yesterday: "Ontem",
      goBack: "Voltar",
      goFoward: "Avançar",
      favorite: "Adicionar aos favoritos",
      unfavorite: "Remover dos favoritos",
      enableShuffle: "Ativar reprodução aleatória",
      disableShuffle: "Desativar reprodução aleatória",
      previous: "Anterior",
      play: "Reproduzir",
      pause: "Pausar",
      next: "Seguinte",
      enableRepeat: "Ativar repetição",
      enableRepeatOne: "Ativar repetição de uma música",
      disableRepeat: "Desativar repetição",
      mute: "Silenciar",
      unmute: "Ativar som",
      queue: "Fila",
      title: "Título",
      album: "Álbum",
      artist: "Artista",
      date: "Data",
      createdAt: "Data de criação",
      duration: "Duração",
      search: "Pesquisar",
      selectAll: "Selecionar tudo",
      clear: "Limpar",
      cancel: "Cancelar",
      more: "Mais",
      select: "Selecionar",
      preview: "Pré-visualização",
      close: "Fechar",
      playback: "Reprodução",
      playNext: "Reproduzir a seguir",
      actions: "Acções",
      addTo: "Adicionar a",
      playlist: "Lista de reprodução",
      song: "Música",
      lyrics: "Letra",
      openMiniplayer: "Abrir miniplayer",
      enterFullScreen: "Entrar em ecrã completo",
      exitFullScreen: "Sair do ecrã completo",
      goToAlbum: "Ir para álbum",
      goToArtist: "Ir para artista",
      shuffleAndPlay: "Baralhar e reproduzir",
      unknown: "Desconhecido",
      unknownAlbum: "Álbum desconhecido",
      unknownArtist: "Artista desconhecido"
    },
    form: {
      titles: {
        createSong: "Criar Música",
        updateSong: "Atualizar Música",
        deleteSong: "Eliminar Música",
        createArtist: "Criar Artista",
        updateArtist: "Atualizar Artista",
        deleteArtist: "Eliminar Artista",
        createPlaylist: "Criar Lista de Reprodução",
        updatePlaylist: "Atualizar Lista de Reprodução",
        deletePlaylist: "Eliminar Lista de Reprodução",
        confirmation: "Confirmação",
        warning: "Aviso",
        lyricsPreview: "Pré-visualização da Letra"
      },
      labels: {
        name: "Nome",
        thumbnail: "Miniatura",
        file: "Ficheiro",
        releaseYear: "Ano de lançamento",
        album: "Álbum",
        artists: "Artistas",
        folder: "Pasta",
        lyrics: "Letra"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Atualizar",
        create: "Criar"
      },
      descriptions: {
        thumbnail: "Imagem de fundo (opcional)",
        fileSize: "Tamanho máximo: {size}",
        supportedFormats: "Formatos suportados: {formats}",
        lyricsPreview: "Visualize como a letra sincroniza com o tempo"
      },
      badges: {
        lines: "{count} linha{count, plural, one {} other{s}}",
        duration: "Duração: {time}"
      },
      messages: {
        confirmDelete: "Tem a certeza que deseja eliminar?",
        unsavedChanges: "Existem alterações não guardadas",
        noLyrics: "Sem letra"
      }
    },
    validation: {
      name: {
        required: "O nome é obrigatório",
        max: "O nome deve ter no máximo 200 caracteres"
      },
      file: {
        required: "O ficheiro é obrigatório",
        invalid: "Ficheiro inválido ou corrompido",
        max: "O ficheiro excede o tamanho máximo de {maxSize}"
      },
      duration: {
        required: "A duração é obrigatória",
        min: "A duração deve ser pelo menos 0"
      },
      releaseYear: {
        invalid: "Ano de lançamento inválido",
        min: "O ano de lançamento deve ser pelo menos 0",
        max: "O ano de lançamento não pode ser no futuro"
      },
      albumId: {
        invalid: "Álbum inválido"
      },
      artists: {
        invalid: "Artistas inválidos"
      }
    },
    update: {
      downloading: "A transferir e a instalar atualização",
      downloadingDescription:
        "Há uma nova atualização disponível que está a ser instalada automaticamente",
      installedSuccess: "Atualização instalada com sucesso",
      failed: "Falha na instalação da atualização"
    },
    breadcrumbs: {
      home: {
        title: "Início"
      },
      songs: {
        title: "Músicas"
      },
      playlists: {
        title: "Listas de Reprodução"
      },
      albums: {
        title: "Álbuns"
      },
      artists: {
        title: "Artistas"
      },
      fastUpload: {
        title: "Upload Rápido"
      },
      settings: {
        title: "Definições",
        appearance: {
          title: "Aparência"
        },
        language: {
          title: "Idioma"
        },
        sync: {
          title: "Sincronização"
        }
      }
    },
    home: {
      title: "Início"
    },
    songs: {
      title: "Músicas",
      createdTitle: "Música criada com sucesso",
      createdDescription: "{name} foi criada",
      createdFailedTitle: "Falha ao criar música",
      updatedTitle: "Música atualizada com sucesso",
      updatedDescription: "{name} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar música",
      deletedTitle: "Música eliminada com sucesso",
      deletedDescription: "{name} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar música",
      filters: {
        title: "Filtros",
        clear: "Limpar filtros ativos",
        sortBy: "Ordenar por",
        favorites: "Apenas favoritas",
        favoritesDescription: "Mostrar apenas músicas favoritas",
        lyrics: "Com letras",
        lyricsDescription: "Mostrar apenas músicas com letras",
        releaseYear: "Ano de lançamento",
        duration: "Duração",
        durationMin: "Mínimo",
        durationMax: "Máximo",
        playCount: "Reproduções",
        playCountMin: "Mínimo",
        playCountMax: "Máximo",
        lastPlayed: "Última reprodução",
        lastPlayedAfter: "Depois de",
        lastPlayedBefore: "Antes de",
        selectDate: "Selecionar data",
        sortOptions: {
          name: "Nome",
          duration: "Duração",
          favorites: "Favoritas",
          year: "Ano",
          playCount: "Reproduções",
          lastPlayed: "Última reprodução",
          createdAt: "Data de criação",
          updatedAt: "Data de atualização"
        }
      }
    },
    playlists: {
      title: "Listas de Reprodução",
      createdTitle: "Lista de reprodução criada com sucesso",
      createdDescription: "{name} foi criada",
      createdFailedTitle: "Falha ao criar lista de reprodução",
      updatedTitle: "Lista de reprodução atualizada com sucesso",
      updatedDescription: "{name} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar lista de reprodução",
      deletedTitle: "Lista de reprodução eliminada com sucesso",
      deletedDescription: "{name} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar lista de reprodução"
    },
    albums: {
      title: "Álbuns",
      createdTitle: "Álbum criado com sucesso",
      createdDescription: "{name} foi criado",
      createdFailedTitle: "Falha ao criar álbum",
      updatedTitle: "Álbum atualizado com sucesso",
      updatedDescription: "{name} foi atualizado",
      updatedFailedTitle: "Falha ao atualizar álbum",
      deletedTitle: "Álbum eliminado com sucesso",
      deletedDescription: "{name} foi eliminado",
      deletedFailedTitle: "Falha ao eliminar álbum"
    },
    artists: {
      title: "Artistas",
      createdTitle: "Artista criado com sucesso",
      createdDescription: "{name} foi criado",
      createdFailedTitle: "Falha ao criar artista",
      updatedTitle: "Artista atualizado com sucesso",
      updatedDescription: "{name} foi atualizado",
      updatedFailedTitle: "Falha ao atualizar artista",
      deletedTitle: "Artista eliminado com sucesso",
      deletedDescription: "{name} foi eliminado",
      deletedFailedTitle: "Falha ao eliminar artista"
    },
    favorites: {
      createdTitle: "Adicionado aos Favoritos",
      createdDescription: "{name} foi adicionado aos favoritos",
      createdFailedTitle: "Falha ao adicionar aos favoritos",
      deletedTitle: "Removido dos Favoritos",
      deletedDescription: "{name} foi removido dos favoritos",
      deletedFailedTitle: "Falha ao remover dos favoritos"
    },
    settings: {
      title: "Definições",
      appearance: {
        title: "Aparência",
        description: "Selecione o seu modo de aparência preferido",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema"
      },
      language: {
        title: "Idioma",
        description: "Escolha o seu idioma preferido"
      },
      sync: {
        title: "Sincronização",
        description: "Sincronize os seus dados entre dispositivos"
      }
    },
    fastUpload: {
      title: "Upload Rápido"
    },
    languages: {
      da: "Dinamarquês",
      de: "Alemão",
      en: "Inglês",
      es: "Espanhol",
      fi: "Finlandês",
      fr: "Francês",
      hi: "Hindi",
      it: "Italiano",
      ja: "Japonês",
      ko: "Coreano",
      nl: "Holandês",
      no: "Norueguês",
      pl: "Polaco",
      pt: "Português",
      ru: "Russo",
      sv: "Sueco",
      tr: "Turco",
      uk: "Ucraniano",
      vi: "Vietnamita",
      zh: "Chinês"
    }
  }
}
