import React, { useState } from 'react'
import { Check } from 'lucide-react'
import AboveFooter from '../components/Home/AboveFooter'
import { Link } from 'react-router-dom'
import ApiClient from '../services/api-client'

function Pricing() {
	const [billing, setBilling] = useState('monthly')
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)

	const pricingTiers = [
		{
			title: 'Basic',
			price: { monthly: '$9.99', annual: '$79' },
			pages: { monthly: '250 pages per month', annual: '3700 pages per year' },
			description: 'Perfect for individuals or light users',
			features: [
				'Bypass AI detection for Excel conversions',
				'Basic statement processing engine',
				'Error-free extraction',
				'Supports 20+ file types',
			],
			buttonText: 'Subscribe',
			buttonVariant: 'outline',
			popular: false,
			plan_id: 1,
		},
		{
			title: 'Pro',
			price: { monthly: '$24.99', annual: '$179' },
			pages: { monthly: '750 pages per month', annual: '11000 pages per year' },
			description: 'Most popular for regular users with multiple statements',
			features: [
				'Advanced processing engine',
				'Priority email support',
				'Faster extraction speed',
				'Supports 50+ file types',
				'Unlimited conversions per request',
				'Accurate Excel formatting',
			],
			buttonText: 'Subscribe',
			buttonVariant: 'cta',
			popular: true,
			plan_id: 2, 
		},
		{
			title: 'Ultra',
			price: { monthly: '$49.99', annual: '$279' },
			pages: { monthly: '2500 pages per month', annual: '38000 pages per year' },
			description: 'For businesses or bulk bank statement processing',
			features: [
				'Ultra-fast extraction engine',
				'Priority 24/7 support',
				'Advanced Excel formatting & templates',
				'Supports all popular file types',
				'Unlimited conversions per request',
				'Early access to new features',
				'Highest accuracy for bulk statements',
			],
			buttonText: 'Subscribe',
			buttonVariant: 'premium',
			popular: false,
			plan_id: 3,
		},
	]

	const buttonVariants = {
		default: 'bg-blue-600 text-white hover:bg-blue-700',
		outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
		cta: 'bg-purple-500 text-white hover:bg-purple-900',
		premium: 'bg-purple-600 text-white hover:bg-purple-900',
	}

	// Handle Subscribe Button Click
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

			const response = await ApiClient.post(
				'/payment/subscription/initiate/',
				{
					plan_id: planId,
					payment_type: paymentType,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			)

			if (response.data.payment_url) {
				window.location.href = response.data.payment_url
			} else {
				setError(response.data.error || 'Payment initiation failed.')
			}
		} catch (err) {
			setError('Network error. Please try again.')
			console.error(err)
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

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{pricingTiers.map((tier) => (
						<div
							key={tier.title}
							className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
								tier.popular
									? 'border-purple-600 shadow-xl scale-105'
									: 'hover:scale-105'
							}`}
						>
							{tier.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
							)}

							{/* Header */}
							<div className="text-center pb-6 mb-4">
								<h3 className="text-2xl font-bold text-gray-900">
									{tier.title}
								</h3>
								<div className="mt-4">
									<span className="text-4xl font-bold text-gray-900">
										{tier.price[billing]}
									</span>
								</div>
								<p className="text-gray-600 mt-2">{tier.description}</p>
							</div>

							{/* Content */}
							<div className="space-y-6">
								<ul className="space-y-3">
									<li className="flex items-center gap-3 text-gray-800">
										<Check className="h-5 w-5 text-green-600 shrink-0" />
										<span>{tier.pages[billing]}</span>
									</li>
									{tier.features.map((feature, idx) => (
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
									onClick={() => handleSubscribe(tier.plan_id, billing)}
									disabled={loading === tier.plan_id}
									className={`w-full rounded-lg px-4 py-2 font-semibold transition duration-200 ${
										buttonVariants[tier.buttonVariant]
									} ${
										loading === tier.plan_id
											? 'opacity-70 cursor-not-allowed'
											: ''
									}`}
								>
									{loading === tier.plan_id
										? 'Processing...'
										: tier.buttonText}
								</button>
							</div>
						</div>
					))}
				</div>

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
