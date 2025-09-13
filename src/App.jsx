import React, { useState } from 'react'
import axios from 'axios'

function App() {
	const [tableData, setTableData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [downloading, setDownloading] = useState(false)
	const [password, setPassword] = useState('')
	const [fileToUpload, setFileToUpload] = useState(null)
	const [error, setError] = useState(null)
	const [statementId, setStatementId] = useState(null)

	const processUpload = async (file, currentPassword = '') => {
		let formData = new FormData()
		formData.append('file', file)
		formData.append('password', currentPassword)

		try {
			setLoading(true)
			setError(null)
			const res = await axios.post(
				'https://bank-statement-converter-backend-ofyc.onrender.com/api/upload-pdf/',
				formData,
				{
					withCredentials: true,
				},
			)
			console.log('Upload response:', res.data)

			// ✅ এখানেই tableData set করতে হবে
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
			if (error.response) {
				const errorMessage = error.response.data.error
				if (
					errorMessage &&
					(errorMessage.includes('password-protected') ||
						errorMessage.includes('Incorrect password'))
				) {
					setError(errorMessage)
					setFileToUpload(file)
				} else if (errorMessage) {
					setError(errorMessage)
				} else {
					setError('Upload failed. Please check your file and try again.')
				}
			} else {
				console.error('Network or CORS error:', error)
				setError('A network error occurred. Please check your connection.')
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

		setDownloading(true)
		try {
			const response = await axios.get(
				`https://bank-statement-converter-backend-ofyc.onrender.com/api/download-excel/${statementId}/`,
				{ withCredentials: true, responseType: 'blob' },
			)
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
			alert('Download failed! Please re-upload.')
		} finally {
			setDownloading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
			<h1 className="text-2xl font-bold mb-6 text-gray-700">Bank Statement Converter</h1>
			<p className="text-gray-600 mb-6 text-center max-w-2xl">
				Upload any bank's PDF statement — we'll convert it to clean Excel format. Works
				with 1000s of banks worldwide.
			</p>

			{!fileToUpload && (
				<label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
					Upload PDF
					<input
						type="file"
						accept="application/pdf"
						className="hidden"
						onChange={handleFileSelect}
						disabled={loading}
					/>
				</label>
			)}

			{loading && (
				<div className="flex items-center mt-4">
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

			{error && <div className="mt-4 text-red-500 font-medium">{error}</div>}

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

			{tableData && (
				<div className="mt-8 w-full max-w-4xl">
					<div className="overflow-x-auto bg-white rounded-lg shadow p-4">
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
							disabled={downloading}
							className="mt-6 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50"
						>
							{downloading ? 'Preparing CSV...' : 'Download CSV'}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
