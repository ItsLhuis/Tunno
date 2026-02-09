import Pt from "../assets/pt.svg"

import { type Language } from "../types"

/**
 * Portuguese language configuration.
 */
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
      thisWeek: "Esta semana",
      thisMonth: "Este mês",
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
      search: "Procurar",
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
      removeFromPlaylist: "Remover da playlist",
      nowPlaying: "A tocar agora",
      noSongPlaying: "Nada a tocar",
      upNext: "A seguir",
      actions: "Ações",
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
      songsPlayed: "{count} música{count, plural, one {} other{s}}",
      appearsIn: "Aparece em",
      addToSidebar: "Adicionar à barra lateral",
      removeFromSidebar: "Remover da barra lateral",
      featured: "Em destaque",
      stats: "Estatísticas",
      openToStart: "Abrir Tunno para começar"
    },
    form: {
      titles: {
        createSong: "Criar música",
        updateSong: "Atualizar música",
        deleteSong: "Eliminar música",
        createArtist: "Criar artista",
        updateArtist: "Atualizar artista",
        deleteArtist: "Eliminar artista",
        createAlbum: "Criar álbum",
        updateAlbum: "Atualizar álbum",
        deleteAlbum: "Eliminar álbum",
        createPlaylist: "Criar playlist",
        updatePlaylist: "Atualizar playlist",
        deletePlaylist: "Eliminar playlist",
        addToPlaylist: "Adicionar à playlist",
        confirmation: "Confirmação",
        warning: "Aviso",
        lyricsPreview: "Pré-visualização da letra"
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
        title: "Upload rápido"
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
      newReleases: {
        title: "Novos lançamentos",
        description: "Novas adições à tua coleção"
      },
      onRepeat: {
        title: "Em repetição",
        description: "Músicas que não consegues parar de ouvir"
      },
      discover: {
        title: "Descobrir",
        description: "Novas recomendações musicais para ti"
      },
      favoriteArtists: {
        title: "Os teus artistas",
        description: "Artistas que mais amas"
      },
      yourPlaylists: {
        title: "Feito para ti",
        description: "As tuas playlists pessoais"
      },
      topAlbums: {
        title: "Principais álbuns",
        description: "Os teus álbuns mais reproduzidos"
      },
      recentlyAdded: {
        title: "Adicionados recentemente",
        description: "Novas adições à tua biblioteca"
      },
      empty: {
        title: "A tua biblioteca está vazia",
        description:
          "Bem-vindo ao Tunno. Para começar, terás de adicionar algumas músicas à tua biblioteca pessoal.",
        getStarted: "Começar",
        songs: {
          title: "Importar músicas",
          description:
            "Adiciona ficheiros de música do teu dispositivo para começar a construir a tua biblioteca"
        },
        albums: {
          title: "Criar álbuns",
          description: "Organiza a tua música criando álbuns com arte e detalhes"
        },
        playlists: {
          title: "Criar lista de reprodução",
          description:
            "Cria as tuas próprias misturas para qualquer estado de espírito ou atividade"
        },
        artists: {
          title: "Adicionar artistas",
          description: "Cria perfis de artistas para organizar e gerir a sua música"
        }
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
      songsAddedTitle: "Músicas adicionadas com sucesso",
      songsAddedFailedTitle: "Falha ao adicionar músicas",
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
      createdTitle: "Adicionado aos favoritos",
      createdDescription: "{name} foi adicionado aos favoritos",
      createdFailedTitle: "Falha ao adicionar aos favoritos",
      deletedTitle: "Removido dos favoritos",
      deletedDescription: "{name} foi removido dos favoritos",
      deletedFailedTitle: "Falha ao remover dos favoritos"
    },
    sidebar: {
      addedTitle: "Adicionado à barra lateral",
      addedDescription: "{name} foi adicionado à barra lateral",
      addedFailedTitle: "Falha ao adicionar à barra lateral",
      removedTitle: "Removido da barra lateral",
      removedDescription: "{name} foi removido da barra lateral"
    },
    settings: {
      title: "Definições",
      appearance: {
        title: "Aparência",
        description: "Defina as preferências de aparência da aplicação",
        theme: {
          title: "Tema",
          description: "Selecione o tema da aplicação",
          light: "Claro",
          dark: "Escuro",
          system: "Sistema"
        },
        zoom: {
          title: "Zoom",
          description: "Ajuste o nível de zoom da aplicação"
        }
      },
      language: {
        title: "Idioma",
        description: "Escolha o seu idioma preferido"
      },
      equalizer: {
        title: "Equalizador",
        enable: {
          title: "Ativar equalizador",
          description: "Ativar ou desativar o equalizador de áudio",
          enabled: "Ativado",
          disabled: "Desativado"
        },
        presets: {
          title: "Predefinições do equalizador",
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
          title: "Bandas de frequência",
          description: "Ajustar bandas de frequência individuais"
        },
        reset: {
          title: "Redefinir equalizador",
          description: "Redefinir todas as bandas para plano (0 dB)",
          button: "Redefinir para plano"
        }
      },
      sync: {
        title: "Sincronização",
        description: "Sincronize os seus dados entre dispositivos",
        export: {
          title: "Exportar biblioteca",
          description:
            "Exporte a sua biblioteca como um ficheiro de pacote para backup ou para usar noutro dispositivo",
          selectDestination: "Selecionar destino",
          exportingSongs: "A exportar {count} música{count, plural, one {} other{s}}",
          preparingExport: "A preparar exportação",
          exportingMessage: "Isto pode demorar um momento",
          exportSuccess: "Biblioteca exportada com sucesso",
          showFolder: "Mostrar pasta",
          exportAgain: "Exportar novamente",
          exportFailed: "Falha na exportação",
          tryAgain: "Tentar novamente",
          noSongs: "Sem músicas para exportar",
          libraryEmpty: "A tua biblioteca está vazia",
          noValidSongs: "Sem músicas válidas para exportar",
          missingAlbumInfo: "Todas as músicas não têm informação do álbum",
          songsExported:
            "{count} música{count, plural, one {} other{s}} exportada{count, plural, one {} other{s}} para o pacote"
        },
        desktop: {
          title: "Sincronizar com móvel",
          description: "Transfere a tua biblioteca para Tunno Mobile através da tua rede local"
        },
        mobile: {
          title: "Sincronizar com computador",
          generateQr: "Gerar código QR",
          stopServer: "Parar servidor",
          waitingConnection: "Aguardando ligação do dispositivo móvel",
          deviceConnected: "Dispositivo ligado",
          syncInProgress: "Sincronização em andamento",
          syncCompleted: "Sincronização concluída com sucesso",
          serverError: "Falha ao iniciar servidor de sincronização",
          scanQr: "Ler código QR",
          scanQrDescription:
            "Leia o código QR no seu computador para transferir a sua biblioteca pela tua rede local",
          connecting: "A ligar",
          comparing: "A comparar bibliotecas",
          syncing: "A sincronizar",
          finalizing: "A finalizar",
          completed: "Sincronização concluída",
          completedDescription: "A sua biblioteca de música foi sincronizada com sucesso",
          alreadySynced: "Já sincronizado",
          failed: "Sincronização falhou",
          cancel: "Cancelar",
          done: "Concluído",
          songsSynced: "{synced} / {total} músicas",
          batchProgress: "Lote {current} / {total}",
          cameraPermissionTitle: "Acesso à câmara necessário",
          cameraPermissionDescription:
            "Conceda permissão de câmara para ler o código QR exibido no seu computador",
          grantPermission: "Conceder permissão",
          cameraLoading: "A carregar câmara",
          scanInstruction: "Aponte a câmara para o código QR no seu computador",
          connectionFailed: "Não foi possível contactar o servidor do computador",
          insufficientStorageDescription:
            "Espaço livre insuficiente para sincronizar. Necessário {required}, mas apenas {available} disponível",
          syncInterrupted:
            "A sincronização foi interrompida porque a aplicação foi para segundo plano",
          downloadingItem: 'A transferir "{name}"',
          fetchingBatch: "A obter metadados do lote {batch}",
          updatingStats: "A atualizar estatísticas",
          syncComplete: "Sincronização concluída",
          comparingLibraries: "A comparar bibliotecas",
          connectingToDesktop: "A ligar ao computador",
          cancelledByMobile: "Sincronização cancelada pelo dispositivo móvel",
          syncTimedOut: "O dispositivo móvel não respondeu",
          connectionLost: "Servidor de desktop desconectado"
        }
      },
      about: {
        title: "Sobre",
        description: "Informações da aplicação e detalhes da versão",
        version: "Versão",
        whatsNew: {
          title: "Novidades",
          description: "Consulte as últimas funcionalidades e melhorias",
          newRelease: "Nova versão",
          viewChangelog: "Ver changelog"
        },
        storage: {
          title: "Armazenamento e dados",
          description: "Gerir dados da aplicação e configurações",
          openDataFolder: "Abrir pasta de dados"
        },
        legal: {
          title: "Legal e direitos de autor",
          description: "Informações de licença e documentos legais",
          copyright: "Direitos de Autor",
          licensed: "Licenciado sob licença MIT",
          viewLicense: "Ver licença",
          viewOnGitHub: "Ver no GitHub"
        }
      }
    },
    fastUpload: {
      title: "Upload rápido",
      description: "Importa pacotes do CLI ou exportados de",
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
          title: "Importação concluída",
          description:
            "{count} música{count, plural, one {} other{s}} importada{count, plural, one {} other{s}} com sucesso"
        },
        withErrors: {
          title: "Importação concluída com erros",
          description: "{successCount} importadas, {errorCount} falharam, {skippedCount} ignoradas"
        },
        withSkipped: {
          title: "Importação concluída",
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
