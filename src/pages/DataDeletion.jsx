import React, { useEffect } from 'react'
import { setMeta } from '../utils/setMeta'
import { Trash2, Mail, UserX, Shield } from 'lucide-react'

function DataDeletion() {
	useEffect(() => {
		setMeta({
			title: 'Data Deletion Instructions | SheetlyPro',
			description: 'Learn how to delete your account and personal data from our platform.',
			keywords: 'data deletion, delete account, remove data, privacy',
			ogTitle: 'Data Deletion Instructions',
			ogDescription: 'Instructions for deleting your account and personal data.',
		})
	}, [])

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			<div className="text-center mb-8">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
					<Trash2 className="w-8 h-8 text-red-600" />
				</div>
				<h1 className="text-3xl font-bold mb-2">Data Deletion Instructions</h1>
				<p className="text-gray-600">How to delete your account and personal data</p>
			</div>

			<div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
				<p className="text-sm text-blue-800">
					<strong>Note:</strong> Once your account is deleted, all your data will be permanently removed and cannot be recovered.
				</p>
			</div>

			<h2 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
				<UserX className="w-5 h-5 text-purple-600" />
				Delete Your Account
			</h2>

			<div className="space-y-4 mb-8">

				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<h3 className="font-semibold mb-2 flex items-center gap-2">
						<Mail className="w-4 h-4 text-purple-600" />
						Contact Support
					</h3>
					<p className="text-gray-700 mb-3">
						If you cannot access your account or prefer assistance, email us at:
					</p>
					<a
						href="mailto:support@sheetlypro.com"
						className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
					>
						<Mail className="w-4 h-4" />
						support@sheetlypro.com
					</a>
					<p className="text-sm text-gray-600 mt-3">
						Include in your email:
					</p>
					<ul className="list-disc list-inside text-sm text-gray-600 ml-4">
						<li>Your registered email address</li>
						<li>Subject: "Account Deletion Request"</li>
						<li>Confirmation that you want to delete all your data</li>
					</ul>
				</div>
			</div>

			<h2 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
				<Shield className="w-5 h-5 text-purple-600" />
				What Data Will Be Deleted?
			</h2>
			<ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
				<li>Your account information (name, email, profile data)</li>
				<li>All uploaded files and processed documents</li>
				<li>Connected social media account tokens (if applicable)</li>
				<li>Scheduled posts and content (if applicable)</li>
				<li>Usage history and analytics data</li>
				<li>Subscription and payment history (as required by law)</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-4">Processing Time</h2>
			<p className="text-gray-700 mb-6">
				Account deletion requests are typically processed within <strong>30 days</strong>.
				You will receive a confirmation email once your data has been permanently deleted.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-4">Data Retention for Legal Purposes</h2>
			<p className="text-gray-700 mb-6">
				Some data may be retained for legal, tax, or regulatory compliance purposes as required by law,
				including transaction records and payment information. This data will be securely stored and
				deleted once the retention period expires.
			</p>

			<div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
				<h3 className="font-semibold mb-3">Need Help?</h3>
				<p className="text-gray-700 mb-4">
					If you have questions about data deletion or need assistance, please contact our support team:
				</p>
				<a
					href="mailto:support@sheetlypro.com"
					className="text-purple-600 underline font-semibold"
				>
					support@sheetlypro.com
				</a>
			</div>

			<div className="mt-8 pt-6 border-t border-gray-200">
				<p className="text-sm text-gray-600">
					For more information about how we handle your data, please read our{' '}
					<a href="/privacy-policy" className="text-purple-600 underline">
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	)
}

export default DataDeletion
