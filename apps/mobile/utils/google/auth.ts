import { useAppStore } from "@stores/app"

import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin"

export const signIn = async (): Promise<void> => {
  const { setUser } = useAppStore.getState()

  await GoogleSignin.hasPlayServices()

  const response = await GoogleSignin.signIn()
  if (isSuccessResponse(response)) {
    setUser(response.data)
  }
}

export const signInSilently = async (): Promise<void> => {
  const { user, setUser } = useAppStore.getState()

  if (!user) return

  await GoogleSignin.signInSilently().then((response) => setUser(response.data))
}

export const signOut = async (): Promise<void> => {
  const { setUser } = useAppStore.getState()

  await GoogleSignin.signOut().then(() => setUser(undefined))
}
