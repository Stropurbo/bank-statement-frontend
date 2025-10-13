import React, { useState, useEffect } from 'react'
import {
	Upload,
	X,
	GripVertical,
	Download,
	Loader2,
	FileText,
	AlertCircle,
	Lock,
	Eye,
	EyeOff,
	CreditCard,
} from 'lucide-react'
import { setMeta } from '../utils/setMeta'
import ApiClient from '../services/api-client'
import { useNavigate } from 'react-router-dom'

function UniversalToolPage({ config }) {
	const navigate = useNavigate()
	const [files, setFiles] = useState([])
	const [passwords, setPasswords] = useState([])
	const [showPasswords, setShowPasswords] = useState([])
	const [isDragging, setIsDragging] = useState(false)
	const [processing, setProcessing] = useState(false)
	const [error, setError] = useState(null)
	const [isSubscriptionError, setIsSubscriptionError] = useState(false)
	const [draggedIndex, setDraggedIndex] = useState(null)
	const [quality, setQuality] = useState(config.defaultQuality || 'medium')
	const [customFieldValues, setCustomFieldValues] = useState(() => {
		if (!config.customFields) return {}
		const initialValues = {}
		config.customFields.forEach(field => {
			initialValues[field.name] = field.defaultValue || ''
		})
		return initialValues
	})

	useEffect(() => {
		setMeta({
			title: `${config.title} - SheetlyPro`,
			description: config.metaDescription || config.description,
			keywords: config.keywords || config.title.toLowerCase(),
			ogTitle: `${config.title} - SheetlyPro`,
			ogDescription: config.description,
		})
		// Reset quality when config changes
		setQuality(config.defaultQuality || 'medium')
		// Reset custom fields
		if (config.customFields) {
			const initialValues = {}
			config.customFields.forEach(field => {
				initialValues[field.name] = field.defaultValue || ''
			})
			setCustomFieldValues(initialValues)
		}
	}, [config])

	const handleFileSelect = (e) => {
		const selectedFiles = Array.from(e.target.files)
		addFiles(selectedFiles)
	}

	const addFiles = (newFiles) => {
		// Filter files based on allowed type
		const validFiles = newFiles.filter((file) => {
			if (config.allowedTypes) {
				return config.allowedTypes.includes(file.type)
			}
			return true
		})

		if (validFiles.length !== newFiles.length) {
			setError(`Only ${config.fileTypeLabel || 'valid'} files are allowed`)
			setIsSubscriptionError(false)
			setTimeout(() => {
				setError(null)
				setIsSubscriptionError(false)
			}, 3000)
		}

		if (config.allowMultiple) {
			setFiles((prev) => [...prev, ...validFiles])
			if (config.requiresPassword) {
				setPasswords((prev) => [...prev, ...new Array(validFiles.length).fill('')])
				setShowPasswords((prev) => [
					...prev,
					...new Array(validFiles.length).fill(false),
				])
			}
		} else {
			setFiles(validFiles.slice(0, 1))
			if (config.requiresPassword) {
				setPasswords([''])
				setShowPasswords([false])
			}
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
		const droppedFiles = Array.from(e.dataTransfer.files)
		addFiles(droppedFiles)
	}

	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index))
		if (config.requiresPassword) {
			setPasswords((prev) => prev.filter((_, i) => i !== index))
			setShowPasswords((prev) => prev.filter((_, i) => i !== index))
		}
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
		newFiles.splice(draggedIndex, 1)
		newFiles.splice(index, 0, draggedFile)

		if (config.requiresPassword) {
			const draggedPassword = newPasswords[draggedIndex]
			const draggedShowPassword = newShowPasswords[draggedIndex]

			newPasswords.splice(draggedIndex, 1)
			newPasswords.splice(index, 0, draggedPassword)

			newShowPasswords.splice(draggedIndex, 1)
			newShowPasswords.splice(index, 0, draggedShowPassword)

			setPasswords(newPasswords)
			setShowPasswords(newShowPasswords)
		}

		setFiles(newFiles)
		setDraggedIndex(index)
	}

	const handleDragEnd = () => {
		setDraggedIndex(null)
	}

	const handleProcess = async () => {
		const minFiles = config.allowMultiple ? config.minFiles || 2 : 1

		if (files.length < minFiles) {
			setError(`Please add at least ${minFiles} file${minFiles > 1 ? 's' : ''}`)
			return
		}

		setProcessing(true)
		setError(null)
		setIsSubscriptionError(false)

		try {
			const formData = new FormData()

			if (config.allowMultiple) {
				files.forEach((file) => {
					formData.append('files', file)
				})
			} else {
				formData.append('file', files[0])
			}

			if (config.requiresPassword && passwords.some((p) => p)) {
				const passwordJson = JSON.stringify(passwords)
				formData.append('password', passwordJson)
			}

			if (config.hasQualitySelector) {
				formData.append('quality', quality)
			}

			// Add custom field values
			if (config.hasCustomFields && config.customFields) {
				config.customFields.forEach(field => {
					const value = customFieldValues[field.name]
					if (value !== undefined && value !== null && value !== '') {
						formData.append(field.name, value)
					}
				})
			}

			// API call
			const response = await ApiClient.post(
				config.apiEndpoint,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			// Download file
			if (response.data.download_url) {
				// Remove leading /api/ if present to avoid double /api/
				let downloadUrl = response.data.download_url.replace(/^\/api\//, '')
				// Add bill/ prefix if missing for utility-bill-parser
				if (downloadUrl.startsWith('utility-bill-parser/')) {
					downloadUrl = 'bill/' + downloadUrl
				}
				const downloadResponse = await ApiClient.get(
					downloadUrl,
					{
						responseType: 'blob',
					},
				)

				const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', config.outputFileName || 'sheetlypro_output.pdf')
				document.body.appendChild(link)
				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)

				// Clear files after success
				setFiles([])
				setPasswords([])
				setShowPasswords([])
			} else {
				setError('Download URL not received. Please try again.')
			}
		} catch (err) {
			console.error('Processing error:', err)
			console.error('Error response:', err.response?.data)
			const errorMessage = err.response?.data?.error ||
				err.response?.data?.message ||
				JSON.stringify(err.response?.data) ||
				`Failed to ${config.actionLabel || 'process'}. Please try again.`

			// Check if it's a subscription/limit error
			const errorCode = err.response?.data?.error_code
			const isLimitError = errorCode === 'DAILY_LIMIT_EXCEEDED' ||
				errorCode === 'UPLOAD_LIMIT_EXCEEDED' ||
				errorCode === 'SUBSCRIPTION_REQUIRED' ||
				errorMessage.includes('limit exceeded') ||
				errorMessage.includes('subscription') ||
				errorMessage.includes('upgrade') ||
				err.response?.status === 403

			setError(errorMessage)
			setIsSubscriptionError(isLimitError)
		} finally {
			setProcessing(false)
		}
	}

	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="container mx-auto px-6 py-24">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
						{config.category || 'PDF Tools'}
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						{config.title}
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						{config.description}
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
							<Upload
								className={`h-16 w-16 mx-auto mb-4 ${
									isDragging ? 'text-purple-500' : 'text-gray-400'
								}`}
							/>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Drop {config.fileTypeLabel || 'files'} here
							</h3>
							<p className="text-gray-600 mb-6">or click to browse your files</p>
							<label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105">
								<Upload className="h-5 w-5 mr-2" />
								Select {config.fileTypeLabel || 'Files'}
								<input
									type="file"
									multiple={config.allowMultiple}
									accept={config.allowedTypes?.join(',')}
									onChange={handleFileSelect}
									className="hidden"
								/>
							</label>
						</div>

						{/* Error Message */}
						{error && (
							<div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
								<div className="flex items-center space-x-3">
									<AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
									<p className="text-red-700 font-medium flex-1">{error}</p>
								</div>
								{isSubscriptionError && (
									<button
										onClick={() => navigate('/pricing')}
										className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
									>
										<CreditCard className="h-5 w-5" />
										<span>Upgrade Plan</span>
									</button>
								)}
							</div>
						)}

						{/* File List */}
						{files.length > 0 && (
							<div className="mt-8">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold text-gray-900">
										Selected File{config.allowMultiple ? 's' : ''} (
										{files.length})
									</h3>
									<button
										onClick={() => {
											setFiles([])
											setPasswords([])
											setShowPasswords([])
											setError(null)
											setIsSubscriptionError(false)
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
											draggable={config.allowReorder}
											onDragStart={() =>
												config.allowReorder && handleDragStart(index)
											}
											onDragOver={(e) =>
												config.allowReorder &&
												handleDragOverItem(e, index)
											}
											onDragEnd={() =>
												config.allowReorder && handleDragEnd()
											}
											className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-200 ${
												config.allowReorder ? 'cursor-move' : ''
											} ${draggedIndex === index ? 'opacity-50' : ''}`}
										>
											<div className="flex items-center space-x-3 flex-1">
												{config.allowReorder && (
													<GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0" />
												)}
												<FileText className="h-8 w-8 text-purple-600 flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900 truncate">
														{file.name}
													</p>
													<p className="text-xs text-gray-500">
														{formatFileSize(file.size)}
													</p>
													{config.requiresPassword && (
														<div className="mt-2 flex items-center space-x-2">
															<Lock className="h-4 w-4 text-purple-600" />
															<input
																type={
																	showPasswords[index]
																		? 'text'
																		: 'password'
																}
																placeholder="Enter password if protected"
																value={passwords[index] || ''}
																onChange={(e) => {
																	const newPasswords = [
																		...passwords,
																	]
																	newPasswords[index] =
																		e.target.value
																	setPasswords(newPasswords)
																}}
																className="flex-1 px-3 py-2 text-sm border-2 border-purple-300 bg-purple-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
															/>
															<button
																type="button"
																onClick={(e) => {
																	e.stopPropagation()
																	const newShowPasswords = [
																		...showPasswords,
																	]
																	newShowPasswords[index] =
																		!newShowPasswords[index]
																	setShowPasswords(
																		newShowPasswords,
																	)
																}}
																className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
															>
																{showPasswords[index] ? (
																	<EyeOff className="h-4 w-4 text-purple-600" />
																) : (
																	<Eye className="h-4 w-4 text-purple-600" />
																)}
															</button>
														</div>
													)}
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

								{/* Quality Selector */}
								{config.hasQualitySelector && (
									<div className="mt-6">
										<h4 className="text-sm font-semibold text-gray-900 mb-3">
											Select Compression Quality:
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
											{config.qualityOptions.map((option) => (
												<button
													key={option.value}
													type="button"
													onClick={() => setQuality(option.value)}
													className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
														quality === option.value
															? 'border-purple-500 bg-purple-50'
															: 'border-gray-200 hover:border-purple-300 bg-white'
													}`}
												>
													<div className="flex items-center justify-between mb-1">
														<span className="font-semibold text-gray-900">
															{option.label}
														</span>
														{quality === option.value && (
															<div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
																<svg
																	className="w-3 h-3 text-white"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth="2"
																		d="M5 13l4 4L19 7"
																	/>
																</svg>
															</div>
														)}
													</div>
													<p className="text-sm text-gray-600">
														{option.description}
													</p>
												</button>
											))}
										</div>
									</div>
								)}

								{/* Custom Fields */}
								{config.hasCustomFields && config.customFields && (
									<div className="mt-6">
										<h4 className="text-sm font-semibold text-gray-900 mb-3">
											Options:
										</h4>
										<div className="space-y-4">
											{config.customFields.map((field) => (
												<div key={field.name}>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														{field.label}
													</label>
													{field.type === 'select' ? (
														<select
															value={customFieldValues[field.name] || ''}
															onChange={(e) =>
																setCustomFieldValues({
																	...customFieldValues,
																	[field.name]: e.target.value,
																})
															}
															className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
														>
															{field.options?.map((option) => (
																<option key={option.value} value={option.value}>
																	{option.label}
																</option>
															))}
														</select>
													) : (
														<input
															type={field.type}
															value={customFieldValues[field.name] || ''}
															onChange={(e) =>
																setCustomFieldValues({
																	...customFieldValues,
																	[field.name]: e.target.value,
																})
															}
															placeholder={field.placeholder}
															required={field.required}
															className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
														/>
													)}
												</div>
											))}
										</div>
									</div>
								)}

								{/* Process Button */}
								<button
									onClick={handleProcess}
									disabled={
										processing ||
										files.length <
											(config.allowMultiple ? config.minFiles || 2 : 1)
									}
									className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-[1.02] flex items-center justify-center space-x-2"
								>
									{processing ? (
										<>
											<Loader2 className="h-6 w-6 animate-spin" />
											<span>
												{config.processingLabel || 'Processing...'}
											</span>
										</>
									) : (
										<>
											<Download className="h-6 w-6" />
											<span>{config.buttonLabel || 'Download'}</span>
										</>
									)}
								</button>

								{config.allowReorder && (
									<p className="text-center text-sm text-gray-500 mt-4">
										💡 Tip: Drag files to reorder them
									</p>
								)}
							</div>
						)}

						{/* Instructions */}
						{files.length === 0 && config.instructions && (
							<div className="mt-8 bg-gradient-to-br from-green-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
								<h4 className="font-semibold text-gray-900 mb-3">
									How to {config.actionLabel || 'use this tool'}:
								</h4>
								<ol className="space-y-2 text-gray-700">
									{config.instructions.map((instruction, index) => (
										<li
											key={index}
											className="flex items-start"
										>
											<span className="font-bold text-purple-600 mr-2">
												{index + 1}.
											</span>
											<span>{instruction}</span>
										</li>
									))}
								</ol>
							</div>
						)}
					</div>
				</div>

				{/* Features Section */}
				{config.features && (
					<div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						{config.features.map((feature, index) => (
							<div
								key={index}
								className="text-center"
							>
								<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<feature.icon className="h-8 w-8 text-purple-600" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm">{feature.description}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default UniversalToolPage
