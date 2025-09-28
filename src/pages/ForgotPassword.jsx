import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import axios from 'axios'

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const onSubmit = async (data) => {
		setLoading(true)
		setError('')
		setSuccess('')
		try {
			await axios.post('https://bank-statement-converter-backend-ofyc.onrender.com/api/auth/users/reset_password/', {
				email: data.email
			})
			setSuccess('Password reset email sent! Check your inbox for instructions.')
		} catch (error) {
			setError(
				error.response?.data?.email?.[0] ||
				error.response?.data?.detail ||
				'Failed to send reset email. Please try again.'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-6 py-12">
			<title>Forgot Password</title>
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
					<p className="text-gray-600">Enter your email to reset your password</p>
				</div>

				{/* Reset Card */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
					{/* Success/Error Messages */}
					{success && (
						<div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<p className="text-green-700 font-medium">{success}</p>
						</div>
					)}
					{error && (
						<div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
							<AlertCircle className="h-5 w-5 text-red-600" />
							<p className="text-red-700 font-medium">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Email Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									type="email"
									placeholder="Enter your email address"
									className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
										errors.email
											? 'border-red-300 bg-red-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
									{...register('email', { required: 'Email is required' })}
								/>
							</div>
							{errors.email && (
								<p className="text-red-600 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									<span>Sending...</span>
								</>
							) : (
								<span>Send Reset Email</span>
							)}
						</button>
					</form>

					{/* Back to Login */}
					<div className="text-center mt-6 pt-6 border-t border-gray-200">
						<Link
							to="/login"
							className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
						>
							<ArrowLeft className="h-4 w-4" />
							<span>Back to Login</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword