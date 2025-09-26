import React, { useEffect, useState } from 'react'
import ApiClient from '../services/api-client'
import AuthApiClient from '../services/auth-api-client'

function useAuth() {
	const [user, setUser] = useState(null)
	const [errMsg, setErrMsg] = useState('')

	const fetchUserProfile = async () => {
		try {
			const res = await ApiClient.get('auth/users/me', {
				headers: { Authorization: `JWT ${authToken?.access}` },
			})
			setUser(res.data)
		} catch (error) {
			console.log('Fetch user data', error)
		}
	}

	const getToken = () => {
		const token = localStorage.getItem('authTokens')
		return token ? JSON.parse(token) : null
	}

	const [authToken, setAuthToken] = useState(getToken())

	useEffect(() => {
		if (authToken) fetchUserProfile()
	}, [authToken])

	const handleAPIError = (error, defaultMessage = 'Somethings went wrong!') => {
		if (error.response && error.response.data) {
			const errormsg = Object.values(error.response.data).flat().join('\n')
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
					Authorization: `JWT ${authToken?.access}`,
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
			await ApiClient.post('/auth/users/set_password/', data, {
				headers: {
					Authorization: `JWT ${authToken?.access}`,
				},
			})
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

	// login user
	const loginUser = async (userData) => {
		try {
			const response = await ApiClient.post('/auth/jwt/create/', userData)
			setAuthToken(response.data)
			localStorage.setItem('authTokens', JSON.stringify(response.data))

			await fetchUserProfile()
		} catch (error) {
			setErrMsg(error.response.data?.detail)
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

	const logoutUser = () => {
		setAuthToken(null)
		setUser(null)
		localStorage.removeItem('authTokens')
		localStorage.removeItem('cartId')
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
	}
}

export default useAuth
