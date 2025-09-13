import React, { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
// import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router'

function Register() {
	const { registerUser } = useAuthContext()
	const navigate = useNavigate()

	const [successMsg, setSuccessMsg] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const [showPassword, setShowPassword] = useState(false)

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
				setTimeout(() => {
					navigate('/login')
				}, 2000)
			} else {
				setErrorMsg(res.message || 'Something went wrong')
			}
		} catch (error) {
			console.log('Error response:', error.response?.data)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					{successMsg && (
						<div
							className="w-full rounded-md p-4 mb-4 bg-green-500 text-white flex justify-between items-center"
							role="alert"
						>
							<div className="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.293-3.707a1 1 0 011.414 0L10 8.586 9.293 7.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
								<span>{successMsg}</span>
							</div>
							<button
								className="ml-4 text-white hover:text-gray-200"
								onClick={() => setSuccessMsg(null)}
							>
								✕
							</button>
						</div>
					)}

					{errorMsg && (
						<div
							className="w-full rounded-md p-4 mb-4 bg-red-500 text-white flex justify-between items-center"
							role="alert"
						>
							<div className="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.293-3.707a1 1 0 011.414 0L10 8.586 9.293 7.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
								<span>{errorMsg}</span>
							</div>
							<button
								className="ml-4 text-white font-bold hover:text-gray-200"
								onClick={() => setErrorMsg(null)}
							>
								✕
							</button>
						</div>
					)}

					<h2 className="card-title text-2xl font-bold">Register</h2>
					<p className="text-base-content/70">Create an account to get started</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<div className="form-control">
							<label
								className="label"
								htmlFor="first_name"
							>
								<span className="label-text">First Name</span>
							</label>
							<input
								id="first_name"
								type="text"
								placeholder="John"
								className="input input-bordered w-full"
								{...register('first_name', { required: true })}
							/>
							{errors.first_name && (
								<span className="text-error">{errors.first_name.message} </span>
							)}
						</div>

						<div className="form-control">
							<label
								className="label"
								htmlFor="last_name"
							>
								<span className="label-text">Last Name</span>
							</label>
							<input
								id="last_name"
								type="text"
								placeholder="Doe"
								className="input input-bordered w-full"
								{...register('last_name', { required: true })}
							/>
							{errors.last_name && (
								<span className="text-error">{errors.last_name.message} </span>
							)}
						</div>

						<div className="form-control">
							<label
								className="label"
								htmlFor="email"
							>
								<span className="label-text">Email</span>
							</label>
							<input
								id="email"
								type="email"
								placeholder="name@example.com"
								className="input input-bordered w-full"
								{...register('email', { required: true })}
							/>
							{errors.email && (
								<span className="text-error">{errors.email.message} </span>
							)}
							{/* <p>{watch("email")}</p> */}
						</div>

						<div className="form-control">
							<label
								className="label"
								htmlFor="address"
							>
								<span className="label-text">Address</span>
							</label>
							<input
								id="address"
								type="text"
								placeholder="7/A Austin, USA"
								className="input input-bordered w-full"
								{...register('address')}
							/>
						</div>

						<div className="form-control">
							<label
								className="label"
								htmlFor="phone_number"
							>
								<span className="label-text">Phone Number</span>
							</label>
							<input
								id="phone_number"
								type="text"
								placeholder="0123456789"
								className="input input-bordered w-full"
								{...register('phone_number')}
							/>
						</div>

						<div className="form-control relative">
							<label
								className="label"
								htmlFor="password"
							>
								<span className="label-text">Password</span>
							</label>
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								className="input input-bordered w-full pr-10"
								{...register('password', {
									required: true,
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
								})}
							/>
							{/* 👁️ Eye icon */}
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 bottom-0.5 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>

							{errors.password && (
								<span className="text-error">{errors.password.message}</span>
							)}
						</div>

						<div className="form-control relative">
							<label
								className="label"
								htmlFor="confirmPassword"
							>
								<span className="label-text">Confirm Password</span>
							</label>
							<input
								id="confirmPassword"
								type="password"
								placeholder="••••••••"
								className="input input-bordered w-full"
								{...register('confirm_password', {
									required: true,
									validate: (value) =>
										value === watch('password') || 'Password do not match.',
								})}
							/>
						</div>

						<button
							type="submit"
							className="btn bg-purple-500 w-full text-white rounded-md"
							disabled={loading}
						>
							{loading ? 'Registering' : 'Register'}
						</button>
					</form>

					<div className="text-center mt-4">
						<p className="text-base-content/70">
							Already have an account?{' '}
							<a
								href="/login"
								className="link link-primary"
							>
								Sign in
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
