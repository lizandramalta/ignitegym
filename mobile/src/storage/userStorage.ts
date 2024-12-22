import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE } from './storage.config'

async function save(user: User) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

async function get(): Promise<User> {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: User = storage ? JSON.parse(storage) : {}
  return user
}

async function remove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}

export const UserStorage = Object.freeze({
  save,
  get,
  remove
})
