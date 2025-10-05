import React, { useState, useEffect } from 'react'
import { Upload, Download, Loader2, FileText, AlertCircle, FileType } from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import axios from 'axios'

function WordToPDF() {
	const [file, setFile] = useState(null)
	const [converting, setConverting] = useState(false)
	const [error, setError] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		setMeta({
			title: 'Word to PDF - SheetlyPro',
			description: 'Convert Word documents to PDF format. Fast and accurate DOCX to PDF conversion.',
			keywords: 'word to pdf, docx to pdf, convert word to pdf, word converter',
			ogTitle: 'Word to PDF Converter - SheetlyPro',
			ogDescription: 'Convert Word documents to PDF files online',
		})
	}, [])

	const handleFileSelect = (e) => {
		const selectedFile = e.target.files[0]
		const validTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
		if (selectedFile && validTypes.includes(selectedFile.type)) {
			setFile(selectedFile)
			setError(null)
		} else {
			setError('Please select a valid Word file (.docx or .doc)')
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
		const validTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
		if (droppedFile && validTypes.includes(droppedFile.type)) {
			setFile(droppedFile)
			setError(null)
		} else {
			setError('Please drop a valid Word file (.docx or .doc)')
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
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/word-to-pdf/',
				formData,
				{ withCredentials: true }
			)

			if (response.data.data && response.data.data.id) {
				const downloadResponse = await axios.get(
					`https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/word-to-pdf/${response.data.data.id}/download/`,
					{ withCredentials: true, responseType: 'blob' }
				)

				const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
				const link = document.createElement('a')
				link.href = url
				const filename = file.name.replace(/\.(docx?|doc)$/i, '.pdf')
				link.setAttribute('download', filename)
				document.body.appendChild(link)
				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)

				setFile(null)
			}
		} catch (err) {
			const errorMsg = err.response?.data?.error || 'Failed to convert Word document. Please try again.'
			if (errorMsg.includes('not implemented for linux')) {
				setError('Word to PDF conversion is currently unavailable. This feature requires Windows server. We are working on a Linux-compatible solution.')
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
			<div className="container mx-auto px-6 py-24">
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						PDF Tools
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Word to PDF
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Convert Word documents to PDF format
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
							<FileType className="h-16 w-16 mx-auto mb-4 text-purple-600" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Drop Word file here
							</h3>
							<p className="text-gray-600 mb-6">
								or click to browse your files
							</p>
							<label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105">
								<Upload className="h-5 w-5 mr-2" />
								Select Word File
								<input
									type="file"
									accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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

								<button
									onClick={handleConvert}
									disabled={converting}
									className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
								>
									{converting ? (
										<>
											<Loader2 className="h-6 w-6 animate-spin" />
											<span>Converting...</span>
										</>
									) : (
										<>
											<Download className="h-6 w-6" />
											<span>Convert to PDF</span>
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

export default WordToPDF
