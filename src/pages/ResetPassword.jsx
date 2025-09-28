import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import ApiClient from '../services/api-client'

const ResetPassword = () => {
	const { uid, token } = useParams() // <-- directly get from route
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit = async (data) => {
		if (!uid || !token) {
			setError('Invalid password reset link.')
			return
		}

		setLoading(true)
		setError('')
		setSuccess('')

		try {
			await ApiClient.post('auth/users/reset_password_confirm/', {
				uid,
				token,
				new_password: data.new_password,
			})
			setSuccess('Password reset successful! Redirecting to login...')
			setTimeout(() => navigate('/login'), 2000)
		} catch (err) {
			setError(
				err.response?.data?.new_password?.[0] ||
					err.response?.data?.token?.[0] ||
					err.response?.data?.uid?.[0] ||
					'Failed to reset password. Please try again.',
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-6 py-12">
			<title>Reset Password</title>
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Reset Password</h1>
					<p className="text-gray-600">Enter your new password</p>
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

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* New Password Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								New Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="new_password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your new password"
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
										errors.new_password
											? 'border-red-300 bg-red-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
									{...register('new_password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
									})}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
							{errors.new_password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.new_password.message}
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
									<span>Resetting...</span>
								</>
							) : (
								<span>Reset Password</span>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword
