import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function Terms() {
	useEffect(() => {
		setMeta({
			title: 'Terms of Service - Legal Agreement | SheetlyPro',
			description:
				'Read our terms of service and legal agreement. Understand your rights and responsibilities when using our services.',
			keywords:
				'terms of service, legal agreement, user agreement',
			ogTitle: 'Terms of Service - Legal Agreement',
			ogDescription:
				'Review our terms of service to understand the legal agreement for using our platform.',
		})
	}, [])

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<title>Terms of Service</title>
			<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
			<p className="mb-4 text-sm text-gray-500">Last Updated: January 15, 2025</p>

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
				("we," "our," "us"). We provide various business tools and services including
				document conversion, social media automation, receipt scanning, invoice generation,
				and more. By accessing or using our Services, you agree to be bound by these
				Terms of Service ("Terms"). Please read them carefully.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
			<p className="mb-4">
				You must be at least 18 years old (or the legal age of majority in your
				jurisdiction) to use our Services. By using our platform, you represent and
				warrant that you meet these requirements.
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
				<li>You are responsible for all activities that occur under your account.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3. Use of Services</h2>
			<p className="mb-2">
				You agree to use our Services only for lawful purposes. You must not:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Attempt to copy, modify, or reverse-engineer our software.</li>
				<li>Share your account credentials with others.</li>
				<li>Upload files larger than specified limits or attempt to bypass restrictions.</li>
				<li>Use the Services to process illegal content or violate third-party rights.</li>
				<li>Attempt to circumvent usage limits or subscription restrictions.</li>
				<li>Use the Services in a way that could damage, disable, or impair functionality.</li>
				<li>Violate any applicable laws, regulations, or third-party terms of service.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3.1 Usage Limits</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Free Users:</strong> Limited usage per day based on the specific service.</li>
				<li><strong>Paid Users:</strong> Usage limits based on your subscription plan.</li>
				<li><strong>File Size:</strong> Maximum file size varies by service (typically 20MB).</li>
				<li><strong>File Retention:</strong> All uploaded files are automatically deleted after processing or within 24 hours.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3.2 Third-Party Platform Compliance</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>For services requiring third-party integrations, you must comply with their terms of service.</li>
				<li>You are responsible for ensuring your use meets platform-specific guidelines.</li>
				<li>We are not responsible if your accounts are suspended or banned by third-party platforms.</li>
				<li>You grant us permission to access authorized third-party services on your behalf.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Subscription & Payment</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>We offer both free and paid subscription plans.</li>
				<li>Payments are processed securely via our trusted payment provider.</li>
				<li>Subscription plans are available on monthly or annual billing cycles.</li>
				<li>You can upgrade, downgrade, or cancel your subscription at any time.</li>
				<li>All fees are non-refundable unless required by law.</li>
				<li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
				<li>Usage limits reset at the beginning of each billing cycle.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">4.1 Cancellation & Refunds</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>You can cancel your subscription anytime through your account settings.</li>
				<li>Upon cancellation, you retain access until the end of your current billing period.</li>
				<li>No partial refunds are provided for unused portions of the billing cycle.</li>
				<li>Refunds may be issued at our sole discretion in cases of service failure or technical issues.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
			<p className="mb-4">
				All content, trademarks, and software related to our platform remain our property
				or our licensors'. You are granted a limited, non-exclusive, non-transferable
				license to use the Services. You retain ownership of all content you upload and create.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">6. Data & Privacy</h2>
			<p className="mb-4">
				Your use of our Services is also governed by our{' '}
				<a
					href="/privacy-policy"
					className="text-blue-600 underline"
				>
					Privacy Policy
				</a>
				. Key points:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Uploaded files are automatically deleted after processing or within 24 hours.</li>
				<li>We use OAuth 2.0 for secure authentication with third-party platforms.</li>
				<li>Access tokens are encrypted and stored securely.</li>
				<li>We use secure httpOnly cookies for authentication.</li>
				<li>All data transmission is encrypted using HTTPS/SSL.</li>
				<li>We do not sell or share your personal data except as required to provide our Services.</li>
				<li>You have the right to request deletion of your account and all associated data at any time.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">7. Service Availability</h2>
			<p className="mb-4">
				We strive to provide reliable service, but we do not guarantee uninterrupted access.
				We may suspend or modify the Services for maintenance, updates, or other reasons.
				We are not liable for processing failures due to third-party platform issues or API changes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">8. Termination</h2>
			<p className="mb-4">
				We may suspend or terminate your access if you violate these Terms. You may also
				cancel your account at any time. Upon termination, your right to use the Services
				ceases immediately.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">9. Disclaimer of Warranties</h2>
			<p className="mb-4">
				Our Services are provided "as is" and "as available." We make no warranties
				regarding uninterrupted or error-free use. We do not guarantee perfect accuracy
				in file conversions or data extraction.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">10. Limitation of Liability</h2>
			<p className="mb-4">
				To the maximum extent permitted by law, we shall not be liable for any
				indirect, incidental, or consequential damages arising out of your use of the
				Services, including but not limited to lost revenue, data loss, or account suspensions
				on third-party platforms.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">11. Governing Law</h2>
			<p className="mb-4">
				These Terms are governed by and construed under the laws of the{' '}
				<strong>State of Delaware, United States</strong>, without regard to its
				conflict of law principles. You agree to submit to the exclusive jurisdiction of
				the courts located in Delaware for the resolution of any disputes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">12. Changes to Terms</h2>
			<p className="mb-4">
				We may update these Terms from time to time. Continued use of the Services means
				you accept the revised Terms. We will notify you of significant changes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">13. Contact Us</h2>
			<p className="mb-4">
				If you have questions about these Terms, please contact us at:{' '}
				<a
					href="mailto:support@sheetlypro.com"
					className="underline"
				>
					support@sheetlypro.com
				</a>
			</p>
		</div>
	)
}

export default Terms
