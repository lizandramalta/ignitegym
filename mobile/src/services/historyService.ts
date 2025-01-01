import { AppError } from '@utils/AppError'
import { api } from './api'

async function registerExerciseHistory(exercise_id: string) {
  try {
    await api.post('/history', { exercise_id })
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível registrar o exercício. Tente novamente mais tarde.'
    )
  }
}
export const HistoryService = Object.freeze({
  registerExerciseHistory
})
