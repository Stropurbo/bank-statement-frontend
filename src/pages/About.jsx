import React from 'react'

function About() {
	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">About Us</h1>
			<p className="mb-6">
				Welcome to <strong>SheetlyPro</strong> – the easiest way to convert your bank
				statements into clean, ready-to-use CSV files. We believe managing your
				financial data shouldn’t be complicated or time-consuming, and our mission is to
				make bookkeeping effortless for individuals, freelancers, and small businesses.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
			<p className="mb-4">
				At SheetlyPro, our mission is to empower users by automating the tedious task of
				transforming bank statements into structured CSV files. We aim to simplify
				financial workflows and reduce errors so users can focus on analysis and
				decision-making.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">What We Do</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>
					Convert PDF or Excel bank statements into structured CSV files instantly.
				</li>
				<li>
					Support multiple banks and statement formats for hassle-free processing.
				</li>
				<li>
					Enable users to easily import CSV files into accounting software or
					spreadsheets.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>
					<strong>User-Friendly:</strong> No technical skills required – just upload
					your statement and get a CSV.
				</li>
				<li>
					<strong>Reliable & Secure:</strong> Fast processing with top-level security
					to protect your financial data.
				</li>
				<li>
					<strong>Time-Saving:</strong> Automate repetitive data entry and focus on
					analysis instead of formatting.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">Our Vision</h2>
			<p className="mb-6">
				We envision a future where managing financial data is seamless and stress-free.
				SheetlyPro continues to innovate to become the go-to solution for effortless
				bank statement conversion.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Get in Touch</h2>
			<p className="mb-4">
				Have questions, feedback, or suggestions? Reach out to us at: 
				{' '}
				<a
					href="mailto:myboguraapp@gmail.com"
					className="underline"
				>
					myboguraapp@gmail.com
				</a>
			</p>
		</div>
	)
}

export default About
