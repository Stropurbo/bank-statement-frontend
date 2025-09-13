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
	const { user, updateUserProfile, passwordChange } = useAuthContext()
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
		}
	}, [user, setValue])

	const onSubmit = async (data) => {
		try {
			// profile update
			const profilePayload = {
				first_name: data.first_name,
				last_name: data.last_name,
				address: data.address,
				phone_number: data.phone_number,
				email: data.email,
				profile_image: data.profile_image,
			}

			const result = await updateUserProfile(profilePayload)

			if (result.success) {
				setSuccess('Profile updated successfully!')
				setTimeout(() => {
					window.location.reload()
				}, 800)
			}

			// password change
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

				<div className="flex justify-between items-center">
					<h2 className="card-title text-2xl mb-4">Profile Information</h2>
					{/* <div><Edit /></div> */}
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<ProfileForm
						register={register}
						errors={errors}
						isEditing={isEditing}
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

			<div className="">
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
