import { Target, Zap, Shield, Clock, FileText, Users, TrendingUp, Sparkles } from 'lucide-react'
import AboveFooter from '../pdf_to_excel/AboveFooter'
import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function About() {
	useEffect(() => {
		setMeta({
			title: 'About SheetlyPro - Business Productivity Tools',
			description:
				'Learn about SheetlyPro - your all-in-one platform for document conversion, social media automation, and business productivity tools.',
			keywords:
				'about sheetlypro, business tools, PDF converter, social media automation, productivity platform',
			ogTitle: 'About SheetlyPro - Business Productivity Platform',
			ogDescription:
				'Discover how SheetlyPro transforms business workflows with powerful tools and user-focused design.',
		})
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
			{/* Hero Section */}

			<div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-20">
				<div className="container mx-auto px-6 text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
						About SheetlyPro
					</h1>
					<p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
						Your all-in-one platform for document processing, social media automation,
						and business productivity tools.
					</p>
				</div>
			</div>

			{/* Mission Section */}
			<div className="py-20">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
						<p className="text-xl text-gray-600 leading-relaxed">
							We empower individuals, freelancers, and businesses by providing
							powerful tools that automate tedious tasks. From document conversion
							to social media management, our goal is to simplify workflows,
							reduce errors, and let you focus on what matters most – growing your business.
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-3 gap-8 mb-20">
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<FileText className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Intelligent Document Processing
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Transform, optimize, and manage your documents with AI-powered
								conversion and processing technology.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<Sparkles className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Marketing Automation Suite
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Streamline your digital presence with powerful automation tools
								for content scheduling, publishing, and performance tracking.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<TrendingUp className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Enterprise Productivity Tools
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Elevate your workflow with professional-grade tools designed
								for efficiency, accuracy, and seamless integration.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-20">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
							Why Choose SheetlyPro?
						</h2>

						<div className="grid md:grid-cols-2 gap-8">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Zap className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										User-Friendly
									</h3>
									<p className="text-gray-600 leading-relaxed">
										No technical skills required – intuitive interfaces
										designed for everyone from beginners to professionals.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Shield className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										Secure & Private
									</h3>
									<p className="text-gray-600 leading-relaxed">
										Enterprise-grade security with automatic file deletion
										and encrypted data storage to protect your information.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Clock className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										Time-Saving
									</h3>
									<p className="text-gray-600 leading-relaxed">
										Automate repetitive tasks and save hours every week
										with our powerful automation tools.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Target className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										All-in-One Platform
									</h3>
									<p className="text-gray-600 leading-relaxed">
										Multiple tools in one place – no need to juggle
										between different services and subscriptions.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Vision Section */}
			<div className="py-20">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold text-gray-900 mb-8">Our Vision</h2>
						<p className="text-xl text-gray-600 leading-relaxed mb-12">
							We envision a future where managing business tasks is seamless and
							stress-free. SheetlyPro continues to innovate and evolve, adding
							new tools and features to become your complete business productivity
							platform.
						</p>

						{/* Business Info */}
						<div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Business Information</h3>
							<div className="text-gray-700 space-y-2">
								<p><strong>Legal Business Name:</strong> Sabbir Hasan</p>
								<p><strong>Owner:</strong> Sabbir Hasan</p>
								<p><strong>Contact Email:</strong> hasansabbir263@gmail.com</p>
								<p><strong>Business Email:</strong> contact@sheetlypro.com</p>
							</div>
						</div>

						{/* CTA Section */}
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Ready to Get Started?
							</h3>
							<p className="text-gray-600 mb-6">
								Join thousands of users who trust SheetlyPro for their business
								productivity needs.
							</p>
							<a
								href="mailto:contact@sheetlypro.com"
								className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								Contact Us Today
							</a>
						</div>
					</div>
				</div>
			</div>

			<AboveFooter />
		</div>
	)
}

export default About
