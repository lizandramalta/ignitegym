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

  function signIn(email: string, password: string) {
    setUser({ id: '', email, name: 'Teste', avatar: '' })
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
