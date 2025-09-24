import React from 'react'
import { Zap, Globe, Lock, BarChart, Shield, Clock, CheckCircle, Sparkles } from 'lucide-react'

function Features() {
	const features = [
		{
			icon: Zap,
			title: 'Lightning Fast',
			description: 'AI-powered conversion processes your statements in under 10 seconds.',
			gradient: 'from-blue-500 to-cyan-500',
			bg: 'from-blue-50 to-cyan-50',
		},
		{
			icon: Shield,
			title: 'Bank-Grade Security',
			description: 'Enterprise-level encryption ensures your financial data stays private.',
			gradient: 'from-green-500 to-emerald-500',
			bg: 'from-green-50 to-emerald-50',
		},
		{
			icon: CheckCircle,
			title: '99.9% Accuracy',
			description: 'Advanced OCR technology delivers precise data extraction every time.',
			gradient: 'from-purple-500 to-indigo-500',
			bg: 'from-purple-50 to-indigo-50',
		},
		{
			icon: Globe,
			title: 'Universal Support',
			description: 'Works banks and financial institutions worldwide.',
			gradient: 'from-orange-500 to-red-500',
			bg: 'from-orange-50 to-red-50',
		},
	]

	return (
		<section className="py-24 bg-gradient-to-b from-white to-gray-50">
			<div className="container mx-auto px-6">
				{/* Section Header */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Sparkles className="h-4 w-4" />
						Why Choose SheetlyPro
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Powerful Features for
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							Seamless Conversion
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Experience the next generation of PDF to Excel conversion with our
						AI-powered platform designed for accuracy, speed, and security.
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
						>
							{/* Background Gradient */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${feature.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							></div>

							{/* Content */}
							<div className="relative z-10">
								<div className="mb-6">
									<div
										className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<feature.icon className="h-8 w-8 text-white" />
									</div>
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
									{feature.title}
								</h3>
								<p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Bottom Stats */}
				<div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
						<div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
						<p className="text-gray-600">Documents Processed</p>
					</div>
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
						<div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
						<p className="text-gray-600">Happy Customers</p>
					</div>
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
						<div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
						<p className="text-gray-600">Accuracy Rate</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features
