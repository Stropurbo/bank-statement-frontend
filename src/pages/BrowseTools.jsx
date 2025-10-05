import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	FileSpreadsheet,
	FilePlus2,
	Search,
	Receipt,
	DollarSign,
	FileText,
	TrendingUp,
	BarChart3,
	Users,
	Repeat,
	Eraser,
	ShieldCheck,
	FileCheck,
	Lightbulb,
} from 'lucide-react'
import { setMeta } from '../utils/setMeta'

function BrowseTools() {
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		setMeta({
			title: 'Browse Tools - SheetlyPro',
			description:
				'Explore our comprehensive collection of business tools for document processing, financial reporting, and data management',
			keywords:
				'pdf tools, excel tools, business reports, receipt scanner, invoice extractor, financial tools',
			ogTitle: 'SheetlyPro Business Tools',
			ogDescription:
				'Powerful tools for your business document and data management needs',
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
					id: 'excel-pdf',
					name: 'Excel to PDF',
					description: 'Convert Excel spreadsheets to PDF format',
					icon: FileSpreadsheet,
					link: '/excel-to-pdf',
					color: 'from-emerald-600 to-green-600',
					bgColor: 'bg-emerald-50',
					iconColor: 'text-emerald-600',
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
				{
					id: 'compress-pdf',
					name: 'Compress PDF',
					description: 'Reduce PDF file size without losing quality',
					icon: FileText,
					link: '/compress-pdf',
					color: 'from-blue-600 to-cyan-600',
					bgColor: 'bg-blue-50',
					iconColor: 'text-blue-600',
				},
				{
					id: 'split-pdf',
					name: 'Split PDF',
					description: 'Split PDF into multiple files or extract pages',
					icon: FileText,
					link: '/split-pdf',
					color: 'from-orange-600 to-amber-600',
					bgColor: 'bg-orange-50',
					iconColor: 'text-orange-600',
				},
				{
					id: 'pdf-word',
					name: 'PDF to Word',
					description: 'Convert PDF documents to editable Word files',
					icon: FileText,
					link: '/pdf-to-word',
					color: 'from-indigo-600 to-blue-600',
					bgColor: 'bg-indigo-50',
					iconColor: 'text-indigo-600',
				},
				{
					id: 'word-pdf',
					name: 'Word to PDF',
					description: 'Convert Word documents to PDF format',
					icon: FileText,
					link: '/word-to-pdf',
					color: 'from-pink-600 to-rose-600',
					bgColor: 'bg-pink-50',
					iconColor: 'text-pink-600',
				},
				{
					id: 'pdf-ppt',
					name: 'PDF to PowerPoint',
					description: 'Convert PDF to editable PowerPoint presentations',
					icon: FileText,
					link: '/pdf-to-powerpoint',
					color: 'from-red-600 to-orange-600',
					bgColor: 'bg-red-50',
					iconColor: 'text-red-600',
				},
				{
					id: 'ppt-pdf',
					name: 'PowerPoint to PDF',
					description: 'Convert PowerPoint presentations to PDF',
					icon: FileText,
					link: '/powerpoint-to-pdf',
					color: 'from-teal-600 to-emerald-600',
					bgColor: 'bg-teal-50',
					iconColor: 'text-teal-600',
				},
				{
					id: 'html-pdf',
					name: 'HTML to PDF',
					description: 'Convert HTML web pages to PDF documents',
					icon: FileText,
					link: '/html-to-pdf',
					color: 'from-violet-600 to-purple-600',
					bgColor: 'bg-violet-50',
					iconColor: 'text-violet-600',
				},
			],
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
			],
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
			],
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
			],
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
			],
		},
	]

	const filteredSections = searchQuery
		? toolSections
				.map((section) => ({
					...section,
					tools: section.tools.filter(
						(tool) =>
							tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							tool.description
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) ||
							section.title.toLowerCase().includes(searchQuery.toLowerCase()),
					),
				}))
				.filter((section) => section.tools.length > 0)
		: toolSections

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
				{/* Header */}
				<div className="text-center mb-12 sm:mb-16">
					<div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
						All Tools
					</div>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
						Browse Our Tools
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
						Discover powerful tools to streamline your workflow and boost
						productivity
					</p>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
								<Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Search for tools..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base md:text-lg"
							/>
						</div>
					</div>
				</div>

				{/* Tools by Section */}
				{filteredSections.length > 0 ? (
					<div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto">
						{filteredSections.map((section) => (
							<div
								key={section.id}
								className="space-y-6 sm:space-y-8"
							>
								{/* Section Header */}
								<div className="text-center px-4">
									<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
										{section.title}
									</h2>
									<p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
										{section.description}
									</p>
								</div>

								{/* Tools Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 px-4">
									{section.tools.map((tool) => {
										const Icon = tool.icon
										return (
											<Link
												key={tool.id}
												to={tool.link}
												className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
											>
												{/* Icon Container */}
												<div
													className={`${tool.bgColor} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
												>
													<Icon
														className={`h-6 w-6 sm:h-8 sm:w-8 ${tool.iconColor}`}
													/>
												</div>

												{/* Tool Info */}
												<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
													{tool.name}
												</h3>
												<p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
													{tool.description}
												</p>

												{/* CTA Button */}
												<div
													className={`inline-flex items-center text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r ${tool.color} font-semibold group-hover:gap-2 transition-all duration-300`}
												>
													Try Now
													<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
														→
													</span>
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12 sm:py-20 px-4">
						<div className="text-gray-400 mb-4">
							<Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
						</div>
						<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
							No tools found
						</h3>
						<p className="text-sm sm:text-base text-gray-600">Try searching with different keywords</p>
					</div>
				)}

				{/* More Tools Coming Soon */}
				<div className="text-center mt-12 sm:mt-20 px-4">
					<div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
						<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
							More Tools Coming Soon
						</h3>
						<p className="text-sm sm:text-base text-gray-600 mb-4">
							We're constantly adding new tools to help you work smarter
						</p>
						<Link
							to="/contact"
							className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-purple-700 transition-colors"
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
