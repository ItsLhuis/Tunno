declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_GOOGLE_CLIENT_ID: string
    }
  }
}

interface ExpoExtra {
  EXPO_PUBLIC_GOOGLE_CLIENT_ID: string
}

declare module "expo-constants" {
  export interface Constants {
    expoConfig: {
      extra: ExpoExtra
    }
  }
}

export {}
