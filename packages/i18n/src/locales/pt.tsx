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
      thisWeek: "Esta Semana",
      thisMonth: "Este Mês",
      yesterday: "Ontem",
      years: "{count} ano{count, plural, one {} other{s}}",
      weeks: "{count} semana{count, plural, one {} other{s}}",
      days: "{count} dia{count, plural, one {} other{s}}",
      hours: "{count} hora{count, plural, one {} other{s}}",
      minutes: "{count} minuto{count, plural, one {} other{s}}",
      seconds: "{count} segundo{count, plural, one {} other{s}}",
      goBack: "Voltar",
      goForward: "Avançar",
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
      added: "Adicionado",
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
      removeFromQueue: "Remover da fila",
      removeFromPlaylist: "Remover da Playlist",
      nowPlaying: "A tocar agora",
      upNext: "A seguir",
      actions: "Acções",
      addTo: "Adicionar a",
      playlist: "Playlist",
      song: "Música",
      lyrics: "Letra",
      openMiniplayer: "Abrir mini-reprodutor",
      enterFullScreen: "Entrar em ecrã completo",
      exitFullScreen: "Sair do ecrã completo",
      goToSong: "Ir para música",
      goToAlbum: "Ir para álbum",
      goToPlaylist: "Ir para playlist",
      goToArtist: "Ir para artista",
      shuffleAndPlay: "Baralhar e reproduzir",
      unknown: "Desconhecido",
      unknownAlbum: "Álbum desconhecido",
      unknownArtist: "Artista desconhecido",
      listenTime: "Tempo de escuta",
      averageListenTime: "Tempo médio de escuta",
      retentionRate: "Taxa de retenção",
      totalPlays: "Total de reproduções",
      lastPlayed: "Última reprodução",
      neverPlayed: "Nunca reproduzido",
      streak: "Sequência",
      refresh: "Atualizar",
      showingOfTotal: "A mostrar {showing} de {total}",
      start: "Iniciar",
      completed: "Concluído",
      songsPlayed: "{count} música{count, plural, one {} other{s}}"
    },
    form: {
      titles: {
        createSong: "Criar Música",
        updateSong: "Atualizar Música",
        deleteSong: "Eliminar Música",
        createArtist: "Criar Artista",
        updateArtist: "Atualizar Artista",
        deleteArtist: "Eliminar Artista",
        createAlbum: "Criar Álbum",
        updateAlbum: "Atualizar Álbum",
        deleteAlbum: "Eliminar Álbum",
        createPlaylist: "Criar Playlist",
        updatePlaylist: "Atualizar Playlist",
        deletePlaylist: "Eliminar Playlist",
        addToPlaylist: "Adicionar à Playlist",
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
        albumType: "Tipo de álbum",
        artists: "Artistas",
        folder: "Pasta",
        lyrics: "Letra"
      },
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
        update: "Atualizar",
        create: "Criar",
        add: "Adicionar"
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
      },
      albumType: {
        invalid: "Tipo de álbum inválido"
      },
      playlistIds: {
        invalid: "Playlists inválidas"
      },
      album: {
        duplicate: "Já existe um álbum com este nome",
        integrity:
          "Não é possível remover o artista do álbum porque existem músicas que pertencem tanto a este álbum quanto a este artista"
      },
      artist: {
        duplicate: "Já existe um artista com este nome",
        integrity:
          "Não é possível eliminar o artista porque existem músicas que pertencem tanto a este artista quanto a álbuns que também incluem este artista"
      },
      playlist: {
        duplicate: "Já existe uma playlist com este nome"
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
        title: "Playlists"
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
        equalizer: {
          title: "Equalizador"
        },
        sync: {
          title: "Sincronização"
        },
        about: {
          title: "Sobre"
        }
      },
      lyrics: {
        title: "Letra"
      }
    },
    home: {
      title: "Início",
      jumpBackIn: {
        title: "Retomar",
        description: "Continua de onde paraste"
      },
      yourPlaylists: {
        title: "Feito Para Ti",
        description: "As tuas playlists pessoais"
      },
      onRepeat: {
        title: "Em Repetição",
        description: "Músicas que não consegues parar de ouvir"
      },
      newReleases: {
        title: "Novos Lançamentos",
        description: "Música nova dos artistas que segues"
      },
      favoriteArtists: {
        title: "Os Teus Artistas",
        description: "Artistas que mais amas"
      },
      topAlbums: {
        title: "Top Álbuns",
        description: "Os teus álbuns mais ouvidos"
      },
      recentlyAdded: {
        title: "Adicionados Recentemente",
        description: "Últimas adições à tua biblioteca"
      },
      hiddenGems: {
        title: "Joias Escondidas",
        description: "Redescobre favoritos esquecidos"
      },
      discover: {
        title: "Descobrir",
        description: "Novas recomendações musicais para ti"
      },
      yourStats: {
        title: "A Tua Música",
        description: "As tuas estatísticas e insights de audição",
        topSong: "Música Top",
        topAlbum: "Álbum Top",
        topArtist: "Artista Top",
        topPlaylist: "Playlist Top"
      }
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
      title: "Playlists",
      createdTitle: "Playlist criada com sucesso",
      createdDescription: "{name} foi criada",
      createdFailedTitle: "Falha ao criar playlist",
      updatedTitle: "Playlist atualizada com sucesso",
      updatedDescription: "{name} foi atualizada",
      updatedFailedTitle: "Falha ao atualizar playlist",
      deletedTitle: "Playlist eliminada com sucesso",
      deletedDescription: "{name} foi eliminada",
      deletedFailedTitle: "Falha ao eliminar playlist",
      filters: {
        title: "Filtros",
        clear: "Limpar filtros ativos",
        sortBy: "Ordenar por",
        favorites: "Apenas favoritas",
        favoritesDescription: "Mostrar apenas playlists favoritas",
        playCount: "Reproduções",
        playCountMin: "Reproduções mínimas",
        playCountMax: "Reproduções máximas",
        totalTracks: "Total de faixas",
        totalTracksMin: "Faixas mínimas",
        totalTracksMax: "Faixas máximas",
        totalDuration: "Duração total",
        totalDurationMin: "Duração mínima",
        totalDurationMax: "Duração máxima",
        lastPlayed: "Última reprodução",
        lastPlayedAfter: "Depois de",
        lastPlayedBefore: "Antes de",
        selectDate: "Selecionar data",
        sortOptions: {
          name: "Nome",
          favorites: "Favoritas",
          playCount: "Reproduções",
          totalTracks: "Total de faixas",
          totalDuration: "Duração total",
          lastPlayed: "Última reprodução",
          createdAt: "Data de criação",
          updatedAt: "Data de atualização"
        }
      }
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
      deletedFailedTitle: "Falha ao eliminar álbum",
      filters: {
        title: "Filtros",
        clear: "Limpar filtros ativos",
        sortBy: "Ordenar por",
        favorites: "Apenas favoritos",
        favoritesDescription: "Mostrar apenas álbuns favoritos",
        albumType: "Tipo de álbum",
        all: "Todos os tipos",
        single: "Single",
        album: "Álbum",
        compilation: "Compilação",
        releaseYear: "Ano de lançamento",
        releaseYearMin: "Ano mínimo",
        releaseYearMax: "Ano máximo",
        playCount: "Reproduções",
        playCountMin: "Reproduções mínimas",
        playCountMax: "Reproduções máximas",
        totalTracks: "Total de faixas",
        totalTracksMin: "Faixas mínimas",
        totalTracksMax: "Faixas máximas",
        totalDuration: "Duração total",
        totalDurationMin: "Duração mínima",
        totalDurationMax: "Duração máxima",
        lastPlayed: "Última reprodução",
        lastPlayedAfter: "Reproduzido após",
        lastPlayedBefore: "Reproduzido antes de",
        selectDate: "Selecionar data",
        sortOptions: {
          name: "Nome",
          releaseYear: "Ano de lançamento",
          favorites: "Favoritos",
          playCount: "Reproduções",
          totalTracks: "Total de faixas",
          totalDuration: "Duração total",
          lastPlayed: "Última reprodução",
          createdAt: "Criado",
          updatedAt: "Atualizado"
        }
      }
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
      deletedFailedTitle: "Falha ao eliminar artista",
      filters: {
        title: "Filtros",
        clear: "Limpar filtros ativos",
        sortBy: "Ordenar por",
        favorites: "Apenas favoritos",
        favoritesDescription: "Mostrar apenas artistas favoritos",
        playCount: "Reproduções",
        playCountMin: "Mínimo",
        playCountMax: "Máximo",
        totalTracks: "Total de músicas",
        totalTracksMin: "Mínimo",
        totalTracksMax: "Máximo",
        totalDuration: "Duração total",
        totalDurationMin: "Mínimo",
        totalDurationMax: "Máximo",
        lastPlayed: "Última reprodução",
        lastPlayedAfter: "Depois de",
        lastPlayedBefore: "Antes de",
        selectDate: "Selecionar data",
        sortOptions: {
          name: "Nome",
          favorites: "Favoritos",
          playCount: "Reproduções",
          totalTracks: "Total de músicas",
          totalDuration: "Duração total",
          lastPlayed: "Última reprodução",
          createdAt: "Data de criação",
          updatedAt: "Data de atualização"
        }
      }
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
      equalizer: {
        title: "Equalizador",
        enable: {
          title: "Ativar Equalizador",
          description: "Ativar ou desativar o equalizador de áudio",
          enabled: "Ativado",
          disabled: "Desativado"
        },
        presets: {
          title: "Predefinições do Equalizador",
          description: "Escolha entre configurações predefinidas do equalizador",
          flat: {
            label: "Plano",
            description: "Sem ajustes"
          },
          rock: {
            label: "Rock",
            description: "Graves e agudos aprimorados"
          },
          pop: {
            label: "Pop",
            description: "Equilibrado com leve reforço"
          },
          jazz: {
            label: "Jazz",
            description: "Ênfase suave nas frequências médias"
          },
          classical: {
            label: "Clássico",
            description: "Som natural"
          },
          electronic: {
            label: "Eletrônico",
            description: "Graves pesados e agudos nítidos"
          },
          vocal: {
            label: "Vocal",
            description: "Reforço nas frequências médias para clareza"
          },
          bass: {
            label: "Graves",
            description: "Ênfase pesada nas baixas frequências"
          },
          treble: {
            label: "Agudos",
            description: "Ênfase nas altas frequências"
          }
        },
        bands: {
          title: "Bandas de Frequência",
          description: "Ajustar bandas de frequência individuais"
        },
        reset: {
          title: "Redefinir Equalizador",
          description: "Redefinir todas as bandas para plano (0 dB)",
          button: "Redefinir para Plano"
        }
      },
      sync: {
        title: "Sincronização",
        description: "Sincronize os seus dados entre dispositivos"
      },
      about: {
        title: "Sobre",
        identity: {
          title: "Sobre",
          description: "Informações da aplicação e detalhes da versão"
        },
        whatsNew: {
          title: "Novidades",
          newRelease: "Nova versão",
          viewChangelog: "Ver changelog",
          dialog: {
            title: "Changelog"
          }
        },
        storage: {
          title: "Armazenamento e Dados",
          description: "Gerir dados da aplicação e configurações",
          openDataFolder: "Abrir pasta de dados"
        },
        legal: {
          title: "Legal e Direitos de Autor",
          description: "Informações de licença e documentos legais",
          copyright: "Direitos de Autor",
          licensed: "Licenciado sob licença MIT",
          viewLicense: "Ver licença",
          viewOnGitHub: "Ver no GitHub"
        }
      }
    },
    fastUpload: {
      title: "Upload Rápido",
      description: "Cria um pacote usando o Tunno CLI, depois importa-o aqui",
      cliTooltip: "Abrir documentação do Tunno CLI",
      selectBundle: "Selecionar pacote",
      changeBundle: "Alterar pacote",
      status: {
        pending: "Pendente",
        processing: "A processar",
        success: "Sucesso",
        error: "Erro",
        skipped: "Ignorado"
      },
      completed: {
        allSuccess: {
          title: "Importação Concluída!",
          description:
            "{count} música{count, plural, one {} other{s}} importada{count, plural, one {} other{s}} com sucesso"
        },
        withErrors: {
          title: "Importação Concluída com Erros",
          description: "{successCount} importadas, {errorCount} falharam, {skippedCount} ignoradas"
        },
        withSkipped: {
          title: "Importação Concluída",
          description: "{successCount} importadas, {skippedCount} ignoradas"
        }
      }
    },
    lyrics: {
      title: "Letra"
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
