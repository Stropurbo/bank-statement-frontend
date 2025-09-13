import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import ProfileForm from './ProfileForm'
import PasswordChangeForm from './PasswordChangeForm'
import ProfileEdit from './ProfileEdit'
import { GiDiamondRing } from 'react-icons/gi' // premium/golden circular icon
import { Verified } from 'lucide-react'

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false)
	const { user, setUser, updateUserProfile, passwordChange } = useAuthContext()
	const [profilePreview, setProfilePreview] = useState(null)

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()
	const [errSuccess, setSuccess] = useState('')

	useEffect(() => {
		if (user && typeof user === 'object') {
			Object.keys(user).forEach((key) => setValue(key, user[key]))
			if (user.profile_image) {
				setProfilePreview(user.profile_image)
			} else {
				setProfilePreview(null)
			}
		}
	}, [user, setValue])

	const onSubmit = async (data) => {
		try {
			const formData = new FormData()
			formData.append('first_name', data.first_name)
			formData.append('last_name', data.last_name)
			formData.append('address', data.address)
			formData.append('phone_number', data.phone_number)
			formData.append('email', data.email)

			if (data.profile_image?.[0]) {
				formData.append('profile_image', data.profile_image[0])
			}

			const updatedUser = await updateUserProfile(formData)

			if (updatedUser.profile_image) {
				setProfilePreview(updatedUser.profile_image)
			}
			if (updatedUser.success && updatedUser.data) {
				setUser(updatedUser.data)
				setProfilePreview(updatedUser.data.profile_image)
			}

			setSuccess('Profile updated successfully!')
			setTimeout(() => {
				setSuccess('')
				setIsEditing(false)
			}, 1500)

			if (data.current_password && data.new_password) {
				await passwordChange({
					current_password: data.current_password,
					new_password: data.new_password,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex justify-between flex-wrap w-full gap-3 px-5 mt-8 mb-8">
			<div className="card-body shadow-lg max-w-2xl">
				{errSuccess && (
					<p className="text-green-600 text-sm mb-2 p-5 bg-green-100 px-2 py-1 rounded">
						{errSuccess}
					</p>
				)}


					<h2 className="text-2xl font-bold">Profile Information</h2>



				<form onSubmit={handleSubmit(onSubmit)}>
					<ProfileForm
						register={register}
						errors={errors}
						isEditing={isEditing}
						profilePreview={profilePreview}
						handleProfileChange={(e) => {
							const file = e.target.files[0]
							if (file) setProfilePreview(URL.createObjectURL(file))
						}}
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

			<div className="hidden">
				<div className="card shadow-lg p-4 flex items-center gap-3">
					<div className="flex gap-3">
						<Verified size={30} />
						<h3 className="font-bold text-lg text-black">Subscription</h3>
					</div>
					<div>
						<p className="text-gray-600">
							{user?.subscription?.plan_name || 'Free Plan'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
