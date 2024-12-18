import { createContext, ReactNode, useState } from 'react'

type AuthContextProps = {
  user: User | null
  signIn: (email: string, password: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function signIn(email: string, password: string) {
    setUser({ email, name: 'Teste', avatar: 'Teste' })
  }

  function signOut() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}
