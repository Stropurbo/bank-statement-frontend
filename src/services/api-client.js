import axios from 'axios'

const ApiClient = axios.create({
	baseURL: 'https://bank-statement-converter-backend-ofyc.onrender.com/api/',
})
export default ApiClient
