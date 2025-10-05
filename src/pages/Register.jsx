import React, { useState, useEffect } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, User, Mail, MapPin, Phone, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate, Link } from 'react-router'
import { setMeta } from '../utils/setMeta'
import { GoogleLogin } from '@react-oauth/google'
import PublicApiClient from '../services/public-api-client'

function Register() {
	useEffect(() => {
		setMeta({
			title: 'Create Account - Sign Up for SheetlyPro',
			description: 'Create your free SheetlyPro account to access premium PDF to Excel conversion features. Join thousands of users converting bank statements efficiently.',
			keywords: 'create account, sign up sheetlypro, register, PDF converter registration, bank statement converter signup',
			ogTitle: 'Sign Up for SheetlyPro - Create Account',
			ogDescription: 'Join SheetlyPro today and start converting your PDF bank statements to Excel format with our premium features.',
		})
	}, [])

	const { registerUser } = useAuthContext()
	const navigate = useNavigate()

	const [successMsg, setSuccessMsg] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (data) => {
		setLoading(true)
		delete data.confirm_password
		setSuccessMsg('')
		setErrorMsg('')

		try {
			const res = await registerUser(data)
			if (res.success) {
				setSuccessMsg(res.message)
				navigate('/login')
			} else {
				setErrorMsg(res.message || 'Registration failed. Please try again.')
			}
		} catch (error) {
			setErrorMsg('Registration failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleSuccess = async (credentialResponse) => {
		setLoading(true)
		setErrorMsg('')
		setSuccessMsg('')
		try {
			const response = await PublicApiClient.post('auth/google/', {
				token: credentialResponse.credential
			})

			if (response.data && response.data.user) {
				setSuccessMsg('Account created successfully! Welcome to SheetlyPro.')
				window.location.href = '/'
			}
		} catch (error) {
			setErrorMsg(
				error.response?.data?.error ||
				error.message ||
				'Google sign up failed. Please try again.'
			)
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleError = () => {
		setErrorMsg('Google sign up failed. Please try again.')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-6 py-12">

			<div className="w-full max-w-lg">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
					<p className="text-gray-600">
						Join SheetlyPro and start converting your bank statements
					</p>
				</div>

				{/* Register Card */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
					{/* Success/Error Messages */}
					{successMsg && (
						<div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<p className="text-green-700 font-medium">{successMsg}</p>
							<button
								onClick={() => setSuccessMsg('')}
								className="ml-auto text-green-600 hover:text-green-800"
							>
								✕
							</button>
						</div>
					)}
					{errorMsg && (
						<div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
							<AlertCircle className="h-5 w-5 text-red-600" />
							<p className="text-red-700 font-medium">{errorMsg}</p>
							<button
								onClick={() => setErrorMsg('')}
								className="ml-auto text-red-600 hover:text-red-800"
							>
								✕
							</button>
						</div>
					)}

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* Name Fields */}
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									First Name
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="first_name"
										type="text"
										placeholder="Enter first name"
										className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
											errors.first_name
												? 'border-red-300 bg-red-50'
												: 'border-gray-300 hover:border-gray-400'
										}`}
										{...register('first_name', {
											required: 'First name is required',
										})}
									/>
								</div>
								{errors.first_name && (
									<p className="text-red-600 text-sm mt-1">
										{errors.first_name.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Last Name
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="last_name"
										type="text"
										placeholder="Enter last name"
										className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
											errors.last_name
												? 'border-red-300 bg-red-50'
												: 'border-gray-300 hover:border-gray-400'
										}`}
										{...register('last_name', {
											required: 'Last name is required',
										})}
									/>
								</div>
								{errors.last_name && (
									<p className="text-red-600 text-sm mt-1">
										{errors.last_name.message}
									</p>
								)}
							</div>
						</div>

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
							<p className="text-gray-500 text-xs mt-1">
								Use Gmail, Yahoo, Outlook, or other trusted providers
							</p>
						</div>

						{/* Address Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Address (Optional)
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<MapPin className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="address"
									type="text"
									placeholder="Enter your address"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
									{...register('address')}
								/>
							</div>
						</div>

						{/* Phone Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Phone Number (Optional)
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Phone className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="phone_number"
									type="text"
									placeholder="Enter your phone number"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
									{...register('phone_number')}
								/>
							</div>
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
									placeholder="Create a strong password"
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
										errors.password
											? 'border-red-300 bg-red-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
									{...register('password', {
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
							{errors.password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Confirm Password Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm your password"
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
										errors.confirm_password
											? 'border-red-300 bg-red-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
									{...register('confirm_password', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === watch('password') ||
											'Passwords do not match',
									})}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
							{errors.confirm_password && (
								<p className="text-red-600 text-sm mt-1">
									{errors.confirm_password.message}
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
									<span>Creating Account...</span>
								</>
							) : (
								<span>Create Account</span>
							)}
						</button>
					</form>

					{/* Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">Or sign up with</span>
						</div>
					</div>

					{/* Google Sign-up Button */}
					<div className="flex justify-center">
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={handleGoogleError}
							theme="outline"
							size="large"
							text="signup_with"
							shape="rectangular"
							width="100%"
						/>
					</div>

					{/* Sign In Link */}
					<div className="text-center mt-6 pt-6 border-t border-gray-200">
						<p className="text-gray-600">
							Already have an account?{' '}
							<Link
								to="/login"
								className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
