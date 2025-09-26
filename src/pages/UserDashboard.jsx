import React, { useState, useEffect } from 'react'
import { Upload, FileText, Download, BarChart3, Clock, CheckCircle, TrendingUp, Calendar, DollarSign, AlertCircle, Crown, Settings } from 'lucide-react'
import { Link } from 'react-router'
import useAuthContext from '../hooks/useAuthContext'

function UserDashboard() {
	const { user } = useAuthContext()
	const [statements, setStatements] = useState([])
	const [loading, setLoading] = useState(true)
	const [dragActive, setDragActive] = useState(false)

	useEffect(() => {
		if (user?.id) {
			fetchStatements()
		}
	}, [user?.id])

	const fetchStatements = async () => {
		if (!user?.id) {
			setLoading(false)
			return
		}

		try {
			const token = localStorage.getItem('access_token')
			if (!token) {
				setStatements([])
				return
			}

			const response = await fetch('https://bank-statement-converter-backend-ofyc.onrender.com/api/user-statements/', {
				headers: {
					Authorization: `JWT ${token}`,
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				const data = await response.json()
				// Format data for better display
				const formattedStatements = data.map(statement => ({
					...statement,
					filename: statement.pdf_file?.split('/').pop() || statement.filename || 'Unknown File',
					uploadDate: new Date(statement.created_at || statement.upload_date).toLocaleDateString(),
					transactionCount: statement.transaction_count || 0,
					status: statement.status || 'processing'
				}))
				setStatements(formattedStatements)
			} else if (response.status === 401) {
				// Token expired, redirect to login
				localStorage.removeItem('access_token')
				window.location.href = '/login'
			} else {
				console.warn('Failed to fetch statements:', response.status)
				setStatements([])
			}
		} catch (error) {
			if (error.name === 'AbortError') return
			console.error('Error fetching statements:', error)
			setStatements([])
		} finally {
			setLoading(false)
		}
	}

	const handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
							Welcome back, {user?.first_name}!
						</h1>
						<p className="text-gray-600 text-lg">Transform your bank statements into organized Excel files</p>
					</div>
					<div className="flex items-center space-x-3">
						<div className="text-right">
							<p className="text-sm text-gray-500">Current Plan</p>
							<div className="flex items-center space-x-2">
								<Crown className="h-4 w-4 text-yellow-500" />
								<span className="font-semibold text-gray-900">
									{user?.usersubscription?.plan?.name || 'Free Plan'}
								</span>
							</div>
						</div>
						<Link
							to="/profile"
							className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
						>
							<Settings className="h-5 w-5 text-gray-600" />
						</Link>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 mb-1">Total Statements</p>
							<p className="text-3xl font-bold text-gray-900">{statements.length}</p>
							<p className="text-xs text-green-600 flex items-center mt-1">
								<TrendingUp className="h-3 w-3 mr-1" />
								+12% this month
							</p>
						</div>
						<div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
							<FileText className="h-6 w-6 text-white" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 mb-1">Processed</p>
							<p className="text-3xl font-bold text-gray-900">{statements.filter(s => s.status === 'completed').length}</p>
							<p className="text-xs text-green-600 flex items-center mt-1">
								<CheckCircle className="h-3 w-3 mr-1" />
								100% success rate
							</p>
						</div>
						<div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
							<CheckCircle className="h-6 w-6 text-white" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 mb-1">Remaining Uploads</p>
							<p className="text-3xl font-bold text-gray-900">{user?.usersubscription?.remaining_uploads || '∞'}</p>
							<p className="text-xs text-blue-600 flex items-center mt-1">
								<Calendar className="h-3 w-3 mr-1" />
								Resets monthly
							</p>
						</div>
						<div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
							<BarChart3 className="h-6 w-6 text-white" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
							<p className="text-3xl font-bold text-gray-900">2,847</p>
							<p className="text-xs text-orange-600 flex items-center mt-1">
								<DollarSign className="h-3 w-3 mr-1" />
								Processed this month
							</p>
						</div>
						<div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
							<DollarSign className="h-6 w-6 text-white" />
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Upload Section */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
						<div className="flex items-center space-x-3 mb-6">
							<div className="p-2 bg-blue-100 rounded-lg">
								<Upload className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-gray-900">Upload Bank Statement</h2>
								<p className="text-gray-600">Convert your PDF statements to Excel format</p>
							</div>
						</div>
						<div
							className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
								dragActive
									? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105'
									: 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
							}`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<div className="mb-6">
								<Upload className={`mx-auto h-16 w-16 mb-4 transition-colors ${
									dragActive ? 'text-blue-500' : 'text-gray-400'
								}`} />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{dragActive ? 'Drop your file here!' : 'Drag & drop your PDF'}
								</h3>
								<p className="text-gray-500 mb-6">or click to browse from your computer</p>
							</div>
							<button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
								Choose File
							</button>
							<div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
								<div className="flex items-center space-x-1">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>PDF files only</span>
								</div>
								<div className="flex items-center space-x-1">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>Max 10MB</span>
								</div>
								<div className="flex items-center space-x-1">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>Secure processing</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Statements & Quick Actions */}
				<div className="space-y-6">
					{/* Quick Actions */}
					<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
						<div className="space-y-3">
							<Link
								to="/dashboard/statements"
								className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
							>
								<FileText className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
								<span className="font-medium text-gray-900 group-hover:text-blue-600">View All Statements</span>
							</Link>
							<Link
								to="/profile"
								className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
							>
								<Settings className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
								<span className="font-medium text-gray-900 group-hover:text-purple-600">Account Settings</span>
							</Link>
							<Link
								to="/pricing"
								className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-colors group"
							>
								<Crown className="h-5 w-5 text-gray-600 group-hover:text-yellow-600" />
								<span className="font-medium text-gray-900 group-hover:text-yellow-600">Upgrade Plan</span>
							</Link>
						</div>
					</div>

					{/* Recent Statements */}
					<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
							<Link
								to="/dashboard/statements"
								className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
							>
								<span>View All</span>
								<TrendingUp className="h-4 w-4" />
							</Link>
						</div>

						{loading ? (
							<div className="space-y-3">
								{[1, 2, 3].map((i) => (
									<div key={i} className="animate-pulse flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
										<div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
										<div className="flex-1">
											<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
											<div className="h-3 bg-gray-200 rounded w-1/2"></div>
										</div>
									</div>
								))}
							</div>
						) : statements.length === 0 ? (
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<FileText className="h-8 w-8 text-gray-400" />
								</div>
								<h4 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h4>
								<p className="text-gray-500 text-sm mb-4">Upload your first statement to see activity here</p>
								<div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
									<AlertCircle className="h-3 w-3" />
									<span>Your uploads will appear here</span>
								</div>
							</div>
						) : (
							<div className="space-y-3">
								{statements.slice(0, 4).map((statement) => (
									<div key={statement.id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200">
										<div className="flex items-center space-x-3">
											<div className="p-2 bg-blue-100 rounded-lg">
												<FileText className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<p className="text-sm font-semibold text-gray-900">{statement.filename}</p>
												<p className="text-xs text-gray-500 flex items-center">
													<Clock className="h-3 w-3 mr-1" />
													{statement.uploadDate}
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<span className={`px-3 py-1 text-xs font-semibold rounded-full ${
												statement.status === 'completed'
													? 'bg-green-100 text-green-700 border border-green-200'
													: 'bg-yellow-100 text-yellow-700 border border-yellow-200'
											}`}>
												{statement.status}
											</span>
											{statement.status === 'completed' && (
												<button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
													<Download className="h-4 w-4" />
												</button>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
