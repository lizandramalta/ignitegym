import { useToast } from '@hooks/useToast'
import { api } from '@services/api'
import { AuthService } from '@services/authService'
import { AuthStorage } from '@storage/authStorage'
import { UserStorage } from '@storage/userStorage'
import { AppError } from '@utils/AppError'
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextProps = {
  user: User | null
  isLoadingUserData: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateUserPhoto: (uri: string) => void
  updateUserName: (name: string) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUserData, setIsLoadingUserData] = useState(false)
  const toast = useToast()

  function userAndTokenUpdate(user: User, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(user)
  }

  async function storageUserAndTokenSave(user: User, token: string) {
    try {
      setIsLoadingUserData(true)
      await UserStorage.save(user)
      await AuthStorage.saveToken(token)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'sign-in-toast',
          title: error.message,
          action: 'error'
        })
      }
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn({ email, password })
      await storageUserAndTokenSave(response.user, response.token)
      userAndTokenUpdate(response.user, response.token)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'sign-in-toast',
          title: error.message,
          action: 'error'
        })
      }
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(false)
      setUser(null)
      await UserStorage.remove()
      await AuthStorage.removeToken()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingUserData(false)
    }
  }

  function updateUserPhoto(uri: string) {
    if (user) {
      const updatedUser = { ...user, avatar: uri }
      setUser(updatedUser)
      UserStorage.save(updatedUser)
    }
  }

  function updateUserName(name: string) {
    if (user) {
      const updatedUser = { ...user, name }
      setUser(updatedUser)
      UserStorage.save(updatedUser)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true)
      const userLogged = await UserStorage.get()
      const token = await AuthStorage.getToken()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateUserPhoto,
        updateUserName,
        user,
        isLoadingUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
