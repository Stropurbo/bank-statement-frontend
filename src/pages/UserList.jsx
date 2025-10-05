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
			manual_payment_type: user.usersubscription?.manual_payment_type || '',
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

			// Update subscription if plan, end_date, or payment_type changed
			const planChanged =
				editForm.subscription_plan !== (editingUser.usersubscription?.plan?.id || '')
			const endDateChanged =
				editForm.end_date !==
				(editingUser.usersubscription?.end_date
					? editingUser.usersubscription.end_date.split('T')[0]
					: '')
			const paymentTypeChanged =
				editForm.manual_payment_type !== (editingUser.usersubscription?.manual_payment_type || '')

			if (planChanged || endDateChanged || paymentTypeChanged) {
				try {
					if (editingUser.usersubscription?.id) {
						// If no plan selected, deactivate subscription
						if (!editForm.subscription_plan) {
							try {
								// Try to delete the subscription
								await AuthApiClient.delete(
									`/subscriptions/${editingUser.usersubscription.id}/`,
								)
								console.log('Subscription deleted successfully')
							} catch (deleteError) {
								// If delete fails, try to deactivate
								console.log('Delete failed, trying to deactivate:', deleteError)
								const subResponse = await AuthApiClient.patch(
									`/subscriptions/${editingUser.usersubscription.id}/`,
									{
										is_active: false,
									},
								)
								console.log('Subscription deactivated successfully:', subResponse.data)
							}
						} else {
							// Update existing subscription
							const subResponse = await AuthApiClient.patch(
								`/subscriptions/${editingUser.usersubscription.id}/`,
								{
									plan_id: editForm.subscription_plan,
									is_active: true,
									end_date: editForm.end_date || null,
									manual_payment_type: editForm.manual_payment_type || null,
								},
							)
							console.log(
								'Subscription update response:',
								JSON.stringify(subResponse.data, null, 2),
							)
							console.log('Subscription updated successfully')
						}
					} else if (editForm.subscription_plan) {
						// Use assign-to-user endpoint for new subscriptions
						try {
							const assignResponse = await AuthApiClient.post('/plans/assign-to-user/', {
								user_id: editingUser.id,
								plan_id: editForm.subscription_plan,
								duration_days: editForm.end_date
									? Math.ceil((new Date(editForm.end_date) - new Date()) / (1000 * 60 * 60 * 24))
									: 365,
								manual_payment_type: editForm.manual_payment_type || 'monthly',
							})
							console.log('Subscription assigned successfully:', assignResponse.data)
						} catch (assignError) {
							// Fallback: Create new subscription directly without manual_payment_type
							console.log('Assign failed, trying direct create without manual_payment_type')
							const createResponse = await AuthApiClient.post('/subscriptions/', {
								user: editingUser.id,
								plan_id: editForm.subscription_plan,
								is_active: true,
								end_date: editForm.end_date || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
							})
							console.log('Subscription created successfully:', createResponse.data)
						}
					}
				} catch (subError) {
					console.error('Subscription update error:', subError)
					console.error('Error details:', subError.response?.data)
					alert(`User updated but subscription update failed: ${subError.response?.data?.error || subError.message}`)
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
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
				<div className="text-center">
					<div className="relative">
						<div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
						<div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute top-0 left-0"></div>
					</div>
					<p className="mt-4 text-gray-600 font-semibold animate-pulse">Loading users...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
			<title>Users List</title>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 mb-6 text-white">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
								<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
									<FiUserPlus className="w-6 h-6" />
								</div>
								User Management
							</h1>
							<p className="text-blue-100 text-sm md:text-base flex items-center gap-2">
								<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
								Total Users: <span className="font-semibold">{filteredUsers.length}</span>
							</p>
						</div>
						<button className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105">
							<FiUserPlus className="w-5 h-5" />
							Add User
						</button>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative group">
							<FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
							<input
								type="text"
								placeholder="Search by email or username..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
							/>
						</div>

						{/* Status Filter */}
						<div className="relative group md:w-48">
							<FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-gray-50 focus:bg-white transition-all duration-300 cursor-pointer font-medium"
							>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
					</div>
				</div>

				{/* Users Table */}
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gradient-to-r from-gray-50 to-gray-100">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										#
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										User
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Role
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Subscription
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Plan
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Payment Type
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										End Date
									</th>
									<th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{currentUsers.length === 0 ? (
									<tr>
										<td
											colSpan="9"
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
											className="hover:bg-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-0 group"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{indexOfFirstUser + index + 1}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-12 w-12">
														<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-blue-100 group-hover:ring-4 transition-all duration-300">
															<span className="text-lg font-bold text-white">
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
														<div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
															{user.email || user.username}
														</div>
														{user.first_name && user.last_name && (
															<div className="text-sm text-gray-500 flex items-center gap-1">
																{user.first_name}{' '}
																{user.last_name}
															</div>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm ${
														user.is_active !== false &&
														user.is_active !== 'false'
															? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
															: 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
													}`}
												>
													<span className={`w-1.5 h-1.5 rounded-full ${
														user.is_active !== false && user.is_active !== 'false'
															? 'bg-white'
															: 'bg-white/70'
													}`}></span>
													{user.is_active !== false &&
													user.is_active !== 'false'
														? 'Active'
														: 'Inactive'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm ${
														user.is_staff
															? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
															: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
													}`}
												>
													{user.is_staff ? '👑 Admin' : '👤 User'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm ${
														hasActiveSubscription(user)
															? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
															: 'bg-gray-200 text-gray-600'
													}`}
												>
													{hasActiveSubscription(user) ? '✓ Yes' : '✗ No'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
													{user.usersubscription?.plan?.name ||
														user.subscription?.plan?.name ||
														user.plan_name ||
														'No Plan'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm ${
													user.usersubscription?.manual_payment_type === 'monthly'
														? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
														: user.usersubscription?.manual_payment_type === 'annual'
														? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
														: 'bg-gray-200 text-gray-600'
												}`}>
													{user.usersubscription?.manual_payment_type === 'monthly'
														? '📅 Monthly'
														: user.usersubscription?.manual_payment_type === 'annual'
														? '📆 Annual'
														: 'N/A'}
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
														className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-110"
														title="Edit user"
													>
														<FiEdit className="w-4 h-4" />
													</button>
													{currentUser?.id !== user.id ? (
														<button
															onClick={() => deleteUser(user.id)}
															className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-110"
															title="Delete user"
														>
															<FiTrash2 className="w-4 h-4" />
														</button>
													) : (
														<span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 text-xs font-bold rounded-lg">
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
						<div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-4 sm:px-6">
							<div className="flex items-center justify-between">
								<div className="flex-1 flex justify-between sm:hidden">
									<button
										onClick={() => paginate(currentPage - 1)}
										disabled={currentPage === 1}
										className="relative inline-flex items-center px-4 py-2 border-2 border-blue-300 text-sm font-semibold rounded-lg text-blue-600 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
									>
										Previous
									</button>
									<button
										onClick={() => paginate(currentPage + 1)}
										disabled={currentPage === totalPages}
										className="ml-3 relative inline-flex items-center px-4 py-2 border-2 border-blue-300 text-sm font-semibold rounded-lg text-blue-600 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
									>
										Next
									</button>
								</div>
								<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<p className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
											Showing{' '}
											<span className="font-bold text-blue-600">
												{indexOfFirstUser + 1}
											</span>{' '}
											to{' '}
											<span className="font-bold text-blue-600">
												{Math.min(
													indexOfLastUser,
													filteredUsers.length,
												)}
											</span>{' '}
											of{' '}
											<span className="font-bold text-blue-600">
												{filteredUsers.length}
											</span>{' '}
											results
										</p>
									</div>
									<div>
										<nav className="relative z-0 inline-flex rounded-xl shadow-lg gap-2">
											<button
												onClick={() => paginate(currentPage - 1)}
												disabled={currentPage === 1}
												className="relative inline-flex items-center px-4 py-2 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-gray-200"
											>
												Previous
											</button>
											{[...Array(totalPages)].map((_, index) => (
												<button
													key={index + 1}
													onClick={() => paginate(index + 1)}
													className={`relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
														currentPage === index + 1
															? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110'
															: 'bg-white text-gray-700 hover:bg-blue-100 border-2 border-gray-200'
													}`}
												>
													{index + 1}
												</button>
											))}
											<button
												onClick={() => paginate(currentPage + 1)}
												disabled={currentPage === totalPages}
												className="relative inline-flex items-center px-4 py-2 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-gray-200"
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
						<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto animate-fadeIn p-4">
							<div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 mx-4 transform transition-all duration-300 animate-slideUp">
								<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white">
									<div className="flex justify-between items-center">
										<h3 className="text-2xl font-bold flex items-center gap-3">
											<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
												<FiEdit className="w-5 h-5" />
											</div>
											Edit User
										</h3>
										<button
											onClick={closeEditModal}
											className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:rotate-90"
										>
											<FiX className="w-6 h-6" />
										</button>
									</div>
								</div>
								<div className="p-6 space-y-5">
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">
											📧 Email
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
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">
												👤 First Name
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
												className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">
												👤 Last Name
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
												className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">
											💎 Subscription Plan
										</label>
										<select
											value={editForm.subscription_plan}
											onChange={(e) =>
												setEditForm({
													...editForm,
													subscription_plan: e.target.value,
												})
											}
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white cursor-pointer font-medium"
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
										<label className="block text-sm font-bold text-gray-700 mb-2">
											📅 Subscription End Date
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
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
										/>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">
											💳 Payment Type
										</label>
										<select
											value={editForm.manual_payment_type}
											onChange={(e) =>
												setEditForm({
													...editForm,
													manual_payment_type: e.target.value,
												})
											}
											className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white cursor-pointer font-medium"
										>
											<option value="">Select Payment Type</option>
											<option value="monthly">Monthly</option>
											<option value="annual">Annual</option>
										</select>
									</div>
									<div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl space-y-3 border-2 border-blue-100">
										<p className="text-sm font-bold text-gray-700 mb-3">⚙️ User Settings</p>
										<label className="flex items-center gap-3 cursor-pointer group">
											<input
												type="checkbox"
												checked={editForm.is_active}
												onChange={(e) =>
													setEditForm({
														...editForm,
														is_active: e.target.checked,
													})
												}
												className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
											/>
											<span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
												✅ Active User
											</span>
										</label>
										<label className="flex items-center gap-3 cursor-pointer group">
											<input
												type="checkbox"
												checked={editForm.is_staff}
												onChange={(e) =>
													setEditForm({
														...editForm,
														is_staff: e.target.checked,
													})
												}
												className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
											/>
											<span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
												👑 Admin User
											</span>
										</label>
										<label className="flex items-center gap-3 cursor-pointer group">
											<input
												type="checkbox"
												checked={editForm.has_subscription}
												onChange={(e) =>
													setEditForm({
														...editForm,
														has_subscription: e.target.checked,
													})
												}
												className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
											/>
											<span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
												💎 Has Subscription
											</span>
										</label>
									</div>
								</div>
								<div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t-2 border-gray-100">
									<button
										onClick={closeEditModal}
										className="px-6 py-3 text-gray-700 font-semibold bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
									>
										Cancel
									</button>
									<button
										onClick={updateUser}
										className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
