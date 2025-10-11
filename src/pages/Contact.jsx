import React, { useEffect, useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'
import AboveFooter from '../pdf_to_excel/AboveFooter'
import { setMeta } from '../utils/setMeta'

function Contact() {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		setMeta({
			title: 'Contact Us - Get Support | SheetlyPro',
			description:
				'Contact SheetlyPro support team for help with PDF to Excel conversion. Get answers to your questions about bank statement processing within 24 hours.',
			keywords:
				'contact sheetlypro, customer support, help, PDF converter support, bank statement help, technical support',
			ogTitle: 'Contact SheetlyPro - Customer Support',
			ogDescription:
				'Get help with SheetlyPro bank statement converter. Contact our support team for questions and assistance.',
		})
	}, [])

	const email = 'contact@sheetlypro.com'

	const copyEmail = () => {
		navigator.clipboard.writeText(email)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-20">
				<div className="container mx-auto px-6 text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
						Get in Touch
					</h1>
					<p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
						Have questions about SheetlyPro? We're here to help you transform your
						bank statements into professional reports.
					</p>
				</div>
			</div>

			{/* Contact Section */}
			<div className="py-20">
				<div className="container mx-auto px-6">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
						<p className="text-lg text-gray-600 mb-12 leading-relaxed">
							Ready to get started or have questions? Drop us an email and we'll
							get back to you as soon as possible.
						</p>

						{/* Email Card */}
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
							<div className="flex flex-col items-center space-y-6">
								<div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
									<Mail className="h-10 w-10 text-white" />
								</div>
								<div className="text-center">
									<h3 className="text-2xl font-bold text-gray-900 mb-2">
										Email Us
									</h3>
									<p className="text-gray-600 mb-6">
										Send us your questions and we'll respond within 24 hours
									</p>
									<div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-lg p-4">
										<span className="text-xl font-semibold text-gray-900">
											{email}
										</span>
										<button
											onClick={copyEmail}
											className={`p-2 rounded-lg transition-all duration-200 ${
												copied
													? 'bg-green-100 text-green-600'
													: 'text-gray-500 hover:text-purple-600 hover:bg-white'
											}`}
											title={copied ? 'Copied!' : 'Copy email address'}
										>
											{copied ? (
												<Check className="h-5 w-5" />
											) : (
												<Copy className="h-5 w-5" />
											)}
										</button>
									</div>
								</div>
								<a
									href={`mailto:${email}`}
									className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
								>
									<Mail className="h-5 w-5" />
									<span>Send Email</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<AboveFooter />
		</div>
	)
}

export default Contact
