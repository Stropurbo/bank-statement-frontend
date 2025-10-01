import React from 'react'
import { User, Mail, MapPin, Phone, Camera } from 'lucide-react'

const ProfileForm = ({ register, errors, isEditing, profilePreview, handleProfileChange }) => {
	return (
		<div className="space-y-6">
			{/* Profile Image Section */}
			<div className="flex flex-col items-center space-y-4">
				<div className="relative">
					<div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center border-4 border-white shadow-lg">
						{profilePreview ? (
							<img
								src={profilePreview}
								alt="Profile Preview"
								className="w-full h-full object-cover"
								onError={(e) => {
									e.target.style.display = 'none'
									e.target.nextSibling.style.display = 'flex'
								}}
							/>
						) : null}
						<User className={`h-12 w-12 text-purple-400 ${profilePreview ? 'hidden' : 'flex'}`} />
					</div>
					{isEditing && (
						<div className="absolute -bottom-2 -right-2">
							<label className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
								<Camera className="h-4 w-4 text-white" />
								<input
									type="file"
									accept="image/*"
									className="hidden"
									{...register('profile_image', {
										onChange: handleProfileChange}
									)}
								/>	
							</label>
						</div>
					)}
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-gray-700">Profile Picture</p>
					{isEditing && (
						<p className="text-xs text-gray-500">Click the camera icon to upload</p>
					)}
				</div>
			</div>

			{/* Form Fields */}
			<div className="grid md:grid-cols-2 gap-6">
				{/* First Name */}
				<div>
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						First Name
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<User className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Enter first name"
							className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
								!isEditing
									? 'bg-gray-50 text-gray-500 cursor-not-allowed'
									: errors.first_name
										? 'border-red-300 bg-red-50'
										: 'border-gray-300 hover:border-gray-400'
							}`}
							disabled={!isEditing}
							{...register('first_name', { required: 'First name is required' })}
						/>
					</div>
					{errors.first_name && (
						<p className="text-red-600 text-sm mt-1">{errors.first_name.message}</p>
					)}
				</div>

				{/* Last Name */}
				<div>
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						Last Name
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<User className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Enter last name"
							className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
								!isEditing
									? 'bg-gray-50 text-gray-500 cursor-not-allowed'
									: errors.last_name
										? 'border-red-300 bg-red-50'
										: 'border-gray-300 hover:border-gray-400'
							}`}
							disabled={!isEditing}
							{...register('last_name', { required: 'Last name is required' })}
						/>
					</div>
					{errors.last_name && (
						<p className="text-red-600 text-sm mt-1">{errors.last_name.message}</p>
					)}
				</div>
			</div>

			{/* Email Address */}
			<div>
				<label className="block text-sm font-semibold text-gray-700 mb-2">
					Email Address
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Mail className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="email"
						placeholder="Email address"
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none"
						disabled
						{...register('email')}
					/>
				</div>
				<p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
			</div>

			{/* Address */}
			<div>
				<label className="block text-sm font-semibold text-gray-700 mb-2">
					Address
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<MapPin className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Enter your address"
						className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
							!isEditing
								? 'bg-gray-50 text-gray-500 cursor-not-allowed'
								: errors.address
									? 'border-red-300 bg-red-50'
									: 'border-gray-300 hover:border-gray-400'
						}`}
						disabled={!isEditing}
						{...register('address')}
					/>
				</div>
				{errors.address && (
					<p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
				)}
			</div>

			{/* Phone Number */}
			<div>
				<label className="block text-sm font-semibold text-gray-700 mb-2">
					Phone Number
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Phone className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="tel"
						placeholder="Enter your phone number"
						className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
							!isEditing
								? 'bg-gray-50 text-gray-500 cursor-not-allowed'
								: errors.phone_number
									? 'border-red-300 bg-red-50'
									: 'border-gray-300 hover:border-gray-400'
						}`}
						disabled={!isEditing}
						{...register('phone_number')}
					/>
				</div>
				{errors.phone_number && (
					<p className="text-red-600 text-sm mt-1">{errors.phone_number.message}</p>
				)}
			</div>
		</div>
	)
}

export default ProfileForm
