import React, { useState, useEffect } from 'react'
import { Upload, X, GripVertical, Download, Loader2, FileText, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import axios from 'axios'

function MergePDF() {
	const [files, setFiles] = useState([])
	const [passwords, setPasswords] = useState([])
	const [showPasswords, setShowPasswords] = useState([])
	const [isDragging, setIsDragging] = useState(false)
	const [merging, setMerging] = useState(false)
	const [error, setError] = useState(null)
	const [draggedIndex, setDraggedIndex] = useState(null)

	useEffect(() => {
		setMeta({
			title: 'Merge PDF - SheetlyPro',
			description: 'Combine multiple PDF files into one document. Easy, fast, and secure PDF merger.',
			keywords: 'merge pdf, combine pdf, pdf joiner, join pdf files',
			ogTitle: 'Merge PDF Files - SheetlyPro',
			ogDescription: 'Merge multiple PDF files into one document online',
		})
	}, [])

	const handleFileSelect = (e) => {
		const selectedFiles = Array.from(e.target.files)
		addFiles(selectedFiles)
	}

	const addFiles = (newFiles) => {
		const pdfFiles = newFiles.filter(file => file.type === 'application/pdf')
		if (pdfFiles.length !== newFiles.length) {
			setError('Only PDF files are allowed')
			setTimeout(() => setError(null), 3000)
		}
		setFiles(prev => [...prev, ...pdfFiles])
		setPasswords(prev => [...prev, ...new Array(pdfFiles.length).fill('')])
		setShowPasswords(prev => [...prev, ...new Array(pdfFiles.length).fill(false)])
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
		const droppedFiles = Array.from(e.dataTransfer.files)
		addFiles(droppedFiles)
	}

	const removeFile = (index) => {
		setFiles(prev => prev.filter((_, i) => i !== index))
		setPasswords(prev => prev.filter((_, i) => i !== index))
		setShowPasswords(prev => prev.filter((_, i) => i !== index))
	}

	const handleDragStart = (index) => {
		setDraggedIndex(index)
	}

	const handleDragOverItem = (e, index) => {
		e.preventDefault()
		if (draggedIndex === null || draggedIndex === index) return

		const newFiles = [...files]
		const newPasswords = [...passwords]
		const newShowPasswords = [...showPasswords]

		const draggedFile = newFiles[draggedIndex]
		const draggedPassword = newPasswords[draggedIndex]
		const draggedShowPassword = newShowPasswords[draggedIndex]

		newFiles.splice(draggedIndex, 1)
		newFiles.splice(index, 0, draggedFile)

		newPasswords.splice(draggedIndex, 1)
		newPasswords.splice(index, 0, draggedPassword)

		newShowPasswords.splice(draggedIndex, 1)
		newShowPasswords.splice(index, 0, draggedShowPassword)

		setFiles(newFiles)
		setPasswords(newPasswords)
		setShowPasswords(newShowPasswords)
		setDraggedIndex(index)
	}

	const handleDragEnd = () => {
		setDraggedIndex(null)
	}

	const handleMerge = async () => {
		if (files.length < 2) {
			setError('Please add at least 2 PDF files to merge')
			return
		}

		setMerging(true)
		setError(null)

		try {
			const formData = new FormData()
			files.forEach((file) => {
				formData.append('files', file)
			})
			
			console.log('Passwords:', passwords)
			if (passwords.some(p => p)) {
				const passwordJson = JSON.stringify(passwords)
				console.log('Sending passwords:', passwordJson)
				formData.append('password', passwordJson)
			}

			// Step 1: Upload and merge PDFs
			const response = await axios.post(
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/pdf/merged/',
				formData,
				{
					withCredentials: true,
				}
			)

			// Step 2: Download merged PDF using the download URL
			if (response.data.download_url) {
				const downloadResponse = await axios.get(
					`https://bank-statement-converter-backend-ofyc.onrender.com${response.data.download_url}`,
					{
						withCredentials: true,
						responseType: 'blob',
					}
				)

				// Create download link
				const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'merged_document.pdf')
				document.body.appendChild(link)
				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)

				// Clear files after successful merge
				setFiles([])
				setPasswords([])
				setShowPasswords([])
			} else {
				setError('Download URL not received. Please try again.')
			}
		} catch (err) {
			console.error('Merge error:', err)
			console.error('Error response:', err.response?.data)
			setError(
				err.response?.data?.error ||
				err.response?.data?.message ||
				'Failed to merge PDFs. Please try again.'
			)
		} finally {
			setMerging(false)
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
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						PDF Tools
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Merge PDF Files
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Combine multiple PDF documents into a single file. Drag to reorder pages before merging.
					</p>
				</div>

				{/* Main Card */}
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
						{/* Upload Area */}
						<div
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
								isDragging
									? 'border-purple-500 bg-purple-50'
									: 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
							}`}
						>
							<Upload className={`h-16 w-16 mx-auto mb-4 ${isDragging ? 'text-purple-500' : 'text-gray-400'}`} />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Drop PDF files here
							</h3>
							<p className="text-gray-600 mb-6">
								or click to browse your files
							</p>
							<label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105">
								<Upload className="h-5 w-5 mr-2" />
								Select PDF Files
								<input
									type="file"
									multiple
									accept="application/pdf"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</label>
						</div>

						{/* Error Message */}
						{error && (
							<div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
								<AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
								<p className="text-red-700 font-medium">{error}</p>
							</div>
						)}

						{/* File List */}
						{files.length > 0 && (
							<div className="mt-8">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold text-gray-900">
										Selected Files ({files.length})
									</h3>
									<button
										onClick={() => {
											setFiles([])
											setPasswords([])
											setShowPasswords([])
										}}
										className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
									>
										Clear All
									</button>
								</div>

								<div className="space-y-3">
									{files.map((file, index) => (
										<div
											key={index}
											draggable
											onDragStart={() => handleDragStart(index)}
											onDragOver={(e) => handleDragOverItem(e, index)}
											onDragEnd={handleDragEnd}
											className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-200 cursor-move ${
												draggedIndex === index ? 'opacity-50' : ''
											}`}
										>
											<div className="flex items-center space-x-3 flex-1">
												<GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0" />
												<FileText className="h-8 w-8 text-purple-600 flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900 truncate">
														{file.name}
													</p>
													<p className="text-xs text-gray-500">
														{formatFileSize(file.size)}
													</p>
													<div className="mt-2 flex items-center space-x-2">
														<Lock className="h-4 w-4 text-purple-600" />
														<input
															type={showPasswords[index] ? 'text' : 'password'}
															placeholder="Enter password if protected"
															value={passwords[index] || ''}
															onChange={(e) => {
																const newPasswords = [...passwords]
																newPasswords[index] = e.target.value
																setPasswords(newPasswords)
															}}
															className="flex-1 px-3 py-2 text-sm border-2 border-purple-300 bg-purple-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
														/>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation()
																const newShowPasswords = [...showPasswords]
																newShowPasswords[index] = !newShowPasswords[index]
																setShowPasswords(newShowPasswords)
															}}
															className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
														>
															{showPasswords[index] ? <EyeOff className="h-4 w-4 text-purple-600" /> : <Eye className="h-4 w-4 text-purple-600" />}
														</button>
													</div>
												</div>
											</div>
											<button
												onClick={() => removeFile(index)}
												className="ml-4 p-2 hover:bg-red-100 rounded-lg transition-colors group"
											>
												<X className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
											</button>
										</div>
									))}
								</div>

								{/* Merge Button */}
								<button
									onClick={handleMerge}
									disabled={merging || files.length < 2}
									className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-[1.02] flex items-center justify-center space-x-2"
								>
									{merging ? (
										<>
											<Loader2 className="h-6 w-6 animate-spin" />
											<span>Merging PDFs...</span>
										</>
									) : (
										<>
											<Download className="h-6 w-6" />
											<span>Merge & Download</span>
										</>
									)}
								</button>

								<p className="text-center text-sm text-gray-500 mt-4">
									💡 Tip: Drag files to reorder them before merging
								</p>
							</div>
						)}

						{/* Instructions */}
						{files.length === 0 && (
							<div className="mt-8 bg-gradient-to-br from-green-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
								<h4 className="font-semibold text-gray-900 mb-3">How to merge PDFs:</h4>
								<ol className="space-y-2 text-gray-700">
									<li className="flex items-start">
										<span className="font-bold text-purple-600 mr-2">1.</span>
										<span>Upload multiple PDF files using the upload area above</span>
									</li>
									<li className="flex items-start">
										<span className="font-bold text-purple-600 mr-2">2.</span>
										<span>Drag and drop files to rearrange their order</span>
									</li>
									<li className="flex items-start">
										<span className="font-bold text-purple-600 mr-2">3.</span>
										<span>Click "Merge & Download" to combine them into one PDF</span>
									</li>
								</ol>
							</div>
						)}
					</div>
				</div>

				{/* Features Section */}
				<div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<FileText className="h-8 w-8 text-purple-600" />
						</div>
						<h3 className="font-semibold text-gray-900 mb-2">Unlimited Files</h3>
						<p className="text-gray-600 text-sm">Merge as many PDF files as you need</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<GripVertical className="h-8 w-8 text-purple-600" />
						</div>
						<h3 className="font-semibold text-gray-900 mb-2">Reorder Pages</h3>
						<p className="text-gray-600 text-sm">Drag & drop to arrange files in any order</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Download className="h-8 w-8 text-purple-600" />
						</div>
						<h3 className="font-semibold text-gray-900 mb-2">Fast Download</h3>
						<p className="text-gray-600 text-sm">Get your merged PDF instantly</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MergePDF
