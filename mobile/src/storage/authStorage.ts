import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { TOKEN_STORAGE } from './storage.config'

async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, token)
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function getToken(): Promise<string> {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE)

    return token ?? ''
  } catch (error) {
    console.log(error)
    throw new AppError('Ocorreu um erro. Tente novamente mais tarde.')
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  } catch (error) {
    console.log(error)
  }
}

export const AuthStorage = Object.freeze({
  saveToken,
  getToken,
  removeToken
})
