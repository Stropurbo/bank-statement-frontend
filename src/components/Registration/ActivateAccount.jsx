import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ApiClient from '../../services/api-client'

function ActivateAccount() {
	const { uid, token } = useParams()
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		ApiClient.post('/auth/users/activation/', { uid, token })
			.then((res) => {
				setMessage('Account Activate Successfull')
				console.log(res)
				setTimeout(() => navigate('/login'), 2000)
			})
			.catch((error) => {
				console.log(error)
				setError(error.response?.data?.detail || 'Something went wrong')
			})
	}, [uid, token, navigate])

	return (
		<div className="p-6 text-center">
			{message && (
				<div className="w-full p-4 mb-4 bg-green-500 text-white rounded flex justify-between items-center">
					<span>{message}</span>
					<button
						onClick={() => setMessage('')}
						className="font-bold"
					>
						×
					</button>
				</div>
			)}

			{error && (
				<div className="w-full p-4 mb-4 bg-red-500 text-white rounded flex justify-between items-center">
					<span>{error}</span>
					<button
						onClick={() => setError('')}
						className="font-bold"
					>
						×
					</button>
				</div>
			)}

			{!message && !error && <p>Activating your account...</p>}
		</div>
	)
}

export default ActivateAccount
