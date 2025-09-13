import React, { useState } from 'react'
import { Check } from 'lucide-react'

function PriceSection() {
	const [billing, setBilling] = useState('monthly')

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
			},
		]


	const buttonVariants = {
		default: 'bg-blue-600 text-white hover:bg-blue-700',
		outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
		cta: 'bg-purple-500 text-white hover:bg-purple-900',
		premium: 'bg-purple-600 text-white hover:bg-purple-900',
	}

	return (
		<section
			id="pricing"
			className="py-20 bg-gray-50"
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
					<p className="text-xl text-gray-600 mb-4">
						Start free and upgrade as your needs grow
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
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{pricingTiers.map((tier, index) => (
						<div
							key={index}
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
									{tier.features.map((feature, featureIndex) => (
										<li
											key={featureIndex}
											className="flex items-center gap-3 text-gray-800"
										>
											<Check className="h-5 w-5 text-green-600 shrink-0" />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								{/* Button */}
								<button
									className={`w-full rounded-lg px-4 py-2 font-semibold transition duration-200 ${
										buttonVariants[tier.buttonVariant]
									}`}
								>
									{tier.buttonText}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default PriceSection
