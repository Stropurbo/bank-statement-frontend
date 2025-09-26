import React, { useState, useEffect } from 'react'
import { Download, FileText, Calendar, DollarSign } from 'lucide-react'
import axios from 'axios'

function Statements() {
	const [statements, setStatements] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchStatements()
	}, [])

	const fetchStatements = async () => {
		try {
			// Mock data for now since backend endpoint doesn't exist
			setStatements([])
		} catch (error) {
			console.error('Error fetching statements:', error)
			setStatements([])
		} finally {
			setLoading(false)
		}
	}

	const handleDownload = async (statementId) => {
		try {
			const token = localStorage.getItem('access_token')
			const response = await axios.get(`/api/download-excel/${statementId}/`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				responseType: 'blob'
			})

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', `statement_${statementId}.xlsx`)
			document.body.appendChild(link)
			link.click()
			link.remove()
		} catch (error) {
			console.error('Error downloading statement:', error)
		}
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Bank Statements</h1>
				<div className="text-sm text-gray-500">
					Total: {statements.length} statements
				</div>
			</div>

			{loading ? (
				<div className="bg-white rounded-lg shadow p-8">
					<div className="animate-pulse">
						<div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
						<div className="space-y-3">
							<div className="h-4 bg-gray-200 rounded"></div>
							<div className="h-4 bg-gray-200 rounded w-5/6"></div>
							<div className="h-4 bg-gray-200 rounded w-4/6"></div>
						</div>
					</div>
				</div>
			) : statements.length === 0 ? (
				<div className="bg-white rounded-lg shadow p-8 text-center">
					<FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">No statements found</h3>
					<p className="text-gray-500 mb-4">Upload your first bank statement to get started.</p>
					<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
						Upload Statement
					</button>
				</div>
			) : (
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg font-medium text-gray-900">Recent Statements</h3>
					</div>
					<div className="divide-y divide-gray-200">
						{statements.map((statement) => (
							<div key={statement.id} className="px-6 py-4 hover:bg-gray-50">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className="flex-shrink-0">
											<FileText className="h-8 w-8 text-blue-600" />
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900">{statement.filename}</p>
											<div className="flex items-center space-x-4 text-sm text-gray-500">
												<span className="flex items-center">
													<Calendar className="h-4 w-4 mr-1" />
													{statement.uploadDate}
												</span>
												<span className="flex items-center">
													<DollarSign className="h-4 w-4 mr-1" />
													{statement.transactionCount} transactions
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<span className={`px-2 py-1 text-xs font-medium rounded-full ${
											statement.status === 'completed'
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										}`}>
											{statement.status}
										</span>
										<button
											onClick={() => handleDownload(statement.id)}
											className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
											title="Download Excel"
										>
											<Download className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Statements
