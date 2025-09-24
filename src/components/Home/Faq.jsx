import React, { useState, useRef } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react'

function Faq() {
	const [openIndex, setOpenIndex] = useState(null)
	const contentRefs = useRef([])

	const faqs = [
		{
			question: 'How accurate is the PDF to Excel conversion?',
			answer: 'Our AI-powered system achieves 99.9% accuracy in extracting data from bank statements. We use advanced OCR technology combined with machine learning to ensure precise data extraction and formatting.',
			category: 'accuracy',
		},
		{
			question: 'Is my financial data secure and private?',
			answer: 'Absolutely. We use bank-grade encryption (AES-256) to protect your data. Files are processed securely and automatically deleted after conversion. We never store or share your financial information.',
			category: 'security',
		},
		{
			question: 'Which banks and file formats are supported?',
			answer: 'We support PDF statements from worldwide banks including Bank of America, Wells Fargo, and international banks. Output formats include Excel (.xlsx) or CSV files.',
			category: 'compatibility',
		},
		{
			question: 'How fast is the conversion process?',
			answer: 'Most bank statements are converted in under 10 seconds. Processing time depends on file size and complexity, but our AI engine is optimized for speed without compromising accuracy.',
			category: 'performance',
		},
		{
			question: 'Can I cancel or change my subscription anytime?',
			answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we provide prorated billing for upgrades.',
			category: 'billing',
		},
		{
			question: 'What if my PDF is password-protected?',
			answer: "No problem! Our system can handle password-protected PDFs. Simply enter the password during upload, and we'll securely process your statement while maintaining full encryption.",
			category: 'technical',
		},
	]

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section className="py-24 bg-gradient-to-b from-white to-gray-50">
			<div className="container mx-auto px-6">
				{/* Section Header */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
						<HelpCircle className="h-4 w-4" />
						FAQ
					</div>
					<h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
						Got Questions?
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							We Have Answers
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Everything you need to know about converting your bank statements to Excel.
						Can't find what you're looking for? Contact our support team.
					</p>
				</div>

				{/* FAQ Items */}
				<div className="max-w-4xl mx-auto">
					<div className="space-y-6">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden ${
									openIndex === index
										? 'border-purple-200 shadow-xl shadow-purple-100'
										: 'border-gray-200 hover:border-purple-200 hover:shadow-xl'
								}`}
							>
								<button
									onClick={() => toggleFAQ(index)}
									className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none group"
								>
									<h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors pr-4">
										{faq.question}
									</h3>
									<div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
										openIndex === index
											? 'bg-purple-600 text-white'
											: 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
									}`}>
										{openIndex === index ? (
											<ChevronUp className="w-5 h-5" />
										) : (
											<ChevronDown className="w-5 h-5" />
										)}
									</div>
								</button>

								<div
									ref={(el) => (contentRefs.current[index] = el)}
									className="px-8 text-gray-600 border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden"
									style={{
										maxHeight:
											openIndex === index
												? `${contentRefs.current[index]?.scrollHeight}px`
												: '0px',
									}}
								>
									<div className="py-6">
										<p className="leading-relaxed text-lg">{faq.answer}</p>
									</div>
								</div>
							</div>
						))}
					</div>

					

					{/* Bottom CTA */}
					<div className="text-center mt-16">
						<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
							<h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
							<p className="text-purple-100 mb-6 text-lg">Our support team is here to help you 24/7</p>
							<a
								href="/contact"
								className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
							>
								Contact Support
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Faq
