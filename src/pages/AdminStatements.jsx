import React, { useState, useEffect } from 'react'
import {
	FiFileText,
	FiDownload,
	FiTrash2,
	FiArrowLeft,
	FiSearch,
	FiCalendar,
	FiUser,
	FiChevronDown,
	FiChevronUp,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import AuthApiClient from '../services/auth-api-client'

function AdminStatements() {
	const navigate = useNavigate()
	const [statements, setStatements] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [deleting, setDeleting] = useState(null)
	const [sortBy, setSortBy] = useState('uploaded_at')
	const [sortOrder, setSortOrder] = useState('desc')
	const [filterBy, setFilterBy] = useState('all')
	const [selectedItems, setSelectedItems] = useState([])
	const [bulkAction, setBulkAction] = useState(false)

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
				responseType: 'blob',
			})

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			const csvFilename = filename
				? filename.replace(/\.[^/.]+$/, '.csv')
				: `statement_${statementId}.csv`
			link.setAttribute('download', csvFilename)
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
			setStatements(statements.filter((stmt) => stmt.id !== statementId))
			alert('Statement deleted successfully')
		} catch (error) {
			console.error('Error deleting statement:', error)
			alert('Failed to delete statement from database')
		} finally {
			setDeleting(null)
		}
	}

	const handleSelectAll = (checked) => {
		if (checked) {
			setSelectedItems(filteredAndSortedStatements.map((stmt) => stmt.id))
		} else {
			setSelectedItems([])
		}
	}

	const handleSelectItem = (id, checked) => {
		if (checked) {
			setSelectedItems([...selectedItems, id])
		} else {
			setSelectedItems(selectedItems.filter((item) => item !== id))
		}
	}

	const handleBulkDownload = async () => {
		if (selectedItems.length === 0) return
		setBulkAction(true)
		for (const id of selectedItems) {
			const statement = statements.find((s) => s.id === id)
			await handleDownload(id, statement?.original_filename)
		}
		setBulkAction(false)
	}

	const handleBulkDelete = async () => {
		if (selectedItems.length === 0) return
		if (!window.confirm(`Delete ${selectedItems.length} selected statements?`)) return

		setBulkAction(true)
		for (const id of selectedItems) {
			try {
				await AuthApiClient.delete(`admin/statements/${id}/`)
			} catch (error) {
				console.error('Error deleting statement:', error)
			}
		}
		setStatements(statements.filter((stmt) => !selectedItems.includes(stmt.id)))
		setSelectedItems([])
		setBulkAction(false)
	}

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(field)
			setSortOrder('asc')
		}
	}

	const filteredAndSortedStatements = statements
		.filter((statement) => {
			const matchesSearch =
				statement.original_filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				statement.user?.toLowerCase().includes(searchTerm.toLowerCase())

			if (filterBy === 'all') return matchesSearch
			if (filterBy === 'today') {
				const today = new Date().toDateString()
				return matchesSearch && new Date(statement.uploaded_at).toDateString() === today
			}
			if (filterBy === 'week') {
				const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
				return matchesSearch && new Date(statement.uploaded_at) >= weekAgo
			}
			return matchesSearch
		})
		.sort((a, b) => {
			let aVal = a[sortBy]
			let bVal = b[sortBy]

			if (sortBy === 'uploaded_at') {
				aVal = new Date(aVal)
				bVal = new Date(bVal)
			}

			if (sortOrder === 'asc') {
				return aVal > bVal ? 1 : -1
			} else {
				return aVal < bVal ? 1 : -1
			}
		})

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-blue-600 mx-auto mb-4"></div>
					<p className="text-slate-600 font-medium">Loading statements...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				{/* Header */}
				<div className="mb-6 sm:mb-8">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
						<div className="flex items-center gap-3 sm:gap-4">
							<button
								onClick={() => navigate('/dashboard')}
								className="p-2 sm:p-2.5 text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-lg transition-all shadow-sm hover:shadow"
							>
								<FiArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
							</button>
							<div>
								<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
									Processed Statements
								</h1>
								<p className="text-sm sm:text-base text-slate-600">
									Manage all processed bank statements
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600 mb-1">Total Statements</p>
								<p className="text-2xl sm:text-3xl font-bold text-slate-900">{statements.length}</p>
							</div>
							<div className="p-3 bg-blue-100 rounded-lg">
								<FiFileText className="h-6 w-6 text-blue-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600 mb-1">Filtered Results</p>
								<p className="text-2xl sm:text-3xl font-bold text-slate-900">{filteredAndSortedStatements.length}</p>
							</div>
							<div className="p-3 bg-green-100 rounded-lg">
								<FiSearch className="h-6 w-6 text-green-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600 mb-1">Selected</p>
								<p className="text-2xl sm:text-3xl font-bold text-slate-900">{selectedItems.length}</p>
							</div>
							<div className="p-3 bg-purple-100 rounded-lg">
								<FiUser className="h-6 w-6 text-purple-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600 mb-1">This Week</p>
								<p className="text-2xl sm:text-3xl font-bold text-slate-900">
									{statements.filter(s => {
										const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
										return new Date(s.uploaded_at) >= weekAgo
									}).length}
								</p>
							</div>
							<div className="p-3 bg-orange-100 rounded-lg">
								<FiCalendar className="h-6 w-6 text-orange-600" />
							</div>
						</div>
					</div>
				</div>

				{/* Search & Filters */}
				<div className="mb-6 space-y-4">
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
						<div className="flex-1 relative">
							<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
							<input
								type="text"
								placeholder="Search by filename or user name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow"
							/>
						</div>
						<select
							value={filterBy}
							onChange={(e) => setFilterBy(e.target.value)}
							className="px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow cursor-pointer"
						>
							<option value="all">All Time</option>
							<option value="today">Today</option>
							<option value="week">This Week</option>
						</select>
					</div>

					{/* Bulk Actions */}
					{selectedItems.length > 0 && (
						<div className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
									{selectedItems.length}
								</div>
								<span className="text-sm font-medium text-blue-900">
									{selectedItems.length === 1 ? 'item' : 'items'} selected
								</span>
							</div>
							<div className="flex-1"></div>
							<div className="flex flex-wrap gap-2">
								<button
									onClick={handleBulkDownload}
									disabled={bulkAction}
									className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
								>
									<FiDownload className="h-4 w-4" />
									Download
								</button>
								<button
									onClick={handleBulkDelete}
									disabled={bulkAction}
									className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
								>
									<FiTrash2 className="h-4 w-4" />
									Delete
								</button>
								<button
									onClick={() => setSelectedItems([])}
									className="px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-all shadow-sm hover:shadow"
								>
									Clear
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Table/Cards Container */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
					{filteredAndSortedStatements.length === 0 ? (
						<div className="text-center py-16 sm:py-20 px-4">
							<div className="max-w-md mx-auto">
								<div className="bg-slate-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
									<FiFileText className="h-10 w-10 text-slate-400" />
								</div>
								<p className="text-xl font-semibold text-slate-900 mb-2">No statements found</p>
								<p className="text-sm text-slate-600">
									{searchTerm || filterBy !== 'all'
										? 'Try adjusting your search or filters to find what you\'re looking for'
										: 'No processed statements available yet'}
								</p>
							</div>
						</div>
					) : (
						<>
							{/* Desktop Table View */}
							<div className="hidden lg:block overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
										<tr>
											<th className="px-6 py-4 text-left">
												<input
													type="checkbox"
													checked={
														selectedItems.length ===
															filteredAndSortedStatements.length &&
														filteredAndSortedStatements.length > 0
													}
													onChange={(e) =>
														handleSelectAll(e.target.checked)
													}
													className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
												/>
											</th>
											<th
												onClick={() => handleSort('original_filename')}
												className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-200 select-none transition-colors"
											>
												<div className="flex items-center gap-1">
													File
													{sortBy === 'original_filename' &&
														(sortOrder === 'asc' ? (
															<FiChevronUp className="h-4 w-4" />
														) : (
															<FiChevronDown className="h-4 w-4" />
														))}
												</div>
											</th>
											<th
												onClick={() => handleSort('user')}
												className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-200 select-none transition-colors"
											>
												<div className="flex items-center gap-1">
													User
													{sortBy === 'user' &&
														(sortOrder === 'asc' ? (
															<FiChevronUp className="h-4 w-4" />
														) : (
															<FiChevronDown className="h-4 w-4" />
														))}
												</div>
											</th>
											<th
												onClick={() => handleSort('uploaded_at')}
												className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-200 select-none transition-colors"
											>
												<div className="flex items-center gap-1">
													Processed Date
													{sortBy === 'uploaded_at' &&
														(sortOrder === 'asc' ? (
															<FiChevronUp className="h-4 w-4" />
														) : (
															<FiChevronDown className="h-4 w-4" />
														))}
												</div>
											</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
												Size
											</th>
											<th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-200">
										{filteredAndSortedStatements.map((statement) => (
											<tr
												key={statement.id}
												className="hover:bg-slate-50 transition-colors"
											>
												<td className="px-6 py-4">
													<input
														type="checkbox"
														checked={selectedItems.includes(
															statement.id,
														)}
														onChange={(e) =>
															handleSelectItem(
																statement.id,
																e.target.checked,
															)
														}
														className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
													/>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-3">
														<div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
															<FiFileText className="h-5 w-5 text-purple-600" />
														</div>
														<div>
															<p className="font-medium text-slate-900 truncate max-w-xs">
																{statement.original_filename ||
																	'Unknown file'}
															</p>
															<p className="text-xs text-slate-500">
																ID: {statement.id}
															</p>
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														<FiUser className="h-4 w-4 text-slate-400" />
														<span className="text-slate-900 font-medium">
															{statement.user || 'Unknown User'}
														</span>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														<FiCalendar className="h-4 w-4 text-slate-400" />
														<span className="text-slate-900">
															{statement.uploaded_at
																? new Date(
																		statement.uploaded_at,
																  ).toLocaleDateString()
																: 'Unknown'}
														</span>
													</div>
												</td>
												<td className="px-6 py-4">
													<span className="text-slate-900 font-medium">
														{statement.file_size
															? `${(
																	statement.file_size / 1024
															  ).toFixed(1)} KB`
															: 'Unknown'}
													</span>
												</td>
												<td className="px-6 py-4 text-right">
													<div className="flex items-center justify-end gap-2">
														<button
															onClick={() =>
																handleDownload(
																	statement.id,
																	statement.original_filename,
																)
															}
															className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all shadow-sm hover:shadow"
															title="Download"
														>
															<FiDownload className="h-4 w-4" />
														</button>
														<button
															onClick={() =>
																handleDelete(statement.id)
															}
															disabled={deleting === statement.id}
															className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
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

							{/* Mobile/Tablet Card View */}
							<div className="lg:hidden divide-y divide-slate-200">
								{filteredAndSortedStatements.map((statement) => (
									<div
										key={statement.id}
										className="p-4 sm:p-6 hover:bg-slate-50 transition-colors"
									>
										<div className="flex items-start gap-4">
											<input
												type="checkbox"
												checked={selectedItems.includes(statement.id)}
												onChange={(e) =>
													handleSelectItem(statement.id, e.target.checked)
												}
												className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
											/>
											<div className="flex-1 min-w-0">
												{/* File Info */}
												<div className="flex items-start gap-3 mb-3">
													<div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex-shrink-0">
														<FiFileText className="h-5 w-5 text-purple-600" />
													</div>
													<div className="flex-1 min-w-0">
														<p className="font-semibold text-slate-900 truncate mb-1">
															{statement.original_filename || 'Unknown file'}
														</p>
														<p className="text-xs text-slate-500">ID: {statement.id}</p>
													</div>
												</div>

												{/* Details Grid */}
												<div className="grid grid-cols-2 gap-3 mb-3">
													<div className="flex items-center gap-2">
														<FiUser className="h-4 w-4 text-slate-400 flex-shrink-0" />
														<span className="text-sm text-slate-900 truncate">
															{statement.user || 'Unknown User'}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<FiCalendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
														<span className="text-sm text-slate-900">
															{statement.uploaded_at
																? new Date(statement.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
																: 'Unknown'}
														</span>
													</div>
												</div>

												<div className="flex items-center gap-2 mb-4">
													<span className="text-sm font-medium text-slate-600">Size:</span>
													<span className="text-sm text-slate-900">
														{statement.file_size
															? `${(statement.file_size / 1024).toFixed(1)} KB`
															: 'Unknown'}
													</span>
												</div>

												{/* Action Buttons */}
												<div className="flex gap-2">
													<button
														onClick={() =>
															handleDownload(statement.id, statement.original_filename)
														}
														className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow"
													>
														<FiDownload className="h-4 w-4" />
														Download
													</button>
													<button
														onClick={() => handleDelete(statement.id)}
														disabled={deleting === statement.id}
														className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
													>
														<FiTrash2 className="h-4 w-4" />
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminStatements
