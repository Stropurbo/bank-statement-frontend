import React from 'react'

function AboveFooter() {
	return (
		<div className="bg-gradient-to-r from-purple-500 via-purple-100 to-purple-700 py-16 px-4 text-center mt-10">
			<h2 className="text-4xl font-bold text-black mb-4">
				Turn Your PDFs into Organized Excel Sheets Instantly
			</h2>
			<p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
				Tired of manually copying numbers from bank statements? SheetlyPro automatically
				converts your PDFs into clean, structured Excel files—fast, accurate, and
				hassle-free. Just upload, and your data is ready to use!
			</p>
			<a
				href="pricing"
				className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
			>
				Get Started Now
			</a>
		</div>
	)
}

export default AboveFooter
