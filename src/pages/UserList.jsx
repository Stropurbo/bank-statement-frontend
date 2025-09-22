import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import useAuthContext from '../hooks/useAuthContext'
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiFilter } from 'react-icons/fi'

const UserList = () => {
	const { user: currentUser } = useAuthContext()
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [currentPage, setCurrentPage] = useState(1)
	const [usersPerPage] = useState(10)

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			setLoading(true)
			const res = await AuthApiClient.get('/admin/user/')
			console.log('API Response:', res.data)
			const userData = res.data.results || res.data || []
			console.log('First user data:', userData[0])
			setUsers(userData)
		} catch (error) {
			console.error('Error fetching users:', error)
			setUsers([])
		} finally {
			setLoading(false)
		}
	}

	const deleteUser = async (id) => {
		if (currentUser?.id === id) {
			alert('You cannot delete your own account')
			return
		}

		if (!window.confirm('Are you sure you want to delete this user?')) {
			return
		}

		try {
			await AuthApiClient.delete(`/admin/user/${id}/`)
			setUsers(users.filter((user) => user.id !== id))
			alert('User deleted successfully')
		} catch (error) {
			console.error('Error deleting user:', error)
			alert('Failed to delete user')
		}
	}

	// Filter users based on search and status
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.username?.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesStatus =
			statusFilter === 'all' ||
			(statusFilter === 'active' && user.is_active) ||
			(statusFilter === 'inactive' && !user.is_active)
		return matchesSearch && matchesStatus
	})

	// Pagination
	const indexOfLastUser = currentPage * usersPerPage
	const indexOfFirstUser = indexOfLastUser - usersPerPage
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
	const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								User Management
							</h1>
							<p className="text-gray-600 mt-1">
								Total Users: {filteredUsers.length}
							</p>
						</div>
						<button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
							<FiUserPlus className="w-4 h-4" />
							Add User
						</button>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search by email or username..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Status Filter */}
						<div className="relative">
							<FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
							>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
					</div>
				</div>

				{/* Users Table */}
				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										#
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										User
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Role
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Subscription
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{currentUsers.length === 0 ? (
									<tr>
										<td
											colSpan="6"
											className="px-6 py-12 text-center text-gray-500"
										>
											<div className="flex flex-col items-center">
												<FiSearch className="w-12 h-12 text-gray-300 mb-4" />
												<p className="text-lg font-medium">
													No users found
												</p>
												<p className="text-sm">
													Try adjusting your search or filter criteria
												</p>
											</div>
										</td>
									</tr>
								) : (
									currentUsers.map((user, index) => (
										<tr
											key={user.id}
											className="hover:bg-gray-50 transition-colors"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{indexOfFirstUser + index + 1}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
															<span className="text-sm font-medium text-blue-600">
																{(
																	user.email ||
																	user.username ||
																	'U'
																)
																	.charAt(0)
																	.toUpperCase()}
															</span>
														</div>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{user.email || user.username}
														</div>
														{user.first_name && user.last_name && (
															<div className="text-sm text-gray-500">
																{user.first_name}{' '}
																{user.last_name}
															</div>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
														user.is_active
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
													onClick={() => console.log('User:', user.email, 'is_active:', user.is_active, 'type:', typeof user.is_active)}
												>
													{user.is_active ? 'Active' : 'Inactive'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												<span
													className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
														user.is_staff
															? 'bg-purple-100 text-purple-800'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{user.is_staff ? 'Admin' : 'User'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													user.has_subscription ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
												}`}>
													{user.has_subscription ? 'Yes' : 'No'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<div className="flex items-center justify-end gap-2">
													<button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
														<FiEdit className="w-4 h-4" />
													</button>
													{currentUser?.id !== user.id ? (
														<button
															onClick={() => deleteUser(user.id)}
															className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
														>
															<FiTrash2 className="w-4 h-4" />
														</button>
													) : (
														<span className="text-gray-400 text-xs px-2">
															You
														</span>
													)}
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
							<div className="flex items-center justify-between">
								<div className="flex-1 flex justify-between sm:hidden">
									<button
										onClick={() => paginate(currentPage - 1)}
										disabled={currentPage === 1}
										className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Previous
									</button>
									<button
										onClick={() => paginate(currentPage + 1)}
										disabled={currentPage === totalPages}
										className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Next
									</button>
								</div>
								<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<p className="text-sm text-gray-700">
											Showing{' '}
											<span className="font-medium">
												{indexOfFirstUser + 1}
											</span>{' '}
											to{' '}
											<span className="font-medium">
												{Math.min(
													indexOfLastUser,
													filteredUsers.length,
												)}
											</span>{' '}
											of{' '}
											<span className="font-medium">
												{filteredUsers.length}
											</span>{' '}
											results
										</p>
									</div>
									<div>
										<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
											<button
												onClick={() => paginate(currentPage - 1)}
												disabled={currentPage === 1}
												className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												Previous
											</button>
											{[...Array(totalPages)].map((_, index) => (
												<button
													key={index + 1}
													onClick={() => paginate(index + 1)}
													className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
														currentPage === index + 1
															? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
															: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
													}`}
												>
													{index + 1}
												</button>
											))}
											<button
												onClick={() => paginate(currentPage + 1)}
												disabled={currentPage === totalPages}
												className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												Next
											</button>
										</nav>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserList
