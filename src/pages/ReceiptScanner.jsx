import React, { useState, useEffect } from 'react'
import { Upload, Download, Loader2, FileText, AlertCircle, Receipt } from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import axios from 'axios'

function ReceiptScanner() {
	const [file, setFile] = useState(null)
	const [converting, setConverting] = useState(false)
	const [error, setError] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		setMeta({
			title: 'Receipt Scanner to Excel - SheetlyPro',
			description: 'Scan and convert receipts to organized Excel spreadsheets. Extract data from receipt images automatically.',
			keywords: 'receipt scanner, receipt to excel, scan receipt, receipt ocr, receipt converter',
			ogTitle: 'Receipt Scanner to Excel - SheetlyPro',
			ogDescription: 'Convert receipt images to Excel spreadsheets online',
		})
	}, [])

	const handleFileSelect = (e) => {
		const selectedFile = e.target.files[0]
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
		if (selectedFile && validTypes.includes(selectedFile.type)) {
			setFile(selectedFile)
			setError(null)
		} else {
			setError('Please select a valid image file (JPG, PNG) or PDF')
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		setIsDragging(false)
		const droppedFile = e.dataTransfer.files[0]
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
		if (droppedFile && validTypes.includes(droppedFile.type)) {
			setFile(droppedFile)
			setError(null)
		} else {
			setError('Please drop a valid image file (JPG, PNG) or PDF')
		}
	}

	const handleConvert = async () => {
		if (!file) return

		setConverting(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('file', file)

			const response = await axios.post(
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/receipt/receipt-scanner/',
				formData,
				{ withCredentials: true }
			)

			if (response.data.data && response.data.data.id) {
				const downloadResponse = await axios.get(
					`https://bank-statement-converter-backend-ofyc.onrender.com/api/receipt/receipt-scanner/${response.data.data.id}/download/`,
					{ withCredentials: true, responseType: 'blob' }
				)

				const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
				const link = document.createElement('a')
				link.href = url
				const filename = file.name.replace(/\.(jpg|jpeg|png|pdf)$/i, '.xlsx')
				link.setAttribute('download', filename)
				document.body.appendChild(link)
				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)

				setFile(null)
			}
		} catch (err) {
			const errorMsg = err.response?.data?.error || 'Failed to scan receipt. Please try again.'
			
			// Handle authentication errors
			if (err.response?.status === 401) {
				setError('Please login to use Receipt Scanner.')
			} else if (err.response?.status === 403) {
				setError('Active subscription required. Please subscribe to use Receipt Scanner.')
			} else {
				setError(errorMsg)
			}
		} finally {
			setConverting(false)
		}
	}

	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
				<div className="text-center mb-12 sm:mb-16">
					<div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
						Receipt Tools
					</div>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
						Receipt Scanner to Excel
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
						Scan and convert receipts to organized Excel spreadsheets
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8">
						<div
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
								isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
							}`}
						>
							<Receipt className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-purple-600" />
							<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
								Drop receipt image here
							</h3>
							<p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
								or click to browse your files (JPG, PNG, PDF)
							</p>
							<label className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105">
								<Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
								Select Receipt
								<input
									type="file"
									accept="image/jpeg,image/jpg,image/png,application/pdf"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</label>
						</div>

						{error && (
							<div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
								<AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
								<p className="text-sm sm:text-base text-red-700 font-medium">{error}</p>
							</div>
						)}

						{file && (
							<div className="mt-6 sm:mt-8">
								<div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4 sm:mb-6">
									<div className="flex items-center space-x-3">
										<FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
										<div>
											<p className="text-sm font-medium text-gray-900">{file.name}</p>
											<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
										</div>
									</div>
								</div>

								<button
									onClick={handleConvert}
									disabled={converting}
									className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base sm:text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
								>
									{converting ? (
										<>
											<Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
											<span>Scanning...</span>
										</>
									) : (
										<>
											<Download className="h-5 w-5 sm:h-6 sm:w-6" />
											<span>Scan & Convert to Excel</span>
										</>
									)}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ReceiptScanner
