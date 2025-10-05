import React, { useState, useEffect } from 'react'
import { Upload, Download, Loader2, FileText, AlertCircle, Scissors } from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import axios from 'axios'

function SplitPDF() {
	const [file, setFile] = useState(null)
	const [splitting, setSplitting] = useState(false)
	const [error, setError] = useState(null)
	const [isDragging, setIsDragging] = useState(false)
	const [splitMode, setSplitMode] = useState('range')
	const [pageRange, setPageRange] = useState('')

	useEffect(() => {
		setMeta({
			title: 'Split PDF - SheetlyPro',
			description: 'Split PDF files into multiple documents or extract specific pages.',
			keywords: 'split pdf, extract pdf pages, divide pdf, pdf splitter',
			ogTitle: 'Split PDF Files - SheetlyPro',
			ogDescription: 'Split PDF files into multiple documents online',
		})
	}, [])

	const handleFileSelect = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile && selectedFile.type === 'application/pdf') {
			setFile(selectedFile)
			setError(null)
		} else {
			setError('Please select a valid PDF file')
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
		if (droppedFile && droppedFile.type === 'application/pdf') {
			setFile(droppedFile)
			setError(null)
		} else {
			setError('Please drop a valid PDF file')
		}
	}

	const handleSplit = async () => {
		if (!file) return

		setSplitting(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('split_type', splitMode === 'all' ? 'chunks' : 'range')
			formData.append('pages', splitMode === 'all' ? '1' : pageRange)

			const response = await axios.post(
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/split/',
				formData,
				{ withCredentials: true }
			)

			if (response.data.data && response.data.data.split_files) {
				const splitFiles = response.data.data.split_files
				
				for (const splitFile of splitFiles) {
					const downloadResponse = await axios.get(
						`https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/split/${response.data.data.id}/download/${splitFile.id}/`,
						{ withCredentials: true, responseType: 'blob' }
					)

					const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', `split_pages_${splitFile.page_range}.pdf`)
					document.body.appendChild(link)
					link.click()
					link.remove()
					window.URL.revokeObjectURL(url)
				}

				setFile(null)
				setPageRange('')
			}
		} catch (err) {
			setError(err.response?.data?.error || 'Failed to split PDF. Please try again.')
		} finally {
			setSplitting(false)
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
			<div className="container mx-auto px-6 py-24">
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						PDF Tools
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Split PDF
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Split PDF into multiple files or extract specific pages
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
						<div
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
								isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
							}`}
						>
							<Scissors className="h-16 w-16 mx-auto mb-4 text-purple-600" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Drop PDF file here
							</h3>
							<p className="text-gray-600 mb-6">
								or click to browse your files
							</p>
							<label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105">
								<Upload className="h-5 w-5 mr-2" />
								Select PDF File
								<input
									type="file"
									accept="application/pdf"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</label>
						</div>

						{error && (
							<div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
								<AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
								<p className="text-red-700 font-medium">{error}</p>
							</div>
						)}

						{file && (
							<div className="mt-8">
								<div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6">
									<div className="flex items-center space-x-3">
										<FileText className="h-8 w-8 text-purple-600" />
										<div>
											<p className="text-sm font-medium text-gray-900">{file.name}</p>
											<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
										</div>
									</div>
								</div>

								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-900 mb-3">
										Split Mode
									</label>
									<div className="grid grid-cols-2 gap-4 mb-4">
										{['range', 'all'].map((mode) => (
											<button
												key={mode}
												onClick={() => setSplitMode(mode)}
												className={`p-4 rounded-xl border-2 transition-all ${
													splitMode === mode
														? 'border-purple-600 bg-purple-50'
														: 'border-gray-200 hover:border-purple-300'
												}`}
											>
												<p className="font-semibold text-gray-900 capitalize">
													{mode === 'range' ? 'Extract Pages' : 'Split All Pages'}
												</p>
												<p className="text-xs text-gray-600 mt-1">
													{mode === 'range' ? 'Extract specific pages' : 'Split into individual pages'}
												</p>
											</button>
										))}
									</div>

									{splitMode === 'range' && (
										<div>
											<label className="block text-sm font-medium text-gray-900 mb-2">
												Page Range (e.g., 1-3, 5, 7-9)
											</label>
											<input
												type="text"
												value={pageRange}
												onChange={(e) => setPageRange(e.target.value)}
												placeholder="1-3, 5, 7-9"
												className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
											/>
										</div>
									)}
								</div>

								<button
									onClick={handleSplit}
									disabled={splitting}
									className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
								>
									{splitting ? (
										<>
											<Loader2 className="h-6 w-6 animate-spin" />
											<span>Splitting...</span>
										</>
									) : (
										<>
											<Download className="h-6 w-6" />
											<span>Split PDF</span>
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

export default SplitPDF
