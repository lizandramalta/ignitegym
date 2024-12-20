import { useToast } from '@hooks/useToast'
import { AuthService } from '@services/authService'
import { AppError } from '@utils/AppError'
import { createContext, ReactNode, useState } from 'react'

type AuthContextProps = {
  user: User | null
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateUserPhoto: (uri: string) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
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

  function signOut() {
    setUser(null)
  }

  function updateUserPhoto(uri: string) {
    if (user) {
      const updatedUser = { ...user, avatar: uri }
      setUser(updatedUser)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, updateUserPhoto, user }}>
      {children}
    </AuthContext.Provider>
  )
}
