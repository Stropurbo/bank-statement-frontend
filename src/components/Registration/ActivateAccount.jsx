import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import ApiClient from '../../services/api-client'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

function ActivateAccount() {
	const { uid, token } = useParams()
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const activateAccount = async () => {
			try {
				await ApiClient.post('/auth/users/activation/', { uid, token })
				setMessage('Account activated successfully! Redirecting to login...')
				setTimeout(() => navigate('/login'), 3000)
			} catch (error) {
				console.error('Activation error:', error)
				setError(error.response?.data?.detail || 'Account activation failed. Please try again.')
			} finally {
				setLoading(false)
			}
		}

		activateAccount()
	}, [uid, token, navigate])

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-6">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
					{loading && (
						<div className="flex flex-col items-center space-y-4">
							<Loader className="h-12 w-12 text-purple-600 animate-spin" />
							<h2 className="text-2xl font-bold text-gray-900">Activating Account</h2>
							<p className="text-gray-600">Please wait while we activate your account...</p>
						</div>
					)}

					{message && (
						<div className="flex flex-col items-center space-y-4">
							<CheckCircle className="h-16 w-16 text-green-600" />
							<h2 className="text-2xl font-bold text-gray-900">Success!</h2>
							<p className="text-green-700 font-medium">{message}</p>
							<Link
								to="/login"
								className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
							>
								Go to Login
							</Link>
						</div>
					)}

					{error && (
						<div className="flex flex-col items-center space-y-4">
							<AlertCircle className="h-16 w-16 text-red-600" />
							<h2 className="text-2xl font-bold text-gray-900">Activation Failed</h2>
							<p className="text-red-700 font-medium">{error}</p>
							<div className="flex space-x-4">
								<Link
									to="/register"
									className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
								>
									Register Again
								</Link>
								<Link
									to="/login"
									className="border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200"
								>
									Try Login
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ActivateAccount
