import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCoins } from 'react-icons/fa'
import apiClient from '../services/api-client'

function TokenBalance() {
	const [balance, setBalance] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchBalance()
		// Refresh every 30 seconds
		const interval = setInterval(fetchBalance, 30000)
		return () => clearInterval(interval)
	}, [])

	const fetchBalance = async () => {
		try {
			const response = await apiClient.get('/tokens/balance/balance/')
			setBalance(response.data.balance)
		} catch (error) {
			console.error('Error fetching token balance:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return null

	return (
		<Link
			to="/tokens"
			className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
		>
			<FaCoins className="text-lg" />
			<span className="font-semibold">{balance || 0}</span>
		</Link>
	)
}

export default TokenBalance
