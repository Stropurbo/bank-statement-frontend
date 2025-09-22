import React, { useState, useEffect } from 'react'
import ApiClient from '../services/api-client'

function PaymentStatus() {
	const [status, setStatus] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const token = localStorage.getItem('authTokens')
				if (token) {
					const parsedTokens = JSON.parse(token)
					const response = await ApiClient.get('/subscription/status/', {
						headers: { Authorization: `JWT ${parsedTokens.access}` }
					})
					setStatus(response.data)
				}
			} catch (error) {
				console.error('Failed to fetch subscription status:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchStatus()
	}, [])

	if (loading) return <div className="p-8 text-center">Loading...</div>

	return (
		<div className="p-8 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Subscription Status</h1>
			{status ? (
				<div className="bg-white p-6 rounded-lg shadow">
					<p><strong>Plan:</strong> {status.plan_name || 'N/A'}</p>
					<p><strong>Status:</strong> {status.status || 'N/A'}</p>
					<p><strong>Expires:</strong> {status.expires_at || 'N/A'}</p>
				</div>
			) : (
				<p>No active subscription found.</p>
			)}
			<a href="/" className="mt-4 inline-block text-blue-500 hover:underline">← Back to Home</a>
		</div>
	)
}

export default PaymentStatus
