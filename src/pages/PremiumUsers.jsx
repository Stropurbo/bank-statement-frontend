import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import { FiSearch, FiFilter, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi'

const PremiumUsers = () => {
	const [subscriptions, setSubscriptions] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [planFilter, setPlanFilter] = useState('all')
	const [currentPage, setCurrentPage] = useState(1)
	const [subscriptionsPerPage] = useState(10)

	useEffect(() => {
		fetchSubscriptions()
	}, [])

	const fetchSubscriptions = async () => {
		try {
			setLoading(true)
			const res = await AuthApiClient.get('/subscriptions/')
			console.log('Subscriptions API Response:', res.data)
			const subscriptionData = res.data?.results || res.data || []
			setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : [])
		} catch (error) {
			console.error('Error fetching subscriptions:', error)
			setSubscriptions([])
		} finally {
			setLoading(false)
		}
	}

	// Filter subscriptions
	const filteredSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter((sub) => {
		const matchesSearch = 
			sub.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			sub.user_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			sub.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase())
		
		const matchesPlan = planFilter === 'all' || sub.plan?.name === planFilter

		return matchesSearch && matchesPlan && sub.is_active
	}) : []

	// Get unique plan names for filter
	const planNames = [...new Set((Array.isArray(subscriptions) ? subscriptions : []).map(sub => sub.plan?.name).filter(Boolean))]

	// Pagination
	const indexOfLastSub = currentPage * subscriptionsPerPage
	const indexOfFirstSub = indexOfLastSub - subscriptionsPerPage
	const currentSubscriptions = filteredSubscriptions.slice(indexOfFirstSub, indexOfLastSub)
	const totalPages = Math.ceil(filteredSubscriptions.length / subscriptionsPerPage)

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
							<h1 className="text-2xl font-bold text-gray-900">Premium Users</h1>
							<p className="text-gray-600 mt-1">
								Total Active Subscriptions: {filteredSubscriptions.length}
							</p>
						</div>
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
								placeholder="Search by email, username, or plan..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Plan Filter */}
						<div className="relative">
							<FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<select
								value={planFilter}
								onChange={(e) => setPlanFilter(e.target.value)}
								className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
							>
								<option value="all">All Plans</option>
								{planNames.map(plan => (
									<option key={plan} value={plan}>{plan}</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Subscriptions Table */}
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
										Plan
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Payment Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Start Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										End Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Remaining Uploads
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{currentSubscriptions.length === 0 ? (
									<tr>
										<td colSpan="7" className="px-6 py-12 text-center text-gray-500">
											<div className="flex flex-col items-center">
												<FiUser className="w-12 h-12 text-gray-300 mb-4" />
												<p className="text-lg font-medium">No premium users found</p>
												<p className="text-sm">Try adjusting your search or filter criteria</p>
											</div>
										</td>
									</tr>
								) : (
									currentSubscriptions.map((subscription, index) => (
										<tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{indexOfFirstSub + index + 1}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
															<span className="text-sm font-medium text-blue-600">
																{(subscription.user_email || subscription.user_username || 'U').charAt(0).toUpperCase()}
															</span>
														</div>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{subscription.user_email || subscription.user_username}
														</div>
														{subscription.user_username && subscription.user_email && (
															<div className="text-sm text-gray-500">
																@{subscription.user_username}
															</div>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
													{subscription.plan?.name || 'No Plan'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div className="flex items-center">
													<FiDollarSign className="w-4 h-4 mr-1" />
													{subscription.payment_type_display || 'N/A'}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div className="flex items-center">
													<FiCalendar className="w-4 h-4 mr-1" />
													{subscription.start_date ? new Date(subscription.start_date).toLocaleDateString() : 'N/A'}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div className="flex items-center">
													<FiCalendar className="w-4 h-4 mr-1" />
													{subscription.end_date ? new Date(subscription.end_date).toLocaleDateString() : 'N/A'}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
													{subscription.remaining_uploads || 0}
												</span>
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
											<span className="font-medium">{indexOfFirstSub + 1}</span> to{' '}
											<span className="font-medium">
												{Math.min(indexOfLastSub, filteredSubscriptions.length)}
											</span>{' '}
											of <span className="font-medium">{filteredSubscriptions.length}</span> results
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

export default PremiumUsers