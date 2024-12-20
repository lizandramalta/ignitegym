import { AxiosError } from 'axios'
import { api } from './api'
import { AppError } from '@utils/AppError'

type CreateUserDTO = {
  name: string
  email: string
  password: string
}

async function createUser(data: CreateUserDTO) {
  try {
    await api.post('/users', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new AppError(error.response?.data.message)
    }
    throw new AppError(
      'Não foi possível criar uma conta. Tente novamente mais tarde.'
    )
  }
}

export const UserService = Object.freeze({
  createUser
})
