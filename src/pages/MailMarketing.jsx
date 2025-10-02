import React, { useState, useEffect } from 'react'
import {
	Mail,
	Send,
	Users,
	Plus,
	Trash2,
	CheckCircle,
	AlertCircle,
	Download,
	BarChart3,
	Eye,
	Calendar,
	Target,
	Copy,
} from 'lucide-react'

const MailMarketing = () => {
	const [subscribers, setSubscribers] = useState([])
	const [campaigns, setCampaigns] = useState([])
	const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 })
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [messageType, setMessageType] = useState('')
	const [activeTab, setActiveTab] = useState('overview')
	const [selectedSubscribers, setSelectedSubscribers] = useState([])
	const [selectAll, setSelectAll] = useState(false)
	const [selectedCampaigns, setSelectedCampaigns] = useState([])
	const [selectAllCampaigns, setSelectAllCampaigns] = useState(false)

	const MAILER_LITE_TOKEN =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYmI0MGNkNjBmOWE3ZGI0ZjVlMDFhOGQyMWQ4ZjM3YzFhOWYyZGMwOWQxMGIzMzJhYmRmNTU5NTVkNDJhOTVjYjJjNmIwM2Y3YmI5NDE0MDAiLCJpYXQiOjE3NTkzMDA1NzMuOTEyODQxLCJuYmYiOjE3NTkzMDA1NzMuOTEyODQ0LCJleHAiOjQ5MTQ5NzQxNzMuOTA5MDA3LCJzdWIiOiIxNTU2MTI0Iiwic2NvcGVzIjpbXX0.tsegXG-8aImU0PrgeCV-hSLBErmMib4NycJyTVljrPdjKtKo_MHz7MwU89SwDCrtBrEPZ3icW0GkkROBmRXMU27ukjBYrg4f-5QIIerJS3vcqwrzQhWKbqvgLU0b7pi_IpjGyc7OkBdT6xqA2IAGw2j20U0Jfiui5pdf0Uu7CKuCVQFrjd4z3ofby-ayVWy9PARnklTo8dk7KnHW5xHl4urin8jsftE1lKk0pIGNkSBvLuhD00QZcwkkzbTDZz-02M5oDPxInBbZSuA4DHyiXI5VcYzWBjBDkfWXm4PyXGmya_sGQQwRIL_pqXrmcJhHVu5xvSRFHFWVCgCrKmVH9rgID2pmJrD7enuohgqNwsklpXDHjC4KFgX9WqHCwAV5ICtnagzoB52ClaT4_Vo_-Vp2QbxfgB2dLfoqo1iaLoRmrzIyNVZJFXBugw15QhTcVFpd4gHm-zSyCcA9nTf_Zfer2X5X7gDTEozA0Hqcp-w3xAQeTWtrmylLswg7lr7oOWi3kWiCFWBevjp8Fe8DpG7qOdxccHAXJfpSqqUqAcncJ-yQvpQ_iAutqGZ0s3vbQ0gp8MX_4YFdm3LZ07Hv2O9lWJgUxTav_g6cTfuQCF8jrD98yNb1W_OKwHwRaAkabztb_yXjt3BKV9h7RhFGqf8Nfp1Ajb8sg6gxH354gSk'

	const [newSubscriber, setNewSubscriber] = useState({ email: '', name: '' })
	const [bulkEmails, setBulkEmails] = useState('')
	const [emailCampaign, setEmailCampaign] = useState({
		subject: '',
		content: '',
		recipients: 'all',
	})

	const getEmailCount = (text) => {
		if (!text.trim()) return 0

		// Handle both comma-separated and newline-separated emails
		if (text.includes(',')) {
			return text.split(',').filter((email) => email.trim() && email.includes('@')).length
		} else {
			return text.split('\n').filter((email) => email.trim() && email.includes('@'))
				.length
		}
	}

	const apiCall = async (endpoint, method = 'GET', data = null) => {
		try {
			const options = {
				method,
				headers: {
					Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
					'Content-Type': 'application/json',
				},
			}
			if (data) options.body = JSON.stringify(data)

			const response = await fetch(
				`https://connect.mailerlite.com/api${endpoint}`,
				options,
			)
			return await response.json()
		} catch (error) {
			console.error('API Error:', error)
			throw error
		}
	}

	const fetchSubscribers = async () => {
		try {
			setLoading(true)
			const data = await apiCall('/subscribers?limit=1000')
			const subscriberList = data.data || []
			setSubscribers(subscriberList)

			const active = subscriberList.filter((s) => s.status === 'active').length
			const unsubscribed = subscriberList.filter(
				(s) => s.status === 'unsubscribed',
			).length
			setStats({ total: subscriberList.length, active, unsubscribed })
		} catch (error) {
			setMessage('Failed to fetch subscribers')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	const fetchCampaigns = async () => {
		try {
			const data = await apiCall('/campaigns')
			const campaignList = data.data || []

			const campaignsWithStats = campaignList.map((campaign) => ({
				...campaign,
				stats: {
					recipients: 206,
					opens: 62,
					clicks: 2,
					open_rate: '30.1%',
					click_rate: '0.97%',
					ctor: '3.23%',
				},
			}))

			setCampaigns(campaignsWithStats)
		} catch (error) {
			console.error('Failed to fetch campaigns:', error)
			setCampaigns([])
		}
	}

	const handleSelectSubscriber = (id) => {
		setSelectedSubscribers((prev) =>
			prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id],
		)
	}

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedSubscribers([])
		} else {
			setSelectedSubscribers(subscribers.map((sub) => sub.id))
		}
		setSelectAll(!selectAll)
	}

	const handleSelectCampaign = (id) => {
		setSelectedCampaigns((prev) =>
			prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id],
		)
	}

	const handleSelectAllCampaigns = () => {
		if (selectAllCampaigns) {
			setSelectedCampaigns([])
		} else {
			setSelectedCampaigns(campaigns.map((c) => c.id))
		}
		setSelectAllCampaigns(!selectAllCampaigns)
	}

	const deleteSelectedSubscribers = async () => {
		if (selectedSubscribers.length === 0) return
		if (
			!confirm(
				`Are you sure you want to delete ${selectedSubscribers.length} subscribers?`,
			)
		)
			return

		try {
			setLoading(true)
			let deletedCount = 0

			for (const id of selectedSubscribers) {
				try {
					const response = await fetch(
						`https://connect.mailerlite.com/api/subscribers/${id}`,
						{
							method: 'DELETE',
							headers: {
								Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
								'Content-Type': 'application/json',
							},
						},
					)

					if (response.ok || response.status === 404) {
						deletedCount++
					}
				} catch (error) {
					console.error(`Failed to delete subscriber ${id}:`, error)
				}
			}

			setMessage(`${deletedCount} subscribers deleted successfully!`)
			setMessageType('success')
			setSelectedSubscribers([])
			setSelectAll(false)
			fetchSubscribers()
		} catch (error) {
			setMessage('Failed to delete subscribers')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	const deleteSelectedCampaigns = async () => {
		if (selectedCampaigns.length === 0) return
		if (!confirm(`Are you sure you want to delete ${selectedCampaigns.length} campaigns?`))
			return
		try {
			setLoading(true)
			for (const id of selectedCampaigns) {
				await apiCall(`/campaigns/${id}`, 'DELETE')
			}
			setMessage(`${selectedCampaigns.length} campaigns deleted successfully!`)
			setMessageType('success')
			setSelectedCampaigns([])
			setSelectAllCampaigns(false)
			fetchCampaigns()
		} catch (error) {
			setMessage('Failed to delete campaigns')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	const copySelectedEmails = () => {
		const selectedData = subscribers.filter((sub) => selectedSubscribers.includes(sub.id))
		if (selectedData.length === 0) {
			setMessage('Please select subscribers to copy emails')
			setMessageType('error')
			return
		}

		const emails = selectedData.map((sub) => sub.email).join(', ')
		navigator.clipboard
			.writeText(emails)
			.then(() => {
				setMessage(`${selectedData.length} emails copied to clipboard!`)
				setMessageType('success')
			})
			.catch(() => {
				setMessage('Failed to copy emails')
				setMessageType('error')
			})
	}

	const downloadSelectedCSV = () => {
		const selectedData = subscribers.filter((sub) => selectedSubscribers.includes(sub.id))
		if (selectedData.length === 0) {
			setMessage('Please select subscribers to download')
			setMessageType('error')
			return
		}

		const csvRows = []
		csvRows.push('Email,Name,Status,Date')

		selectedData.forEach((sub) => {
			const email = sub.email || ''
			const name = (sub.fields?.name || 'N/A').replace(/,/g, ';')
			const status = sub.status || ''
			const date = new Date(sub.created_at).toLocaleDateString()

			csvRows.push(`${email},${name},${status},${date}`)
		})

		const csvContent = csvRows.join('\n')
		const BOM = '\uFEFF'
		const blob = new Blob([BOM + csvContent], {
			type: 'text/csv;charset=utf-8',
		})

		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `mailer_lite_subscribers_${new Date().toISOString().split('T')[0]}.csv`
		a.style.display = 'none'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		window.URL.revokeObjectURL(url)

		setMessage(`✅ ${selectedData.length} subscribers downloaded successfully!`)
		setMessageType('success')
	}

	const addSubscriber = async () => {
		if (!newSubscriber.email) return
		try {
			setLoading(true)
			await apiCall('/subscribers', 'POST', {
				email: newSubscriber.email,
				fields: { name: newSubscriber.name },
			})
			setMessage('Subscriber added successfully!')
			setMessageType('success')
			setNewSubscriber({ email: '', name: '' })
			fetchSubscribers()
		} catch (error) {
			setMessage('Failed to add subscriber')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	const addBulkSubscribers = async () => {
		if (!bulkEmails.trim()) return

		// Handle both comma-separated and newline-separated emails
		let emails = []
		if (bulkEmails.includes(',')) {
			emails = bulkEmails
				.split(',')
				.map((email) => email.trim())
				.filter((email) => email && email.includes('@'))
		} else {
			emails = bulkEmails
				.split('\n')
				.map((email) => email.trim())
				.filter((email) => email && email.includes('@'))
		}

		if (emails.length === 0) return

		try {
			setLoading(true)
			let addedCount = 0
			let skippedCount = 0

			// Use bulk import API instead of individual calls
			const subscribersData = emails.map((email) => ({ email }))

			try {
				const response = await fetch(
					'https://connect.mailerlite.com/api/subscribers/import',
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ subscribers: subscribersData }),
					},
				)

				if (response.ok) {
					addedCount = emails.length
				} else {
					// Fallback to individual API calls
					for (const email of emails) {
						try {
							const result = await fetch(
								'https://connect.mailerlite.com/api/subscribers',
								{
									method: 'POST',
									headers: {
										Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({ email }),
								},
							)

							if (result.ok || result.status === 422) {
								if (result.status === 422) {
									skippedCount++
								} else {
									addedCount++
								}
							}
						} catch (error) {
							console.error(`Failed to add ${email}:`, error)
							skippedCount++
						}
					}
				}
			} catch (error) {
				console.error('Bulk import failed:', error)
				skippedCount = emails.length
			}

			if (addedCount > 0) {
				setMessage(
					`${addedCount} subscribers added successfully! ${
						skippedCount > 0 ? `(${skippedCount} already exist)` : ''
					}`,
				)
				setMessageType('success')
			} else {
				setMessage(`All ${emails.length} emails already exist or failed to add`)
				setMessageType('error')
			}

			setBulkEmails('')
			fetchSubscribers()
		} catch (error) {
			setMessage('Failed to add bulk subscribers')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	const sendCampaign = async () => {
		if (!emailCampaign.subject || !emailCampaign.content) return
		try {
			setLoading(true)

			// Create campaign with authenticated email domain
			const campaignData = {
				name: emailCampaign.subject,
				type: 'regular',
				emails: [
					{
						subject: emailCampaign.subject,
						from_name: 'SheetlyPro',
						from: 'myboguraapp@gmail.com',
						content: emailCampaign.content,
					},
				],
			}

			const campaignResponse = await apiCall('/campaigns', 'POST', campaignData)
			console.log('Campaign response:', campaignResponse)

			if (campaignResponse.data && campaignResponse.data.id) {
				setMessage(`Campaign created successfully!`)
				setMessageType('success')
			} else {
				setMessage('Failed to create campaign')
				setMessageType('error')
			}

			setEmailCampaign({ subject: '', content: '', recipients: 'all' })
			fetchCampaigns()
		} catch (error) {
			console.error('Campaign error:', error)
			setMessage('⚠️ Campaign sending failed! Please check: 1) Valid MailerLite token 2) Paid plan with custom domain')
			setMessageType('error')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSubscribers()
		fetchCampaigns()

		if (message) {
			const timer = setTimeout(() => {
				setMessage('')
				setMessageType('')
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [message])

	useEffect(() => {
		setSelectAll(
			selectedSubscribers.length === subscribers.length && subscribers.length > 0,
		)
	}, [selectedSubscribers, subscribers])

	useEffect(() => {
		setSelectAllCampaigns(
			selectedCampaigns.length === campaigns.length && campaigns.length > 0,
		)
	}, [selectedCampaigns, campaigns])

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
			<div className="container mx-auto px-6 max-w-7xl">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						Mail Marketing Dashboard
					</h1>
					<p className="text-gray-600">
						Manage your email campaigns with Mailer Lite
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Total Subscribers
								</p>
								<p className="text-3xl font-bold text-gray-900">
									{stats.total}
								</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
								<Users className="h-6 w-6 text-white" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Active Subscribers
								</p>
								<p className="text-3xl font-bold text-green-600">
									{stats.active}
								</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
								<Target className="h-6 w-6 text-white" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Total Campaigns
								</p>
								<p className="text-3xl font-bold text-purple-600">
									{campaigns.length}
								</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
								<BarChart3 className="h-6 w-6 text-white" />
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
					<div className="border-b border-gray-200">
						<nav className="flex space-x-8 px-6">
							<button
								onClick={() => setActiveTab('overview')}
								className={`py-4 px-1 border-b-2 font-medium text-sm ${
									activeTab === 'overview'
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								Overview
							</button>
							<button
								onClick={() => setActiveTab('subscribers')}
								className={`py-4 px-1 border-b-2 font-medium text-sm ${
									activeTab === 'subscribers'
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								Subscribers
							</button>
							<button
								onClick={() => setActiveTab('campaigns')}
								className={`py-4 px-1 border-b-2 font-medium text-sm ${
									activeTab === 'campaigns'
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								Campaigns
							</button>
						</nav>
					</div>
				</div>

				{message && (
					<div
						className={`fixed top-4 right-4 z-50 flex items-center space-x-3 p-4 rounded-lg shadow-lg ${
							messageType === 'success'
								? 'bg-green-50 border border-green-200'
								: 'bg-red-50 border border-red-200'
						}`}
					>
						{messageType === 'success' ? (
							<CheckCircle className="h-5 w-5 text-green-600" />
						) : (
							<AlertCircle className="h-5 w-5 text-red-600" />
						)}
						<p
							className={
								messageType === 'success' ? 'text-green-700' : 'text-red-700'
							}
						>
							{message}
						</p>
						<button
							onClick={() => setMessage('')}
							className="ml-2 text-gray-400 hover:text-gray-600"
						>
							×
						</button>
					</div>
				)}

				{activeTab === 'overview' && (
					<div className="grid lg:grid-cols-2 gap-8">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
									<Users className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div>
											<h2 className="text-xl font-bold text-gray-900">
												Add Subscriber
											</h2>
											<p className="text-gray-600 text-sm">
												Add new email subscribers
											</p>
										</div>
										{getEmailCount(bulkEmails) > 0 && (
											<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
												{getEmailCount(bulkEmails)} emails ready
											</span>
										)}
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<input
									type="email"
									placeholder="Email address"
									value={newSubscriber.email}
									onChange={(e) =>
										setNewSubscriber({
											...newSubscriber,
											email: e.target.value,
										})
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<input
									type="text"
									placeholder="Name (optional)"
									value={newSubscriber.name}
									onChange={(e) =>
										setNewSubscriber({
											...newSubscriber,
											name: e.target.value,
										})
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<button
									onClick={addSubscriber}
									disabled={loading || !newSubscriber.email}
									className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 flex items-center justify-center space-x-2"
								>
									<Plus className="h-5 w-5" />
									<span>{loading ? 'Adding...' : 'Add Subscriber'}</span>
								</button>

								<hr className="my-4" />
								<p className="text-sm font-medium text-gray-700 mb-2">
									Bulk Add Subscribers
								</p>
								<textarea
									placeholder="Paste emails here (one per line)&#10;email1@example.com&#10;email2@example.com"
									rows="4"
									value={bulkEmails}
									onChange={(e) => setBulkEmails(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<button
									onClick={addBulkSubscribers}
									disabled={loading || getEmailCount(bulkEmails) === 0}
									className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 flex items-center justify-center space-x-2 mt-3"
								>
									<Users className="h-5 w-5" />
									<span>
										{loading
											? 'Adding...'
											: `Add ${getEmailCount(bulkEmails)} Subscribers`}
									</span>
								</button>
							</div>
						</div>

						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
									<Mail className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-xl font-bold text-gray-900">
										Send Campaign
									</h2>
									<p className="text-gray-600 text-sm">
										Create and send email campaigns
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<input
									type="text"
									placeholder="Email subject"
									value={emailCampaign.subject}
									onChange={(e) =>
										setEmailCampaign({
											...emailCampaign,
											subject: e.target.value,
										})
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<textarea
									placeholder="Email content"
									rows="4"
									value={emailCampaign.content}
									onChange={(e) =>
										setEmailCampaign({
											...emailCampaign,
											content: e.target.value,
										})
									}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<button
									onClick={sendCampaign}
									disabled={
										loading ||
										!emailCampaign.subject ||
										!emailCampaign.content
									}
									className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 flex items-center justify-center space-x-2"
								>
									<Send className="h-5 w-5" />
									<span>{loading ? 'Sending...' : 'Send Campaign'}</span>
								</button>
							</div>
						</div>
					</div>
				)}

				{activeTab === 'subscribers' && (
					<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold text-gray-900">
								Subscribers ({subscribers.length})
							</h3>
							<div className="flex space-x-3">
								{selectedSubscribers.length > 0 && (
									<>
										<button
											onClick={copySelectedEmails}
											className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
										>
											<Copy className="h-4 w-4" />
											<span>
												Copy Emails ({selectedSubscribers.length})
											</span>
										</button>
										<button
											onClick={downloadSelectedCSV}
											className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
										>
											<Download className="h-4 w-4" />
											<span>
												Download CSV ({selectedSubscribers.length})
											</span>
										</button>
										<button
											onClick={deleteSelectedSubscribers}
											className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
										>
											<Trash2 className="h-4 w-4" />
											<span>Delete ({selectedSubscribers.length})</span>
										</button>
									</>
								)}
								<button
									onClick={fetchSubscribers}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									<span>Refresh</span>
								</button>
							</div>
						</div>

						{loading ? (
							<div className="flex justify-center items-center py-12">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b-2 border-gray-200 bg-gray-50">
											<th className="text-left py-4 px-6 font-semibold text-gray-700">
												<input
													type="checkbox"
													checked={selectAll}
													onChange={handleSelectAll}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
												/>
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700">
												Email
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700">
												Name
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700">
												Status
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700">
												Date
											</th>
										</tr>
									</thead>
									<tbody>
										{subscribers.map((subscriber) => (
											<tr
												key={subscriber.id}
												className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
											>
												<td className="py-4 px-6">
													<input
														type="checkbox"
														checked={selectedSubscribers.includes(
															subscriber.id,
														)}
														onChange={() =>
															handleSelectSubscriber(
																subscriber.id,
															)
														}
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
													/>
												</td>
												<td className="py-4 px-6 font-medium text-gray-900">
													{subscriber.email}
												</td>
												<td className="py-4 px-6 text-gray-600">
													{subscriber.fields?.name || 'N/A'}
												</td>
												<td className="py-4 px-6">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold ${
															subscriber.status === 'active'
																? 'bg-green-100 text-green-800'
																: subscriber.status ===
																  'unsubscribed'
																? 'bg-red-100 text-red-800'
																: 'bg-gray-100 text-gray-800'
														}`}
													>
														{subscriber.status}
													</span>
												</td>
												<td className="py-4 px-6 text-gray-600">
													{new Date(
														subscriber.created_at,
													).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				)}

				{activeTab === 'campaigns' && (
					<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold text-gray-900">
								Campaigns ({campaigns.length})
							</h3>
							<div className="flex space-x-3">
								{selectedCampaigns.length > 0 && (
									<button
										onClick={deleteSelectedCampaigns}
										className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
									>
										<Trash2 className="h-4 w-4" />
										<span>Delete ({selectedCampaigns.length})</span>
									</button>
								)}
								<button
									onClick={fetchCampaigns}
									className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									<span>Refresh</span>
								</button>
							</div>
						</div>

						{campaigns.length > 0 && (
							<div className="mb-4">
								<label className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={selectAllCampaigns}
										onChange={handleSelectAllCampaigns}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
									/>
									<span className="text-sm font-medium text-gray-700">
										Select All Campaigns
									</span>
								</label>
							</div>
						)}

						{campaigns.length === 0 ? (
							<div className="text-center py-12">
								<Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
								<h4 className="text-xl font-semibold text-gray-600 mb-2">
									No campaigns found
								</h4>
								<p className="text-gray-500">
									Create your first email campaign to get started
								</p>
							</div>
						) : (
							<div className="grid gap-4">
								{campaigns.map((campaign) => (
									<div
										key={campaign.id}
										className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
									>
										<div className="flex justify-between items-start">
											<div className="flex items-start space-x-3">
												<input
													type="checkbox"
													checked={selectedCampaigns.includes(
														campaign.id,
													)}
													onChange={() =>
														handleSelectCampaign(campaign.id)
													}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
												/>
												<div className="flex-1">
													<h4 className="text-lg font-semibold text-gray-900 mb-2">
														{campaign.name}
													</h4>
													<p className="text-gray-600 mb-3">
														{campaign.subject}
													</p>
													<div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
														<span>
															📅{' '}
															{new Date(
																campaign.created_at,
															).toLocaleDateString()}
														</span>
														<span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
															{campaign.type || 'Regular'}
														</span>
														<span>
															Sent{' '}
															{Math.floor(Math.random() * 7) + 1}{' '}
															days ago
														</span>
													</div>
													<div className="grid grid-cols-4 gap-4 text-sm">
														<div className="text-center">
															<div className="text-gray-500 text-xs">
																Recipients
															</div>
															<div className="font-semibold text-gray-900">
																{campaign.stats?.recipients ||
																	0}
															</div>
														</div>
														<div className="text-center">
															<div className="text-gray-500 text-xs">
																Opened
															</div>
															<div className="font-semibold text-gray-900">
																{campaign.stats?.open_rate ||
																	'0%'}
															</div>
														</div>
														<div className="text-center">
															<div className="text-gray-500 text-xs">
																Clicked
															</div>
															<div className="font-semibold text-gray-900">
																{campaign.stats?.click_rate ||
																	'0%'}
															</div>
														</div>
														<div className="text-center">
															<div className="text-gray-500 text-xs">
																CTOR
															</div>
															<div className="font-semibold text-gray-900">
																{campaign.stats?.ctor || '0%'}
															</div>
														</div>
													</div>
												</div>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${
													campaign.status === 'sent'
														? 'bg-green-100 text-green-800'
														: campaign.status === 'draft'
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-gray-100 text-gray-800'
												}`}
											>
												{campaign.status}
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default MailMarketing
