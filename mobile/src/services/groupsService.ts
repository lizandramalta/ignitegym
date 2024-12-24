import { AppError } from '@utils/AppError'
import { api } from './api'

async function getGroups(): Promise<string[]> {
  try {
    const { data } = await api.get('/groups')
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível carregar as categorias. Tente novamente mais tarde.'
    )
  }
}

export const GroupsService = Object.freeze({
  getGroups
})
