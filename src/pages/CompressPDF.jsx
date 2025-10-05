import React, { useState, useEffect } from 'react'
import { Upload, Download, Loader2, FileText, AlertCircle, Minimize2 } from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import axios from 'axios'

function CompressPDF() {
	const [file, setFile] = useState(null)
	const [compressing, setCompressing] = useState(false)
	const [error, setError] = useState(null)
	const [compressionLevel, setCompressionLevel] = useState('medium')
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		setMeta({
			title: 'Compress PDF - SheetlyPro',
			description: 'Reduce PDF file size without losing quality. Fast and secure PDF compression.',
			keywords: 'compress pdf, reduce pdf size, pdf optimizer, shrink pdf',
			ogTitle: 'Compress PDF Files - SheetlyPro',
			ogDescription: 'Compress PDF files online without losing quality',
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

	const handleCompress = async () => {
		if (!file) return

		setCompressing(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('quality', compressionLevel)

			const response = await axios.post(
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/compress/',
				formData,
				{ withCredentials: true }
			)

			if (response.data.download_url) {
				const downloadResponse = await axios.get(
					`https://bank-statement-converter-backend-ofyc.onrender.com${response.data.download_url}`,
					{ withCredentials: true, responseType: 'blob' }
				)

				const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'sheetlypro_compressed.pdf')
				document.body.appendChild(link)
				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)

				setFile(null)
			}
		} catch (err) {
			setError(err.response?.data?.error || 'Failed to compress PDF. Please try again.')
		} finally {
			setCompressing(false)
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
						Compress PDF
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Reduce PDF file size without losing quality
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
							<Minimize2 className="h-16 w-16 mx-auto mb-4 text-purple-600" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Select PDF to Compress
							</h3>
							<p className="text-gray-600 mb-6">
								Choose compression level and reduce file size
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
										Compression Level
									</label>
									<div className="grid grid-cols-3 gap-4">
										{['low', 'medium', 'high'].map((level) => (
											<button
												key={level}
												onClick={() => setCompressionLevel(level)}
												className={`p-4 rounded-xl border-2 transition-all ${
													compressionLevel === level
														? 'border-purple-600 bg-purple-50'
														: 'border-gray-200 hover:border-purple-300'
												}`}
											>
												<p className="font-semibold text-gray-900 capitalize">{level}</p>
												<p className="text-xs text-gray-600 mt-1">
													{level === 'low' && 'Better quality'}
													{level === 'medium' && 'Balanced'}
													{level === 'high' && 'Smaller size'}
												</p>
											</button>
										))}
									</div>
								</div>

								<button
									onClick={handleCompress}
									disabled={compressing}
									className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
								>
									{compressing ? (
										<>
											<Loader2 className="h-6 w-6 animate-spin" />
											<span>Compressing...</span>
										</>
									) : (
										<>
											<Download className="h-6 w-6" />
											<span>Compress PDF</span>
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

export default CompressPDF
