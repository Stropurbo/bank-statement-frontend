const ProfileEdit = ({ isEditing, setIsEditing, isSubmitting }) => {
	return (
		<div className="flex justify-start pt-4">
			{isEditing ? (
				<div>
					<button
						type="submit"
						className="btn bg-purple-500 text-white px-8"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Saving' : 'Save Changes'}
					</button>
					<button
						type="button"
						className="btn bg-purple-500 text-white mx-5"
						onClick={() => setIsEditing(false)}
					>
						Cancel
					</button>
				</div>
			) : (
				<button
					type="button"
					className="btn bg-purple-500 text-white px-8"
					onClick={() => setIsEditing((prev) => !prev)}
				>
					Edit Profile
				</button>
			)}
		</div>
	)
}

export default ProfileEdit
