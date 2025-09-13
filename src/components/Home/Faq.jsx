import React, { useState, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Faq() {
	const [openIndex, setOpenIndex] = useState(null)
	const contentRefs = useRef([])

	const faqs = [
		{
			question: 'Can I switch between monthly and annual billing?',
			answer: 'Yes! You can toggle between monthly and annual plans anytime. Annual billing gives you a discounted rate and calculates your pages per year automatically.',
		},
		{
			question: 'How do I know how many pages I’ve used?',
			answer: 'Your account dashboard shows a real-time counter of how many pages you’ve converted and how many remain for the current billing period.',
		},
		{
			question: 'What formats are supported?',
			answer: 'Our system supports PDF bank statements and converts them into Excel files (.csv) with properly formatted rows and columns.',
		},
		{
			question: 'Is my financial data safe?',
			answer: 'Absolutely. We use industry-standard encryption to protect your data. Files are processed securely.',
		},
		{
			question: 'Can I upgrade or downgrade my plan later?',
			answer: 'Yes! You can change your plan at any time. If you upgrade, your remaining pages and billing period will adjust accordingly.',
		},
	]

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className="max-w-5xl mx-auto mt-20 px-4">
			<h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
				Frequently Asked Questions
			</h2>

			<div className="space-y-4">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
					>
						<button
							onClick={() => toggleFAQ(index)}
							className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
						>
							{faq.question}
							{openIndex === index ? (
								<ChevronUp className="w-5 h-5 text-gray-600 transition-transform duration-300" />
							) : (
								<ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-300" />
							)}
						</button>

						<div
							ref={(el) => (contentRefs.current[index] = el)}
							className={`px-6 text-gray-600 border-t border-gray-200 transition-max-height duration-500 ease-in-out overflow-hidden`}
							style={{
								maxHeight:
									openIndex === index
										? `${contentRefs.current[index]?.scrollHeight}px`
										: '0px',
							}}
						>
							<p className="py-4">{faq.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Faq
