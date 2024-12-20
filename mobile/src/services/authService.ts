import { AxiosError } from 'axios'
import { api } from './api'
import { AppError } from '@utils/AppError'

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
    const { data: response } = await api.post('/sessions', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new AppError(error.response?.data.message)
    }
    throw new AppError(
      'Não foi possível efetivar o login. Tente novamente mais tarde.'
    )
  }
}

export const AuthService = Object.freeze({
  signIn
})
