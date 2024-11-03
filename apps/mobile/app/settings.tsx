import { useState } from "react"

import { useThemeColor } from "@hooks/useThemeColor"

import { useStorage } from "@storage/useStorage"

import { borderRadius, spacing } from "@constants/styles"

import { BackIcon } from "@components/navigation"
import { List, Text, View, Button, Image } from "@components/ui"

import {
  GoogleSignin,
  isSuccessResponse,
  type User
} from "@react-native-google-signin/google-signin"

const data = Array.from({ length: 1 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Settings() {
  const { colors } = useThemeColor()

  const [user, setUser] = useState<User>()

  GoogleSignin.configure({
    webClientId: "165216942939-k05gp10c450kdmagucifc898tv13p1bb.apps.googleusercontent.com"
  })

  const { appDirectory, backupsDirectory, isLoggedIn, setIsLoggedIn, clear } = useStorage()

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setUser(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut()
      setUser(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <List
      headerProps={{
        isAnimated: true,
        hideSearch: true,
        title: "Settings",
        renderLeft: () => {
          return <BackIcon />
        }
      }}
      hasPlayer={false}
      extraData={user}
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, gap: spacing.small }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xSmall }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: borderRadius.round
              }}
              source={user?.user.photo}
            />
            <View style={{}}>
              <Text variant="bold">{user?.user.name}</Text>
              <Text style={{ color: colors.placeholder }}>{user?.user.email}</Text>
            </View>
          </View>
          <Button title="Login" onPress={() => signIn()} />
          <Button title="Logout" color="secondary" onPress={() => signOut()} />
          <Button title="Limpar Tudo" onPress={() => clear()} />
          <Text>{item.name}</Text>
          <View
            style={{
              gap: spacing.small,
              borderWidth: 2,
              borderColor: "red",
              padding: spacing.medium
            }}
          >
            <Text>AppDirectory - {appDirectory}</Text>
            <Text>BackupsDirectory - {backupsDirectory}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: spacing.small,
              borderWidth: 2,
              borderColor: "red",
              padding: spacing.medium
            }}
          >
            <View style={{ flexDirection: "row", gap: spacing.small }}>
              <Button title="Definir" onPress={() => setIsLoggedIn(!isLoggedIn)} />
              <Button title="Limpar" onPress={() => setIsLoggedIn(false)} />
            </View>
            <Text>Logged In: {isLoggedIn ? "Yes" : "No"}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={60}
    />
  )
}
