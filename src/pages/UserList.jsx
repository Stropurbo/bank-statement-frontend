import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import useAuthContext from '../hooks/useAuthContext'
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiFilter, FiX } from 'react-icons/fi'

const UserList = () => {
	const { user: currentUser } = useAuthContext()
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [currentPage, setCurrentPage] = useState(1)
	const [usersPerPage] = useState(10)
	const [editingUser, setEditingUser] = useState(null)
	const [editForm, setEditForm] = useState({})
	const [subscriptionPlans, setSubscriptionPlans] = useState([])

	useEffect(() => {
		fetchUsers()
		fetchPlans()
	}, [])

	const fetchPlans = async () => {
		try {
			const res = await AuthApiClient.get('/subscription/plans/')
			setSubscriptionPlans(res.data || [])
		} catch (error) {
			console.error('Error fetching plans:', error)
		}
	}

	const fetchUsers = async () => {
		try {
			setLoading(true)
			// Try to get users with subscription data
			const res = await AuthApiClient.get('/admin/user/?include_subscriptions=true')
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

	const openEditModal = (user) => {
		setEditingUser(user)
		setEditForm({
			email: user.email || '',
			first_name: user.first_name || '',
			last_name: user.last_name || '',
			is_active: user.is_active !== false && user.is_active !== 'false',
			is_staff: user.is_staff || false,
			has_subscription: hasActiveSubscription(user),
			subscription_plan: user.usersubscription?.plan?.id || '',
			end_date: user.usersubscription?.end_date
				? user.usersubscription.end_date.split('T')[0]
				: '',
		})
	}

	const closeEditModal = () => {
		setEditingUser(null)
		setEditForm({})
	}

	const updateUser = async () => {
		try {
			const updateData = {
				email: editForm.email,
				first_name: editForm.first_name,
				last_name: editForm.last_name,
				is_active: editForm.is_active,
				is_staff: editForm.is_staff,
			}

			console.log('=== UPDATE USER DEBUG ===')
			console.log('User ID:', editingUser.id)
			console.log('Current User (Admin):', currentUser)
			console.log('Sending data:', JSON.stringify(updateData, null, 2))
			console.log('API URL:', `/admin/user/${editingUser.id}/`)

			const response = await AuthApiClient.patch(
				`/admin/user/${editingUser.id}/`,
				updateData,
			)
			console.log('Backend response:', JSON.stringify(response.data, null, 2))
			console.log('Response status:', response.status)

			// Update subscription if plan or end_date changed
			const planChanged =
				editForm.subscription_plan !== (editingUser.usersubscription?.plan?.id || '')
			const endDateChanged =
				editForm.end_date !==
				(editingUser.usersubscription?.end_date
					? editingUser.usersubscription.end_date.split('T')[0]
					: '')

			if (planChanged || endDateChanged) {
				try {
					if (editingUser.usersubscription?.id) {
						// Update existing subscription
						const subResponse = await AuthApiClient.patch(
							`/subscriptions/${editingUser.usersubscription.id}/`,
							{
								plan_id: editForm.subscription_plan || null,
								is_active: !!editForm.subscription_plan,
								end_date: editForm.end_date || null,
							},
						)
						console.log(
							'Subscription update response:',
							JSON.stringify(subResponse.data, null, 2),
						)
						console.log('Subscription updated successfully')
					} else if (editForm.subscription_plan) {
						// Use assign-to-user endpoint for new subscriptions
						const assignResponse = await AuthApiClient.post('/plans/assign-to-user/', {
							user_id: editingUser.id,
							plan_id: editForm.subscription_plan,
							duration_days: editForm.end_date
								? Math.ceil((new Date(editForm.end_date) - new Date()) / (1000 * 60 * 60 * 24))
								: 365,
						})
						console.log('Subscription assigned successfully:', assignResponse.data)
					}
				} catch (subError) {
					console.error('Subscription update error:', subError)
					alert('User updated but subscription update failed')
				}
			}

			closeEditModal()
			await fetchUsers()
			alert('User updated successfully')
		} catch (error) {
			console.error('=== UPDATE ERROR ===')
			console.error('Error:', error)
			console.error('Error response:', error.response?.data)
			console.error('Error status:', error.response?.status)
			alert(`Failed to update user: ${error.response?.data?.detail || error.message}`)
		}
	}

	const hasActiveSubscription = (user) => {
		if (user.usersubscription?.is_active === true) return true
		if (user.subscription?.is_active === true) return true
		if (user.has_subscription === true && !user.usersubscription && !user.subscription)
			return true
		return false
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
			<title>Users List</title>
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
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Plan
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										End Date
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
											colSpan="8"
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
														user.is_active !== false &&
														user.is_active !== 'false'
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
												>
													{user.is_active !== false &&
													user.is_active !== 'false'
														? 'Active'
														: 'Inactive'}
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
												<span
													className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
														hasActiveSubscription(user)
															? 'bg-blue-100 text-blue-800'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{hasActiveSubscription(user) ? 'Yes' : 'No'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
													{user.usersubscription?.plan?.name ||
														user.subscription?.plan?.name ||
														user.plan_name ||
														'No Plan'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user.usersubscription?.end_date
													? new Date(
															user.usersubscription.end_date,
													  ).toLocaleDateString()
													: 'No End Date'}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<div className="flex items-center justify-end gap-2">
													<button
														onClick={() => openEditModal(user)}
														className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
													>
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

					{/* Edit User Modal */}
					{editingUser && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-md">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold">Edit User</h3>
									<button
										onClick={closeEditModal}
										className="text-gray-400 hover:text-gray-600"
									>
										<FiX className="w-5 h-5" />
									</button>
								</div>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Email
										</label>
										<input
											type="email"
											value={editForm.email}
											onChange={(e) =>
												setEditForm({
													...editForm,
													email: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												First Name
											</label>
											<input
												type="text"
												value={editForm.first_name}
												onChange={(e) =>
													setEditForm({
														...editForm,
														first_name: e.target.value,
													})
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Last Name
											</label>
											<input
												type="text"
												value={editForm.last_name}
												onChange={(e) =>
													setEditForm({
														...editForm,
														last_name: e.target.value,
													})
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Subscription Plan
										</label>
										<select
											value={editForm.subscription_plan}
											onChange={(e) =>
												setEditForm({
													...editForm,
													subscription_plan: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										>
											<option value="">No Plan</option>
											{subscriptionPlans.map((plan) => (
												<option
													key={plan.id}
													value={plan.id}
												>
													{plan.title || plan.name}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Subscription End Date
										</label>
										<input
											type="date"
											value={editForm.end_date}
											onChange={(e) =>
												setEditForm({
													...editForm,
													end_date: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									</div>
									<div className="space-y-3">
										<label className="flex items-center">
											<input
												type="checkbox"
												checked={editForm.is_active}
												onChange={(e) =>
													setEditForm({
														...editForm,
														is_active: e.target.checked,
													})
												}
												className="mr-2"
											/>
											<span className="text-sm font-medium text-gray-700">
												Active User
											</span>
										</label>
										<label className="flex items-center">
											<input
												type="checkbox"
												checked={editForm.is_staff}
												onChange={(e) =>
													setEditForm({
														...editForm,
														is_staff: e.target.checked,
													})
												}
												className="mr-2"
											/>
											<span className="text-sm font-medium text-gray-700">
												Admin User
											</span>
										</label>
										<label className="flex items-center">
											<input
												type="checkbox"
												checked={editForm.has_subscription}
												onChange={(e) =>
													setEditForm({
														...editForm,
														has_subscription: e.target.checked,
													})
												}
												className="mr-2"
											/>
											<span className="text-sm font-medium text-gray-700">
												Has Subscription
											</span>
										</label>
									</div>
								</div>
								<div className="flex justify-end gap-3 mt-6">
									<button
										onClick={closeEditModal}
										className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
									>
										Cancel
									</button>
									<button
										onClick={updateUser}
										className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
									>
										Update User
									</button>
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
