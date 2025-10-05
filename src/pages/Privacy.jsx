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
					details (processed securely by Lemon Squeezy, our payment provider).
				</li>
				<li>
					<strong>Account Data:</strong> Login credentials stored securely using industry-standard encryption.
				</li>
				<li>
					<strong>Uploaded Files:</strong> Bank statement PDF files you upload for conversion (temporarily stored for 24 hours only).
				</li>
				<li>
					<strong>Usage Data:</strong> Information about how you interact with our
					Services, such as uploads and features used.
				</li>
				<li>
					<strong>Authentication Cookies:</strong> Secure httpOnly cookies for maintaining your login session.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li>To provide, operate, and improve our PDF to Excel/CSV conversion Services.</li>
				<li>To process payments and manage subscriptions through Lemon Squeezy.</li>
				<li>To maintain your session using secure httpOnly cookies (cannot be accessed by JavaScript).</li>
				<li>To track your upload limits based on your subscription plan (Free: 1 per day, Paid: based on plan).</li>
				<li>To communicate with you regarding updates, support, and promotions.</li>
				<li>To protect against fraud, abuse, and unauthorized access.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
			<p className="mb-4">
				We do not sell your personal data. We may share your information with trusted
				third-party service providers strictly for business purposes:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Lemon Squeezy:</strong> For secure payment processing and subscription management.</li>
				<li><strong>Cloudinary:</strong> For temporary file storage (files automatically deleted after 24 hours).</li>
				<li><strong>Hosting Provider (Render):</strong> For running our backend services.</li>
			</ul>
			<p className="mb-4">
				These third parties are bound by confidentiality obligations and cannot use your data for other purposes.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention & Automatic Deletion</h2>
			<p className="mb-4">
				<strong>Your Privacy is Our Priority:</strong>
			</p>
			<ul className="list-disc list-inside mb-4 space-y-1">
				<li><strong>Uploaded Bank Statements:</strong> Automatically deleted after 24 hours for your security.</li>
				<li><strong>Converted Files:</strong> Available for download immediately, then permanently deleted after 24 hours.</li>
				<li><strong>Account Data:</strong> Retained as long as your account is active. You can delete your account anytime.</li>
				<li><strong>Authentication Cookies:</strong> Access tokens expire after 15 minutes, refresh tokens after 7 days.</li>
				<li><strong>Usage Records:</strong> Upload limits tracked per billing cycle, reset monthly/annually based on your plan.</li>
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
				<li><strong>httpOnly Cookies:</strong> Session tokens stored in httpOnly cookies, inaccessible to JavaScript (prevents XSS attacks).</li>
				<li><strong>SameSite Cookie Protection:</strong> Prevents CSRF (Cross-Site Request Forgery) attacks.</li>
				<li><strong>Token Rotation:</strong> Refresh tokens are rotated and blacklisted after use.</li>
				<li><strong>Short-lived Access Tokens:</strong> Access tokens expire after 15 minutes for enhanced security.</li>
				<li><strong>Password Encryption:</strong> Passwords hashed using industry-standard algorithms (bcrypt).</li>
				<li><strong>Secure File Storage:</strong> Files stored on Cloudinary with restricted access.</li>
			</ul>
			<p className="mb-4">
				However, no method of transmission over the Internet is 100% secure. We continuously monitor and update our security practices.
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
