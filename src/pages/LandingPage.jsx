import React from 'react'
import { Link } from 'react-router'
import { FileSpreadsheet, Zap, Shield, Clock, Share2, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Navbar from '../layout/Navbar'

function LandingPage() {
	const features = [
		{
			icon: <Share2 className="w-8 h-8" />,
			title: 'Social Media AutoPost',
			description:
				'Schedule and post to 9+ platforms automatically - Facebook, Instagram, LinkedIn & more',
			color: 'from-purple-500 to-pink-500',
		},
		{
			icon: <FileSpreadsheet className="w-8 h-8" />,
			title: 'Bank Statement Converter',
			description:
				'Convert PDF bank statements to Excel instantly with AI-powered accuracy',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			icon: <Zap className="w-8 h-8" />,
			title: 'Lightning Fast',
			description: 'Process documents in seconds with our optimized cloud infrastructure',
			color: 'from-yellow-500 to-orange-500',
		},
		{
			icon: <Shield className="w-8 h-8" />,
			title: 'Secure & Private',
			description: 'Bank-grade encryption ensures your data stays safe and confidential',
			color: 'from-green-500 to-emerald-500',
		},
	]

	const tools = [
		{ name: 'Bank Statement to Excel', users: '10K+', icon: '📊' },
		{ name: 'PDF Merger', users: '8K+', icon: '📄' },
		{ name: 'Image Compressor', users: '12K+', icon: '🖼️' },
		{ name: 'Social AutoPost', users: '5K+', icon: '🚀' }
	]

	const stats = [
		{ value: '50K+', label: 'Active Users' },
		{ value: '1M+', label: 'Files Processed' },
		{ value: '99.9%', label: 'Uptime' },
		{ value: '24/7', label: 'Support' }
	]

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-20 pb-32">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/50" />
				<div className="container mx-auto px-6 relative">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
							<Sparkles className="w-4 h-4" />
							Trusted by 50,000+ professionals
						</div>
						<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
							Your All-in-One
							<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
								{' '}
								Digital Workspace
							</span>
						</h1>
						<p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
							Automate social media, Convert documents, and boost productivity with
							our powerful suite of tools
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/register"
								className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
							>
								Start Free Trial
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/tools"
								className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								Explore Tools
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-12 bg-white/80 backdrop-blur-sm border-y border-gray-200">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="text-center"
							>
								<div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
									{stat.value}
								</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Powerful Features for Modern Teams
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Everything you need to streamline your workflow and save hours every
							week
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
								>
									{feature.icon}
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									{feature.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Tools Showcase */}
			<section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Popular Tools
						</h2>
						<p className="text-xl text-gray-600">
							Join thousands using our most loved features
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{tools.map((tool, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300"
							>
								<div className="text-4xl mb-4">{tool.icon}</div>
								<h3 className="text-lg font-bold text-gray-900 mb-2">
									{tool.name}
								</h3>
								<div className="text-purple-600 font-semibold">
									{tool.users} users
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-24">
				<div className="container mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								Why Choose SheetlyPro?
							</h2>
							<div className="space-y-6">
								{[
									'AI-powered document processing with 99% accuracy',
									'Multi-platform social media automation',
									'Bank-grade security and encryption',
									'Lightning-fast cloud processing',
									'24/7 customer support',
									'No credit card required for trial',
								].map((benefit, index) => (
									<div
										key={index}
										className="flex items-start gap-4"
									>
										<CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
										<p className="text-lg text-gray-700">{benefit}</p>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
									<TrendingUp className="w-12 h-12 mb-4" />
									<h3 className="text-2xl font-bold mb-4">
										Boost Productivity by 10x
									</h3>
									<p className="text-white/90 mb-6">
										Automate repetitive tasks and focus on what matters most
									</p>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span>Time Saved</span>
											<span className="font-bold">20+ hrs/week</span>
										</div>
										<div className="flex justify-between items-center">
											<span>Cost Reduction</span>
											<span className="font-bold">60%</span>
										</div>
										<div className="flex justify-between items-center">
											<span>Error Rate</span>
											<span className="font-bold">&lt;1%</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
				<div className="absolute inset-0 bg-grid-white/10" />
				<div className="container mx-auto px-6 relative">
					<div className="max-w-3xl mx-auto text-center text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Ready to Transform Your Workflow?
						</h2>
						<p className="text-xl text-white/90 mb-10">
							Join 50,000+ professionals who trust SheetlyPro for their daily
							tasks
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/register"
								className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
							>
								Get Started Free
							</Link>
							<Link
								to="/pricing"
								className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-200"
							>
								View Pricing
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default LandingPage
