import React from 'react'
import { Zap, Globe, Lock, Smile, BarChart } from 'lucide-react'

function Features() {
	const features = [
		{
			icon: Zap,
			title: 'Fast Conversion',
			description: 'Convert your PDF statements to Excel in seconds, no delays.',
			color: 'text-blue-500',
		},
		{
			icon: Globe,
			title: 'Global Support',
			description:
				'Compatible with thousands of banks and financial institutions worldwide.',
			color: 'text-green-600',
		},
		{
			icon: Lock,
			title: 'Secure',
			description:
				'We use advanced encryption and security practices to keep your data safe and protected at all times.',
			color: 'text-red-500',
		},
		{
			icon: BarChart,
			title: 'Accurate Formatting',
			description: 'Get clean, structured Excel files ready for accounting and analysis.',
			color: 'text-yellow-500',
		},
	]

	return (
		<section className="pb-5 bg-background">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="text-center group p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
						>
							<div className="mb-6 flex justify-center">
								<div className="p-4 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
									<feature.icon className={`h-10 w-10 ${feature.color}`} />
								</div>
							</div>
							<h3 className="text-xl font-bold text-foreground mb-3">
								{feature.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Features
