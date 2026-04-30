import * as SecureStore from 'expo-secure-store'
import { TokenCache } from '@clerk/clerk-expo/token-cache'

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        return await SecureStore.getItemAsync(key)
      } catch {
        return null
      }
    },
    saveToken: async (key: string, token: string) => {
      return await SecureStore.setItemAsync(key, token)
    },
    clearToken: async (key: string) => {
      return await SecureStore.deleteItemAsync(key)
    },
  }
}

export const tokenCache = createTokenCache()
