import React, { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Download, Send, Eye, Upload, List, Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ApiClient from '../services/api-client'

function InvoiceGenerator() {
	const [invoice, setInvoice] = useState({
		invoiceNumber: `INV-${Date.now()}`,
		date: new Date().toISOString().split('T')[0],
		dueDate: '',
		companyName: '',
		companyEmail: '',
		companyPhone: '',
		companyAddress: '',
		clientName: '',
		clientEmail: '',
		clientPhone: '',
		clientAddress: '',
		items: [{ description: '', quantity: 1, rate: 0 }],
		taxRate: 0,
		discount: 0,
		notes: '',
		template: 'modern',
	})
	const [loading, setLoading] = useState(false)
	const [savedInvoiceId, setSavedInvoiceId] = useState(null)
	const [logo, setLogo] = useState(null)
	const [showPreview, setShowPreview] = useState(false)
	const [showTemplatePreview, setShowTemplatePreview] = useState(false)
	const [previewTemplate, setPreviewTemplate] = useState(null)
	const [searchParams] = useSearchParams()
	const previewRef = useRef(null)

	useEffect(() => {
		const id = searchParams.get('id')
		if (id) loadInvoice(id)
	}, [searchParams])

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				setShowPreview(false)
				setShowTemplatePreview(false)
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	const loadInvoice = async (id) => {
		setLoading(true)
		try {
			const response = await ApiClient.get(`invoice/invoices/${id}/`)
			const data = response.data
			setInvoice({
				invoiceNumber: data.invoice_number,
				date: data.invoice_date,
				dueDate: data.due_date || '',
				companyName: data.company_name,
				companyEmail: data.company_email,
				companyPhone: data.company_phone || '',
				companyAddress: data.company_address,
				clientName: data.client_name,
				clientEmail: data.client_email,
				clientPhone: data.client_phone || '',
				clientAddress: data.client_address,
				items: data.items,
				taxRate: data.tax_rate,
				discount: data.discount,
				notes: data.notes || '',
				template: data.template || 'modern',
			})
			setSavedInvoiceId(id)
		} catch (error) {
			console.log(error)
			alert('Failed to load invoice')
		} finally {
			setLoading(false)
		}
	}

	const handleLogoUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => setLogo(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const uploadLogo = async (invoiceId) => {
		try {
			const formData = new FormData()
			// Convert base64 to blob
			const response = await fetch(logo)
			const blob = await response.blob()
			formData.append('logo', blob, 'logo.png')
			
			await ApiClient.post(`invoice/invoices/${invoiceId}/upload_logo/`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		} catch (error) {
			console.error('Logo upload failed:', error)
		}
	}

	const addItem = () => {
		setInvoice({
			...invoice,
			items: [...invoice.items, { description: '', quantity: 1, rate: 0 }],
		})
	}

	const removeItem = (index) => {
		const items = invoice.items.filter((_, i) => i !== index)
		setInvoice({ ...invoice, items })
	}

	const updateItem = (index, field, value) => {
		const items = [...invoice.items]
		items[index][field] = value
		setInvoice({ ...invoice, items })
	}

	const calculateSubtotal = () => {
		return invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
	}

	const calculateTax = () => {
		return (calculateSubtotal() * invoice.taxRate) / 100
	}

	const calculateTotal = () => {
		return calculateSubtotal() + calculateTax() - invoice.discount
	}

	const createPayload = () => {
		const payload = {
			invoice_number: String(invoice.invoiceNumber),
			invoice_date: String(invoice.date),
			company_name: String(invoice.companyName),
			company_email: String(invoice.companyEmail),
			company_phone: String(invoice.companyPhone || ''),
			company_address: String(invoice.companyAddress),
			client_name: String(invoice.clientName),
			client_email: String(invoice.clientEmail),
			client_phone: String(invoice.clientPhone || ''),
			client_address: String(invoice.clientAddress),
			tax_rate: Number(invoice.taxRate),
			discount: Number(invoice.discount),
			notes: String(invoice.notes || ''),
			status: 'draft',
			template: String(invoice.template),
			primary_color: String(getTemplateColor(invoice.template)),
			items: invoice.items.map(item => ({
				description: String(item.description),
				quantity: Number(item.quantity),
				rate: Number(item.rate)
			}))
		}
		if (invoice.dueDate) {
			payload.due_date = String(invoice.dueDate)
		}
		return payload
	}

	const saveInvoiceToServer = async (payload) => {
		const url = savedInvoiceId ? `invoice/invoices/${savedInvoiceId}/` : 'invoice/invoices/'
		const method = savedInvoiceId ? 'put' : 'post'
		// Ensure template is a string, not an array
		const cleanPayload = {
			...payload,
			template: Array.isArray(payload.template) ? payload.template[0] : payload.template
		}
		console.log('Clean payload before send:', cleanPayload)
		const response = await ApiClient[method](url, cleanPayload)
		const invoiceId = response.data.id
		setSavedInvoiceId(invoiceId)
		if (logo) await uploadLogo(invoiceId)
		return invoiceId
	}

	const templates = [
		{ id: 'modern', name: 'Modern Blue', color: '#3B82F6', badge: 'Popular' },
		{ id: 'classic', name: 'Classic Orange', color: '#D97706', badge: '' },
		{ id: 'minimal', name: 'Minimal Gray', color: '#6B7280', badge: '' },
		{ id: 'professional', name: 'Professional Navy', color: '#1E40AF', badge: '' },
		{ id: 'elegant', name: 'Elegant Purple', color: '#7C3AED', badge: 'Premium' },
		{ id: 'corporate', name: 'Corporate Green', color: '#059669', badge: '' },
		{ id: 'creative', name: 'Creative Pink', color: '#DB2777', badge: 'New' },
		{ id: 'tech', name: 'Normal', color: '#FFFFFF', badge: '' },
	]

	const getTemplateColor = (template) => {
		const found = templates.find(t => t.id === template)
		return found ? found.color : '#3B82F6'
	}

	const validateInvoice = () => {
		if (!invoice.companyName || !invoice.companyEmail || !invoice.companyAddress) {
			alert('Please fill in all company details')
			return false
		}
		if (!invoice.clientName || !invoice.clientEmail || !invoice.clientAddress) {
			alert('Please fill in all client details')
			return false
		}
		if (invoice.items.some(item => !item.description || item.quantity <= 0 || item.rate <= 0)) {
			alert('Please fill in all item details with valid quantity and rate')
			return false
		}
		return true
	}

	const downloadPDF = async () => {
		if (!validateInvoice()) return

		setLoading(true)
		try {
			const payload = createPayload()
			const invoiceId = await saveInvoiceToServer(payload)
			const pdfResponse = await ApiClient.get(`invoice/invoices/${invoiceId}/download_pdf/`, {
				responseType: 'blob',
			})
			const url = window.URL.createObjectURL(new Blob([pdfResponse.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', `invoice_${invoice.invoiceNumber}.pdf`)
			document.body.appendChild(link)
			link.click()
			link.remove()
		} catch (error) {
			console.error('Error:', error)
			const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message
			const isLimitError = error.response?.status === 403 || errorMsg.includes('limit') || errorMsg.includes('subscription')
			
			if (isLimitError) {
				if (window.confirm(errorMsg + '\n\nWould you like to upgrade your plan?')) {
					window.location.href = '/pricing'
				}
			} else {
				alert('Failed to download PDF: ' + errorMsg)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Header */}
				<div className="flex justify-between items-center mb-12">
					<div>
						<h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
							Invoice Generator
						</h1>
						<p className="text-gray-600 text-lg">
							Create professional invoices in minutes
						</p>
					</div>
					
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Form Section */}
					<div className="lg:col-span-2 space-y-6">
						{/* Invoice Details */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Invoice Details</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Invoice Number
									</label>
									<input
										type="text"
										value={invoice.invoiceNumber}
										onChange={(e) =>
											setInvoice({ ...invoice, invoiceNumber: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Date
									</label>
									<input
										type="date"
										value={invoice.date}
										onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Due Date
									</label>
									<input
										type="date"
										value={invoice.dueDate}
										onChange={(e) =>
											setInvoice({ ...invoice, dueDate: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>
						</div>

						{/* Template Selector */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Template</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{templates.map((template) => (
									<div key={template.id} className="relative">
										<button
											onClick={() => setInvoice({ ...invoice, template: template.id })}
											className={`w-full p-3 border-2 rounded-lg transition-all ${
												invoice.template === template.id
													? 'border-blue-600 bg-blue-50 shadow-md'
													: 'border-gray-300 hover:border-gray-400'
											}`}
										>
											{template.badge && (
												<span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full ${
													template.badge === 'Premium' ? 'bg-purple-500 text-white' :
													template.badge === 'New' ? 'bg-green-500 text-white' :
													'bg-blue-500 text-white'
												}`}>
													{template.badge}
												</span>
											)}
											<div className="w-full h-20 rounded mb-2" style={{ backgroundColor: template.color + '20', border: `2px solid ${template.color}` }}>
												<div className="h-3 rounded-t" style={{ backgroundColor: template.color }}></div>
												<div className="p-2 space-y-1">
													<div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
													<div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
												</div>
											</div>
											<span className="text-xs font-medium text-gray-700 block text-center">{template.name}</span>
										</button>
										<button
											onClick={() => {
												setPreviewTemplate(template)
												setShowTemplatePreview(true)
											}}
											className="mt-1 w-full text-xs text-blue-600 hover:text-blue-800 font-medium"
										>
											<Eye className="h-3 w-3 inline mr-1" />Preview
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Company Info */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Your Company</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Company Logo
									</label>
									<div className="flex items-center gap-4">
										{logo && (
											<img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
										)}
										<label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
											<Upload className="h-4 w-4" />
											Upload Logo
											<input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
										</label>
									</div>
								</div>
								<input
									type="text"
									placeholder="Company Name"
									value={invoice.companyName}
									onChange={(e) =>
										setInvoice({ ...invoice, companyName: e.target.value })
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<input
										type="email"
										placeholder="Email"
										value={invoice.companyEmail}
										onChange={(e) =>
											setInvoice({ ...invoice, companyEmail: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
									<input
										type="tel"
										placeholder="Phone"
										value={invoice.companyPhone}
										onChange={(e) =>
											setInvoice({ ...invoice, companyPhone: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<textarea
									placeholder="Address"
									value={invoice.companyAddress}
									onChange={(e) =>
										setInvoice({ ...invoice, companyAddress: e.target.value })
									}
									rows="2"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>

						{/* Client Info */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Bill To</h2>
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Client Name"
									value={invoice.clientName}
									onChange={(e) =>
										setInvoice({ ...invoice, clientName: e.target.value })
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<input
										type="email"
										placeholder="Email"
										value={invoice.clientEmail}
										onChange={(e) =>
											setInvoice({ ...invoice, clientEmail: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
									<input
										type="tel"
										placeholder="Phone"
										value={invoice.clientPhone}
										onChange={(e) =>
											setInvoice({ ...invoice, clientPhone: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<textarea
									placeholder="Address"
									value={invoice.clientAddress}
									onChange={(e) =>
										setInvoice({ ...invoice, clientAddress: e.target.value })
									}
									rows="2"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>

						{/* Items */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">Items</h2>
								<button
									onClick={addItem}
									className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									<Plus className="h-4 w-4" />
									Add Item
								</button>
							</div>

							<div className="space-y-4">
								{invoice.items.map((item, index) => (
									<div
										key={index}
										className="grid grid-cols-12 gap-3 items-start p-4 bg-gray-50 rounded-lg"
									>
										<div className="col-span-12 md:col-span-5">
											<input
												type="text"
												placeholder="Description"
												value={item.description}
												onChange={(e) =>
													updateItem(index, 'description', e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<div className="col-span-4 md:col-span-2">
											<input
												type="number"
												placeholder="Qty"
												value={item.quantity}
												onChange={(e) =>
													updateItem(index, 'quantity', parseFloat(e.target.value) || 0)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<div className="col-span-4 md:col-span-2">
											<input
												type="number"
												placeholder="Rate"
												value={item.rate}
												onChange={(e) =>
													updateItem(index, 'rate', parseFloat(e.target.value) || 0)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<div className="col-span-3 md:col-span-2 flex items-center justify-end">
											<span className="font-semibold text-gray-900">
												${(item.quantity * item.rate).toFixed(2)}
											</span>
										</div>
										<div className="col-span-1 flex items-center justify-center">
											{invoice.items.length > 1 && (
												<button
													onClick={() => removeItem(index)}
													className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											)}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Notes */}
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">Notes</h2>
							<textarea
								placeholder="Additional notes or payment terms..."
								value={invoice.notes}
								onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
								rows="3"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>

					{/* Summary Section */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 sticky top-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>

							<div className="space-y-4 mb-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Tax Rate (%)
									</label>
									<input
										type="number"
										value={invoice.taxRate}
										onChange={(e) =>
											setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) || 0 })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Discount ($)
									</label>
									<input
										type="number"
										value={invoice.discount}
										onChange={(e) =>
											setInvoice({ ...invoice, discount: parseFloat(e.target.value) || 0 })
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>

							<div className="space-y-3 py-4 border-t border-gray-200">
								<div className="flex justify-between text-gray-700">
									<span>Subtotal:</span>
									<span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-gray-700">
									<span>Tax ({invoice.taxRate}%):</span>
									<span className="font-semibold">${calculateTax().toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-gray-700">
									<span>Discount:</span>
									<span className="font-semibold">-${invoice.discount.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t border-gray-200">
									<span>Total:</span>
									<span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
								</div>
							</div>

							<div className="space-y-3 mt-6">
								<button
									onClick={() => setShowPreview(true)}
									className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
								>
									<Eye className="h-5 w-5" />
									Preview Invoice
								</button>
								<button
									onClick={downloadPDF}
									disabled={loading}
									className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Download className="h-5 w-5" />
									{loading ? 'Processing...' : 'Download PDF'}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Preview Modal */}
				{showPreview && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowPreview(false)}>
						<div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
							<div className="p-8" style={{ backgroundColor: '#ffffff' }}>
								<div className="flex justify-between items-start mb-6 pb-4" style={{ borderBottom: `4px solid ${getTemplateColor(invoice.template)}` }}>
									<div className="flex items-center gap-4">
										{logo && <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />}
									</div>
									<div className="flex flex-col items-end gap-3">
										<h2 className="text-3xl font-bold" style={{ color: getTemplateColor(invoice.template) }}>INVOICE</h2>
									<div className="flex items-center gap-3 no-print">
										<button 
											onClick={(e) => {
												e.stopPropagation()
												downloadPDF()
											}} 
											disabled={loading}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
											title="Download PDF"
										>
											{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
										</button>
										<button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
											✕
										</button>
										</div>
									</div>
								</div>
								<div ref={previewRef}>
								
								<div className="grid grid-cols-2 gap-8 mb-8">
									<div>
										<p className="text-sm text-gray-600">Invoice #: {invoice.invoiceNumber}</p>
										<p className="text-sm text-gray-600">Date: {invoice.date}</p>
										{invoice.dueDate && <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>}
									</div>
								</div>

								<div className="grid grid-cols-2 gap-8 mb-8">
									<div>
										<h3 className="font-bold mb-2">From:</h3>
										<p className="font-semibold">{invoice.companyName}</p>
										<p className="text-sm">{invoice.companyEmail}</p>
										<p className="text-sm">{invoice.companyPhone}</p>
										<p className="text-sm">{invoice.companyAddress}</p>
									</div>
									<div>
										<h3 className="font-bold mb-2">Bill To:</h3>
										<p className="font-semibold">{invoice.clientName}</p>
										<p className="text-sm">{invoice.clientEmail}</p>
										<p className="text-sm">{invoice.clientPhone}</p>
										<p className="text-sm">{invoice.clientAddress}</p>
									</div>
								</div>

								<table className="w-full mb-8">
									<thead style={{ backgroundColor: getTemplateColor(invoice.template) + '30' }}>
										<tr>
											<th className="text-left p-3">Description</th>
											<th className="text-right p-3">Qty</th>
											<th className="text-right p-3">Rate</th>
											<th className="text-right p-3">Amount</th>
										</tr>
									</thead>
									<tbody>
										{invoice.items.map((item, i) => (
											<tr key={i} className="border-b">
												<td className="p-3">{item.description}</td>
												<td className="text-right p-3">{item.quantity}</td>
												<td className="text-right p-3">${item.rate}</td>
												<td className="text-right p-3">${(item.quantity * item.rate).toFixed(2)}</td>
											</tr>
										))}
									</tbody>
								</table>

								<div className="flex justify-end">
									<div className="w-64">
										<div className="flex justify-between py-2">
											<span>Subtotal:</span>
											<span>${calculateSubtotal().toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2">
											<span>Tax ({invoice.taxRate}%):</span>
											<span>${calculateTax().toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2">
											<span>Discount:</span>
											<span>-${invoice.discount.toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2 border-t-2 font-bold text-lg" style={{ borderColor: getTemplateColor(invoice.template) }}>
											<span>Total:</span>
											<span style={{ color: getTemplateColor(invoice.template) }}>${calculateTotal().toFixed(2)}</span>
										</div>
									</div>
								</div>

								{invoice.notes && (
									<div className="mt-8 pt-8 border-t">
										<h3 className="font-bold mb-2">Notes:</h3>
										<p className="text-sm text-gray-600">{invoice.notes}</p>
									</div>
								)}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Template Preview Modal */}
				{showTemplatePreview && previewTemplate && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowTemplatePreview(false)}>
						<div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
							<div className="p-8">
								<div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: `4px solid ${previewTemplate.color}` }}>
									<div className="flex items-center gap-4">
										{logo && <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />}
										<h2 className="text-3xl font-bold" style={{ color: previewTemplate.color }}>INVOICE</h2>
									</div>
									<button onClick={() => setShowTemplatePreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
								</div>
								<div className="grid grid-cols-2 gap-8 mb-8">
									<div>
										<p className="text-sm text-gray-600">Invoice #: {invoice.invoiceNumber || 'INV-001'}</p>
										<p className="text-sm text-gray-600">Date: {invoice.date || 'YYYY-MM-DD'}</p>
										{invoice.dueDate && <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>}
									</div>
								</div>
								<div className="grid grid-cols-2 gap-8 mb-8">
									<div>
										<h3 className="font-bold mb-2">From:</h3>
										<p className="font-semibold">{invoice.companyName || 'Your Company'}</p>
										<p className="text-sm">{invoice.companyEmail || 'email@company.com'}</p>
										<p className="text-sm">{invoice.companyPhone || '+1234567890'}</p>
										<p className="text-sm">{invoice.companyAddress || 'Company Address'}</p>
									</div>
									<div>
										<h3 className="font-bold mb-2">Bill To:</h3>
										<p className="font-semibold">{invoice.clientName || 'Client Name'}</p>
										<p className="text-sm">{invoice.clientEmail || 'client@email.com'}</p>
										<p className="text-sm">{invoice.clientPhone || '+1234567890'}</p>
										<p className="text-sm">{invoice.clientAddress || 'Client Address'}</p>
									</div>
								</div>
								<table className="w-full mb-8">
									<thead style={{ backgroundColor: previewTemplate.color + '30' }}>
										<tr>
											<th className="text-left p-3">Description</th>
											<th className="text-right p-3">Qty</th>
											<th className="text-right p-3">Rate</th>
											<th className="text-right p-3">Amount</th>
										</tr>
									</thead>
									<tbody>
										{invoice.items.map((item, i) => (
											<tr key={i} className="border-b">
												<td className="p-3">{item.description || 'Item description'}</td>
												<td className="text-right p-3">{item.quantity}</td>
												<td className="text-right p-3">${item.rate}</td>
												<td className="text-right p-3">${(item.quantity * item.rate).toFixed(2)}</td>
											</tr>
										))}
									</tbody>
								</table>
								<div className="flex justify-end">
									<div className="w-64">
										<div className="flex justify-between py-2">
											<span>Subtotal:</span>
											<span>${calculateSubtotal().toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2">
											<span>Tax ({invoice.taxRate}%):</span>
											<span>${calculateTax().toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2">
											<span>Discount:</span>
											<span>-${invoice.discount.toFixed(2)}</span>
										</div>
										<div className="flex justify-between py-2 border-t-2 font-bold text-lg" style={{ borderColor: previewTemplate.color }}>
											<span>Total:</span>
											<span style={{ color: previewTemplate.color }}>${calculateTotal().toFixed(2)}</span>
										</div>
									</div>
								</div>
								{invoice.notes && (
									<div className="mt-8 pt-8 border-t">
										<h3 className="font-bold mb-2">Notes:</h3>
										<p className="text-sm text-gray-600">{invoice.notes}</p>
									</div>
								)}
								<div className="mt-6 flex gap-3">
									<button
										onClick={() => {
											setInvoice({ ...invoice, template: previewTemplate.id })
											setShowTemplatePreview(false)
										}}
										className="flex-1 px-6 py-3 text-black border rounded-lg font-medium transition-all"
										style={{ backgroundColor: previewTemplate.color }}
									>
										Use This Template
									</button>
									<button
										onClick={() => setShowTemplatePreview(false)}
										className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default InvoiceGenerator
