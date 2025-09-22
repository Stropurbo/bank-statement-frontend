import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

const PaymentSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/');
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);
	return (
		<div className="min-h-screen flex items-center justify-center bg-green-50">
			<div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
				<div className="text-green-500 text-6xl mb-4">✓</div>
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Payment Successful!
				</h1>
				<p className="text-gray-600 mb-4">
					Thank you for your subscription. Your payment has been processed successfully.
				</p>
				<p className="text-sm text-gray-500 mb-6">
					Redirecting to home page in 3 seconds...
				</p>
				<Link 
					to="/" 
					className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
				>
					Return to Home
				</Link>
			</div>
		</div>
	);
};

export default PaymentSuccess;
