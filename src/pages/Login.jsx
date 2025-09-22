import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

const Login = () => {
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

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}

					{success && (
						<div className="alert alert-success mb-4">
							<span>{success}</span>
						</div>
					)}

					<h2 className="card-title text-2xl font-bold">Login</h2>
					<p className="text-base-content/70">Welcome to SheetlyPro</p>

					<form
						className="space-y-4 mt-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="form-control">
							<input
								id="email"
								type="email"
								placeholder="Your@email.com"
								className={`input input-bordered w-full ${
									errors.email ? 'input-error' : ''
								}`}
								{...register('email', { required: 'E-mail is required.' })}
							/>
							{errors.email && (
								<span className="text-error text-sm mt-1">
									{errors.email.message}
								</span>
							)}
						</div>

						<div className="form-control">
							<input
								id="password"
								type="password"
								placeholder="Password"
								className={`input input-bordered w-full ${
									errors.password ? 'input-error' : ''
								}`}
								{...register('password', { required: 'Password is required.' })}
							/>
							{errors.password && (
								<span className="text-error text-sm mt-1">
									{errors.password.message}
								</span>
							)}
						</div>

						<button
							type="submit"
							className="btn bg-purple-500 w-full text-white rounded-md"
							disabled={loading}
						>
							{loading ? 'Logging In' : 'Login'}
						</button>
					</form>

					<div className="text-center mt-4">
						<p className="text-base-content/70">
							Don&apos;t have an account?{' '}
							<a
								href="/register"
								className="link link-primary"
							>
								Sign up
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
