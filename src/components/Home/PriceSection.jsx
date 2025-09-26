import React, { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import ApiClient from '../../services/api-client'

function PriceSection() {
	const [billing, setBilling] = useState('monthly')
	const [pricingTiers, setPricingTiers] = useState([])
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const [tiersLoading, setTiersLoading] = useState(true)

	useEffect(() => {
		const fetchPricingTiers = async () => {
			setTiersLoading(true)
			setError(null)
			try {
				const response = await ApiClient.get('/plans/')
				setPricingTiers(response.data.results || [])
			} catch (err) {
				console.error('Failed to fetch pricing tiers:', err)
				setError('Failed to load pricing plans. Please refresh the page.')
			} finally {
				setTiersLoading(false)
			}
		}

		fetchPricingTiers()
	}, [])

	const handleSubscribe = async (planId, paymentType) => {
		setLoading(planId)
		setError(null)
		try {
			const token = localStorage.getItem('authTokens')
			if (!token) {
				return (window.location.href = '/login')
			}

			const parsedTokens = JSON.parse(token)
			const accessToken = parsedTokens.access

			console.log('Initiating subscription:', {
				plan_id: planId,
				payment_type: paymentType,
				tiers_count: pricingTiers.length,
			})

			const response = await ApiClient.post(
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
		<section className="py-24 bg-gradient-to-b from-gray-50 to-white">
			<div className="container mx-auto px-6">
				{/* Section Header */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Sparkles className="h-4 w-4" />
						Simple Pricing
					</div>
					<h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
						Choose Your
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							Perfect Plan
						</span>
					</h2>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Transparent pricing with no hidden fees. Start converting your bank
						statements today.
					</p>

					{error && (
						<div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
							<p className="text-red-700 text-center font-medium">{error}</p>
						</div>
					)}

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
				</div>

				{/* Loading State */}
				{tiersLoading && (
					<div className="flex justify-center items-center py-20">
						<div className="text-center">
							<Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
							<p className="text-gray-600 font-medium">Loading pricing plans...</p>
						</div>
					</div>
				)}

				{/* Pricing Cards */}
				{!tiersLoading && (
					<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
						{pricingTiers.length > 0 &&
							pricingTiers.map((tier, index) => (
								<div
									key={index}
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
											{tier.title?.charAt(0).toUpperCase() +
												tier.title?.slice(1)}
										</h3>
										<div className="mb-4">
											<span className="text-5xl font-bold text-gray-900">
												{tier.price?.[billing] || tier.price}
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
											{tier.pages && (
												<li className="flex items-center gap-4 text-gray-800">
													<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
														<Check className="h-4 w-4 text-green-600" />
													</div>
													<span className="font-medium">
														{tier.pages[billing] || tier.pages}
													</span>
												</li>
											)}
											{tier.features?.map((feature, featureIndex) => (
												<li
													key={featureIndex}
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
												handleSubscribe(
													tier.id || tier.plan_id,
													billing,
												)
											}
											disabled={loading === (tier.id || tier.plan_id)}
											className={`group w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
												tier.popular
													? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl'
													: tier.buttonVariant === 'outline'
													? 'border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
													: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
											}`}
										>
											{loading === (tier.id || tier.plan_id) ? (
												<>
													<Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />
													Processing...
												</>
											) : (
												<>
													{tier.buttonText || 'Subscribe'}
													<ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
												</>
											)}
										</button>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</section>
	)
}

export default PriceSection