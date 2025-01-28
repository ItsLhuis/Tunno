import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { BackButton, Button, Header, Text } from "@components/ui"
import { spacing } from "@/constants/styles"
import * as DocumentPicker from "expo-document-picker"
import TrackPlayer, { Capability, State } from "react-native-track-player"
import { SafeAreaView } from "react-native-safe-area-context"

interface AudioFile {
  name: string
  uri: string
}

export default function Drive() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<AudioFile | null>(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  useEffect(() => {
    let mounted = true

    const setup = async () => {
      try {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
          icon: require("@assets/images/appicon-primary.png"),
          capabilities: [Capability.Play, Capability.Pause]
        })
        if (mounted) {
          setIsPlayerReady(true)
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("player has already been initialized")
        ) {
          if (mounted) {
            setIsPlayerReady(true)
          }
        } else {
          console.log("Error setting up track player:", error)
        }
      }
    }

    setup()

    return () => {
      mounted = false
      if (isPlayerReady) {
        TrackPlayer.reset()
      }
    }
  }, [])

  const pickAudio = async () => {
    if (!isPlayerReady) return

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true
      })

      if (result.canceled === false && result.assets?.length > 0) {
        const audioFile = result.assets[0]
        await TrackPlayer.reset()
        await TrackPlayer.add({
          url: audioFile.uri,
          title: audioFile.name,
          artist: "Unknown Artist",
          artwork:
            "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        })
        setCurrentTrack({
          name: audioFile.name,
          uri: audioFile.uri
        })
        setIsPlaying(false)
      }
    } catch (error) {
      console.log("Error picking audio file:", error)
    }
  }

  const togglePlayback = async () => {
    try {
      if (!currentTrack || !isPlayerReady) return

      const playerState = await TrackPlayer.getPlaybackState()

      if (playerState.state === State.Playing) {
        await TrackPlayer.pause()
        setIsPlaying(false)
      } else {
        await TrackPlayer.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Error toggling playback:", error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton />
      <View style={{ flex: 1, gap: spacing.medium }}>
        <Button title="Selecionar Áudio" onPress={pickAudio} disabled={!isPlayerReady} />
        {currentTrack && (
          <>
            <Text>Arquivo atual: {currentTrack.name}</Text>
            <Button
              title={isPlaying ? "Pausar" : "Reproduzir"}
              onPress={togglePlayback}
              disabled={!isPlayerReady}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
