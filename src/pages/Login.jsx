import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

const Login = () => {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm()

	const { loginUser } = useAuthContext()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			await loginUser(data)
			navigate('/')
		} catch (error) {
			console.log('Login Failed', error)
		} finally {
			setLoading(false)
		}
	}



	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					{/* {errMsg && <ErrorAlert errormessage={errMsg} />} */}

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
								className="input input-bordered w-full"
								{...register('email', { required: 'E-mail is required.' })}
							/>
						</div>

						<div className="form-control">
							<input
								id="password"
								type="password"
								placeholder="Password"
								className="input input-bordered w-full "
								{...register('password', { required: 'Password is required.' })}
							/>

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

						{/* <Link
							to="/forget-password"
							className="link link-primary"
						>
							Forgot Password
						</Link> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
