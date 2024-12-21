import { AppError } from '@utils/AppError'
import { api } from './api'

type CreateUserDTO = {
  name: string
  email: string
  password: string
}

async function createUser(data: CreateUserDTO) {
  try {
    await api.post('/users', data)
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível criar uma conta. Tente novamente mais tarde.'
    )
  }
}

export const UserService = Object.freeze({
  createUser
})
