import React, { useState } from 'react'
import { Link } from 'react-router'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import useAuthContext from '../hooks/useAuthContext'
import Logo from '../assets/logos.png'
import TokenBalance from '../components/TokenBalance'

function Navbar() {
	const { user, logoutUser } = useAuthContext()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const getImageUrl = (path) => {
		if (!path) return null
		if (typeof path === 'string' && path.startsWith('http')) return path
		if (typeof path === 'string' && path.startsWith('image/upload/')) {
			return `https://res.cloudinary.com/dwhkvm4zp/${path}`
		}
		return path
	}

	return (
		<nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
			<div className="container mx-auto px-6">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<a
						href="/"
						className="flex items-center space-x-3 group"
					>
						<div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
							<img
								src={Logo}
								alt="SheetlyPro Logo"
								className="w-6 h-6"
							/>
						</div>
						<span className="text-xl font-bold text-black group-hover:text-black transition-colors">
							SheetlyPro
						</span>
					</a>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/pricing"
							className="text-black hover:text-gray-700 font-medium transition-colors"
						>
							Pricing
						</Link>
						<Link
							to="/autopost"
							className="text-black hover:text-gray-700 font-medium transition-colors"
						>
							AutoPost
						</Link>

						<Link
							to="/tools"
							className="text-black hover:text-gray-700 font-medium transition-colors"
						>
							Tools
						</Link>

						{(user?.role === 'Admin' || user?.is_staff) && (
							<Link
								to="/dashboard"
								className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg"
							>
								Admin Panel
							</Link>
						)}

						{!user ? (
							<div className="flex items-center space-x-4">
								<Link
									to="/login"
									className="text-black hover:text-gray-700 font-semibold transition-colors"
								>
									Login
								</Link>
								<Link
									to="/register"
									className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									Get Started
								</Link>
							</div>
						) : (
							<div className="flex items-center space-x-4">
								<div className="relative">
									<button
										onClick={() => setIsMenuOpen(!isMenuOpen)}
										className="flex items-center space-x-2 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
									>
										<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
											{user?.profile_image ? (
												<img
													src={getImageUrl(user.profile_image)}
													alt="Profile"
													className="w-7 h-7 rounded-full object-cover"
												/>
											) : (
												<User className="h-4 w-4 text-white" />
											)}
										</div>
										<span className="text-sm font-medium text-black">
											{user?.first_name || user?.email?.split('@')[0]}
										</span>
									</button>

									{isMenuOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
											<Link
												to="/profile"
												className="flex items-center px-4 py-2 text-black hover:bg-gray-50 transition-colors"
												onClick={() => setIsMenuOpen(false)}
											>
												<Settings className="h-4 w-4 mr-3" />
												Profile
											</Link>

											<Link
												to="/autopost/dashboard"
												className="flex items-center px-4 py-2 text-black hover:bg-gray-50 transition-colors"
												onClick={() => setIsMenuOpen(false)}
											>
												<Settings className="h-4 w-4 mr-3" />
												Dashoard
											</Link>

											<button
												onClick={async () => {
													await logoutUser()
													setIsMenuOpen(false)
												}}
												className="flex items-center w-full px-4 py-2 text-black hover:bg-gray-50 transition-colors"
											>
												<LogOut className="h-4 w-4 mr-3" />
												Logout
											</button>
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
					>
						{isMenuOpen ? (
							<X className="h-6 w-6 text-black" />
						) : (
							<Menu className="h-6 w-6 text-black" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200 bg-white">
						<div className="px-6 py-4 space-y-4">
							<Link
								to="/pricing"
								className="block text-black hover:text-gray-700 font-medium transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Pricing
							</Link>

							<Link
								to="/autopost"
								className="block text-black hover:text-gray-700 font-medium transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								AutoPost
							</Link>
							<Link
								to="/tools"
								className="block text-black hover:text-gray-700 font-medium transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Tools
							</Link>

							{(user?.role === 'Admin' || user?.is_staff) && (
								<Link
									to="/dashboard"
									className="block bg-black text-white px-4 py-2 rounded-lg font-semibold text-center"
									onClick={() => setIsMenuOpen(false)}
								>
									Admin Panel
								</Link>
							)}

							{!user ? (
								<div className="space-y-3 pt-4 border-t border-gray-200">
									<Link
										to="/login"
										className="block text-center text-black hover:text-gray-700 font-semibold transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										Login
									</Link>
									<Link
										to="/register"
										className="block bg-black text-white px-6 py-3 rounded-lg font-semibold text-center"
										onClick={() => setIsMenuOpen(false)}
									>
										Get Started
									</Link>
								</div>
							) : (
								<div className="space-y-3 pt-4 border-t border-gray-200">
									<div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
										<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
											{user?.profile_image ? (
												<img
													src={getImageUrl(user.profile_image)}
													alt="Profile"
													className="w-7 h-7 rounded-full object-cover"
												/>
											) : (
												<User className="h-4 w-4 text-white" />
											)}
										</div>
										<span className="text-sm font-medium text-black">
											{user?.email}
										</span>
									</div>
									<Link
										to="/profile"
										className="flex items-center space-x-3 text-black hover:text-gray-700 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										<Settings className="h-4 w-4" />
										<span>Profile</span>
									</Link>
									<Link
										to="/autopost/dashboard"
										className="flex items-center space-x-3 text-black hover:text-gray-700 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										<Settings className="h-4 w-4" />
										<span>AutoPost Dashoard</span>
									</Link>

									<button
										onClick={async () => {
											await logoutUser()
											setIsMenuOpen(false)
										}}
										className="flex items-center space-x-3 text-black hover:text-red-600 transition-colors w-full"
									>
										<LogOut className="h-4 w-4" />
										<span>Logout</span>
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar



