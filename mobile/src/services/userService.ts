import { AppError } from '@utils/AppError'
import { api } from './api'

type CreateUserRequestDTO = {
  name: string
  email: string
  password: string
}

type UpdateUserRequestDTO = {
  name: string
  password?: string | null
  old_password?: string | null
}

async function createUser(data: CreateUserRequestDTO) {
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

async function updateUser(data: UpdateUserRequestDTO) {
  try {
    await api.put('/users', data)
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi atualizar os dados do usuário. Tente novamente mais tarde.'
    )
  }
}

export const UserService = Object.freeze({
  createUser,
  updateUser
})
