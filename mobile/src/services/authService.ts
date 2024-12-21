import { AppError } from '@utils/AppError'
import { api } from './api'

type SignInRequestDTO = {
  email: string
  password: string
}

type SignInResponseDTO = {
  user: User
  token: string
  refresh_token: string
}

async function signIn(data: SignInRequestDTO): Promise<SignInResponseDTO> {
  try {
    const { data: response } = await api.post('/sessions', data)
    return response
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível efetivar o login. Tente novamente mais tarde.'
    )
  }
}

export const AuthService = Object.freeze({
  signIn
})
