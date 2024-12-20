import axios from 'axios'

export const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3333`,
  timeout: 700
})
