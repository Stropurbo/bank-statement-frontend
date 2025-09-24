import React, { useState } from 'react'
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react'

function PriceSection() {
	const [billing, setBilling] = useState('monthly')

	const pricingTiers = [
		{
			title: 'Basic',
			price: { monthly: '$9', annual: '$90' },
			pages: { monthly: '200 pages per month', annual: '2400 pages per year' },
			description: 'Perfect for individuals or light users',
			features: [
				'Convert 200 pages/month',
				'Normal processing speed',
				'Basic email support',
			],
			buttonText: 'Subscribe',
			buttonVariant: 'outline',
			popular: false,
		},
		{
			title: 'Pro',
			price: { monthly: '$19', annual: '$190' },
			pages: { monthly: '800 pages per month', annual: '9000 pages per year' },
			description: 'Most popular for regular users with multiple statements',
			features: [
				'PDF → CSV or Excel (XLSX)',
				'Priority email support',
				'Faster extraction speed',
				'Multi-device access',
				'Unlimited conversions per request',
				'Accurate Excel formatting',
			],
			buttonText: 'Subscribe',
			buttonVariant: 'cta',
			popular: true,
		},
		{
			title: 'Ultra',
			price: { monthly: '$49', annual: '$490' },
			pages: { monthly: '2000 pages per month', annual: '24000 pages per year' },
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
						Transparent pricing with no hidden fees. Start converting your bank statements today.
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
				</div>

				{/* Pricing Cards */}
				<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
					{pricingTiers.map((tier, index) => (
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
									{tier.title}
								</h3>
								<div className="mb-4">
									<span className="text-5xl font-bold text-gray-900">
										{tier.price[billing]}
									</span>
									<span className="text-gray-500 text-lg ml-2">/{billing}</span>
								</div>
								<p className="text-gray-600 leading-relaxed">{tier.description}</p>
							</div>

							{/* Features */}
							<div className="space-y-8">
								<ul className="space-y-4">
									<li className="flex items-center gap-4 text-gray-800">
										<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
											<Check className="h-4 w-4 text-green-600" />
										</div>
										<span className="font-medium">{tier.pages[billing]}</span>
									</li>
									{tier.features.map((feature, featureIndex) => (
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
								<a href="/pricing">
									<button
										className={`group w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
											tier.popular
												? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl'
												: tier.buttonVariant === 'outline'
												? 'border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
												: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
										}`}
									>
										{tier.buttonText}
										<ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
									</button>
								</a>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				{/* <div className="text-center mt-20">
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
						<div className="flex justify-center mb-4">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
							))}
						</div>
						<h3 className="text-xl font-bold text-gray-900 mb-2">Still Have Questions?</h3>
						<p className="text-gray-600 mb-4">Our team is here to help you choose the right plan</p>
						<a href="/contact" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
							Contact Sales
						</a>
					</div>
				</div> */}
			</div>
		</section>
	)
}

export default PriceSection
