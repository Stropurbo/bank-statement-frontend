import React, { useState, useEffect } from 'react'
import AuthApiClient from '../services/auth-api-client'
import ApiClient from '../services/api-client'

function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('users')
	const [users, setUsers] = useState([])
	//   const [payments, setPayments] = useState([])
	const [statements, setStatements] = useState([])
	const [settings, setSettings] = useState({
		maintenanceMode: false,
		emailNotifications: true,
	})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const usersRes = await AuthApiClient.get('admin/user/')
			console.log('Users response:', usersRes.data)

			const userData = usersRes.data.results || usersRes.data || []
			setUsers(userData)
		} catch (error) {
			console.error('Error fetching users:', error)
		} finally {
			setLoading(false)
		}
	}

	const deleteUser = async (userId) => {
		try {
			await AuthApiClient.delete(`admin/user/${userId}/`)
			setUsers(users.filter((user) => user.id !== userId))
		} catch (error) {
			console.error('Error deleting user:', error)
		}
	}

	const generateStatement = async () => {
		try {
			const newStatement = {
				id: Date.now(),
				filename: `Statement_${new Date().toISOString().slice(0, 7)}.pdf`,
				status: 'Generated',
			}
			setStatements([newStatement, ...statements])
		} catch (error) {
			console.error('Error generating statement:', error)
		}
	}

	const toggleSetting = async (setting) => {
		try {
			const newValue = !settings[setting]
			setSettings({ ...settings, [setting]: newValue })
		} catch (error) {
			console.error('Error updating setting:', error)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-xl">Loading...</div>
			</div>
		)
	}

	const tabs = [{ id: 'users', name: 'Users', icon: '👥' }]

	return (
		<div className="min-h-screen bg-gray-100">
			<title>Admin Dashboard</title>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								activeTab === tab.id
									? 'bg-white text-blue-600 shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<span>{tab.icon}</span>
							<span>{tab.name}</span>
						</button>
					))}
				</div>

				<div className="bg-white rounded-lg shadow">
					{activeTab === 'users' && (
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-semibold">User Management</h2>
								<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
									Add User
								</button>
							</div>
							<div className="space-y-2">
								{users.length === 0 ? (
									<div className="text-center py-8 text-gray-500">
										No users found
									</div>
								) : (
									users.map((user) => (
										<div
											key={user.id}
											className="flex justify-between items-center p-3 border rounded"
										>
											<div>
												<span className="font-medium">
													{user.email || user.username}
												</span>
												<span
													className={`ml-2 px-2 py-1 text-xs rounded-full ${
														user.is_active
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
												>
													{user.is_active ? 'Active' : 'Inactive'}
												</span>
											</div>
											<div className="space-x-2">
												<button className="text-blue-600 hover:text-blue-800 text-sm">
													Edit
												</button>
												<button
													onClick={() => deleteUser(user.id)}
													className="text-red-600 hover:text-red-800 text-sm"
												>
													Delete
												</button>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					)}

					{activeTab === 'statements' && (
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-semibold">Bank Statements</h2>
								<button
									onClick={generateStatement}
									className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
								>
									Generate Report
								</button>
							</div>
							<div className="space-y-2">
								{statements.map((statement) => (
									<div
										key={statement.id}
										className="flex justify-between items-center p-3 border rounded"
									>
										<div>
											<span className="font-medium">
												{statement.filename}
											</span>
											<span className="ml-2 text-sm text-gray-500">
												{statement.status}
											</span>
										</div>
										<div className="space-x-2">
											<button className="text-blue-600 hover:text-blue-800 text-sm">
												Download
											</button>
											<button className="text-red-600 hover:text-red-800 text-sm">
												Delete
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === 'settings' && (
						<div className="p-6">
							<h2 className="text-lg font-semibold mb-4">System Settings</h2>
							<div className="space-y-4">
								<div className="flex justify-between items-center p-3 border rounded">
									<span>Maintenance Mode</span>
									<button
										onClick={() => toggleSetting('maintenanceMode')}
										className={`px-3 py-1 rounded text-sm ${
											settings.maintenanceMode
												? 'bg-red-500 hover:bg-red-600 text-white'
												: 'bg-gray-300 hover:bg-gray-400'
										}`}
									>
										{settings.maintenanceMode ? 'On' : 'Off'}
									</button>
								</div>
								<div className="flex justify-between items-center p-3 border rounded">
									<span>Email Notifications</span>
									<button
										onClick={() => toggleSetting('emailNotifications')}
										className={`px-3 py-1 rounded text-sm ${
											settings.emailNotifications
												? 'bg-green-500 hover:bg-green-600 text-white'
												: 'bg-gray-300 hover:bg-gray-400'
										}`}
									>
										{settings.emailNotifications ? 'On' : 'Off'}
									</button>
								</div>
								<div className="flex justify-between items-center p-3 border rounded">
									<span>Backup Database</span>
									<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
										Run Now
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

export default AdminDashboard
