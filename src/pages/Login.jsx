import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { setMeta } from '../utils/setMeta'

const Login = () => {
	useEffect(() => {
		setMeta({
			title: 'Login to SheetlyPro - Access Your Account',
			description: 'Sign in to your SheetlyPro account to access premium PDF to Excel conversion features. Secure login for bank statement processing.',
			keywords: 'login sheetlypro, sign in, user account, PDF converter login, bank statement converter access',
			ogTitle: 'Login to SheetlyPro Account',
			ogDescription: 'Access your SheetlyPro account to convert PDF bank statements to Excel format with premium features.',
		})
	}, [])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const { loginUser } = useAuthContext()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const onSubmit = async (data) => {
		setLoading(true)
		setError('')
		setSuccess('')
		try {
			await loginUser(data)
			setSuccess('Login successful! Welcome back.')
			navigate('/')
		} catch (error) {
			setError(
				error.response?.data?.detail ||
					error.message ||
					'Login failed. Please try again.',
			)
		} finally {
			setLoading(false)
		}
	}

	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-6 py-12">
			
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
					<p className="text-gray-600">Sign in to your SheetlyPro account</p>
				</div>

				{/* Login Card */}
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

						{/* Password Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
										errors.password
											? 'border-red-300 bg-red-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
									{...register('password', {
										required: 'Password is required',
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
							{errors.password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
							<div className="text-right mt-2">
								<Link
									to="/forgot-password"
									className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
								>
									Forgot Password?
								</Link>
							</div>
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
									<span>Signing In...</span>
								</>
							) : (
								<span>Sign In</span>
							)}
						</button>
					</form>

					{/* Footer Links */}
					<div className="text-center mt-6 pt-6 border-t border-gray-200 space-y-3">
						<p className="text-gray-600">
							Don't have an account?{' '}
							<Link
								to="/register"
								className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
							>
								Create Account
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
