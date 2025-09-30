import React, { useState, useEffect } from 'react'
import { FiFileText, FiDownload, FiTrash2, FiArrowLeft, FiSearch, FiCalendar, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import AuthApiClient from '../services/auth-api-client'

function AdminStatements() {
	const navigate = useNavigate()
	const [statements, setStatements] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [deleting, setDeleting] = useState(null)

	useEffect(() => {
		fetchStatements()
	}, [])

	const fetchStatements = async () => {
		try {
			setLoading(true)
			const response = await AuthApiClient.get('user-statements/')
			const statementsData = response.data.results || response.data || []
			setStatements(statementsData)
		} catch (error) {
			console.error('Error fetching statements:', error)
			setStatements([])
		} finally {
			setLoading(false)
		}
	}

	const handleDownload = async (statementId, filename) => {
		try {
			const response = await AuthApiClient.get(`download-excel/${statementId}/`, {
				responseType: 'blob'
			})

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename)
			document.body.appendChild(link)
			link.click()
			link.remove()
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Error downloading statement:', error)
			alert('Failed to download statement')
		}
	}

	const handleDelete = async (statementId) => {
		if (!window.confirm('Are you sure you want to delete this statement?')) {
			return
		}

		try {
			setDeleting(statementId)

			await AuthApiClient.delete(`admin/statements/${statementId}/`)
			setStatements(statements.filter(stmt => stmt.id !== statementId))
			alert('Statement deleted successfully')
		} catch (error) {
			console.error('Error deleting statement:', error)
			alert('Failed to delete statement from database')
		} finally {
			setDeleting(null)
		}
	}


	const filteredStatements = statements.filter(statement =>
		statement.original_filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
		statement.user?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		<div className="min-h-screen ml-5 bg-slate-50">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8 flex justify-between items-center">
					<div className="flex items-center gap-4">
						<button
							onClick={() => navigate('/dashboard')}
							className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
						>
							<FiArrowLeft className="h-5 w-5" />
						</button>
						<div>
							<h1 className="text-3xl font-bold text-slate-900 mb-2">
								Processed Statements
							</h1>
							<p className="text-slate-600">
								Manage all processed bank statements
							</p>
						</div>
					</div>
					<div className="text-sm text-slate-500">
						Total: {statements.length} statements
					</div>
				</div>

				<div className="mb-6">
					<div className="relative">
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
						<input
							type="text"
							placeholder="Search by filename or user name..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
					{filteredStatements.length === 0 ? (
						<div className="text-center py-12 text-slate-500">
							<FiFileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
							<p className="text-lg font-medium">No statements found</p>
							<p className="text-sm">No processed statements match your search criteria</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-slate-50 border-b border-slate-200">
									<tr>
										<th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
											File
										</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
											User
										</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
											Processed Date
										</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
											Size
										</th>
										<th className="px-6 py-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-200">
									{filteredStatements.map((statement) => (
										<tr key={statement.id} className="hover:bg-slate-50">
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="p-2 bg-purple-100 rounded-lg">
														<FiFileText className="h-5 w-5 text-purple-600" />
													</div>
													<div>
														<p className="font-medium text-slate-900">
															{statement.original_filename || 'Unknown file'}
														</p>
														<p className="text-sm text-slate-500">
															ID: {statement.id}
														</p>
													</div>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													<FiUser className="h-4 w-4 text-slate-400" />
													<span className="text-slate-900">
														{statement.user || 'Unknown User'}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													<FiCalendar className="h-4 w-4 text-slate-400" />
													<span className="text-slate-900">
														{statement.uploaded_at ?
															new Date(statement.uploaded_at).toLocaleDateString() :
															'Unknown'
														}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<span className="text-slate-900">
													{statement.file_size ?
														`${(statement.file_size / 1024).toFixed(1)} KB` :
														'Unknown'
													}
												</span>
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<button
														onClick={() => handleDownload(statement.id, statement.original_filename)}
														className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
														title="Download"
													>
														<FiDownload className="h-4 w-4" />
													</button>
													<button
														onClick={() => handleDelete(statement.id)}
														disabled={deleting === statement.id}
														className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
														title="Delete"
													>
														<FiTrash2 className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminStatements
