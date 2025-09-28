import React, { useState, useEffect } from 'react'
import { FiUsers, FiFileText, FiTrendingUp, FiActivity, FiCreditCard } from 'react-icons/fi'
import AuthApiClient from '../services/auth-api-client'
import ApiClient from '../services/api-client'

function AdminDashboard() {
	const [stats, setStats] = useState({
		totalUsers: 0,
		activeUsers: 0,
		totalStatements: 0,
		totalPlans: 0,
		activeSubscriptions: 0,
	})
	const [recentActivity, setRecentActivity] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchStats()
	}, [])

	const fetchStats = async () => {
		try {
			console.log('Fetching dashboard stats...')

			// Fetch users data
			const usersRes = await AuthApiClient.get('admin/user/')
			console.log('Users response:', usersRes.data)
			const userData = usersRes.data.results || []

			// Fetch plans data
			try {
				const plansRes = await ApiClient.get('plans/')
				console.log('Plans response:', plansRes.data)
				var plansData = plansRes.data.results || plansRes.data || []
			} catch (planError) {
				console.error('Plans API error:', planError)
			}

			// Fetch user statements
			try {
				const statementsRes = await AuthApiClient.get('bankstatement/')
				console.log('Statements response:', statementsRes.data)
				var statementsData =
					statementsRes.data.results.count || statementsRes.data || []
			} catch (statementError) {
				console.error('Statements API error:', statementError)
			}

			// Calculate active subscriptions from user data
			const activeSubscriptions = userData.filter(
				(user) => user.usersubscription && user.usersubscription.is_active,
			).length

			console.log('Calculated stats:', {
				totalUsers: userData.length,
				activeUsers: userData.filter((user) => !user.is_staff).length,
				totalStatements: statementsData.length,
				totalPlans: plansData.length,
				activeSubscriptions: activeSubscriptions,
			})

			const newStats = {
				totalUsers: userData.length,
				activeUsers: userData.filter((user) => !user.is_staff).length, // Non-staff users
				totalStatements: statementsData.length,
				totalPlans: plansData.length,
				activeSubscriptions: activeSubscriptions,
			}

			console.log('Setting stats:', newStats)
			setStats(newStats)

			// Generate recent activity from real data
			const activities = []

			// Recent users (non-staff only)
			const recentUsers = userData.filter((user) => !user.is_staff).slice(0, 3)

			recentUsers.forEach((user) => {
				activities.push({
					id: `user-${user.id}`,
					type: 'user',
					title: `User: ${user.first_name} ${user.last_name} (${user.email})`,
					time: 'Recently active',
					icon: FiUsers,
					color: 'blue',
				})
			})

			// Active subscriptions
			const subscribedUsers = userData.filter(
				(user) => user.usersubscription && user.usersubscription.is_active,
			)

			subscribedUsers.slice(0, 2).forEach((user) => {
				activities.push({
					id: `subscription-${user.id}`,
					type: 'subscription',
					title: `${user.first_name} ${user.last_name} - ${user.usersubscription.plan.name_display} plan`,
					time: `${user.usersubscription.remaining_uploads} uploads remaining`,
					icon: FiCreditCard,
					color: 'purple',
				})
			})

			// Recent statements (if available)
			if (statementsData.length > 0) {
				const recentStatements = statementsData
					.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
					.slice(0, 2)

				recentStatements.forEach((statement) => {
					activities.push({
						id: `statement-${statement.id}`,
						type: 'statement',
						title: `Statement processed: ${statement.original_filename}`,
						time: new Date(statement.created_at).toLocaleString(),
						icon: FiFileText,
						color: 'green',
					})
				})
			}

			// Take latest 5 activities
			setRecentActivity(activities.slice(0, 5))
		} catch (error) {
			console.error('Error fetching stats:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	const statCards = [
		{ title: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'blue' },
		{ title: 'Active Users', value: stats.activeUsers, icon: FiActivity, color: 'green' },
		{
			title: 'Statements Processed',
			value: stats.totalStatements,
			icon: FiFileText,
			color: 'purple',
		},
		{
			title: 'Active Subscriptions',
			value: stats.activeSubscriptions,
			icon: FiCreditCard,
			color: 'orange',
		},
	]

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">
						Dashboard Overview
					</h1>
					<p className="text-slate-600">
						Monitor your application's performance and statistics
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{statCards.map((card, index) => {
						const colorClasses = {
							blue: 'bg-blue-500 text-blue-600 bg-blue-50',
							green: 'bg-green-500 text-green-600 bg-green-50',
							purple: 'bg-purple-500 text-purple-600 bg-purple-50',
							orange: 'bg-orange-500 text-orange-600 bg-orange-50',
						}
						return (
							<div
								key={index}
								className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-slate-600">
											{card.title}
										</p>
										<p className="text-2xl font-bold text-slate-900 mt-1">
											{card.value}
										</p>
									</div>
									<div
										className={`p-3 rounded-lg ${
											colorClasses[card.color].split(' ')[2]
										}`}
									>
										<card.icon
											className={`h-6 w-6 ${
												colorClasses[card.color].split(' ')[1]
											}`}
										/>
									</div>
								</div>
							</div>
						)
					})}
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
					<h2 className="text-xl font-semibold text-slate-900 mb-6">
						Recent Activity
					</h2>
					<div className="space-y-4">
						{recentActivity.length === 0 ? (
							<div className="text-center py-8 text-slate-500">
								<FiActivity className="h-12 w-12 mx-auto mb-4 text-slate-300" />
								<p>No recent activity</p>
							</div>
						) : (
							recentActivity.map((activity) => {
								const colorClasses = {
									blue: 'bg-blue-100 text-blue-600',
									green: 'bg-green-100 text-green-600',
									purple: 'bg-purple-100 text-purple-600',
									orange: 'bg-orange-100 text-orange-600',
								}
								return (
									<div
										key={activity.id}
										className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
									>
										<div
											className={`p-2 rounded-lg ${
												colorClasses[activity.color]
											}`}
										>
											<activity.icon className="h-5 w-5" />
										</div>
										<div>
											<p className="font-medium text-slate-900">
												{activity.title}
											</p>
											<p className="text-sm text-slate-500">
												{activity.time}
											</p>
										</div>
									</div>
								)
							})
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
