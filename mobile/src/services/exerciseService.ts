import { AppError } from '@utils/AppError'
import { api } from './api'

async function getExerciseByGroup(group: string): Promise<Exercise[]> {
  try {
    const { data } = await api.get(`/exercises/bygroup/${group}`)
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível carregar os exercícios. Tente novamente mais tarde.'
    )
  }
}

export const ExerciseService = Object.freeze({
  getExerciseByGroup
})
