import React, { useState } from 'react'
import { Lock, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react'

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
	const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false)
	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	return (
		<div className="mt-8 pt-8 border-t border-gray-200">
			<button
				type="button"
				className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
				onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
			>
				{isPasswordSectionOpen ? (
					<ChevronDown className="h-4 w-4" />
				) : (
					<ChevronRight className="h-4 w-4" />
				)}
				<Lock className="h-4 w-4" />
				<span>Change Password</span>
			</button>

			{isPasswordSectionOpen && (
				<div className="mt-6 space-y-6 pl-6 border-l-2 border-purple-100">
					{/* Current Password */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Current Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showCurrentPassword ? 'text' : 'password'}
								placeholder="Enter current password"
								className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
									!isEditing 
										? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
										: errors.current_password 
											? 'border-red-300 bg-red-50' 
											: 'border-gray-300 hover:border-gray-400'
								}`}
								disabled={!isEditing}
								{...register('current_password', {
									required: 'Current password is required',
								})}
							/>
							{isEditing && (
								<button
									type="button"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							)}
						</div>
						{errors.current_password && (
							<p className="text-red-600 text-sm mt-1">{errors.current_password.message}</p>
						)}
					</div>

					{/* New Password */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							New Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showNewPassword ? 'text' : 'password'}
								placeholder="Enter new password"
								className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
									!isEditing 
										? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
										: errors.new_password 
											? 'border-red-300 bg-red-50' 
											: 'border-gray-300 hover:border-gray-400'
								}`}
								disabled={!isEditing}
								{...register('new_password', {
									required: 'New password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
								})}
							/>
							{isEditing && (
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							)}
						</div>
						{errors.new_password && (
							<p className="text-red-600 text-sm mt-1">{errors.new_password.message}</p>
						)}
					</div>

					{/* Confirm New Password */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Confirm New Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Confirm new password"
								className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
									!isEditing 
										? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
										: errors.confirm_new_password 
											? 'border-red-300 bg-red-50' 
											: 'border-gray-300 hover:border-gray-400'
								}`}
								disabled={!isEditing}
								{...register('confirm_new_password', {
									validate: (value) =>
										value === watch('new_password') ||
										'Passwords do not match',
								})}
							/>
							{isEditing && (
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
								>
									{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							)}
						</div>
						{errors.confirm_new_password && (
							<p className="text-red-600 text-sm mt-1">{errors.confirm_new_password.message}</p>
						)}
					</div>

					{/* Password Requirements */}
					{isEditing && (
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<h4 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</h4>
							<ul className="text-xs text-blue-700 space-y-1">
								<li>• At least 8 characters long</li>
								<li>• Mix of uppercase and lowercase letters recommended</li>
								<li>• Include numbers and special characters for better security</li>
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default PasswordChangeForm