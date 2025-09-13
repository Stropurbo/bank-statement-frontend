import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const ProfileForm = ({ register, errors, isEditing }) => {
	return (
		<div className="space-y-4">

			{/* <div className="form-control flex flex-col items-center">

				<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
					{profilePreview ? (
						<img
							src={profilePreview}
							alt="Profile Preview"
							className="w-full h-full object-cover"
						/>
					) : (
						// {profilePreview}
						<FaUserCircle className="text-6xl text-gray-400" />
					)}
				</div>

				{isEditing && (
					<label className="mt-2 cursor-pointer text-blue-500 hover:underline">
						Upload Profile
						<input
							type="file"
							accept="image/*"
							className="hidden"
							{...register('profile_image', {
								onChange: (e) => {
									handleProfileChange(e) // local preview
								},
							})}
						/>
					</label>
				)}
			</div> */}

			<div className="form-control w-full">
				<label className="label">First Name</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full"
					disabled={!isEditing}
					{...register('first_name', { required: 'First name is required' })}
				/>
				{errors.first_name && (
					<p className="text-red-500">{errors.first_name.message}</p>
				)}
			</div>

			<div className="form-control w-full">
				<label className="label">Last Name</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full"
					disabled={!isEditing}
					{...register('last_name')}
				/>
			</div>

			<div className="form-control w-full">
				<label className="label">Email Address</label>
				<input
					type="email"
					className="input input-bordered bg-base-200 w-full"
					disabled
					{...register('email')}
				/>
			</div>

			<div className="form-control w-full">
				<label className="label">Address</label>
				<input
					type="text"
					className="input input-bordered bg-base-200 w-full"
					disabled={!isEditing}
					{...register('address')}
				/>
			</div>

			<div className="form-control w-full">
				<label className="label">Phone Number</label>
				<input
					type="number"
					className="input input-bordered bg-base-200 w-full"
					disabled={!isEditing}
					{...register('phone_number')}
				/>
			</div>
		</div>
	)
}

export default ProfileForm
