import axios from 'axios'

const AuthApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api/',
	withCredentials: true, // Enable sending cookies with requests
	headers: {
		'Content-Type': 'application/json',
	}
})

// Public routes that don't require authentication
const publicPaths = [
	'/',
	'/pricing',
	'/contact',
	'/login',
	'/register',
	'/forgot-password',
	'/terms-of-service',
	'/privacy-policy',
	'/about',
	'/payment/success',
	'/payment/cancel',
	'/payment/fail',
	'/affiliate',
]

// Check if current path is public
const isPublicPath = () => {
	const currentPath = window.location.pathname
	return publicPaths.some(path => currentPath === path || currentPath.startsWith('/auth/activate/'))
}

// Response interceptor for automatic token refresh
AuthApiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		// Prevent infinite loops - don't retry auth endpoints
		const isAuthEndpoint = originalRequest.url?.includes('/auth/')

		// If 401 and not already retried, try to refresh token
		if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
			originalRequest._retry = true

			try {
				// Try to refresh the token
				await axios.post(
					'https://bank-statement-converter-backend-ofyc.onrender.com/api/auth/cookie/refresh/',
					{},
					{ withCredentials: true }
				)

				// Retry original request
				return AuthApiClient(originalRequest)
			} catch (refreshError) {
				// Refresh failed, only redirect if:
				// 1. Not already on login page
				// 2. Not on a public page
				if (!window.location.pathname.includes('/login') && !isPublicPath()) {
					window.location.href = '/login'
				}
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default AuthApiClient
