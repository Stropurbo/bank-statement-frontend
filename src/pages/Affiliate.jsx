import React, { useEffect } from 'react'
import { Users, DollarSign, TrendingUp, Gift, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { setMeta } from '../utils/setMeta'

function Affiliate() {
	useEffect(() => {
		setMeta({
			title: 'Affiliate Program - Earn 20% Commission | SheetlyPro',
			description: 'Join SheetlyPro affiliate program and earn up to 20% commission promoting the best PDF to Excel converter. Free to join, monthly payouts, marketing materials included.',
			keywords: 'affiliate program, earn money online, PDF converter affiliate, commission, referral program, sheetlypro partner',
			ogTitle: 'SheetlyPro Affiliate Program - Earn 20% Commission',
			ogDescription: 'Join thousands of partners earning up to 20% commission by promoting SheetlyPro. Free to join with monthly payouts.',
		})
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			
			<div className="container mx-auto px-6 py-24">
				{/* Hero Section */}
				<div className="text-center mb-20">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						💰 Affiliate Program
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Earn Money Promoting
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							SheetlyPro
						</span>
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
						Join thousands of partners earning up to 20% commission by promoting the
						world's most trusted PDF to Excel conversion tool.
					</p>
					<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							Free to join
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							No minimum sales
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							Monthly payouts
						</div>
					</div>
				</div>

				{/* Benefits */}
				<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-20">
					<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<DollarSign className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold mb-3 text-gray-900">Up to 20%</h3>
						<p className="text-gray-600 text-sm">
							Commission on every sale you refer
						</p>
					</div>
					<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<TrendingUp className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold mb-3 text-gray-900">Growing Market</h3>
						<p className="text-gray-600 text-sm">
							High demand across all industries
						</p>
					</div>
					<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<Gift className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold mb-3 text-gray-900">Marketing Kit</h3>
						<p className="text-gray-600 text-sm">
							Banners, links & promotional materials
						</p>
					</div>
					<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-all duration-300">
						<div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<Users className="h-8 w-8 text-white" />
						</div>
						<h3 className="text-xl font-bold mb-3 text-gray-900">
							Dedicated Support
						</h3>
						<p className="text-gray-600 text-sm">Personal affiliate manager</p>
					</div>
				</div>

				{/* How it Works */}
				<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 mb-20 text-white">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-4">How It Works</h2>
						<p className="text-purple-100 text-lg">
							Start earning in just 3 simple steps
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center relative">
							<div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
								<span className="text-3xl font-bold text-white">1</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Sign Up Free</h3>
							<p className="text-purple-100">
								Create your affiliate account in under 2 minutes
							</p>
						</div>
						<div className="text-center relative">
							<div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
								<span className="text-3xl font-bold text-white">2</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Share & Promote</h3>
							<p className="text-purple-100">
								Use your unique link and marketing materials
							</p>
						</div>
						<div className="text-center relative">
							<div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
								<span className="text-3xl font-bold text-white">3</span>
							</div>
							<h3 className="text-2xl font-bold mb-4">Earn Commission</h3>
							<p className="text-purple-100">
								Get paid monthly for every successful referral
							</p>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="grid md:grid-cols-3 gap-8 mb-20">
					<div className="text-center">
						<div className="text-4xl font-bold text-purple-600 mb-2">20%+</div>
						<p className="text-gray-600">Affiliate Commissions</p>
					</div>
					<div className="text-center">
						<div className="text-4xl font-bold text-purple-600 mb-2">Weekly</div>
						<p className="text-gray-600">Fast Payouts</p>
					</div>
					<div className="text-center">
						<div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
						<p className="text-gray-600">Affiliate Support</p>
					</div>
				</div>

				{/* CTA */}
				<div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center">
					<div className="flex justify-center mb-6">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className="h-6 w-6 text-yellow-400 fill-current"
							/>
						))}
					</div>
					<h3 className="text-3xl font-bold text-gray-900 mb-4">
						Ready to Start Earning?
					</h3>
					<p className="text-gray-600 mb-8 text-lg">
						Join thousands of successful affiliates promoting SheetlyPro
					</p>
					<a
						href="https://store.sheetlypro.com/affiliates"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-5 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-2xl">
							Join Affiliate Program
							<ArrowRight className="inline-block ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
						</button>
					</a>
					<div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							No setup fees
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							Instant approval
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							24/7 support
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Affiliate
