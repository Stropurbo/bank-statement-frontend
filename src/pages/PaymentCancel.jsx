import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentCancel() {
  const navigate = useNavigate()

  return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<title>Payment Cancel</title>
			<div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
				<div className="text-red-500 text-6xl mb-4">✕</div>
				<h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
				<p className="text-gray-600 mb-6">
					Your payment has been cancelled. No charges were made.
				</p>
				<button
					onClick={() => navigate('/')}
					className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
				>
					Return Home
				</button>
			</div>
		</div>
  )
}

export default PaymentCancel
