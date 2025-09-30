import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function Privacy() {
	useEffect(() => {
		setMeta({
			title: 'Privacy Policy - Data Protection | SheetlyPro',
			description:
				'Read SheetlyPro privacy policy to understand how we protect your data during PDF to Excel conversion. Learn about our data collection, usage, and security practices.',
			keywords:
				'privacy policy, data protection, security, PDF converter privacy, bank statement security, data safety',
			ogTitle: 'SheetlyPro Privacy Policy - Data Protection',
			ogDescription:
				'Learn how SheetlyPro protects your personal data and bank statement information with our comprehensive privacy policy.',
		})
	}, [])

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
			<p className="mb-4 text-sm text-gray-500">Last Updated: 21 September, 2025</p>

			<p className="mb-6">
				At <strong>SheetlyPro</strong> (“we,” “our,” “us”), we respect your privacy and
				are committed to protecting your personal data. SheetlyPro converts your bank
				statements into CSV files, and this Privacy Policy explains how we collect, use,
				and safeguard your information when you use our website (www.sheetlypro.com) and
				Services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>
					<strong>Personal Information:</strong> Name, email address, and payment
					details (processed securely by our payment providers).
				</li>
				<li>
					<strong>Usage Data:</strong> Information about how you interact with our
					Services, such as uploads and features used.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>To provide, operate, and improve our CSV conversion Services.</li>
				<li>To process payments and manage subscriptions.</li>
				<li>To communicate with you regarding updates, support, and promotions.</li>
				<li>To protect against fraud, abuse, and unauthorized access.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
			<p className="mb-4">
				We do not sell your personal data. We may share your information with trusted
				third-party service providers (such as payment processors and hosting providers)
				strictly for business purposes. These third parties are bound by confidentiality
				obligations.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention</h2>
			<p className="mb-4">
				We retain your information only as long as necessary to provide our Services and
				comply with legal obligations. You may request deletion of your account and
				associated data at any time.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">5. Security</h2>
			<p className="mb-4">
				We implement reasonable technical and organizational measures to safeguard your
				personal information. However, no method of transmission over the Internet is
				100% secure.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
			<p className="mb-2">Depending on your location, you may have the right to:</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Access, update, or delete your personal data.</li>
				<li>Object to or restrict processing of your data.</li>
				<li>Request a copy of the information we hold about you.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Services</h2>
			<p className="mb-4">
				Our Services may integrate with third-party tools. We are not responsible for
				the privacy practices of those third parties.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
			<p className="mb-4">
				Our Services are not directed to individuals under 18. We do not knowingly
				collect personal data from children.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to this Policy</h2>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. We will notify you by
				updating the “Last Updated” date at the top of this page.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
			<p className="mb-4">
				If you have any questions or concerns about this Privacy Policy, please contact
				us at:{' '}
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

export default Privacy
