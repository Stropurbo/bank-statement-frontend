import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

const PaymentFail = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/pricing');
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-red-50">
			<div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
				<div className="text-red-500 text-6xl mb-4">✗</div>
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Payment Failed!
				</h1>
				<p className="text-gray-600 mb-4">
					Sorry, your payment could not be processed. Please try again.
				</p>
				<p className="text-sm text-gray-500 mb-6">
					Redirecting to pricing page in 5 seconds...
				</p>
				<div className="space-x-4">
					<Link 
						to="/pricing" 
						className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
					>
						Try Again
					</Link>
					<Link 
						to="/" 
						className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
					>
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaymentFail;