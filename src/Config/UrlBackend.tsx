import axios, { type AxiosInstance } from 'axios'

const UrlBackend: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/2.0/`
})

export default UrlBackend
