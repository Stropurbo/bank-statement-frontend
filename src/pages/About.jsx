import { Target, Zap, Shield, Clock, FileText, Users, TrendingUp } from 'lucide-react'
import AboveFooter from '../components/Home/AboveFooter'
import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function About() {

	useEffect(() => {
			setMeta({
				title: 'About SheetlyPro - Bank Statement Converter Tool',
				description: 'Learn about SheetlyPro - the leading bank statement converter tool. Transform PDF bank statements to Excel/CSV instantly with cutting-edge technology.',
				keywords: 'about sheetlypro, bank statement converter, PDF to Excel, financial data conversion, company mission',
				ogTitle: 'About SheetlyPro - Bank Statement Converter',
				ogDescription: 'Discover how SheetlyPro transforms bank statement processing with advanced technology and user-focused design.',
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
						Transforming the way you handle bank statements with cutting-edge
						technology and user-focused design.
					</p>
				</div>
			</div>

			{/* Mission Section */}
			<div className="py-20">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
						<p className="text-xl text-gray-600 leading-relaxed">
							We empower individuals, freelancers, and small businesses by
							automating the tedious task of transforming bank statements into
							structured CSV files. Our goal is to simplify financial workflows,
							reduce errors, and let you focus on what matters most – analysis and
							decision-making.
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-3 gap-8 mb-20">
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<FileText className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Instant Conversion
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Convert PDF or Excel bank statements into structured CSV files
								instantly with our advanced processing technology.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<Users className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Multi-Bank Support
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Support for multiple banks and statement formats ensures
								hassle-free processing regardless of your financial institution.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
								<TrendingUp className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Easy Integration
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Seamlessly import CSV files into your favorite accounting
								software or spreadsheets for immediate use.
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
										No technical skills required – simply upload your
										statement and receive a perfectly formatted CSV file.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Shield className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										Reliable & Secure
									</h3>
									<p className="text-gray-600 leading-relaxed">
										Lightning-fast processing with enterprise-grade security
										to protect your sensitive financial data.
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
										Automate repetitive data entry tasks and focus your
										energy on financial analysis and strategic decisions.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Target className="h-6 w-6 text-white" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										Precision Focused
									</h3>
									<p className="text-gray-600 leading-relaxed">
										Advanced algorithms ensure accurate data extraction and
										formatting, minimizing errors in your financial records.
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
							We envision a future where managing financial data is seamless and
							stress-free. SheetlyPro continues to innovate and evolve, becoming
							the go-to solution for effortless bank statement conversion
							worldwide.
						</p>

						{/* CTA Section */}
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Ready to Get Started?
							</h3>
							<p className="text-gray-600 mb-6">
								Join thousands of users who trust SheetlyPro for their financial
								data management needs.
							</p>
							<a
								href="mailto:support@sheetlypro.com"
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
