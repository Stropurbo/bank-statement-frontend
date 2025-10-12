import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'

function Privacy() {
	useEffect(() => {
		setMeta({
			title: 'Privacy Policy - Data Protection | SheetlyPro',
			description:
				'Read our privacy policy to understand how we protect your data. Learn about our data collection, usage, and security practices.',
			keywords:
				'privacy policy, data protection, security, data safety',
			ogTitle: 'Privacy Policy - Data Protection',
			ogDescription:
				'Learn how we protect your personal data with our comprehensive privacy policy.',
		})
	}, [])

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
			<p className="mb-4 text-sm text-gray-500">Last Updated: January 15, 2025</p>

			<p className="mb-6">
				At <strong>SheetlyPro</strong> ("we," "our," "us"), we respect your privacy and
				are committed to protecting your personal data. We provide various business tools
				including document conversion, social media automation, receipt scanning, and more.
				This Privacy Policy explains how we collect, use, and safeguard your information
				when you use our Services.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>
					<strong>Personal Information:</strong> Name, email address, and payment details.
				</li>
				<li>
					<strong>Account Data:</strong> Login credentials stored securely using industry-standard encryption.
				</li>
				<li>
					<strong>Uploaded Files:</strong> Documents, images, and files you upload for processing (automatically deleted after processing or within 24 hours).
				</li>
				<li>
					<strong>Third-Party Account Access:</strong> For services requiring social media or third-party integrations, we store encrypted access tokens.
				</li>
				<li>
					<strong>Usage Data:</strong> Information about how you interact with our Services.
				</li>
				<li>
					<strong>Authentication Cookies:</strong> Secure httpOnly cookies for maintaining your login session.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>To provide, operate, and improve our Services.</li>
				<li>To process your files and deliver converted/processed results.</li>
				<li>To connect to authorized third-party services when applicable.</li>
				<li>To process payments and manage subscriptions.</li>
				<li>To maintain your session using secure httpOnly cookies.</li>
				<li>To provide analytics and insights where applicable.</li>
				<li>To communicate with you regarding updates, support, and promotions.</li>
				<li>To protect against fraud, abuse, and unauthorized access.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
			<p className="mb-4">
				We do not sell your personal data. We may share your information with:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Third-Party Platforms:</strong> When you authorize us to connect to services like social media platforms or other integrations.</li>
				<li><strong>Payment Processors:</strong> For secure payment processing and subscription management.</li>
				<li><strong>Cloud Storage Providers:</strong> For temporary file storage during processing.</li>
				<li><strong>Hosting Providers:</strong> For running our backend services.</li>
			</ul>
			<p className="mb-4">
				These third parties are bound by confidentiality obligations and cannot use your data for other purposes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention</h2>
			<p className="mb-4">
				<strong>Your Privacy is Our Priority:</strong>
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Uploaded Files:</strong> Automatically deleted after processing or within 24 hours for your security.</li>
				<li><strong>Processed Files:</strong> Available for download immediately, then permanently deleted after 24 hours.</li>
				<li><strong>Third-Party Tokens:</strong> Encrypted and stored securely. Automatically refreshed as needed.</li>
				<li><strong>Account Data:</strong> Retained as long as your account is active. You can delete your account anytime.</li>
				<li><strong>Authentication Cookies:</strong> Session tokens managed securely with automatic expiration.</li>
				<li><strong>Usage Records:</strong> Tracked per billing cycle, reset based on your plan.</li>
			</ul>
			<p className="mb-4">
				You may request complete deletion of your account and all associated data at any time by contacting us.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">5. Security Measures</h2>
			<p className="mb-4">
				We implement industry-leading security measures to protect your data:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>HTTPS/SSL Encryption:</strong> All data transmitted between your browser and our servers is encrypted.</li>
				<li><strong>OAuth 2.0:</strong> Secure authentication with third-party platforms without storing your passwords.</li>
				<li><strong>Token Encryption:</strong> Access tokens encrypted at rest and in transit.</li>
				<li><strong>httpOnly Cookies:</strong> Session tokens stored in httpOnly cookies, inaccessible to JavaScript.</li>
				<li><strong>Password Encryption:</strong> Passwords hashed using industry-standard algorithms.</li>
				<li><strong>Secure File Storage:</strong> Files stored with restricted access and encryption.</li>
				<li><strong>Regular Security Audits:</strong> Continuous monitoring and security updates.</li>
			</ul>
			<p className="mb-4">
				However, no method of transmission over the Internet is 100% secure. We continuously monitor and update our security practices.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
			<p className="mb-2">Depending on your location, you may have the right to:</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>Access, update, or delete your personal data.</li>
				<li>Revoke access to connected third-party accounts.</li>
				<li>Object to or restrict processing of your data.</li>
				<li>Request a copy of the information we hold about you.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Services</h2>
			<p className="mb-4">
				Our Services may integrate with third-party platforms and tools. We are not responsible for
				the privacy practices of those third parties. Please review their privacy policies.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">8. Children's Privacy</h2>
			<p className="mb-4">
				Our Services are not directed to individuals under 18. We do not knowingly
				collect personal data from children.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to this Policy</h2>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. We will notify you by
				updating the "Last Updated" date at the top of this page.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
			<p className="mb-4">
				If you have any questions or concerns about this Privacy Policy, please contact
				us at:{' '}
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

export default Privacy
