import { Upload, FileText, Download, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import React, { useRef, useState, useContext } from 'react'
import AuthApiClient from '../services/auth-api-client'
import AuthContext from '../context/AuthContext'
import { FaGoogleDrive } from 'react-icons/fa'

function HeroSection() {
	const { user } = useContext(AuthContext)
	const [tableData, setTableData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [downloading, setDownloading] = useState(false)
	const [savingToDrive, setSavingToDrive] = useState(false)
	const [password, setPassword] = useState('')
	const [fileToUpload, setFileToUpload] = useState(null)
	const [error, setError] = useState(null)
	const [statementId, setStatementId] = useState(null)
	const [userStatus, setUserStatus] = useState(null)
	const [hoveredCategory, setHoveredCategory] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage] = useState(20)
	const inputRef = useRef(null)

	// Fetch user subscription status
	const fetchUserStatus = async () => {
		if (!user) return
		try {
			const response = await AuthApiClient.get('user-subscription-status/')
			console.log('User Status Response:', response.data)
			setUserStatus(response.data)
		} catch (error) {
			console.error('Failed to fetch user status:', error)
		}
	}

	React.useEffect(() => {
		fetchUserStatus()
	}, [user])

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
			await fetchUserStatus()
		} catch (error) {
			console.error('Upload error:', error)
			if (error.response) {
				console.error('Error response:', error.response.data)
				const errorData = error.response.data
				let errorMessage =
					errorData.error ||
					errorData.detail ||
					errorData.message ||
					'Server error occurred'

				const errorString =
					typeof errorMessage === 'string'
						? errorMessage
						: JSON.stringify(errorMessage)

				console.log('Full error string:', errorString)
				console.log('Current password being sent:', currentPassword)
				console.log('FileToUpload state:', fileToUpload?.name)

				if (
					error.response.status === 400 &&
					(errorString.includes('Password-protected PDFs are not supported') ||
						errorString.includes('PDF is password protected') ||
						errorString.includes('Please provide password') ||
						errorString.includes('Invalid password') ||
						errorString.includes('PASSWORD_REQUIRED') ||
						errorString.includes('INVALID_PASSWORD') ||
						errorData.error_code === 'PASSWORD_REQUIRED' ||
						errorData.error_code === 'INVALID_PASSWORD')
				) {
					setError('This PDF is password protected. Please enter the password below.')
					setFileToUpload(file)
					console.log('Setting fileToUpload:', file.name) // Debug log
				} else if (
					error.response.status === 403 &&
					(errorString.includes('Daily limit exceeded') ||
						errorString.includes('monthly upload limit'))
				) {
					console.log('Limit error details:', errorData)
					setError(
						'Daily upload limit reached! Upgrade to premium for unlimited access.',
					)
				} else if (
					errorString.includes('Authentication credentials were not provided')
				) {
					setError('Please login to continue uploading.')
				} else if (
					errorString.includes('No text could be extracted') ||
					errorString.includes('No /Root object') ||
					errorString.includes('OCR completely failed') ||
					errorString.includes('Cannot open empty stream') ||
					errorString.includes('PDFPlumber failed') ||
					errorString.includes('Unable to extract data from this PDF')
				) {
					setError(
						'Unable to extract text from this PDF. Please ensure: 1) PDF is not password protected 2) Contains readable text (not just images) 3) Try a different bank statement PDF.',
					)
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

	const handleFileSelect = async (e) => {
		const file = e.target.files[0]
		if (!file) return

		if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
			setError('Please select a valid PDF file.')
			return
		}

		if (file.size === 0) {
			setError('The selected file is empty. Please choose a valid PDF.')
			return
		}

		if (file.size < 1024) {
			setError('File too small. Please select a valid PDF file.')
			return
		}

		if (file.size > 20 * 1024 * 1024) {
			setError('File too large. Maximum size is 20MB.')
			return
		}

		try {
			const arrayBuffer = await file.slice(0, 8).arrayBuffer()
			const uint8Array = new Uint8Array(arrayBuffer)
			const header = String.fromCharCode(...uint8Array)

			if (!header.startsWith('%PDF-')) {
				setError('Invalid PDF file. Please select a valid bank statement PDF.')
				return
			}
		} catch (error) {
			console.log(error)
			setError('Unable to read file. Please try again.')
			return
		}

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
			if (error.response?.status === 403 || error.message?.includes('token')) {
				setError(
					'Session expired or invalid token. Please log in again with premium plan.',
				)
			} else if (error.response?.status === 401) {
				setError('Authentication required. Please login and purchase premium plan.')
			} else {
				setError('Download failed! Please try again or contact support.')
			}
		} finally {
			setDownloading(false)
		}
	}

	const loadGoogleAPIs = () => {
		return new Promise((resolve, reject) => {
			if (window.google && window.google.accounts) {
				resolve()
				return
			}

			const script1 = document.createElement('script')
			script1.src = 'https://accounts.google.com/gsi/client'
			script1.onload = () => {
				const script2 = document.createElement('script')
				script2.src = 'https://apis.google.com/js/picker.js'
				script2.onload = resolve
				script2.onerror = reject
				document.head.appendChild(script2)
			}
			script1.onerror = reject
			document.head.appendChild(script1)
		})
	}

	const authenticateGoogle = () => {
		return new Promise((resolve, reject) => {
			const client = window.google.accounts.oauth2.initTokenClient({
				client_id:
					'806556000803-fb90k8tqovgh3m3fh1em1vt5l54mgdse.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/drive.file',
				callback: (response) => {
					if (response.access_token) {
						resolve(response.access_token)
					} else {
						reject(new Error('Failed to get access token'))
					}
				},
				error_callback: (error) => {
					reject(error)
				},
			})
			client.requestAccessToken()
		})
	}

	const uploadToGoogleDrive = (fileBlob, folderId, fileName, asGoogleSheets = false) => {
		return new Promise((resolve, reject) => {
			const metadata = {
				name: fileName,
			}

			if (folderId) {
				metadata.parents = [folderId]
			}

			if (asGoogleSheets) {
				metadata.mimeType = 'application/vnd.google-apps.spreadsheet'
			}

			const form = new FormData()
			form.append(
				'metadata',
				new Blob([JSON.stringify(metadata)], { type: 'application/json' }),
			)
			form.append('file', fileBlob)

			fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${window.currentAccessToken}`,
				},
				body: form,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						reject(new Error(data.error.message))
					} else {
						resolve(data)
					}
				})
				.catch(reject)
		})
	}

	const handleGoogleDriveSave = async () => {
		if (!statementId) return alert('No statement available to save')

		if (!user) {
			alert('Please log in to save your file to Google Drive.')
			return
		}

		setSavingToDrive(true)
		try {
			await loadGoogleAPIs()
			const authToken = await authenticateGoogle()
			window.currentAccessToken = authToken

			const response = await AuthApiClient.get(`download-excel/${statementId}/`, {
				responseType: 'blob',
			})

			await uploadToGoogleDrive(response.data, null, 'Bank Statement', true)
			alert('File saved to Google Sheets successfully!')
		} catch (error) {
			console.error('Google Drive save failed:', error)
			setError('Failed to save to Google Drive. Please try again.')
		} finally {
			setSavingToDrive(false)
		}
	}

	const handleJsonDownload = () => {
		if (!tableData) return alert('No data available to download')

		const jsonData = JSON.stringify(tableData.rows, null, 2)
		const blob = new Blob([jsonData], { type: 'application/json' })
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'bank_statement.json')
		document.body.appendChild(link)
		link.click()
		link.remove()
		window.URL.revokeObjectURL(url)
	}

	const handleSqlDownload = () => {
		if (!tableData) return alert('No data available to download')

		let sqlContent = 'CREATE TABLE bank_statement (\n'
		tableData.columns.forEach((col, i) => {
			sqlContent += `  ${col} TEXT${i < tableData.columns.length - 1 ? ',' : ''}\n`
		})
		sqlContent += ');\n\n'

		tableData.rows.forEach((row) => {
			const values = tableData.columns
				.map((col) => {
					const value = row[col] ?? ''
					return `'${String(value).replace(/'/g, "''")}'`
				})
				.join(', ')
			sqlContent += `INSERT INTO bank_statement VALUES (${values});\n`
		})

		const blob = new Blob([sqlContent], { type: 'text/sql' })
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'bank_statement.sql')
		document.body.appendChild(link)
		link.click()
		link.remove()
		window.URL.revokeObjectURL(url)
	}

	const handleXmlDownload = () => {
		if (!tableData) return alert('No data available to download')

		let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<bank_statement>\n'
		tableData.rows.forEach((row) => {
			xmlContent += '  <transaction>\n'
			tableData.columns.forEach((col) => {
				const value = row[col] ?? ''
				const escapedValue = String(value)
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
				xmlContent += `    <${col}>${escapedValue}</${col}>\n`
			})
			xmlContent += '  </transaction>\n'
		})
		xmlContent += '</bank_statement>'

		const blob = new Blob([xmlContent], { type: 'text/xml' })
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'bank_statement.xml')
		document.body.appendChild(link)
		link.click()
		link.remove()
		window.URL.revokeObjectURL(url)
	}

	const generateSummary = () => {
		if (!tableData) return null

		let totalIncome = 0
		let totalExpense = 0
		const categories = {}

		// Find amount column (case insensitive)
		const amountCol = tableData.columns.find(
			(col) =>
				col.toLowerCase().includes('amount') ||
				col.toLowerCase().includes('balance') ||
				col.toLowerCase().includes('debit') ||
				col.toLowerCase().includes('credit'),
		)

		// Find description column
		const descCol = tableData.columns.find(
			(col) =>
				col.toLowerCase().includes('description') ||
				col.toLowerCase().includes('narration') ||
				col.toLowerCase().includes('details'),
		)

		console.log('Available columns:', tableData.columns)
		console.log('Amount column found:', amountCol)
		console.log('Description column found:', descCol)

		// Find debit/credit columns
		const debitCol = tableData.columns.find((col) => col.toLowerCase().includes('debit'))
		const creditCol = tableData.columns.find((col) => col.toLowerCase().includes('credit'))

		tableData.rows.forEach((row) => {
			let income = 0
			let expense = 0
			const description = row[descCol] || ''

			// Handle separate debit/credit columns
			if (debitCol && creditCol) {
				const debitAmount =
					parseFloat(String(row[debitCol] || '0').replace(/[^\d.-]/g, '')) || 0
				const creditAmount =
					parseFloat(String(row[creditCol] || '0').replace(/[^\d.-]/g, '')) || 0

				if (creditAmount > 0) income = creditAmount
				if (debitAmount > 0) expense = debitAmount
			} else if (amountCol) {
				// Handle single amount column
				const amountStr = row[amountCol] || '0'
				const amount = parseFloat(String(amountStr).replace(/[^\d.-]/g, '')) || 0

				if (amount > 0) {
					income = amount
				} else if (amount < 0) {
					expense = Math.abs(amount)
				}
			}

			totalIncome += income
			totalExpense += expense

			// Enhanced categorization for both income and expenses
			const desc = String(description).toLowerCase()

			// Categorize income
			if (income > 0) {
				let category = 'Other Income'

				if (desc.includes('salary') || desc.includes('payroll') || desc.includes('wages') || desc.includes('pay')) {
					category = 'Salary'
				} else if (desc.includes('transfer') || desc.includes('deposit') || desc.includes('credit')) {
					category = 'Transfer In'
				} else if (desc.includes('interest') || desc.includes('dividend') || desc.includes('investment')) {
					category = 'Investment'
				} else if (desc.includes('refund') || desc.includes('return') || desc.includes('cashback')) {
					category = 'Refund'
				}

				categories[category] = (categories[category] || 0) + income
			}

			// Categorize expenses
			if (expense > 0) {
				let category = 'Others'

				if (desc.includes('atm') || desc.includes('cash withdrawal')) {
					category = 'ATM'
				} else if (desc.includes('grocery') || desc.includes('supermarket') || desc.includes('food') || desc.includes('mart')) {
					category = 'Grocery'
				} else if (desc.includes('fuel') || desc.includes('gas') || desc.includes('petrol') || desc.includes('diesel')) {
					category = 'Fuel'
				} else if (desc.includes('restaurant') || desc.includes('cafe') || desc.includes('dining') || desc.includes('pizza') || desc.includes('burger')) {
					category = 'Food & Dining'
				} else if (desc.includes('rent') || desc.includes('housing') || desc.includes('apartment')) {
					category = 'Rent'
				} else if (desc.includes('electric') || desc.includes('gas bill') || desc.includes('water') || desc.includes('utility') || desc.includes('internet') || desc.includes('phone')) {
					category = 'Utilities'
				} else if (desc.includes('transfer') || desc.includes('send money') || desc.includes('wire')) {
					category = 'Transfer Out'
				} else if (desc.includes('loan') || desc.includes('emi') || desc.includes('installment') || desc.includes('mortgage')) {
					category = 'Loan Payment'
				} else if (desc.includes('shopping') || desc.includes('store') || desc.includes('mall') || desc.includes('amazon') || desc.includes('flipkart')) {
					category = 'Shopping'
				} else if (desc.includes('medical') || desc.includes('hospital') || desc.includes('doctor') || desc.includes('pharmacy') || desc.includes('health')) {
					category = 'Healthcare'
				} else if (desc.includes('transport') || desc.includes('taxi') || desc.includes('uber') || desc.includes('bus') || desc.includes('train')) {
					category = 'Transportation'
				} else if (desc.includes('education') || desc.includes('school') || desc.includes('college') || desc.includes('tuition') || desc.includes('course')) {
					category = 'Education'
				} else if (desc.includes('insurance') || desc.includes('premium')) {
					category = 'Insurance'
				} else if (desc.includes('entertainment') || desc.includes('movie') || desc.includes('netflix') || desc.includes('spotify') || desc.includes('game')) {
					category = 'Entertainment'
				} else if (desc.includes('bank') || desc.includes('fee') || desc.includes('charge') || desc.includes('service')) {
					category = 'Bank Fees'
				}

				categories[category] = (categories[category] || 0) + expense
			}
		})

		const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]

		return {
			totalIncome: totalIncome.toFixed(2),
			totalExpense: totalExpense.toFixed(2),
			netBalance: (totalIncome - totalExpense).toFixed(2),
			topCategory: topCategory
				? `${topCategory[0]} (৳${topCategory[1].toFixed(2)})`
				: 'N/A',
			totalTransactions: tableData.rows.length,
			categories: categories,
		}
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center">
			<div className="container mx-auto px-6 py-24">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
						<Sparkles className="h-4 w-4" />
						AI-Powered PDF Conversion
					</div>
					<h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
						Convert Bank Statements
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
							PDF To Excel Instantly
						</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
						Upload your PDF bank statement and convert it to Excel, JSON, SQL, XML,
						or Google Sheets instantly. Get smart financial analytics with
						interactive charts and expense categorization. No manual data entry
						required.
					</p>
					{!user ? (
						<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
							<p className="text-blue-800 text-center font-medium">
								🆓 Login for 1 FREE PDF convert per day • Upgrade for unlimited
								access
							</p>
						</div>
					) : (
						userStatus && (
							<div
								className={`border rounded-xl p-4 mb-8 max-w-2xl mx-auto ${
									userStatus.user_type === 'free'
										? 'bg-green-50 border-green-200'
										: 'bg-purple-50 border-purple-200'
								}`}
							>
								<p
									className={`text-center font-medium ${
										userStatus.user_type === 'free'
											? 'text-green-800'
											: 'text-purple-800'
									}`}
								>
									{userStatus.user_type === 'free'
										? `🆓 Free Plan: ${userStatus.remaining_uploads}/${userStatus.daily_limit} uploads remaining today`
										: `⭐ ${userStatus.plan_name}: ${userStatus.remaining_uploads} uploads remaining this month`}
								</p>
							</div>
						)
					)}

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
									Supports all major banks • Max file size: 20MB
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
								onClick={() => inputRef.current?.click()}
								disabled={
									loading || !user || userStatus?.remaining_uploads === 0
								}
								className={`group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
									user
										? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
										: 'bg-gray-400 text-gray-600'
								}`}
							>
								<Upload className="inline-block mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
								{loading
									? 'Processing...'
									: !user
									? 'Login Required'
									: userStatus?.remaining_uploads === 0
									? 'Limit Reached'
									: 'Choose PDF File'}
							</button>
						</div>
					</div>

					{fileToUpload &&
						error &&
						(error.toLowerCase().includes('password protected') ||
							error.toLowerCase().includes('password required')) && (
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
								<div className="p-8">
									{/* Performance Info */}
									{tableData.rows.length > 100 && (
										<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
											<p className="text-blue-800 text-sm text-center">
												🚀 Large dataset detected ({tableData.rows.length} transactions).
												Showing paginated preview for better performance.
											</p>
										</div>
									)}

									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr className="bg-gray-50">
													{tableData.columns.slice(0, 8).map((col, i) => (
														<th
															key={i}
															className="px-4 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider text-xs"
														>
															{col.length > 15 ? col.substring(0, 15) + '...' : col}
														</th>
													))}
													{tableData.columns.length > 8 && (
														<th className="px-4 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider text-xs">
															+{tableData.columns.length - 8} more
														</th>
													)}
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200">
												{(() => {
													const startIndex = (currentPage - 1) * rowsPerPage
													const endIndex = startIndex + rowsPerPage
													const currentRows = tableData.rows.slice(startIndex, endIndex)

													return currentRows.map((row, i) => (
														<tr
															key={startIndex + i}
															className="hover:bg-gray-50 transition-colors"
														>
															{tableData.columns.slice(0, 8).map((col, j) => (
																<td
																	key={j}
																	className="px-4 py-3 text-sm text-gray-700"
																>
																	{(() => {
																		const value = typeof row[col] === 'object' && row[col] !== null
																			? JSON.stringify(row[col])
																			: String(row[col] ?? '')
																		return value.length > 30 ? value.substring(0, 30) + '...' : value
																	})()}
																</td>
															))}
															{tableData.columns.length > 8 && (
																<td className="px-4 py-3 text-sm text-gray-500">
																	...
																</td>
															)}
														</tr>
													))
												})()}
											</tbody>
										</table>
									</div>

									{/* Pagination Controls */}
									{tableData.rows.length > rowsPerPage && (
										<div className="flex items-center justify-between mt-6 px-4">
											<div className="text-sm text-gray-600">
												Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, tableData.rows.length)} of {tableData.rows.length} transactions
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
													disabled={currentPage === 1}
													className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
												>
													Previous
												</button>
												<span className="text-sm text-gray-600">
													Page {currentPage} of {Math.ceil(tableData.rows.length / rowsPerPage)}
												</span>
												<button
													onClick={() => setCurrentPage(Math.min(Math.ceil(tableData.rows.length / rowsPerPage), currentPage + 1))}
													disabled={currentPage >= Math.ceil(tableData.rows.length / rowsPerPage)}
													className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
												>
													Next
												</button>
											</div>
										</div>
									)}

									<div className="text-center mt-8">
										<div
											className={`flex items-center justify-center gap-2 mb-4 cursor-pointer p-2 rounded-lg transition-colors ${
												savingToDrive ? 'bg-blue-100' : 'hover:bg-blue-50'
											}`}
											onClick={savingToDrive ? null : handleGoogleDriveSave}
										>
											{savingToDrive ? (
												<div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600"></div>
											) : (
												<Download className="h-5 w-5 text-blue-600" />
											)}
											<FaGoogleDrive className="h-5 w-5 text-blue-600" />
											<span className="text-sm text-gray-600 font-medium">
												{savingToDrive ? 'Saving to Drive...' : 'Save as Google Sheets 📊'}
											</span>
										</div>

										{/* Quick Download Notice for Large Files */}
										{tableData.rows.length > 500 && (
											<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
												<p className="text-yellow-800 text-sm text-center">
													⚡ Large file detected! Download directly without full preview for better performance.
												</p>
											</div>
										)}

										<div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
											<button
												onClick={handleJsonDownload}
												className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors font-medium text-sm mb-4"
											>
												<Download className="h-4 w-4" />
												JSON Export
											</button>

											<button
												onClick={handleSqlDownload}
												className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm mb-4"
											>
												<Download className="h-4 w-4" />
												SQL Export
											</button>
											<button
												onClick={handleXmlDownload}
												className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm mb-4"
											>
												<Download className="h-4 w-4" />
												XML Export
											</button>
										</div>

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

					{(() => {
						const summary = generateSummary()
						return summary ? (
							<div className="mt-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
								<h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
									📊 Financial Summary
								</h4>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div className="bg-green-100 p-4 rounded-lg text-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-green-200">
										<p className="text-green-700 font-semibold transition-colors duration-200 hover:text-green-900">
											💰 Total Income
										</p>
										<p className="text-2xl font-bold text-green-800 transition-colors duration-200 hover:text-green-900">
											৳{summary.totalIncome}
										</p>
									</div>
									<div className="bg-red-100 p-4 rounded-lg text-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-red-200">
										<p className="text-red-700 font-semibold transition-colors duration-200 hover:text-red-900">
											💸 Total Expense
										</p>
										<p className="text-2xl font-bold text-red-800 transition-colors duration-200 hover:text-red-900">
											৳{summary.totalExpense}
										</p>
									</div>
									<div className="bg-blue-100 p-4 rounded-lg text-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-200">
										<p className="text-blue-700 font-semibold transition-colors duration-200 hover:text-blue-900">
											💳 Net Balance
										</p>
										<p
											className={`text-2xl font-bold transition-colors duration-200 ${
												parseFloat(summary.netBalance) >= 0
													? 'text-green-800 hover:text-green-900'
													: 'text-red-800 hover:text-red-900'
											}`}
										>
											৳{summary.netBalance}
										</p>
									</div>
									<div className="bg-purple-100 p-4 rounded-lg text-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-purple-200">
										<p className="text-purple-700 font-semibold transition-colors duration-200 hover:text-purple-900">
											🏆 Top Category
										</p>
										<p className="text-lg font-bold text-purple-800 transition-colors duration-200 hover:text-purple-900">
											{summary.topCategory}
										</p>
									</div>
								</div>
								<p className="text-center text-gray-600 mt-4">
									📈 Total {summary.totalTransactions} transactions analyzed
								</p>
							</div>
						) : null
					})()}

					{/* Complete Financial Flow Chart */}
					{(() => {
						const summary = generateSummary()
						if (!summary) return null

						const financialData = {
							'💰 Income': parseFloat(summary.totalIncome) || 0,
							'💸 Expenses': parseFloat(summary.totalExpense) || 0,
							...summary.categories,
						}

						const totalAmount = Object.values(financialData).reduce(
							(a, b) => a + b,
							0,
						)
						if (totalAmount === 0) return null

						return (
							<div className="mt-8 max-w-4xl mx-auto">
								<div className="bg-white p-6 rounded-xl shadow-lg border">
									<h5 className="font-semibold text-gray-800 mb-6 text-center">
										📊 Complete Financial Flow Analysis
									</h5>

									<div className="flex justify-center mb-6">
										<div
											className="w-48 h-48 rounded-full relative cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
											style={{
												background: `conic-gradient(${Object.entries(
													financialData,
												)
													.map(([category, amount], i) => {
														const colors = [
															'#22c55e',
															'#ef4444',
															'#f97316',
															'#eab308',
															'#3b82f6',
															'#8b5cf6',
															'#ec4899',
															'#06b6d4',
														]
														const percentage =
															(amount / totalAmount) * 100
														const prevPercentage = Object.entries(
															financialData,
														)
															.slice(0, i)
															.reduce(
																(acc, [, amt]) =>
																	acc +
																	(amt / totalAmount) * 100,
																0,
															)
														const isHovered =
															hoveredCategory === category
														const color = isHovered
															? colors[i % colors.length]
															: hoveredCategory
															? '#e5e7eb'
															: colors[i % colors.length]
														return `${color} ${prevPercentage}% ${
															prevPercentage + percentage
														}%`
													})
													.join(', ')}`,
											}}
										>
											<div className="absolute inset-6 bg-white rounded-full flex items-center justify-center shadow-inner">
												<div className="text-center">
													<div className="text-lg font-bold text-gray-700 transition-all duration-300 hover:text-purple-600">
														৳{totalAmount.toFixed(0)}
													</div>
													<div className="text-xs text-gray-500">
														Total
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{Object.entries(financialData)
											.sort((a, b) => b[1] - a[1])
											.map(([category, amount], i) => {
												const colors = [
													'bg-green-500',
													'bg-red-500',
													'bg-orange-500',
													'bg-yellow-500',
													'bg-blue-500',
													'bg-purple-500',
													'bg-pink-500',
													'bg-cyan-500',
												]
												const percentage = (
													(amount / totalAmount) *
													100
												).toFixed(1)
												const isIncome = category.includes('💰')
												const isExpense = category.includes('💸')

												return (
													<div
														key={category}
														className={`p-3 rounded-lg border-l-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg ${
															isIncome
																? 'bg-green-50 border-green-500 hover:bg-green-100'
																: isExpense
																? 'bg-red-50 border-red-500 hover:bg-red-100'
																: 'bg-gray-50 border-gray-400 hover:bg-gray-100'
														} ${
															hoveredCategory === category
																? 'ring-2 ring-purple-400 shadow-lg'
																: ''
														}`}
														onMouseEnter={() =>
															setHoveredCategory(category)
														}
														onMouseLeave={() =>
															setHoveredCategory(null)
														}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<div
																	className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
																		colors[
																			i % colors.length
																		]
																	}`}
																></div>
																<span className="font-medium text-sm transition-colors duration-200 hover:text-gray-900">
																	{category}
																</span>
															</div>
															<div className="text-right">
																<div className="font-bold text-gray-800 transition-colors duration-200 hover:text-purple-600">
																	৳{amount.toFixed(2)}
																</div>
																<div className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-700">
																	{percentage}%
																</div>
															</div>
														</div>
													</div>
												)
											})}
									</div>
								</div>
							</div>
						)
					})()}
				</div>
			</div>
		</section>
	)
}

export default HeroSection
