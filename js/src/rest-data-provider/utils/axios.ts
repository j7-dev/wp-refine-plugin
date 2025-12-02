import { HttpError } from '@refinedev/core'
import axios, { AxiosInstance } from 'axios'
import { API_URL, NONCE } from '@/utils'


const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_URL,
	timeout: 30,
	headers: {
		'X-WP-Nonce': NONCE,
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
