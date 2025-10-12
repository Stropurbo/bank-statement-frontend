import React from 'react'
import { Link } from 'react-router'
import { Calendar, Zap, BarChart3, Users, CheckCircle, ArrowRight, Clock, Sparkles } from 'lucide-react'
import useAuthContext from '../hooks/useAuthContext'

function AutoPost() {
	const { user } = useAuthContext()

	// Platform Icons (All free to use, no attribution required - from UXWing)
	const TwitterIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png"
			alt="Twitter/X"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const InstagramIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/ig-instagram-icon.png"
			alt="Instagram"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const FacebookIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-round-color-icon.png"
			alt="Facebook"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const LinkedInIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png"
			alt="LinkedIn"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const YouTubeIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-app-icon.png"
			alt="YouTube"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const TikTokIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/tiktok-color-icon.png"
			alt="TikTok"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const BlueskyIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bluesky-icon.png"
			alt="Bluesky"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const ThreadsIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
			alt="Threads"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const PinterestIcon = () => (
		<img
			src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/pinterest-round-color-icon.png"
			alt="Pinterest"
			className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
		/>
	)

	const features = [
		{
			icon: <Calendar className="w-6 h-6" />,
			title: 'Smart Scheduling',
			description: 'Plan and schedule your content across all platforms with AI-powered timing recommendations'
		},
		{
			icon: <Zap className="w-6 h-6" />,
			title: 'Auto Publish',
			description: 'Set it and forget it. Posts go live automatically at the perfect time for maximum engagement'
		},
		{
			icon: <BarChart3 className="w-6 h-6" />,
			title: 'Advanced Analytics',
			description: 'Track performance metrics, engagement rates, and audience growth with real-time insights'
		},
		{
			icon: <Users className="w-6 h-6" />,
			title: 'Multi-Account Hub',
			description: 'Manage unlimited social media accounts from a single, unified dashboard'
		},
		{
			icon: <Sparkles className="w-6 h-6" />,
			title: 'AI Content Assistant',
			description: 'Generate engaging captions, hashtags, and content ideas that match your brand voice'
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: 'Best Time Optimizer',
			description: 'AI analyzes your audience to suggest optimal posting times for each platform'
		}
	]

	const platforms = [
		{ name: 'Twitter/X', icon: <TwitterIcon /> },
		{ name: 'Instagram', icon: <InstagramIcon /> },
		{ name: 'LinkedIn', icon: <LinkedInIcon /> },
		{ name: 'Facebook', icon: <FacebookIcon /> },
		{ name: 'TikTok', icon: <TikTokIcon /> },
		{ name: 'YouTube', icon: <YouTubeIcon /> },
		{ name: 'Bluesky', icon: <BlueskyIcon /> },
		{ name: 'Threads', icon: <ThreadsIcon /> },
		{ name: 'Pinterest', icon: <PinterestIcon /> }
	]

	const benefits = [
		'Save 10+ hours per week on social media management',
		'Maintain consistent posting schedule across all platforms',
		'Never miss optimal posting times with AI recommendations',
		'Organize content with visual calendar and drag-drop interface',
		'Preview posts before they go live with platform-specific views',
		'Track what works with built-in analytics and insights'
	]

	return (
		<div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
			{/* Hero Section */}
			<section className="relative pt-32 pb-40 overflow-hidden">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
				</div>
				<div className="container mx-auto px-6 relative z-10">
					<div className="max-w-5xl mx-auto text-center">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-100 border border-purple-200 rounded-full mb-8 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<Sparkles className="w-4 h-4 text-purple-600" />
							<span className="text-purple-700 font-semibold text-sm tracking-wide">AI-Powered Social Media Automation</span>
						</div>

						{/* Heading */}
						<h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
							<span className="text-gray-900">
								Automate Your
							</span>
							<br />
							<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
								Social Presence
							</span>
						</h1>

						{/* Subheading */}
						<p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
							Schedule content, engage audiences, and track performance across
							<span className="text-purple-600 font-semibold"> 9 platforms </span>
							from a single, powerful dashboard.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
							{!user ? (
								<>
									<Link
										to="/register"
										className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden"
									>
										<span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
										<span className="relative z-10">Start Free Trial</span>
										<ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
									</Link>
									<Link
										to="/pricing"
										className="group px-10 py-5 bg-white border-2 border-gray-300 rounded-2xl font-bold text-lg text-gray-700 hover:bg-gray-50 hover:border-purple-400 hover:text-purple-600 transition-all duration-300 hover:scale-105 shadow-lg"
									>
										View Pricing
									</Link>
								</>
							) : (
								<Link
									to="/autopost/dashboard"
									className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 flex items-center gap-3"
								>
									<span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
									<span className="relative z-10">Go to Dashboard</span>
									<ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
								</Link>
							)}
						</div>

						{/* Platform Icons */}
						<div className="mt-8">
							<p className="text-sm text-gray-500 mb-8 uppercase tracking-wider font-semibold">Supported Platforms</p>
							<div className="flex flex-wrap justify-center gap-6 md:gap-10">
								{platforms.map((platform) => (
									<div
										key={platform.name}
										className="group relative cursor-pointer transition-all duration-300 transform hover:scale-125"
										title={platform.name}
									>
										<div className="p-3 bg-white rounded-2xl border border-gray-200 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/20">
											{platform.icon}
										</div>
										{/* Tooltip */}
										<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
											<span className="text-xs font-bold text-white whitespace-nowrap bg-purple-600 px-3 py-1.5 rounded-lg shadow-xl">
												{platform.name}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
				<div className="container mx-auto px-6">
					<div className="text-center mb-20">
						<h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
							Everything You Need
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
							Powerful features designed to elevate your social media game
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{features.map((feature, index) => (
							<div
								key={index}
								className="group relative p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2"
							>
								<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<div className="relative z-10">
									<div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
										{feature.icon}
									</div>
									<h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
									<p className="text-gray-600 leading-relaxed">{feature.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="relative py-32 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
				<div className="container mx-auto px-6 relative z-10">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-5xl md:text-6xl font-black text-white mb-6">
								Why Choose AutoPost?
							</h2>
							<p className="text-2xl text-purple-100 font-light">
								Join thousands of creators and businesses growing faster
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							{benefits.map((benefit, index) => (
								<div
									key={index}
									className="group flex items-start gap-5 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
								>
									<CheckCircle className="w-7 h-7 text-green-300 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
									<p className="text-lg text-white">{benefit}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative py-32 bg-white">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto text-center">
						<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-16 shadow-2xl">
							<h2 className="text-5xl font-black text-white mb-6">
								Ready to Transform Your
								<br />
								Social Media Strategy?
							</h2>
							<p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
								Start scheduling smarter today. No credit card required. Cancel anytime.
							</p>
							{!user ? (
								<Link
									to="/register"
									className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
								>
									Get Started Free
									<ArrowRight className="w-6 h-6" />
								</Link>
							) : (
								<Link
									to="/autopost/dashboard"
									className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
								>
									Go to Dashboard
									<ArrowRight className="w-6 h-6" />
								</Link>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default AutoPost
