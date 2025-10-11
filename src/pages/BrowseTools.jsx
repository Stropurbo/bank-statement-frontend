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
				{
					id: 'profit-loss',
					name: 'Profit and Loss Generator',
					description: 'Create comprehensive P&L statements from your financial data',
					icon: TrendingUp,
					link: '/profit-loss',
					color: 'from-orange-600 to-amber-600',
					bgColor: 'bg-orange-50',
					iconColor: 'text-orange-600',
				}
				
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
		<section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
			</div>

			<div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 backdrop-blur-sm border border-purple-200/50 text-purple-700 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-purple-500/10">
						<span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
						All Tools
					</div>
					<h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 mb-6 leading-tight">
						Browse Our Tools
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Discover powerful tools to streamline your workflow and boost productivity
					</p>

					{/* Premium Search Bar */}
					<div className="max-w-2xl mx-auto">
						<div className="relative group">
							<div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
							<div className="relative">
								<Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />
								<input
									type="text"
									placeholder="Search for tools..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent shadow-xl shadow-gray-200/50 text-gray-900 placeholder:text-gray-400 transition-all"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tools by Section */}
				{filteredSections.length > 0 ? (
					<div className="space-y-20 max-w-7xl mx-auto">
						{filteredSections.map((section, idx) => (
							<div key={section.id} className="space-y-10">
								<div className="text-center relative">
									<div className="inline-block">
										<h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 relative">
											{section.title}
											<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
										</h2>
									</div>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
										{section.description}
									</p>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
									{section.tools.map((tool, toolIdx) => {
										const Icon = tool.icon
										return (
											<Link
												key={tool.id}
												to={tool.link}
												className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-7 border border-gray-200/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
											>
												{/* Gradient Overlay on Hover */}
												<div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
												
												{/* Shine Effect */}
												<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
												
												<div className="relative z-10">
													<div className={`${tool.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
														<Icon className={`h-8 w-8 ${tool.iconColor}`} />
													</div>

													<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
														{tool.name}
													</h3>
													<p className="text-sm text-gray-600 mb-6 leading-relaxed min-h-[40px]">
														{tool.description}
													</p>

													<div className="flex items-center justify-between">
														<div className={`inline-flex items-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${tool.color}`}>
															Try Now
															<span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
														</div>
														<div className={`w-10 h-10 rounded-full bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
													</div>
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-24">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-6">
							<Search className="h-12 w-12 text-purple-400" />
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-3">
							No tools found
						</h3>
						<p className="text-lg text-gray-600">Try searching with different keywords</p>
					</div>
				)}

				{/* More Tools Coming Soon */}
				<div className="text-center mt-24">
					<div className="relative group max-w-lg mx-auto">
						<div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
						<div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/30">
								<span className="text-3xl">✨</span>
							</div>
							<h3 className="text-2xl font-black text-gray-900 mb-3">
								More Tools Coming Soon
							</h3>
							<p className="text-gray-600 mb-8 leading-relaxed">
								We're constantly adding new tools to help you work smarter
							</p>
							<Link
								to="/contact"
								className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
							>
								Request a Tool
								<span className="text-lg">→</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BrowseTools
