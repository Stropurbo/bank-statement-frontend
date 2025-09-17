import axios from 'axios'
import React from 'react'

const AuthApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api/',
})

AuthApiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authTokens')
		if (token) {
			config.headers.Authorization = `JWT ${JSON.parse(token).access}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

export default AuthApiClient
