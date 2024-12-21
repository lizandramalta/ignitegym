import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_API_PORT}`,
  timeout: 6000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    }
    return Promise.reject(
      new AppError('Erro no servidor. Tente novamente mais tarde.')
    )
  }
)

export { api }
