import { HttpError } from '@refinedev/core'
import axios, { AxiosInstance } from 'axios'
import { apiUrl, apiTimeout } from '@/utils'

const wpApiSettings = window?.wpApiSettings || {}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: parseInt(apiTimeout, 10),
  headers: {
    'X-WP-Nonce': wpApiSettings?.nonce || '',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    }

    return Promise.reject(customError)
  },
)

export { axiosInstance }
