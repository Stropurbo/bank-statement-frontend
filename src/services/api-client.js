import axios from 'axios'
import React from 'react'

const ApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api',
})
export default ApiClient
