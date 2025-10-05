import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	FileSpreadsheet, FilePlus2, Search, Receipt, DollarSign, FileText,
	TrendingUp, BarChart3, Users, Repeat, Eraser, ShieldCheck,
	FileCheck, Lightbulb
} from 'lucide-react'
import { setMeta } from '../utils/setMeta'

function BrowseTools() {
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		setMeta({
			title: 'Browse Tools - SheetlyPro',
			description: 'Explore our comprehensive collection of business tools for document processing, financial reporting, and data management',
			keywords: 'pdf tools, excel tools, business reports, receipt scanner, invoice extractor, financial tools',
			ogTitle: 'SheetlyPro Business Tools',
			ogDescription: 'Powerful tools for your business document and data management needs',
		})
	}, [])

	const toolSections = [
		{
			id: 1,
			title: 'Core PDF Tools',
			description: 'Essential PDF processing and conversion tools',
			tools: [
				{
					id: 'pdf-excel',
					name: 'PDF to Excel',
					description: 'Convert your PDF bank statements to Excel format with ease',
					icon: FileSpreadsheet,
					link: '/',
					color: 'from-purple-600 to-indigo-600',
					bgColor: 'bg-purple-50',
					iconColor: 'text-purple-600',
				},
				{
					id: 'merge-pdf',
					name: 'Merge PDF',
					description: 'Combine multiple PDF files into a single document',
					icon: FilePlus2,
					link: '/merge-pdf',
					color: 'from-green-600 to-emerald-600',
					bgColor: 'bg-green-50',
					iconColor: 'text-green-600',
				},
			]
		},
		{
			id: 2,
			title: 'Receipt and Bill Management',
			description: 'Streamline your receipt and bill processing',
			tools: [
				{
					id: 'receipt-scanner',
					name: 'Receipt Scanner to Excel',
					description: 'Scan and convert receipts to organized Excel spreadsheets',
					icon: Receipt,
					link: '/receipt-scanner',
					color: 'from-blue-600 to-cyan-600',
					bgColor: 'bg-blue-50',
					iconColor: 'text-blue-600',
				},
				{
					id: 'utility-bill',
					name: 'Utility Bill Parser',
					description: 'Extract and organize data from utility bills automatically',
					icon: DollarSign,
					link: '/utility-bill-parser',
					color: 'from-teal-600 to-emerald-600',
					bgColor: 'bg-teal-50',
					iconColor: 'text-teal-600',
				},
			]
		},
		{
			id: 3,
			title: 'Business and Reports',
			description: 'Generate professional business reports instantly',
			tools: [
				{
					id: 'profit-loss',
					name: 'Profit and Loss Generator',
					description: 'Create comprehensive P&L statements from your financial data',
					icon: TrendingUp,
					link: '/profit-loss',
					color: 'from-orange-600 to-amber-600',
					bgColor: 'bg-orange-50',
					iconColor: 'text-orange-600',
				},
				{
					id: 'cash-flow',
					name: 'Cash Flow Report',
					description: 'Generate detailed cash flow analysis and reports',
					icon: BarChart3,
					link: '/cash-flow',
					color: 'from-pink-600 to-rose-600',
					bgColor: 'bg-pink-50',
					iconColor: 'text-pink-600',
				},
				{
					id: 'client-payment',
					name: 'Client Payment Tracker',
					description: 'Track and manage client payments efficiently',
					icon: Users,
					link: '/client-payment-tracker',
					color: 'from-violet-600 to-purple-600',
					bgColor: 'bg-violet-50',
					iconColor: 'text-violet-600',
				},
			]
		},
		{
			id: 4,
			title: 'Smart Data Processing',
			description: 'Advanced tools for data transformation and cleanup',
			tools: [
				{
					id: 'currency-converter',
					name: 'Currency Converter',
					description: 'Convert currencies in bulk with real-time exchange rates',
					icon: Repeat,
					link: '/currency-converter',
					color: 'from-cyan-600 to-blue-600',
					bgColor: 'bg-cyan-50',
					iconColor: 'text-cyan-600',
				},
				{
					id: 'data-cleaner',
					name: 'Duplicate Remover & Data Cleaner',
					description: 'Clean, deduplicate, and optimize your datasets',
					icon: Eraser,
					link: '/data-cleaner',
					color: 'from-indigo-600 to-blue-600',
					bgColor: 'bg-indigo-50',
					iconColor: 'text-indigo-600',
				},
			]
		},
		{
			id: 5,
			title: 'Compliance & Audit Tools',
			description: 'Stay compliant with automated audit and tax tools',
			tools: [
				{
					id: 'vat-gst',
					name: 'VAT/GST Report Extractor',
					description: 'Extract and calculate VAT/GST from your invoices',
					icon: ShieldCheck,
					link: '/vat-gst-extractor',
					color: 'from-red-600 to-orange-600',
					bgColor: 'bg-red-50',
					iconColor: 'text-red-600',
				},
				{
					id: 'audit-reports',
					name: 'Audit-ready Reports',
					description: 'Generate audit-compliant financial reports instantly',
					icon: FileCheck,
					link: '/audit-reports',
					color: 'from-emerald-600 to-green-600',
					bgColor: 'bg-emerald-50',
					iconColor: 'text-emerald-600',
				},
			]
		},
	]

	const filteredSections = searchQuery
		? toolSections.map(section => ({
				...section,
				tools: section.tools.filter(tool =>
					tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					section.title.toLowerCase().includes(searchQuery.toLowerCase())
				)
			})).filter(section => section.tools.length > 0)
		: toolSections

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="container mx-auto px-6 py-24">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						All Tools
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Browse Our Tools
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Discover powerful tools to streamline your workflow and boost productivity
					</p>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto mb-12">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Search for tools..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
							/>
						</div>
					</div>
				</div>

				{/* Tools by Section */}
				{filteredSections.length > 0 ? (
					<div className="space-y-16 max-w-7xl mx-auto">
						{filteredSections.map((section) => (
							<div key={section.id} className="space-y-8">
								{/* Section Header */}
								<div className="text-center">
									<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
										{section.title}
									</h2>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto">
										{section.description}
									</p>
								</div>

								{/* Tools Grid */}
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
									{section.tools.map((tool) => {
										const Icon = tool.icon
										return (
											<Link
												key={tool.id}
												to={tool.link}
												className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
											>
												{/* Icon Container */}
												<div className={`${tool.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
													<Icon className={`h-8 w-8 ${tool.iconColor}`} />
												</div>

												{/* Tool Info */}
												<h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
													{tool.name}
												</h3>
												<p className="text-gray-600 leading-relaxed mb-6">
													{tool.description}
												</p>

												{/* CTA Button */}
												<div className={`inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r ${tool.color} font-semibold group-hover:gap-2 transition-all duration-300`}>
													Try Now
													<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<div className="text-gray-400 mb-4">
							<Search className="h-16 w-16 mx-auto mb-4" />
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-2">
							No tools found
						</h3>
						<p className="text-gray-600">
							Try searching with different keywords
						</p>
					</div>
				)}

				{/* More Tools Coming Soon */}
				<div className="text-center mt-20">
					<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							More Tools Coming Soon
						</h3>
						<p className="text-gray-600 mb-4">
							We're constantly adding new tools to help you work smarter
						</p>
						<Link
							to="/contact"
							className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
						>
							Request a Tool
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BrowseTools
