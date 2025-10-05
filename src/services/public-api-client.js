import axios from 'axios'

const PublicApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api/',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default PublicApiClient
