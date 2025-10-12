import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, Calendar, Send, Save } from 'lucide-react'
import apiClient from '../services/api-client'

function AutoPostCreate() {
	const navigate = useNavigate()
	const [accounts, setAccounts] = useState([])
	const [formData, setFormData] = useState({
		content: '',
		post_type: 'text',
		platforms: [],
		social_account_ids: [],
		scheduled_for: '',
		post_immediately: false,
		hashtags: [],
		mentions: []
	})
	const [hashtagInput, setHashtagInput] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchAccounts()
	}, [])

	const fetchAccounts = async () => {
		try {
			const res = await apiClient.get('/autopost/accounts/')
			setAccounts(res.data.results || res.data)
		} catch (error) {
			console.error('Error fetching accounts:', error)
		}
	}

	const handleSubmit = async (e, isDraft = false) => {
		e.preventDefault()
		setLoading(true)

		try {
			const payload = {
				...formData,
				status: isDraft ? 'draft' : 'scheduled'
			}
			await apiClient.post('/autopost/posts/', payload)
			navigate('/autopost/dashboard')
		} catch (error) {
			console.error('Error creating post:', error)
			alert('Failed to create post')
		} finally {
			setLoading(false)
		}
	}

	const addHashtag = () => {
		if (hashtagInput.trim()) {
			const tag = hashtagInput.startsWith('#') ? hashtagInput : `#${hashtagInput}`
			setFormData(prev => ({
				...prev,
				hashtags: [...prev.hashtags, tag]
			}))
			setHashtagInput('')
		}
	}

	const removeHashtag = (index) => {
		setFormData(prev => ({
			...prev,
			hashtags: prev.hashtags.filter((_, i) => i !== index)
		}))
	}

	const toggleAccount = (accountId, platform) => {
		setFormData(prev => {
			const isSelected = prev.social_account_ids.includes(accountId)
			return {
				...prev,
				social_account_ids: isSelected
					? prev.social_account_ids.filter(id => id !== accountId)
					: [...prev.social_account_ids, accountId],
				platforms: isSelected
					? prev.platforms.filter(p => p !== platform)
					: [...new Set([...prev.platforms, platform])]
			}
		})
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b">
				<div className="container mx-auto px-6 py-6">
					<h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
					<p className="text-gray-600 mt-1">Schedule content across your social media accounts</p>
				</div>
			</div>

			<div className="container mx-auto px-6 py-8">
				<div className="max-w-4xl mx-auto">
					<form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
						{/* Content */}
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Post Content *
							</label>
							<textarea
								value={formData.content}
								onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								rows={6}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								placeholder="What's on your mind?"
								required
							/>
							<p className="text-sm text-gray-500 mt-2">{formData.content.length} characters</p>
						</div>

						{/* Hashtags */}
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Hashtags
							</label>
							<div className="flex gap-2 mb-3">
								<input
									type="text"
									value={hashtagInput}
									onChange={(e) => setHashtagInput(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									placeholder="Add hashtag (press Enter)"
								/>
								<button
									type="button"
									onClick={addHashtag}
									className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
								>
									Add
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{formData.hashtags.map((tag, index) => (
									<span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
										{tag}
										<button type="button" onClick={() => removeHashtag(index)}>
											<X className="w-4 h-4" />
										</button>
									</span>
								))}
							</div>
						</div>

						{/* Select Accounts */}
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<label className="block text-sm font-medium text-gray-700 mb-4">
								Select Accounts *
							</label>
							{accounts.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{accounts.map((account) => (
										<label
											key={account.id}
											className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
												formData.social_account_ids.includes(account.id)
													? 'border-purple-600 bg-purple-50'
													: 'border-gray-200 hover:border-purple-300'
											}`}
										>
											<input
												type="checkbox"
												checked={formData.social_account_ids.includes(account.id)}
												onChange={() => toggleAccount(account.id, account.platform)}
												className="w-5 h-5 text-purple-600"
											/>
											<div className="flex-1">
												<p className="font-medium text-gray-900">@{account.username}</p>
												<p className="text-sm text-gray-500 capitalize">{account.platform}</p>
											</div>
										</label>
									))}
								</div>
							) : (
								<div className="text-center py-8 bg-gray-50 rounded-lg">
									<p className="text-gray-600 mb-4">No accounts connected</p>
									<button
										type="button"
										onClick={() => navigate('/autopost/accounts')}
										className="text-purple-600 hover:text-purple-700 font-medium"
									>
										Connect Account
									</button>
								</div>
							)}
						</div>

						{/* Scheduling */}
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<label className="block text-sm font-medium text-gray-700 mb-4">
								Schedule
							</label>
							<div className="space-y-4">
								<label className="flex items-center gap-3">
									<input
										type="checkbox"
										checked={formData.post_immediately}
										onChange={(e) => setFormData({ ...formData, post_immediately: e.target.checked })}
										className="w-5 h-5 text-purple-600"
									/>
									<span className="text-gray-700">Post immediately</span>
								</label>
								{!formData.post_immediately && (
									<div>
										<label className="block text-sm text-gray-600 mb-2">Schedule for</label>
										<input
											type="datetime-local"
											value={formData.scheduled_for}
											onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
											required={!formData.post_immediately}
										/>
									</div>
								)}
							</div>
						</div>

						{/* Actions */}
						<div className="flex gap-4">
							<button
								type="submit"
								disabled={loading || formData.social_account_ids.length === 0}
								className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
							>
								{loading ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								) : (
									<>
										<Send className="w-5 h-5" />
										{formData.post_immediately ? 'Post Now' : 'Schedule Post'}
									</>
								)}
							</button>
							<button
								type="button"
								onClick={(e) => handleSubmit(e, true)}
								disabled={loading}
								className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium"
							>
								<Save className="w-5 h-5" />
								Save Draft
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AutoPostCreate
