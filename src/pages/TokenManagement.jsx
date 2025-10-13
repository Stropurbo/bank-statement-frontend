import React, { useState, useEffect } from 'react'
import { FiEdit2, FiSave, FiX, FiDollarSign, FiPlus, FiTrash2, FiCalendar } from 'react-icons/fi'
import { Coins } from 'lucide-react'
import ApiClient from '../services/api-client'

function TokenManagement() {
	const [tokenPackages, setTokenPackages] = useState([])
	const [serviceCosts, setServiceCosts] = useState([])
	const [subscriptions, setSubscriptions] = useState([])
	const [editingPackage, setEditingPackage] = useState(null)
	const [editingCost, setEditingCost] = useState(null)
	const [editingSubscription, setEditingSubscription] = useState(null)
	const [loading, setLoading] = useState(true)
	const [creatingPackage, setCreatingPackage] = useState(false)
	const [creatingCost, setCreatingCost] = useState(false)
	const [creatingSubscription, setCreatingSubscription] = useState(false)
	const [newPackage, setNewPackage] = useState({ name: '', tokens: '', price: '' })
	const [newCost, setNewCost] = useState({ service_name: '', token_cost: '' })
	const [newSubscription, setNewSubscription] = useState({ name: '', tokens: '', price: '', duration_days: '30' })

	useEffect(() => {
		fetchTokenData()
	}, [])

	const fetchTokenData = async () => {
		try {
			const [packagesRes, costsRes, subsRes] = await Promise.all([
				ApiClient.get('/tokens/packages/'),
				ApiClient.get('/tokens/costs/'),
				ApiClient.get('/subscriptions/plans/'),
			])
			setTokenPackages(
				Array.isArray(packagesRes.data)
					? packagesRes.data
					: packagesRes.data.results || [],
			)
			setServiceCosts(
				Array.isArray(costsRes.data) ? costsRes.data : costsRes.data.results || [],
			)
			setSubscriptions(
				Array.isArray(subsRes.data) ? subsRes.data : subsRes.data.results || [],
			)
		} catch (error) {
			console.error('Error fetching token data:', error)
		} finally {
			setLoading(false)
		}
	}

	const updatePackage = async (id, data) => {
		try {
			await ApiClient.patch(`/tokens/packages/${id}/`, data)
			await fetchTokenData()
			setEditingPackage(null)
		} catch (error) {
			console.error('Error updating package:', error)
		}
	}

	const updateServiceCost = async (id, data) => {
		try {
			await ApiClient.patch(`/tokens/costs/${id}/`, data)
			await fetchTokenData()
			setEditingCost(null)
		} catch (error) {
			console.error('Error updating cost:', error)
		}
	}

	const createPackage = async () => {
		try {
			await ApiClient.post('/tokens/packages/', newPackage)
			await fetchTokenData()
			setCreatingPackage(false)
			setNewPackage({ name: '', tokens: '', price: '' })
		} catch (error) {
			console.error('Error creating package:', error)
		}
	}

	const deletePackage = async (id) => {
		if (window.confirm('Delete this package?')) {
			try {
				console.log('Deleting package:', id)
				const response = await ApiClient.delete(`/tokens/packages/${id}/`)
				console.log('Delete response:', response)
				await fetchTokenData()
				alert('Package deleted successfully!')
			} catch (error) {
				console.error('Error deleting package:', error.response?.data || error)
				alert(`Failed to delete: ${error.response?.data?.detail || error.message}`)
			}
		}
	}

	const createServiceCost = async () => {
		try {
			await ApiClient.post('/tokens/costs/', newCost)
			await fetchTokenData()
			setCreatingCost(false)
			setNewCost({ service_name: '', token_cost: '' })
		} catch (error) {
			console.error('Error creating service cost:', error)
		}
	}

	const deleteServiceCost = async (id) => {
		if (window.confirm('Delete this service cost?')) {
			try {
				console.log('Deleting service cost:', id)
				const response = await ApiClient.delete(`/tokens/costs/${id}/`)
				console.log('Delete response:', response)
				await fetchTokenData()
				alert('Service cost deleted successfully!')
			} catch (error) {
				console.error('Error deleting service cost:', error.response?.data || error)
				alert(`Failed to delete: ${error.response?.data?.detail || error.message}`)
			}
		}
	}

	const createSubscription = async () => {
		try {
			await ApiClient.post('/subscriptions/plans/', newSubscription)
			await fetchTokenData()
			setCreatingSubscription(false)
			setNewSubscription({ name: '', tokens: '', price: '', duration_days: '30' })
		} catch (error) {
			console.error('Error creating subscription:', error)
		}
	}

	const updateSubscription = async (id, data) => {
		try {
			await ApiClient.patch(`/subscriptions/plans/${id}/`, data)
			await fetchTokenData()
			setEditingSubscription(null)
		} catch (error) {
			console.error('Error updating subscription:', error)
		}
	}

	const deleteSubscription = async (id) => {
		if (window.confirm('Delete this subscription plan?')) {
			try {
				await ApiClient.delete(`/subscriptions/plans/${id}/`)
				await fetchTokenData()
				alert('Subscription deleted successfully!')
			} catch (error) {
				console.error('Error deleting subscription:', error)
				alert(`Failed to delete: ${error.response?.data?.detail || error.message}`)
			}
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		<div className="min-h-screen ml-5 bg-gray-50">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Token Management</h1>
					<p className="text-slate-600">
						Manage token packages and service costs dynamically
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<Coins className="h-6 w-6 text-yellow-600" />
								<h3 className="text-lg font-semibold text-slate-900">
									Token Packages
								</h3>
							</div>
							<button
								onClick={() => setCreatingPackage(true)}
								className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-700"
							>
								<FiPlus className="h-4 w-4" /> Add Package
							</button>
						</div>
						<div className="space-y-3 max-h-96 overflow-y-auto">
							{creatingPackage && (
								<div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
									<div className="space-y-2">
										<input
											type="text"
											value={newPackage.name}
											onChange={(e) =>
												setNewPackage({
													...newPackage,
													name: e.target.value,
												})
											}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Package Name"
										/>
										<input
											type="number"
											value={newPackage.tokens}
											onChange={(e) =>
												setNewPackage({
													...newPackage,
													tokens: e.target.value,
												})
											}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Tokens"
										/>
										<input
											type="number"
											step="0.01"
											value={newPackage.price}
											onChange={(e) =>
												setNewPackage({
													...newPackage,
													price: e.target.value,
												})
											}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Price"
										/>
										<div className="flex gap-2">
											<button
												onClick={createPackage}
												className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiSave className="h-4 w-4" /> Create
											</button>
											<button
												onClick={() => setCreatingPackage(false)}
												className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiX className="h-4 w-4" /> Cancel
											</button>
										</div>
									</div>
								</div>
							)}
							{tokenPackages.map((pkg) => (
								<div
									key={pkg.id}
									className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
								>
									{editingPackage?.id === pkg.id ? (
										<div className="space-y-2">
											<input
												type="text"
												value={editingPackage.name}
												onChange={(e) =>
													setEditingPackage({
														...editingPackage,
														name: e.target.value,
													})
												}
												className="w-full px-3 py-2 border rounded text-sm"
												placeholder="Package Name"
											/>
											<input
												type="number"
												value={editingPackage.tokens}
												onChange={(e) =>
													setEditingPackage({
														...editingPackage,
														tokens: e.target.value,
													})
												}
												className="w-full px-3 py-2 border rounded text-sm"
												placeholder="Tokens"
											/>
											<input
												type="number"
												step="0.01"
												value={editingPackage.price}
												onChange={(e) =>
													setEditingPackage({
														...editingPackage,
														price: e.target.value,
													})
												}
												className="w-full px-3 py-2 border rounded text-sm"
												placeholder="Price"
											/>
											<div className="flex gap-2">
												<button
													onClick={() =>
														updatePackage(pkg.id, editingPackage)
													}
													className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiSave className="h-4 w-4" /> Save
												</button>
												<button
													onClick={() => setEditingPackage(null)}
													className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiX className="h-4 w-4" /> Cancel
												</button>
											</div>
										</div>
									) : (
										<div className="flex justify-between items-center">
											<div>
												<p className="font-bold text-gray-900">
													{pkg.name}
												</p>
												<p className="text-sm text-gray-600">
													{pkg.tokens} tokens
												</p>
											</div>
											<div className="flex items-center gap-2">
												<p className="text-lg font-bold text-orange-600">
													${pkg.price}
												</p>
												<button
													onClick={() => setEditingPackage(pkg)}
													className="p-2 hover:bg-yellow-100 rounded"
												>
													<FiEdit2 className="h-4 w-4 text-gray-600" />
												</button>
												<button
													onClick={() => deletePackage(pkg.id)}
													className="p-2 hover:bg-red-100 rounded"
												>
													<FiTrash2 className="h-4 w-4 text-red-600" />
												</button>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<FiCalendar className="h-6 w-6 text-purple-600" />
								<h3 className="text-lg font-semibold text-slate-900">
									Subscription Plans
								</h3>
							</div>
							<button
								onClick={() => setCreatingSubscription(true)}
								className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700"
							>
								<FiPlus className="h-4 w-4" /> Add Plan
							</button>
						</div>
						<div className="space-y-3 max-h-96 overflow-y-auto">
							{creatingSubscription && (
								<div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
									<div className="space-y-2">
										<input
											type="text"
											value={newSubscription.name}
											onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Plan Name"
										/>
										<input
											type="number"
											value={newSubscription.tokens}
											onChange={(e) => setNewSubscription({ ...newSubscription, tokens: e.target.value })}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Tokens per cycle"
										/>
										<input
											type="number"
											step="0.01"
											value={newSubscription.price}
											onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Price"
										/>
										<select
											value={newSubscription.duration_days}
											onChange={(e) => setNewSubscription({ ...newSubscription, duration_days: e.target.value })}
											className="w-full px-3 py-2 border rounded text-sm"
										>
											<option value="30">Monthly (30 days)</option>
											<option value="365">Yearly (365 days)</option>
										</select>
										<div className="flex gap-2">
											<button
												onClick={createSubscription}
												className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiSave className="h-4 w-4" /> Create
											</button>
											<button
												onClick={() => setCreatingSubscription(false)}
												className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiX className="h-4 w-4" /> Cancel
											</button>
										</div>
									</div>
								</div>
							)}
							{subscriptions.map((sub) => (
								<div
									key={sub.id}
									className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
								>
									{editingSubscription?.id === sub.id ? (
										<div className="space-y-2">
											<input
												type="text"
												value={editingSubscription.name}
												onChange={(e) => setEditingSubscription({ ...editingSubscription, name: e.target.value })}
												className="w-full px-3 py-2 border rounded text-sm"
											/>
											<input
												type="number"
												value={editingSubscription.tokens}
												onChange={(e) => setEditingSubscription({ ...editingSubscription, tokens: e.target.value })}
												className="w-full px-3 py-2 border rounded text-sm"
											/>
											<input
												type="number"
												step="0.01"
												value={editingSubscription.price}
												onChange={(e) => setEditingSubscription({ ...editingSubscription, price: e.target.value })}
												className="w-full px-3 py-2 border rounded text-sm"
											/>
											<select
												value={editingSubscription.duration_days}
												onChange={(e) => setEditingSubscription({ ...editingSubscription, duration_days: e.target.value })}
												className="w-full px-3 py-2 border rounded text-sm"
											>
												<option value="30">Monthly</option>
												<option value="365">Yearly</option>
											</select>
											<div className="flex gap-2">
												<button
													onClick={() => updateSubscription(sub.id, editingSubscription)}
													className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiSave className="h-4 w-4" /> Save
												</button>
												<button
													onClick={() => setEditingSubscription(null)}
													className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiX className="h-4 w-4" /> Cancel
												</button>
											</div>
										</div>
									) : (
										<div className="flex justify-between items-center">
											<div>
												<p className="font-bold text-gray-900">{sub.name}</p>
												<p className="text-sm text-gray-600">{sub.tokens} tokens/{sub.duration_days === 30 ? 'month' : 'year'}</p>
											</div>
											<div className="flex items-center gap-2">
												<p className="text-lg font-bold text-purple-600">${sub.price}</p>
												<button
													onClick={() => setEditingSubscription(sub)}
													className="p-2 hover:bg-purple-100 rounded"
												>
													<FiEdit2 className="h-4 w-4 text-gray-600" />
												</button>
												<button
													onClick={() => deleteSubscription(sub.id)}
													className="p-2 hover:bg-red-100 rounded"
												>
													<FiTrash2 className="h-4 w-4 text-red-600" />
												</button>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<FiDollarSign className="h-6 w-6 text-blue-600" />
								<h3 className="text-lg font-semibold text-slate-900">
									Service Token Costs
								</h3>
							</div>
							<button
								onClick={() => setCreatingCost(true)}
								className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
							>
								<FiPlus className="h-4 w-4" /> Add Service
							</button>
						</div>
						<div className="space-y-3">
							{creatingCost && (
								<div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
									<div className="space-y-2">
										<input
											type="text"
											value={newCost.service_name}
											onChange={(e) =>
												setNewCost({
													...newCost,
													service_name: e.target.value,
												})
											}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Service Name (e.g., autopost)"
										/>
										<input
											type="number"
											value={newCost.token_cost}
											onChange={(e) =>
												setNewCost({
													...newCost,
													token_cost: e.target.value,
												})
											}
											className="w-full px-3 py-2 border rounded text-sm"
											placeholder="Token Cost"
										/>
										<div className="flex gap-2">
											<button
												onClick={createServiceCost}
												className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiSave className="h-4 w-4" /> Create
											</button>
											<button
												onClick={() => setCreatingCost(false)}
												className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
											>
												<FiX className="h-4 w-4" /> Cancel
											</button>
										</div>
									</div>
								</div>
							)}
							{serviceCosts.map((cost) => (
								<div
									key={cost.id}
									className="p-4 bg-blue-50 rounded-lg border border-blue-200"
								>
									{editingCost?.id === cost.id ? (
										<div className="space-y-2">
											<input
												type="number"
												value={editingCost.token_cost}
												onChange={(e) =>
													setEditingCost({
														...editingCost,
														token_cost: e.target.value,
													})
												}
												className="w-full px-3 py-2 border rounded text-sm"
												placeholder="Token Cost"
											/>
											<div className="flex gap-2">
												<button
													onClick={() =>
														updateServiceCost(cost.id, editingCost)
													}
													className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiSave className="h-4 w-4" /> Save
												</button>
												<button
													onClick={() => setEditingCost(null)}
													className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
												>
													<FiX className="h-4 w-4" /> Cancel
												</button>
											</div>
										</div>
									) : (
										<div className="flex justify-between items-center">
											<div>
												<p className="font-bold text-gray-900">
													{cost.service_name_display}
												</p>
												<p className="text-xs text-gray-500">
													{cost.service_name}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<p className="text-lg font-bold text-blue-600">
													{cost.token_cost} tokens
												</p>
												<button
													onClick={() => setEditingCost(cost)}
													className="p-2 hover:bg-blue-100 rounded"
												>
													<FiEdit2 className="h-4 w-4 text-gray-600" />
												</button>
												<button
													onClick={() => deleteServiceCost(cost.id)}
													className="p-2 hover:bg-red-100 rounded"
												>
													<FiTrash2 className="h-4 w-4 text-red-600" />
												</button>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TokenManagement
