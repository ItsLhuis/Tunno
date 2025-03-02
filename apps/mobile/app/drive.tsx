import React, { useState, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { TextInput, Text, Button } from "@/components/ui"
import { database } from "@database/client"
import { artists } from "@database/schema"
import { eq } from "drizzle-orm"
import { FlashList } from "@shopify/flash-list"

const ArtistManager: React.FC = () => {
  const [name, setName] = useState("")
  const [artistList, setArtistList] = useState<any[]>([])

  const fetchArtists = async () => {
    try {
      const result = await database.query.artists.findMany()
      setArtistList(result)
    } catch (error) {
      console.error("Erro ao carregar artistas:", error)
    }
  }

  const handleAddArtist = async () => {
    if (name.trim()) {
      try {
        await database.insert(artists).values({ name })
        setName("")
        fetchArtists()
      } catch (error) {
        console.error("Erro ao adicionar artista:", error)
      }
    }
  }

  const handleRemoveArtist = async (id: number) => {
    Alert.alert("Remover Artista", "Tem certeza que deseja remover este artista?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await database.delete(artists).where(eq(artists.id, id))
            fetchArtists()
          } catch (error) {
            console.error("Erro ao remover artista:", error)
          }
        }
      }
    ])
  }

  const handleRemoveAll = async () => {
    Alert.alert("Remover Tudo", "Tem certeza que deseja remover tudo?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await database.delete(artists)
            fetchArtists()
          } catch (error) {
            console.error("Erro ao remover artista:", error)
          }
        }
      }
    ])
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Artista"
        value={name}
        onChangeText={setName}
      />
      <Button title="Adicionar Artista" onPress={handleAddArtist} />
      <Button title="Remover tudo" onPress={handleRemoveAll} />
      <Text>{artistList.length}</Text>
      <FlashList
        estimatedItemSize={60}
        data={artistList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.artistItem}>
            <Text>{JSON.stringify(item)}</Text>
            <Button title="Remover" onPress={() => handleRemoveArtist(item.id)} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 44
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  artistItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  artistName: {
    fontSize: 16,
    flex: 1
  }
})

export default ArtistManager
