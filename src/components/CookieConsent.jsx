import React, { useState, useEffect } from 'react'

export default function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent')
		if (!consent) {
			setShowBanner(true)
		} else if (consent === 'accepted') {
			// Enable analytics if previously accepted
			window.gtag && window.gtag('consent', 'update', { analytics_storage: 'granted' })
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookieConsent', 'accepted')
		setShowBanner(false)
		window.gtag && window.gtag('consent', 'update', { analytics_storage: 'granted' })
		// window.fbq && window.fbq('consent', 'grant')

	}

	const handleReject = () => {
		localStorage.setItem('cookieConsent', 'rejected')
		setShowBanner(false)
		// Disable tracking
		window.gtag && window.gtag('consent', 'update', { analytics_storage: 'denied' })
	}

	if (!showBanner) return null

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
				<p className="text-sm">
					We use cookies to improve your experience and analyze site traffic.{' '}
					<a href="/privacy-policy" className="underline">
						Learn more
					</a>
				</p>
				<div className="flex gap-3">
					<button
						onClick={handleReject}
						className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
					>
						Reject
					</button>
					<button
						onClick={handleAccept}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	)
}
