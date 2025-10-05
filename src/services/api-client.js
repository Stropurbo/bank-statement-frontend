import axios from 'axios'

const ApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api/',
	withCredentials: true, // Enable sending cookies with requests
	headers: {
		'Content-Type': 'application/json',
	},
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
	return publicPaths.some(
		(path) => currentPath === path || currentPath.startsWith('/auth/activate/'),
	)
}

// Response interceptor to handle 401 (token expired)
ApiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		// Prevent infinite loops - check for auth endpoints
		const isAuthEndpoint = originalRequest.url?.includes('auth/')

		// If 401 and not already retried, try to refresh token
		if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
			originalRequest._retry = true

			try {
				await axios.post(
					'https://bank-statement-converter-backend-ofyc.onrender.com/api/auth/cookie/refresh/',
					{},
					{ withCredentials: true },
				)
				return ApiClient(originalRequest)
			} catch (refreshError) {
				if (!window.location.pathname.includes('/login') && !isPublicPath()) {
					const currentPath = window.location.pathname
					window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
				}
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)

export default ApiClient
