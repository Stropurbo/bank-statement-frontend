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
		totalRevenue: 0,
		monthlyRevenue: 0
	})
	const [popularPlans, setPopularPlans] = useState([])
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
				plansData = []
			}

			// Fetch user statements
			try {
				const statementsRes = await AuthApiClient.get('bankstatement/')
				console.log('Statements response:', statementsRes.data)
				var statementsData = statementsRes.data.results || statementsRes.data || []
			} catch (statementError) {
				console.error('Statements API error:', statementError)
				statementsData = []
			}

			// Calculate active subscriptions and revenue from user data
			const activeSubscriptions = userData.filter(
				(user) => user.usersubscription && user.usersubscription.is_active,
			).length

			// Calculate total revenue from active subscriptions
			const totalRevenue = userData
				.filter((user) => user.usersubscription && user.usersubscription.is_active)
				.reduce((sum, user) => sum + (user.usersubscription.plan.price || 0), 0)

			// Calculate monthly revenue (current month subscriptions)
			const currentMonth = new Date().getMonth()
			const currentYear = new Date().getFullYear()
			const monthlyRevenue = userData
				.filter(user => {
					if (!user.usersubscription || !user.usersubscription.is_active) return false
					const subDate = new Date(user.usersubscription.created_at)
					return subDate.getMonth() === currentMonth && subDate.getFullYear() === currentYear
				})
				.reduce((sum, user) => sum + (user.usersubscription.plan.price || 0), 0)

			// Calculate popular plans
			const planCounts = {}
			userData.forEach(user => {
				if (user.usersubscription && user.usersubscription.is_active) {
					const planName = user.usersubscription.plan.name_display
					planCounts[planName] = (planCounts[planName] || 0) + 1
				}
			})
			const popularPlansData = Object.entries(planCounts)
				.map(([name, count]) => ({ name, count }))
				.sort((a, b) => b.count - a.count)
				.slice(0, 3)
			setPopularPlans(popularPlansData)

			console.log('Calculated stats:', {
				totalUsers: userData.length,
				activeUsers: userData.filter((user) => !user.is_staff).length,
				totalStatements: statementsData.length,
				totalPlans: plansData.length,
				activeSubscriptions: activeSubscriptions,
				totalRevenue: totalRevenue,
				monthlyRevenue: monthlyRevenue
			})

			const newStats = {
				totalUsers: userData.length,
				activeUsers: userData.filter((user) => !user.is_staff).length, // Non-staff users
				totalStatements: statementsData.length,
				totalPlans: plansData.length,
				activeSubscriptions: activeSubscriptions,
				totalRevenue: totalRevenue,
				monthlyRevenue: monthlyRevenue
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
		{ title: 'Monthly Revenue', value: `$${stats.monthlyRevenue.toFixed(2)}`, icon: FiTrendingUp, color: 'emerald' },
		{ title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: FiCreditCard, color: 'green' },
		{ title: 'Active Subscriptions', value: stats.activeSubscriptions, icon: FiActivity, color: 'orange' }
	]

	return (
		<div className="min-h-screen bg-slate-50 relative z-0">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300" style={{marginLeft: 'var(--sidebar-width, 256px)'}}>
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-slate-900 mb-3">
						Admin Dashboard
					</h1>
					<p className="text-lg text-slate-600">
						Comprehensive business analytics and performance metrics
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{statCards.map((card, index) => {
						const colorClasses = {
							blue: 'bg-blue-500 text-blue-600 bg-blue-50',
							green: 'bg-green-500 text-green-600 bg-green-50',
							emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
							purple: 'bg-purple-500 text-purple-600 bg-purple-50',
							orange: 'bg-orange-500 text-orange-600 bg-orange-50'
						}
						return (
							<div
								key={index}
								className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
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

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
						<h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
							<FiTrendingUp className="h-5 w-5 text-emerald-600" />
							Popular Plans
						</h2>
						<div className="space-y-3">
							{popularPlans.length === 0 ? (
								<p className="text-slate-500 text-center py-4">No active plans</p>
							) : (
								popularPlans.map((plan, index) => (
									<div key={plan.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
										<div className="flex items-center gap-3">
											<div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
												index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
											}`}>
												{index + 1}
											</div>
											<span className="font-medium text-slate-900">{plan.name}</span>
										</div>
										<span className="text-sm font-semibold text-slate-600">{plan.count} users</span>
									</div>
								))
							)}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
						<h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
							<FiActivity className="h-5 w-5 text-blue-600" />
							Quick Stats
						</h2>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-slate-600">Conversion Rate</span>
								<span className="font-semibold text-slate-900">
									{stats.totalUsers > 0 ? ((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1) : 0}%
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-slate-600">Avg Revenue/User</span>
								<span className="font-semibold text-slate-900">
									${stats.activeSubscriptions > 0 ? (stats.totalRevenue / stats.activeSubscriptions).toFixed(2) : '0.00'}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-slate-600">Statements/User</span>
								<span className="font-semibold text-slate-900">
									{stats.activeUsers > 0 ? (stats.totalStatements / stats.activeUsers).toFixed(1) : '0.0'}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
					<h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
						<FiActivity className="h-5 w-5 text-slate-600" />
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