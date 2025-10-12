import React, { useState, useEffect } from 'react'
import { Plus, Trash2, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import apiClient from '../services/api-client'

function AutoPostAccounts() {
	const [accounts, setAccounts] = useState([])
	const [platforms, setPlatforms] = useState([])
	const [loading, setLoading] = useState(true)
	const [connecting, setConnecting] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const [accountsRes, platformsRes] = await Promise.all([
				apiClient.get('/autopost/accounts/'),
				apiClient.get('/autopost/accounts/platforms/')
			])
			setAccounts(accountsRes.data.results || accountsRes.data)
			setPlatforms(platformsRes.data)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleDisconnect = async (accountId) => {
		if (!confirm('Are you sure you want to disconnect this account?')) return

		try {
			await apiClient.delete(`/autopost/accounts/${accountId}/`)
			setAccounts(accounts.filter(acc => acc.id !== accountId))
		} catch (error) {
			console.error('Error disconnecting account:', error)
			alert('Failed to disconnect account')
		}
	}

	const handleConnectPlatform = async (platform) => {
		setConnecting(platform)
		try {
			const response = await apiClient.get(`/autopost/accounts/connect/${platform}/`)
			if (response.data.auth_url) {
				window.location.href = response.data.auth_url
			}
		} catch (error) {
			console.error('Error connecting platform:', error)
			const errorMsg = error.response?.data?.error || 'Failed to connect platform. Please ensure OAuth credentials are configured.'
			alert(errorMsg)
			setConnecting(null)
		}
	}

	const handleRefreshToken = async (accountId) => {
		try {
			await apiClient.post(`/autopost/accounts/${accountId}/refresh_token/`)
			alert('Token refreshed successfully')
			fetchData()
		} catch (error) {
			console.error('Error refreshing token:', error)
			alert('Failed to refresh token')
		}
	}

	const getStatusIcon = (status) => {
		switch (status) {
			case 'active':
				return <CheckCircle className="w-5 h-5 text-green-500" />
			case 'expired':
				return <XCircle className="w-5 h-5 text-red-500" />
			default:
				return <AlertCircle className="w-5 h-5 text-yellow-500" />
		}
	}

	const getStatusColor = (status) => {
		const colors = {
			active: 'bg-green-100 text-green-700',
			inactive: 'bg-gray-100 text-gray-700',
			expired: 'bg-red-100 text-red-700',
			error: 'bg-yellow-100 text-yellow-700'
		}
		return colors[status] || 'bg-gray-100 text-gray-700'
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b">
				<div className="container mx-auto px-6 py-6">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Connected Accounts</h1>
							<p className="text-gray-600 mt-1">Manage your social media connections</p>
						</div>
						<button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
							<Plus className="w-5 h-5" />
							Connect Account
						</button>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-6 py-8">
				{/* Available Platforms */}
				<div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
					<h2 className="text-xl font-bold text-gray-900 mb-4">Available Platforms</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{platforms.map((platform) => (
							<button
								key={platform.id}
								onClick={() => handleConnectPlatform(platform.id)}
								disabled={connecting === platform.id}
								className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<p className="font-medium text-gray-900 capitalize">{platform.name}</p>
								<p className="text-xs text-gray-500 mt-1">
									{connecting === platform.id ? 'Connecting...' : 'Connect'}
								</p>
							</button>
						))}
					</div>
				</div>

				{/* Connected Accounts List */}
				<div className="bg-white rounded-xl shadow-sm border">
					<div className="p-6 border-b">
						<h2 className="text-xl font-bold text-gray-900">Your Accounts</h2>
					</div>
					{accounts.length > 0 ? (
						<div className="divide-y">
							{accounts.map((account) => (
								<div key={account.id} className="p-6 hover:bg-gray-50 transition-colors">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4">
											<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
												<span className="text-2xl font-bold text-purple-600">
													{account.platform[0].toUpperCase()}
												</span>
											</div>
											<div>
												<div className="flex items-center gap-2 mb-1">
													<p className="text-lg font-bold text-gray-900">@{account.username}</p>
													{getStatusIcon(account.status)}
												</div>
												<p className="text-sm text-gray-600 capitalize">{account.platform_display}</p>
												<div className="flex items-center gap-2 mt-2">
													<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
														{account.status}
													</span>
													{account.last_sync && (
														<span className="text-xs text-gray-500">
															Last synced: {new Date(account.last_sync).toLocaleDateString()}
														</span>
													)}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{account.is_expired && (
												<button
													onClick={() => handleRefreshToken(account.id)}
													className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
													title="Refresh Token"
												>
													<RefreshCw className="w-5 h-5" />
												</button>
											)}
											<button
												onClick={() => handleDisconnect(account.id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
												title="Disconnect"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="p-12 text-center">
							<div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Plus className="w-10 h-10 text-gray-400" />
							</div>
							<p className="text-gray-600 mb-4">No accounts connected yet</p>
							<button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
								<Plus className="w-4 h-4" />
								Connect Your First Account
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default AutoPostAccounts
