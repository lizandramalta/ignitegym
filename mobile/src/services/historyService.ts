import { AppError } from '@utils/AppError'
import { api } from './api'

export type HistoryResponseDTO = {
  title: string
  data: {
    id: string
    group: string
    name: string
    hour: string
  }[]
}[]

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

async function getHistory(): Promise<HistoryResponseDTO> {
  try {
    const { data } = await api.get('/history')
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError(
      'Não foi possível listar o histórico. Tente novamente mais tarde.'
    )
  }
}

export const HistoryService = Object.freeze({
  registerExerciseHistory,
  getHistory
})
