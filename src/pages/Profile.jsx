import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import ProfileForm from './ProfileForm'
import PasswordChangeForm from './PasswordChangeForm'
import ProfileEdit from './ProfileEdit'
import {
	User,
	Crown,
	CheckCircle,
	AlertCircle,
	ArrowRight,
	Settings,
	CreditCard,
	FileText,
	Download,
} from 'lucide-react'
import { useLocation, Link } from 'react-router'

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false)
	const { user, setUser, updateUserProfile, passwordChange } = useAuthContext()
	const [profilePreview, setProfilePreview] = useState(null)
	const [objectUrl, setObjectUrl] = useState(null)

	const getCloudinaryUrl = (imagePath) => {
		if (!imagePath) return null
		if (imagePath.startsWith('http')) return imagePath // Already complete URL
		if (imagePath.length < 10 || !imagePath.includes('/')) return null
		return `https://res.cloudinary.com/dwhkvm4zp/${imagePath}`
	}

	const location = useLocation()

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statements, setStatements] = useState([])
	const [statementsLoading, setStatementsLoading] = useState(true)

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const status = urlParams.get('status')
		if (status === 'success') {
			setSuccessMessage('🎉 Congratulations! Your subscription is activated.')
			setTimeout(() => setSuccessMessage(''), 5000)
		}
		if (status === 'failed') {
			setErrorMessage('❌ Payment failed. Please try again.')
			setTimeout(() => setErrorMessage(''), 5000)
		}
	}, [location.search])

	useEffect(() => {
		fetchRecentStatements()
	}, [])

	const fetchRecentStatements = async () => {
		try {
			// Mock data for now since backend endpoint doesn't exist
			setStatements([])
		} catch (error) {
			console.error('Error fetching statements:', error)
			setStatements([])
		} finally {
			setStatementsLoading(false)
		}
	}

	useEffect(() => {
		if (user && typeof user === 'object') {
			Object.keys(user).forEach((key) => setValue(key, user[key]))

			setProfilePreview(getCloudinaryUrl(user.profile_image))
		}
	}, [user, setValue])

	// Cleanup object URL on unmount
	useEffect(() => {
		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl)
			}
		}
	}, [objectUrl])

	const handleProfileChange = useCallback(
		(e) => {
			const file = e.target.files[0]
			if (file) {
				// Revoke previous object URL to prevent memory leaks
				if (objectUrl) {
					URL.revokeObjectURL(objectUrl)
				}
				const newObjectUrl = URL.createObjectURL(file)
				setObjectUrl(newObjectUrl)
				setProfilePreview(newObjectUrl)
			}
		},
		[objectUrl],
	)

	const onSubmit = async (data) => {
		try {
			const formData = new FormData()
			formData.append('first_name', data.first_name)
			formData.append('last_name', data.last_name)
			formData.append('address', data.address || '')
			formData.append('phone_number', data.phone_number || '')
			formData.append('email', data.email)
			formData.append('email', data.email)

			// Only append profile_image if a new file is selected
			if (data.profile_image?.[0]) {
				formData.append('profile_image', data.profile_image[0])
			}

			const updatedUser = await updateUserProfile(formData)

			if (updatedUser.success && updatedUser.data) {
				setUser(updatedUser.data)
				setProfilePreview(getCloudinaryUrl(updatedUser.data.profile_image))
			}

			setSuccessMessage('Profile updated successfully!')
			setTimeout(() => {
				setSuccessMessage('')
				setIsEditing(false)
			}, 1500)

			if (data.current_password && data.new_password) {
				try {
					await passwordChange({
						current_password: data.current_password,
						new_password: data.new_password,
					})
					setSuccessMessage('Profile and password updated successfully!')
				} catch (passwordError) {
					console.error('Password change failed:', passwordError)
					setSuccessMessage(
						'Profile updated, but password change failed. Please try again.',
					)
				}
			}
		} catch (error) {
			console.error('Profile update failed:', error)
			setErrorMessage('Profile update failed. Please try again.')
			setTimeout(() => setErrorMessage(''), 3000)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
			<div className="container mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
					<p className="text-gray-600">
						Manage your account information and preferences
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{/* Profile Card */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
							{/* Success Message */}
							{successMessage && (
								<div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
									<CheckCircle className="h-5 w-5 text-green-600" />
									<p className="text-green-700 font-medium">
										{successMessage}
									</p>
								</div>
							)}

							{/* Error Message */}
							{errorMessage && (
								<div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
									<AlertCircle className="h-5 w-5 text-red-600" />
									<p className="text-red-700 font-medium">{errorMessage}</p>
								</div>
							)}

							<div className="flex items-center space-x-3 mb-8">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
									<User className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Profile Information
									</h2>
									<p className="text-gray-600">
										Update your personal details and preferences
									</p>
								</div>
							</div>

							<form onSubmit={handleSubmit(onSubmit)}>
								<ProfileForm
									register={register}
									errors={errors}
									isEditing={isEditing}
									profilePreview={profilePreview}
									handleProfileChange={handleProfileChange}
								/>

								<PasswordChangeForm
									errors={errors}
									register={register}
									isEditing={isEditing}
									watch={watch}
								/>
								<ProfileEdit
									isEditing={isEditing}
									setIsEditing={setIsEditing}
									isSubmitting={isSubmitting}
								/>
							</form>
						</div>
					</div>

					{/* Subscription Card */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
									<Crown className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900">
										Subscription
									</h3>
									<p className="text-gray-600 text-sm">Current plan status</p>
								</div>
							</div>

							<div className="space-y-4">
								<div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-gray-700">
											Current Plan
										</span>
										<span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full">
											{user?.usersubscription?.plan?.name_display || user?.usersubscription?.plan?.name || 'Free Plan'}
										</span>
									</div>
									{user?.usersubscription && (
										<div className="text-xs text-gray-600">
											<p>
												Remaining uploads:{' '}
												{user.usersubscription.remaining_uploads || 'N/A'}
											</p>
											<p>
												Valid until:{' '}
												{new Date(
													user.usersubscription.end_date,
												).toLocaleDateString()}
											</p>
										</div>
									)}
								</div>

								<div className="bg-gray-50 p-4 rounded-lg">
									<h4 className="font-semibold text-gray-900 mb-2">
										Account Status
									</h4>
									<div className="flex items-center space-x-2">
										<CheckCircle
											className={`h-4 w-4 ${
												user?.usersubscription
													? 'text-green-600'
													: 'text-gray-400'
											}`}
										/>
										<span className="text-sm text-gray-600">
											{user?.usersubscription
												? 'Subscription Active'
												: 'No Active Subscription'}
										</span>
									</div>
								</div>

								<div className="pt-4 border-t border-gray-200">
									{!user?.usersubscription ? (
										<div className="text-center">
											<p className="text-xs text-gray-500 mb-3">
												Upgrade to unlock premium features!
											</p>
											<Link
												to="/pricing"
												className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
											>
												<span>Upgrade Now</span>
												<ArrowRight className="h-4 w-4" />
											</Link>
										</div>
									) : (
										<div className="space-y-3">
											<p className="text-xs text-gray-500 text-center mb-3">
												Manage your subscription
											</p>
											<div className="flex flex-col space-y-2">
												<Link
													to="/pricing"
													className="inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
												>
													<Settings className="h-3 w-3" />
													<span>Change Plan</span>
												</Link>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Recent Statements Card */}
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mt-6">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center space-x-3">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
										<FileText className="h-6 w-6 text-white" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900">Recent Statements</h3>
										<p className="text-gray-600 text-sm">Your latest processed statements</p>
									</div>
								</div>
								<Link
									to="/dashboard/statements"
									className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
								>
									<span>View All</span>
									<ArrowRight className="h-4 w-4" />
								</Link>
							</div>

							{statementsLoading ? (
								<div className="space-y-3">
									{[1, 2, 3].map((i) => (
										<div key={i} className="animate-pulse flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
											<div className="h-8 w-8 bg-gray-200 rounded"></div>
											<div className="flex-1">
												<div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
												<div className="h-3 bg-gray-200 rounded w-1/2"></div>
											</div>
										</div>
									))}
								</div>
							) : statements.length === 0 ? (
								<div className="text-center py-8">
									<FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
									<p className="text-gray-500 text-sm">No statements uploaded yet</p>
									<p className="text-gray-400 text-xs mt-1">Upload your first bank statement to get started</p>
								</div>
							) : (
								<div className="space-y-3">
									{statements.map((statement) => (
										<div key={statement.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
											<div className="flex items-center space-x-3">
												<FileText className="h-8 w-8 text-blue-600" />
												<div>
													<p className="text-sm font-medium text-gray-900">{statement.filename}</p>
													<p className="text-xs text-gray-500">
														{statement.uploadDate} • {statement.transactionCount} transactions
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<span className={`px-2 py-1 text-xs font-medium rounded-full ${
													statement.status === 'completed' 
														? 'bg-green-100 text-green-800' 
														: 'bg-yellow-100 text-yellow-800'
												}`}>
													{statement.status}
												</span>
												<button className="p-1 text-gray-400 hover:text-blue-600 rounded">
													<Download className="h-4 w-4" />
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
