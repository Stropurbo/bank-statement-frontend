import React, { useEffect, useState } from 'react'
import ApiClient from '../services/api-client'
import AuthApiClient from '../services/auth-api-client'

function useAuth() {
	const [user, setUser] = useState(null)
	const [errMsg, setErrMsg] = useState('')
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	// Fetch user profile using cookie-based authentication
	const fetchUserProfile = async () => {
		try {
			setLoading(true)
			const res = await ApiClient.get('auth/users/me')
			setUser(res.data)
			setIsAuthenticated(true)
		} catch (error) {
			// Silently handle 401 - user not logged in
			setUser(null)
			setIsAuthenticated(false)
		} finally {
			setLoading(false)
		}
	}

	// Check authentication on mount - only once
	useEffect(() => {
		let mounted = true

		const checkAuth = async () => {
			if (mounted) {
				await fetchUserProfile()
			}
		}

		checkAuth()

		return () => {
			mounted = false
		}
	}, [])

	const handleAPIError = (error, defaultMessage = 'Something went wrong!') => {
		if (error.response && error.response.data) {
			let errormsg = ''
			
			// Handle different error response formats
			if (typeof error.response.data === 'string') {
				errormsg = error.response.data
			} else if (error.response.data.email) {
				// Email validation errors
				errormsg = Array.isArray(error.response.data.email) 
					? error.response.data.email.join(' ') 
					: error.response.data.email
			} else if (error.response.data.detail) {
				errormsg = error.response.data.detail
			} else if (error.response.data.error) {
				errormsg = error.response.data.error
			} else {
				// Flatten all error messages
				errormsg = Object.values(error.response.data).flat().join(' ')
			}
			
			setErrMsg(errormsg)
			return { success: false, message: errormsg }
		}
		setErrMsg(defaultMessage)
		return { success: false, message: defaultMessage }
	}

	// update user profile
	const updateUserProfile = async (formData) => {
		try {
			const response = await AuthApiClient.patch('/auth/users/me/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			setUser(response.data)
			return { success: true, data: response.data }
		} catch (error) {
			return handleAPIError(error)
		}
	}

	// password change
	const passwordChange = async (data) => {
		try {
			await ApiClient.post('/auth/users/set_password/', data)
		} catch (error) {
			return handleAPIError(error)
		}
	}

	// reset password
	const passwordReset = async (data) => {
		try {
			await ApiClient.post('/auth/users/reset_password/', data)
			return {
				success: true,
				message: 'Reset E-mail send successfull. Check your E-mail.',
			}
		} catch (error) {
			console.log(error)
		}
	}

	// reset password confirm
	const passwordResetConfirm = async (data) => {
		try {
			await ApiClient.post('/auth/users/reset_password_confirm/', data)
			return {
				success: true,
				message: 'Password Reset Successfull.',
			}
		} catch (error) {
			console.log(error)
		}
	}

	// resend activation email
	const ResendActivationEmail = async (data) => {
		try {
			await ApiClient.post('/auth/users/resend_activation/', data)
			return {
				success: true,
				message: 'Activation mail send again successfull.',
			}
		} catch (error) {
			console.log(error)
		}
	}

	// login user with cookie-based authentication
	const loginUser = async (userData) => {
		try {
			const response = await ApiClient.post('/auth/cookie/login/', userData)
			// No need to store tokens - they're in httpOnly cookies
			setUser(response.data.user)
			setIsAuthenticated(true)
		} catch (error) {
			setErrMsg(error.response?.data?.detail || 'Login failed')
			setIsAuthenticated(false)
			throw error
		}
	}

	// Register user
	const registerUser = async (userData) => {
		try {
			await ApiClient.post('/auth/users/', userData)
			return {
				success: true,
				message: 'Registration successfull. Check your email to activate your account.',
			}
		} catch (error) {
			return handleAPIError(error, 'Registration failed! Try Again.')
		}
	}

	const logoutUser = async () => {
		// Clear state immediately
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('cartId')

		// Call backend to clear httpOnly cookies
		try {
			await ApiClient.post('/auth/cookie/logout/')
		} catch (error) {
			console.error('Logout error:', error)
		}

		// Redirect after cookies are cleared
		window.location.href = '/'
	}

	return {
		user,
		setUser,
		loginUser,
		errMsg,
		registerUser,
		logoutUser,
		updateUserProfile,
		passwordChange,
		passwordReset,
		passwordResetConfirm,
		ResendActivationEmail,
		isAuthenticated,
		loading,
	}
}

export default useAuth
