import { useToast } from '@hooks/useToast'
import { AuthService } from '@services/authService'
import { UserStorage } from '@storage/userStorage'
import { AppError } from '@utils/AppError'
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextProps = {
  user: User | null
  isLoadingUserData: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateUserPhoto: (uri: string) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUserData, setIsLoadingUserData] = useState(false)
  const toast = useToast()

  async function signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn({ email, password })
      setUser(response.user)
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
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true)
      const userLogged = await UserStorage.get()

      if (userLogged) {
        setUser(userLogged)
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
      value={{ signIn, signOut, updateUserPhoto, user, isLoadingUserData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
