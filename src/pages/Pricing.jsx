import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import AboveFooter from '../pdf_to_excel/AboveFooter'
import { Link } from 'react-router-dom'
import ApiClient from '../services/api-client'
import { setMeta } from '../utils/setMeta'

function Pricing() {
	const [billing, setBilling] = useState('monthly')
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const [pricingTiers, setPricingTiers] = useState([])
	const [tiersLoading, setTiersLoading] = useState(true)

	useEffect(() => {
		setMeta({
			title: 'Pricing - SheetlyPro',
			description: 'Choose the perfect plan for your needs',
			keywords: 'pricing, plans, subscription',
			ogTitle: 'SheetlyPro Pricing Plans',
			ogDescription: 'Affordable plans for everyone',
		})
	}, [])

	useEffect(() => {
		const fetchPricingTiers = async () => {
			try {
				const response = await ApiClient.get('/plans/')
				console.log('API Response:', response.data)
				setPricingTiers(response.data.results || response.data || [])
			} catch (err) {
				console.error('Failed to fetch pricing tiers:', err)
				setError('Failed to load pricing plans')
			} finally {
				setTiersLoading(false)
			}
		}

		fetchPricingTiers()
	}, [])

	const refreshToken = async () => {
		try {
			const tokens = JSON.parse(localStorage.getItem('authTokens'))
			const response = await ApiClient.post('auth/token/refresh/', {
				refresh: tokens.refresh,
			})

			const newTokens = {
				...tokens,
				access: response.data.access,
			}
			localStorage.setItem('authTokens', JSON.stringify(newTokens))
			return newTokens.access
		} catch (error) {
			console.log(error)
			localStorage.removeItem('authTokens')
			window.location.href = '/login'
			return null
		}
	}

	const handleSubscribe = async (planId, paymentType) => {
		setLoading(planId)
		setError(null)

		try {
			const token = localStorage.getItem('authTokens')
			if (!token) {
				return (window.location.href = '/login')
			}

			let parsedTokens = JSON.parse(token)
			let accessToken = parsedTokens.access

			console.log('Initiating subscription:', {
				plan_id: planId,
				payment_type: paymentType,
				tiers_count: pricingTiers.length,
			})

			let response
			try {
				response = await ApiClient.post(
					'subscription/initiate/',
					{
						plan_id: planId,
						payment_type: paymentType,
					},
					{
						headers: {
							Authorization: `JWT ${accessToken}`,
						},
					},
				)
			} catch (tokenError) {
				if (tokenError.response?.status === 401) {
					// Token expired, refresh and retry
					accessToken = await refreshToken()
					if (!accessToken) return

					response = await ApiClient.post(
						'subscription/initiate/',
						{
							plan_id: planId,
							payment_type: paymentType,
						},
						{
							headers: {
								Authorization: `JWT ${accessToken}`,
							},
						},
					)
				} else {
					throw tokenError
				}
			}

			if (response.data.payment_url) {
				window.location.href = response.data.payment_url
			} else {
				setError(response.data.error || 'Payment initiation failed.')
			}
		} catch (err) {
			let errorMsg = 'Network error. Please try again.'
			if (err.response?.status === 500) {
				errorMsg =
					'Payment system is temporarily unavailable. Please try again in a few minutes or contact support.'
			} else if (err.response?.data?.error) {
				errorMsg = err.response.data.error
			}
			setError(errorMsg)
			console.error('Full error:', err)
			console.error('Error response:', err.response)
			console.error('Error response data:', err.response?.data)
		} finally {
			setLoading(null)
		}
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="container mx-auto px-6 py-24">
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						Pricing Plans
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Choose Your Perfect Plan
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Transform your bank statements into Excel files with our powerful
						conversion tool. Select the plan that matches your business needs.
					</p>

					{/* Billing toggle */}
					<div className="inline-flex items-center bg-white rounded-xl p-1 shadow-lg border border-gray-200 mb-8">
						<button
							className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
								billing === 'monthly'
									? 'bg-purple-600 text-white shadow-md'
									: 'text-gray-600 hover:text-gray-900'
							}`}
							onClick={() => setBilling('monthly')}
						>
							Monthly
						</button>
						<button
							className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
								billing === 'annual'
									? 'bg-purple-600 text-white shadow-md'
									: 'text-gray-600 hover:text-gray-900'
							}`}
							onClick={() => setBilling('annual')}
						>
							Annual
							<span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
								Save 20%
							</span>
						</button>
					</div>

					{error && (
						<div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
							<p className="text-red-700 text-center font-medium">{error}</p>
						</div>
					)}
				</div>

				{tiersLoading ? (
					<div className="text-center py-20">
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
						<p className="mt-6 text-gray-600 text-lg">Loading pricing plans...</p>
					</div>
				) : (
					<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
						{pricingTiers.map((tier) => (
							<div
								key={tier.title}
								className={`relative rounded-3xl bg-white p-8 transition-all duration-300 hover:-translate-y-2 ${
									tier.popular
										? 'border-2 border-purple-500 shadow-2xl shadow-purple-100 scale-105'
										: 'border border-gray-200 shadow-xl hover:shadow-2xl'
								}`}
							>
								{tier.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
											✨ Most Popular
										</span>
									</div>
								)}

								{/* Header */}
								<div className="text-center pb-8 mb-6 border-b border-gray-100">
									<h3 className="text-2xl font-bold text-gray-900 mb-4">
										{tier.title.charAt(0).toUpperCase() +
											tier.title.slice(1)}
									</h3>
									<div className="mb-4">
										<span className="text-5xl font-bold text-gray-900">
											{tier.price[billing]}
										</span>
										<span className="text-gray-500 text-lg ml-2">
											/{billing}
										</span>
									</div>
									<p className="text-gray-600 leading-relaxed">
										{tier.description}
									</p>
								</div>

								{/* Features */}
								<div className="space-y-8">
									<ul className="space-y-4">
										<li className="flex items-center gap-4 text-gray-800">
											<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
												<Check className="h-4 w-4 text-green-600" />
											</div>
											<span className="font-medium">
												{tier.pages[billing]}
											</span>
										</li>
										{tier.features.map((feature, idx) => (
											<li
												key={idx}
												className="flex items-center gap-4 text-gray-800"
											>
												<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
													<Check className="h-4 w-4 text-green-600" />
												</div>
												<span className="font-medium">{feature}</span>
											</li>
										))}
									</ul>

									{/* Button */}
									<button
										onClick={() =>
											handleSubscribe(tier.id || tier.plan_id, billing)
										}
										disabled={loading === tier.id}
										className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
											tier.popular
												? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl'
												: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
										} ${
											loading === tier.id
												? 'opacity-70 cursor-not-allowed transform-none'
												: ''
										}`}
									>
										{loading === tier.id ? (
											<span className="flex items-center justify-center gap-2">
												<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
												Processing...
											</span>
										) : (
											tier.buttonText
										)}
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="text-center mt-20">
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							Need Help Choosing?
						</h3>
						<p className="text-gray-600 mb-4">
							Our team is here to help you find the perfect plan
						</p>
						<Link
							to="/contact"
							className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
						>
							Contact Our Team
						</Link>
					</div>
				</div>
			</div>

			<AboveFooter />
		</section>
	)
}

export default Pricing
