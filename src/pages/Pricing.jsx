import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import AboveFooter from '../components/Home/AboveFooter'
import { Link } from 'react-router-dom'
import ApiClient from '../services/api-client'

function Pricing() {
	const [billing, setBilling] = useState('monthly')
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)
	const [pricingTiers, setPricingTiers] = useState([])
	const [tiersLoading, setTiersLoading] = useState(true)

	useEffect(() => {
		const fetchPricingTiers = async () => {
			try {
				const response = await ApiClient.get('/subscription/plans/')
				console.log('API Response:', response.data)
				setPricingTiers(response.data)
			} catch (err) {
				console.error('Failed to fetch pricing tiers:', err)
				setError('Failed to load pricing plans')
			} finally {
				setTiersLoading(false)
			}
		}

		fetchPricingTiers()
	}, [])



	const buttonVariants = {
		default: 'bg-blue-600 text-white hover:bg-blue-700',
		outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
		cta: 'bg-purple-500 text-white hover:bg-purple-900',
		premium: 'bg-purple-600 text-white hover:bg-purple-900',
	}

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

			console.log('Sending request:', { plan_id: planId, payment_type: paymentType })
			console.log('Available tiers:', pricingTiers)

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
				errorMsg = 'Payment system is temporarily unavailable. Please try again in a few minutes or contact support.'
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
		<section
			id="pricing"
			className="bg-gradient-to-b from-purple-400 to-purple-200"
		>
			<div className="container mx-auto px-4 pt-20">
				<div className="text-center mb-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Flexible Plans That Fit Your Business
					</h2>
					<p className="text-xl text-gray-600 mb-4">
						Simple, transparent pricing for converting your bank statements into
						Excel. Choose the plan that works for you—monthly or annual—and scale as
						your needs grow.
					</p>

					{/* Billing toggle */}
					<div className="inline-flex rounded-lg bg-gray-200 p-1 mb-5">
						<button
							className={`px-4 py-2 rounded-lg font-semibold transition ${
								billing === 'monthly' ? 'bg-white shadow' : 'text-gray-700'
							}`}
							onClick={() => setBilling('monthly')}
						>
							Monthly
						</button>
						<button
							className={`px-4 py-2 rounded-lg font-semibold transition ${
								billing === 'annual' ? 'bg-white shadow' : 'text-gray-700'
							}`}
							onClick={() => setBilling('annual')}
						>
							Annual
						</button>
					</div>

					{error && (
						<div className="text-red-500 text-center mb-6 p-3 bg-red-50 rounded-lg">
							{error}
						</div>
					)}
				</div>

				{tiersLoading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
						<p className="mt-4 text-gray-600">Loading pricing plans...</p>
					</div>
				) : (
					pricingTiers.length > 0 ? (
						<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
							{pricingTiers.map((tier) => (
								<div
									key={tier.id}
									className="relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
								>
									{/* Header */}
									<div className="text-center pb-6 mb-4">
										<h3 className="text-2xl font-bold text-gray-900">
											{tier.name}
										</h3>
										<div className="mt-4">
											<span className="text-4xl font-bold text-gray-900">
												${billing === 'monthly' ? tier.monthly_price : tier.annual_price}
											</span>
										</div>
										<p className="text-gray-600 mt-2">{tier.description}</p>
									</div>

									{/* Content */}
									<div className="space-y-6">
										<ul className="space-y-3">
											<li className="flex items-center gap-3 text-gray-800">
												<Check className="h-5 w-5 text-green-600 shrink-0" />
												<span>
													{billing === 'monthly' 
														? `${tier.pages_monthly} pages per month`
														: `${tier.pages_annual} pages per year`
													}
												</span>
											</li>
											{Array.isArray(tier.features) && tier.features.map((feature, idx) => (
												<li
													key={idx}
													className="flex items-center gap-3 text-gray-800"
												>
													<Check className="h-5 w-5 text-green-600 shrink-0" />
													<span>{feature}</span>
												</li>
											))}
										</ul>

										{/* Button */}
										<button
											onClick={() => handleSubscribe(tier.id, billing)}
											disabled={loading === tier.id}
											className={`w-full rounded-lg px-4 py-2 font-semibold transition duration-200 bg-purple-600 text-white hover:bg-purple-700 ${
												loading === tier.id
													? 'opacity-70 cursor-not-allowed'
													: ''
											}`}
										>
											{loading === tier.id ? 'Processing...' : 'Subscribe'}
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-gray-600">No pricing plans available. Please contact support.</p>
						</div>
					)
				)}
				)}

				<div className="flex justify-center text-center mt-10 font-bold">
					Need help?{' '}
					<Link
						to="/contact"
						className="ml-2 font-bold text-purple-500 underline"
					>
						Contact us
					</Link>
				</div>
			</div>

			<AboveFooter />
		</section>
	)
}

export default Pricing
