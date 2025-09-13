import React from 'react'
import { Link } from 'react-router'
import useAuthContext from '../hooks/useAuthContext'

function Navbar() {

		const { user, logoutUser } = useAuthContext()
		console.log(user)


	return (
		<div className="navbar bg-base-100 shadow-sm px-4">
			{/* Left section */}
			<div className="flex-1">
				<Link
					to={'/'}
					className="p-3 font-bold text-xl"
				>
					SheetlyPro
				</Link>
			</div>

			<div className="flex-none">
				{/* Mobile dropdown */}
				<div className="dropdown dropdown-end lg:hidden">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a
								href="pricing"
								className="text-gray-900"
							>
								Pricing
							</a>
						</li>
						<li>
							<details>
								<summary className="text-black font-bold">Login</summary>
								<ul className="p-2">
									<li>
										<a href="login">Login</a>
									</li>
									<li>
										<a href="register">Register</a>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>

				{/* Desktop menu */}
				<ul className="menu menu-horizontal px-1 hidden space-x-3 lg:flex">
					<li>
						<Link
							to="pricing"
							className="text-black rounded-md p-2 hover:bg-purple-200"
						>
							Pricing
						</Link>
					</li>

					{(user?.role === 'Admin' || user?.is_staff) && (
						<li>
							<Link
								to="dashboard"
								className="bg-purple-500 text-white font-bold px-4 py-2 rounded-md shadow hover:bg-purple-600 transition duration-200"
							>
								Dashboard
							</Link>
						</li>
					)}

					{!user ? (
						<>
							<li>
								<Link
									to="login"
									className="text-black btn font-bold rounded-md hover:bg-purple-700"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="register"
									className="text-white font-bold bg-purple-500 rounded-md btn hover:bg-purple-700 hover:text-black"
								>
									Register
								</Link>
							</li>
						</>
					) : (
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								<li>
									<a
										href="profile"
										className="justify-between"
									>
										Profile
									</a>
								</li>
								<li>
									<button
										onClick={logoutUser}
										className="justify-between w-full text-left"
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					)}
				</ul>
			</div>
		</div>
	)
}

export default Navbar
