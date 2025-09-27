import { Upload, FileText, Download, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import React, { useRef, useState, useContext } from 'react'
import AuthApiClient from '../../services/auth-api-client'
import AuthContext from '../../context/AuthContext'

function HeroSection() {
	const { user } = useContext(AuthContext)
	const [tableData, setTableData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [downloading, setDownloading] = useState(false)
	const [password, setPassword] = useState('')
	const [fileToUpload, setFileToUpload] = useState(null)
	const [error, setError] = useState(null)
	const [statementId, setStatementId] = useState(null)
	const inputRef = useRef(null)

	const processUpload = async (file, currentPassword = '') => {
		let formData = new FormData()
		formData.append('file', file)
		formData.append('password', currentPassword)

		try {
			setLoading(true)
			setError(null)
			const res = await AuthApiClient.post('upload-pdf/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (res.data.transactions_json) {
				const rows = res.data.transactions_json
				const columns = rows.length > 0 ? Object.keys(rows[0]) : []
				setTableData({ columns, rows })
				setStatementId(res.data.statement_id)
			} else {
				setTableData(null)
			}

			setPassword('')
			setFileToUpload(null)
		} catch (error) {
			console.error('Upload error:', error)
			if (error.response) {
				console.error('Error response:', error.response.data)
				const errorData = error.response.data
				const errorMessage =
					errorData.error ||
					errorData.detail ||
					errorData.message ||
					'Server error occurred'
				const errorString =
					typeof errorMessage === 'string'
						? errorMessage
						: JSON.stringify(errorMessage)

				// Check if it's a password-protected PDF error
				if (
					error.response.status === 400 &&
					(errorString.includes('password-protected') ||
						errorString.includes('Please provide the password') ||
						errorString.includes('Incorrect password'))
				) {
					setError('This PDF is password protected. Please enter the password below.')
					setFileToUpload(file)
				} else if (
					errorString.includes('Authentication credentials were not provided')
				) {
					setError('Please login and purchase a subscription to continue uploading.')
				} else {
					setError(`Failed to process file: ${errorString}`)
				}
			} else {
				console.error('Network error:', error)
				setError('Network error occurred. Please check your connection.')
			}
		} finally {
			setLoading(false)
		}
	}

	const handleFileSelect = (e) => {
		const file = e.target.files[0]
		if (!file) return
		processUpload(file)
	}

	const handlePasswordSubmit = (e) => {
		e.preventDefault()
		if (fileToUpload && password) {
			processUpload(fileToUpload, password)
		}
	}

	const handleDownload = async () => {
		if (!statementId) return alert('No statement available to download')

		if (!user) {
			alert('Please log in to download your file.')
			return
		}

		setDownloading(true)
		try {
			const response = await AuthApiClient.get(`download-excel/${statementId}/`, {
				responseType: 'blob',
			})

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'bank_statement.csv')
			document.body.appendChild(link)
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Download failed:', error)
			if (error.response?.status === 403) {
				alert('Session expired. Please log in again.')
			} else {
				alert('Download failed! Please try again.')
			}
		} finally {
			setDownloading(false)
		}
	}

	const handleClick = () => {
		if (inputRef.current) inputRef.current.click()
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center">
			<div className="container mx-auto px-6 py-24">
				{/* Hero Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
						<Sparkles className="h-4 w-4" />
						AI-Powered PDF Conversion
					</div>
					<h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
						Transform Bank Statements
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							To Excel Instantly
						</span>
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
						Upload your PDF bank statement and watch our AI convert it into a clean,
						organized Excel file in seconds. No manual data entry required.
					</p>

					{/* Trust Indicators */}
					<div className="flex flex-wrap justify-center gap-8 mb-16 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<CheckCircle className="h-5 w-5 text-green-600" />
							99.9% Accuracy
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-5 w-5 text-green-600" />
							Bank-Level Security
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="h-5 w-5 text-green-600" />
							Instant Processing
						</div>
					</div>
				</div>

				{error && (
					<div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
						<p className="text-red-700 text-center font-medium">{error}</p>
					</div>
				)}

				{/* Upload Section */}
				<div className="max-w-3xl mx-auto mb-20">
					<div className="bg-white border-2 border-dashed border-purple-200 rounded-3xl p-16 hover:border-purple-400 transition-all duration-300 shadow-2xl hover:shadow-3xl">
						<div className="flex flex-col items-center gap-8">
							<div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
								<FileText className="h-12 w-12 text-purple-600" />
							</div>

							<div className="text-center">
								<h3 className="text-3xl font-bold text-gray-900 mb-4">
									Upload Your Bank Statement
								</h3>
								<p className="text-gray-600 text-lg">
									Drag & drop your PDF file here or click to browse
								</p>
								<p className="text-sm text-gray-500 mt-2">
									Supports all major banks • Max file size: 10MB
								</p>
							</div>

							<input
								type="file"
								accept="application/pdf"
								className="hidden"
								ref={inputRef}
								onChange={handleFileSelect}
								disabled={loading}
							/>

							<button
								type="button"
								onClick={handleClick}
								disabled={loading}
								className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
							>
								<Upload className="inline-block mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
								{loading ? 'Processing...' : 'Choose PDF File'}
							</button>
						</div>
					</div>

					{fileToUpload && (
						<div className="mt-8 max-w-md mx-auto">
							<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
								<h4 className="font-semibold text-yellow-800 mb-4 text-center">
									Password Protected PDF
								</h4>
								<form
									onSubmit={handlePasswordSubmit}
									className="space-y-4"
								>
									<input
										type="password"
										placeholder="Enter PDF password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
										required
									/>
									<button
										type="submit"
										disabled={loading}
										className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
									>
										{loading ? 'Processing...' : 'Unlock & Convert'}
									</button>
								</form>
							</div>
						</div>
					)}

					{loading && (
						<div className="mt-8 max-w-md mx-auto">
							<div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
								<h4 className="font-semibold text-blue-800 mb-2">
									Processing Your Statement
								</h4>
								<p className="text-blue-600 text-sm">
									Our AI is extracting and organizing your data...
								</p>
							</div>
						</div>
					)}

					{tableData && (
						<div className="mt-12 max-w-6xl mx-auto">
							<div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
								{/* Success Header */}
								<div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 border-b border-gray-200">
									<div className="flex items-center justify-center gap-3 mb-4">
										<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
											<CheckCircle className="h-6 w-6 text-green-600" />
										</div>
										<h3 className="text-2xl font-bold text-gray-900">
											Conversion Complete!
										</h3>
									</div>
									<p className="text-center text-gray-600">
										Your bank statement has been successfully converted.
										Preview your data below.
									</p>
								</div>

								{/* Data Table */}
								<div className="p-8">
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr className="bg-gray-50">
													{tableData.columns.map((col, i) => (
														<th
															key={i}
															className="px-6 py-4 text-left font-semibold text-gray-900 uppercase tracking-wider text-sm"
														>
															{col}
														</th>
													))}
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200">
												{tableData.rows.slice(0, 10).map((row, i) => (
													<tr
														key={i}
														className="hover:bg-gray-50 transition-colors"
													>
														{tableData.columns.map((col, j) => (
															<td
																key={j}
																className="px-6 py-4 text-sm text-gray-700"
															>
																{typeof row[col] === 'object' &&
																row[col] !== null
																	? JSON.stringify(row[col])
																	: row[col] ?? ''}
															</td>
														))}
													</tr>
												))}
											</tbody>
										</table>
										{tableData.rows.length > 10 && (
											<p className="text-center text-gray-500 mt-4 text-sm">
												Showing first 10 rows of {tableData.rows.length}{' '}
												total transactions
											</p>
										)}
									</div>

									{/* Download Button */}
									<div className="flex justify-center mt-8">
										<button
											onClick={handleDownload}
											disabled={downloading || !user}
											className={`group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl ${
												user
													? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
													: 'bg-gray-400 text-gray-600 cursor-not-allowed'
											} disabled:opacity-50 disabled:transform-none`}
										>
											<Download className="inline-block mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
											{downloading
												? 'Preparing Download...'
												: user
												? 'Download Excel File'
												: 'Login to Download'}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default HeroSection
