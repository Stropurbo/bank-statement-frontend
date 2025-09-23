import { Upload } from 'lucide-react'
import React, { useRef, useState, useContext } from 'react'
import AuthApiClient from '../../services/auth-api-client'
import scandocu from '../../assets/scanpdf.png'
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
				const errorMessage =
					error.response.data.error ||
					error.response.data.detail ||
					'Server error occurred'
				if (
					errorMessage &&
					(errorMessage.includes('password-protected') ||
						errorMessage.includes('Incorrect password'))
				) {
					setError(errorMessage)
					setFileToUpload(file)
				} else {
					setError(`Failed to process file: ${errorMessage}`)
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
		<section className="py-20 bg-gradient-subtle">
			<div className="container mx-auto px-4 text-center">
				<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
					From Bank Statement
					<br />
					<span className="bg-purple-500 bg-clip-text text-transparent">
						To Excel in Seconds
					</span>
				</h1>
				<p className="text-xl text-black text-muted-foreground mb-12 max-w-3xl mx-auto">
					Upload your bank statement and get a clean, editable Excel file — fast,
					secure, and stress-free.
				</p>

				{error && <div className="mt-4 text-red-500 font-medium">{error}</div>}

				<div className="max-w-2xl mx-auto mb-16">
					<div className="bg-card border-2 border-dashed border-border border-purple-300 rounded-2xl p-12 hover:border-purple-600 transition-colors duration-300 shadow-card">
						<div className="flex flex-col items-center gap-6">
							<img
								src={scandocu}
								alt="Document converter"
								className="w-28 h-24 "
							/>

							<div>
								<h3 className="text-2xl font-semibold text-foreground mb-2">
									Upload PDF bank statement
								</h3>
								<p className="text-muted-foreground">
									Drag & drop or click to select a file
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
								className="group btn bg-purple-600 rounded-md hover:bg-purple-700 text-white"
							>
								<Upload className="group-hover:scale-110 transition-transform" />
								Select PDF File
							</button>
						</div>
					</div>

					{fileToUpload && (
						<form
							onSubmit={handlePasswordSubmit}
							className="mt-4 flex flex-col items-center"
						>
							<input
								type="password"
								placeholder="Enter PDF password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
							<button
								type="submit"
								className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
								disabled={loading}
							>
								Submit Password
							</button>
						</form>
					)}

					{loading && (
						<div className="flex items-center justify-center mt-4">
							<svg
								className="animate-spin h-5 w-5 text-blue-500 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Processing your bank statement...
						</div>
					)}

					{tableData && (
						<div className="mt-8 w-full ">
							<div className="overflow-x-auto bg-white rounded-lg  p-4">
								<table className="table-auto w-full border-collapse border border-gray-300">
									<thead>
										<tr className="bg-gray-200">
											{tableData.columns.map((col, i) => (
												<th
													key={i}
													className="border border-gray-300 px-3 py-2 text-left font-medium text-sm text-gray-600 uppercase"
												>
													{col}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{tableData.rows.map((row, i) => (
											<tr
												key={i}
												className={`transition-colors ${
													i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
												} hover:bg-blue-50`}
											>
												{tableData.columns.map((col, j) => (
													<td
														key={j}
														className="border px-4 py-2 text-sm text-gray-700"
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
								<button
									onClick={handleDownload}
									disabled={downloading || !user}
									className={`mt-6 px-5 py-2 font-semibold rounded-lg transition ${
										user
											? 'bg-green-500 text-white hover:bg-green-600'
											: 'bg-gray-400 text-gray-600 cursor-not-allowed'
									} disabled:opacity-50`}
								>
									{downloading
										? 'Preparing CSV...'
										: user
										? 'Download CSV'
										: 'Login to Download'}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default HeroSection
