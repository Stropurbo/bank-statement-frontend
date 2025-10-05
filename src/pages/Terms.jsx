import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function Terms() {
	useEffect(() => {
		setMeta({
			title: 'Terms of Service - Legal Agreement | SheetlyPro',
			description:
				'Read SheetlyPro terms of service and legal agreement. Understand your rights and responsibilities when using our PDF to Excel bank statement converter.',
			keywords:
				'terms of service, legal agreement, user agreement, PDF converter terms, bank statement converter legal',
			ogTitle: 'SheetlyPro Terms of Service - Legal Agreement',
			ogDescription:
				'Review SheetlyPro terms of service to understand the legal agreement for using our bank statement conversion service.',
		})
	}, [])

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<title>Terms of Service</title>
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
				(“we,” “our,” “us”). SheetlyPro is a tool that converts your bank statements
				into clean, ready-to-use CSV files. By accessing or using our website{' '}
				<span className="text-blue-500 underline">
					<a href="https://www.sheetlypro.com">www.sheetlypro.com</a>
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
				<li>Upload files larger than 20MB or attempt to bypass our file size limits.</li>
				<li>Attempt to circumvent upload limits or subscription restrictions.</li>
				<li>Share your account credentials with others.</li>
				<li>Use the Services in a way that could damage, disable, or impair functionality.</li>
				<li>Violate any applicable laws or regulations.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3.1 Upload Limits</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Free Users:</strong> 1 bank statement conversion per day.</li>
				<li><strong>Paid Users:</strong> Upload limits based on your subscription plan (monthly or annual billing cycle).</li>
				<li><strong>File Size:</strong> Maximum 20MB per PDF file.</li>
				<li><strong>File Retention:</strong> All uploaded files are automatically deleted after 24 hours for your security.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Subscription & Payment</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>SheetlyPro offers both free and paid subscription plans.</li>
				<li>Payments are processed securely via <strong>Lemon Squeezy</strong>, our trusted payment provider.</li>
				<li>Subscription plans are available on monthly or annual billing cycles.</li>
				<li>You can upgrade, downgrade, or cancel your subscription at any time through your account dashboard or customer portal.</li>
				<li>All fees are non-refundable unless required by law.</li>
				<li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
				<li>Upload limits reset at the beginning of each billing cycle (monthly or annual).</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">4.1 Cancellation & Refunds</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>You can cancel your subscription anytime through the customer portal.</li>
				<li>Upon cancellation, you retain access until the end of your current billing period.</li>
				<li>No partial refunds are provided for unused portions of the billing cycle.</li>
				<li>Refunds may be issued at our sole discretion in cases of service failure or technical issues.</li>
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
				. Key points:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Uploaded bank statements are automatically deleted after 24 hours.</li>
				<li>We use secure httpOnly cookies for authentication (cannot be accessed by JavaScript).</li>
				<li>All data transmission is encrypted using HTTPS/SSL.</li>
				<li>We do not sell or share your personal data with third parties except as required to provide our Services.</li>
				<li>You have the right to request deletion of your account and all associated data at any time.</li>
			</ul>

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
					href="mailto:contact@sheetlypro.com"
					className="underline"
				>
					contact@sheetlypro.com
				</a>
			</p>
		</div>
	)
}

export default Terms
