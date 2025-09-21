import React from 'react'

function Terms() {
	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
			<p className="mb-4 text-sm text-gray-500">Last Updated: 21 September, 2025</p>

			<p className="mb-6">
				Welcome to{' '}
				<strong>
					<a
						target="_blank"
						href="/"
					>
						SheetlyPro
					</a>
				</strong>{' '}
				(“we,” “our,” “us”). By accessing or using our website{' '}
				<span className="text-blue-500">
					<a href="www.sheetlypro.com">www.sheetlypro.com</a>
				</span>{' '}
				and services (“Services”), you agree to be bound by these Terms of Service
				(“Terms”). Please read them carefully.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
			<p className="mb-4">
				You must be at least 18 years old (or the legal age of majority in your
				jurisdiction) to use our Services. By using{' '}
				<strong>
					<a
						target="_blank"
						href="/"
					>
						SheetlyPro
					</a>
				</strong>
				, you represent and warrant that you meet these requirements.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">2. Account Registration</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>To access certain features, you may need to create an account.</li>
				<li>
					You are responsible for maintaining the confidentiality of your login
					credentials.
				</li>
				<li>
					You agree that the information you provide is accurate, complete, and up to
					date.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3. Use of Services</h2>
			<p className="mb-2">
				You agree to use SheetlyPro only for lawful purposes. You must not:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Attempt to copy, modify, or reverse-engineer our software.</li>
				<li>
					Use the Services in a way that could damage, disable, or impair
					functionality.
				</li>
				<li>Violate any applicable laws or regulations.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Subscription & Payment</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Some features require a paid subscription.</li>
				<li>Payments are processed securely via our trusted payment providers.</li>
				<li>All fees are non-refundable unless required by law.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
			<p className="mb-4">
				All content, trademarks, and software related to SheetlyPro remain our property
				or our licensors’. You are granted a limited, non-exclusive, non-transferable
				license to use the Services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">6. Data & Privacy</h2>
			<p className="mb-4">
				Your use of SheetlyPro is also governed by our{' '}
				<a
					href="/privacy-policy"
					className="text-blue-600 underline"
				>
					Privacy Policy
				</a>
				. We take reasonable steps to protect your data but cannot guarantee absolute
				security.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
			<p className="mb-4">
				We may suspend or terminate your access if you violate these Terms. You may also
				cancel your account at any time.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">8. Disclaimer of Warranties</h2>
			<p className="mb-4">
				Our Services are provided “as is” and “as available.” We make no warranties
				regarding uninterrupted or error-free use.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">9. Limitation of Liability</h2>
			<p className="mb-4">
				To the maximum extent permitted by law, SheetlyPro shall not be liable for any
				indirect, incidental, or consequential damages arising out of your use of the
				Services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">10. Governing Law</h2>
			<p className="mb-4">
				These Terms are governed by and construed under the laws of the{' '}
				<strong>State of Delaware, United States</strong>, without regard to its
				conflict of law principles. You agree to submit to the exclusive jurisdiction of
				the courts located in Delaware for the resolution of any disputes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
			<p className="mb-4">
				We may update these Terms from time to time. Continued use of the Services means
				you accept the revised Terms.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">12. Contact Us</h2>
			<p className="mb-4">
				If you have questions about these Terms, please contact us at:{' '}
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

export default Terms
