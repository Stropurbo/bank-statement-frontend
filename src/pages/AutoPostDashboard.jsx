import React, { useState, useEffect } from 'react'
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaTiktok, FaYoutube, FaPinterestP, FaSnapchatGhost, FaCalendarAlt, FaImage, FaChartLine, FaCheckCircle, FaExclamationCircle, FaPlus, FaTrash } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import apiClient from '../services/api-client'
import Navbar from '../layout/Navbar'

function AutoPostDashboard() {
	const [postContent, setPostContent] = useState('')
	const [selectedPlatforms, setSelectedPlatforms] = useState([])
	const [scheduledDate, setScheduledDate] = useState('')
	const [scheduledTime, setScheduledTime] = useState('')
	const [mediaFiles, setMediaFiles] = useState([])
	const [connectedAccounts, setConnectedAccounts] = useState([])
	const [scheduledPosts, setScheduledPosts] = useState([])
	const [postNow, setPostNow] = useState(false)
	const [loading, setLoading] = useState(true)
	const [videoTitle, setVideoTitle] = useState('')
	const [videoDescription, setVideoDescription] = useState('')
	const [videoTags, setVideoTags] = useState('')
	const [connecting, setConnecting] = useState(null)
	const [posting, setPosting] = useState(false)

	const BlueskyIcon = () => (
		<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bluesky-icon.png" alt="Bluesky" className="w-6 h-6 object-contain" />
	)

	const ThreadsIcon = () => (
		<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png" alt="Threads" className="w-6 h-6 object-contain" />
	)

	const PinterestIcon = () => (
		<img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/pinterest-round-color-icon.png" alt="Pinterest" className="w-6 h-6 object-contain" />
	)

	const platforms = [
		{ id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F', mediaRequired: true },
		{ id: 'facebook', name: 'Facebook', icon: FaFacebookF, color: '#1877F2' },
		{ id: 'twitter', name: 'Twitter', icon: FaTwitter, color: '#1DA1F2', disabled: true, comingSoon: true },
		{ id: 'linkedin', name: 'LinkedIn', icon: FaLinkedinIn, color: '#0A66C2' },
		{ id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: '#000000', videoOnly: true },
		{ id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000', videoOnly: true },
		{ id: 'bluesky', name: 'Bluesky', icon: BlueskyIcon, color: '#1185FE' },
		{ id: 'threads', name: 'Threads', icon: ThreadsIcon, color: '#000000', mediaRequired: true },
		{ id: 'pinterest', name: 'Pinterest', icon: PinterestIcon, color: '#E60023', mediaRequired: true },
	]

	useEffect(() => {
		fetchData()
		// Check for OAuth callback success/error
		const params = new URLSearchParams(window.location.search)
		const success = params.get('success')
		const error = params.get('error')
		const platform = params.get('platform')
		
		if (success === 'connected' && platform) {
			alert(`✅ ${platform.charAt(0).toUpperCase() + platform.slice(1)} connected successfully!`)
			window.history.replaceState({}, '', '/autopost/dashboard')
		} else if (error) {
			alert(`❌ Connection failed: ${error}`)
			window.history.replaceState({}, '', '/autopost/dashboard')
		}
		
		// Realtime polling - refresh every 10 seconds
		const interval = setInterval(() => {
			fetchData()
		}, 10000)
		
		return () => clearInterval(interval)
	}, [])

	const fetchData = async () => {
		try {
			const [postsRes, accountsRes] = await Promise.all([
				apiClient.get('/autopost/posts/'),
				apiClient.get('/autopost/accounts/')
			])
			// Sort posts: scheduled first, then others
			const posts = postsRes.data.results || postsRes.data
			const sortedPosts = posts.sort((a, b) => {
				if (a.status === 'scheduled' && b.status !== 'scheduled') return -1
				if (a.status !== 'scheduled' && b.status === 'scheduled') return 1
				return 0
			})
			setScheduledPosts(sortedPosts)
			setConnectedAccounts(accountsRes.data.results || accountsRes.data)
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setLoading(false)
		}
	}

	const connectAccount = async (platformId) => {
		setConnecting(platformId)
		try {
			const response = await apiClient.get(`/autopost/accounts/connect/${platformId}/`)
			if (response.data.auth_url) {
				window.location.href = response.data.auth_url
			}
		} catch (error) {
			console.error('Error:', error)
			const errorMsg = error.response?.data?.error || 'Failed to connect. Please try again.'
			alert(errorMsg)
			setConnecting(null)
		}
	}

	const disconnectAccount = async (accountId) => {
		try {
			await apiClient.delete(`/autopost/accounts/${accountId}/`)
			fetchData()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const handleMediaUpload = async (e) => {
		const files = Array.from(e.target.files)
		
		for (const file of files) {
			const mediaType = file.type.startsWith('video/') ? 'video' : 'image'
			const preview = URL.createObjectURL(file)
			
			// Add to UI immediately
			const tempMedia = {
				id: Date.now() + Math.random(),
				file,
				preview,
				type: mediaType,
				uploading: true
			}
			setMediaFiles(prev => [...prev, tempMedia])
			
			// Upload to Cloudinary
			try {
				const formData = new FormData()
				formData.append('file', file)
				
				const response = await apiClient.post('/autopost/media/upload_to_cloudinary/', formData, {
					headers: { 'Content-Type': 'multipart/form-data' }
				})
				
				// Update with Cloudinary URL
				setMediaFiles(prev => prev.map(m => 
					m.id === tempMedia.id ? { ...m, url: response.data.url, uploading: false } : m
				))
			} catch (error) {
				console.error('Upload error:', error)
				alert('Failed to upload media')
				setMediaFiles(prev => prev.filter(m => m.id !== tempMedia.id))
			}
		}
	}

	const removeMedia = (mediaId) => {
		setMediaFiles(mediaFiles.filter(m => m.id !== mediaId))
	}

	const togglePlatform = (platformId) => {
		setSelectedPlatforms(prev =>
			prev.includes(platformId) ? prev.filter(p => p !== platformId) : [...prev, platformId]
		)
	}

	const handleSchedulePost = async () => {
		// Check if content or media is provided
		const hasMedia = mediaFiles.length > 0
		if (!postContent.trim() && !hasMedia) return alert('⚠️ Please enter post content or upload media')
		if (selectedPlatforms.length === 0) return alert('⚠️ Please select at least one platform')
		if (!postNow && (!scheduledDate || !scheduledTime)) return alert('⚠️ Please select date and time')
		
		// Check TikTok/YouTube video requirement
		const hasVideo = mediaFiles.some(m => m.type === 'video')
		const hasTikTok = selectedPlatforms.includes('tiktok')
		const hasYouTube = selectedPlatforms.includes('youtube')
		if ((hasTikTok || hasYouTube) && !hasVideo) {
			return alert('⚠️ TikTok and YouTube require video content')
		}
		
		// Check media requirement for Instagram, Threads, Pinterest
		const mediaRequiredPlatforms = selectedPlatforms.filter(p => 
			['instagram', 'threads', 'pinterest'].includes(p)
		)
		if (mediaRequiredPlatforms.length > 0 && !hasMedia) {
			return alert('⚠️ Instagram, Threads, and Pinterest require image or video content')
		}

		setPosting(true)
		try {
			// Check if media is still uploading
			if (mediaFiles.some(m => m.uploading)) {
				return alert('⏳ Please wait for media upload to complete')
			}
			
			// Determine post_type based on media
			let postType = 'text'
			if (hasVideo) {
				postType = 'video'
			} else if (hasMedia) {
				postType = 'image'
			}
			
			// Get Cloudinary URLs
			const mediaUrls = mediaFiles.filter(m => m.url).map(m => m.url)
			
			const payload = {
				content: postContent,
				post_type: postType,
				media_urls: mediaUrls,
				platforms: selectedPlatforms,
				social_account_ids: connectedAccounts.filter(acc => selectedPlatforms.includes(acc.platform)).map(acc => acc.id),
				post_immediately: postNow,
				scheduled_for: postNow ? null : `${scheduledDate}T${scheduledTime}`,
				...(hasVideo && (hasTikTok || hasYouTube) && {
					video_title: videoTitle,
					video_description: videoDescription,
					video_tags: videoTags
				})
			}
			console.log('Payload:', payload)
			await apiClient.post('/autopost/posts/', payload)
			
			// Clear form
			setPostContent('')
			setSelectedPlatforms([])
			setMediaFiles([])
			setScheduledDate('')
			setScheduledTime('')
			setPostNow(false)
			setVideoTitle('')
			setVideoDescription('')
			setVideoTags('')
			
			// Refresh data
			await fetchData()
			
			alert(postNow ? '✅ Posted!' : '✅ Scheduled!')
		} catch (error) {
			console.error('Error:', error)
			console.error('Error response:', error.response?.data)
			const errorMsg = error.response?.data?.error || error.response?.data?.detail || JSON.stringify(error.response?.data) || 'Failed to create post'
			alert(`❌ ${errorMsg}`)
		} finally {
			setPosting(false)
		}
	}

	const deletePost = async (postId) => {
		try {
			await apiClient.delete(`/autopost/posts/${postId}/`)
			fetchData()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const stats = {
		totalPosts: scheduledPosts.length,
		scheduled: scheduledPosts.filter(p => p.status === 'scheduled').length,
		posted: scheduledPosts.filter(p => p.status === 'posted').length,
		connectedAccounts: connectedAccounts.length
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
			</div>
		)
	}

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-20 pb-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
						AutoPost Dashboard
					</h1>
					<p className="text-gray-600">Schedule and manage your social media posts</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm mb-1">Total Posts</p>
								<p className="text-3xl font-bold text-purple-600">{stats.totalPosts}</p>
							</div>
							<FaChartLine className="text-4xl text-purple-500" />
						</div>
					</div>
					<div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm mb-1">Scheduled</p>
								<p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
							</div>
							<FaCalendarAlt className="text-4xl text-blue-500" />
						</div>
					</div>
					<div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm mb-1">Posted</p>
								<p className="text-3xl font-bold text-green-600">{stats.posted}</p>
							</div>
							<FaCheckCircle className="text-4xl text-green-500" />
						</div>
					</div>
					<div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm mb-1">Connected</p>
								<p className="text-3xl font-bold text-pink-600">{stats.connectedAccounts}</p>
							</div>
							<BiWorld className="text-4xl text-pink-500" />
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Create Post */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white rounded-2xl shadow-xl p-8">
							<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
								<FaPlus className="text-purple-600" />
								Create New Post
							</h2>

							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">Post Content</label>
								<textarea
									value={postContent}
									onChange={(e) => setPostContent(e.target.value)}
									placeholder="What's on your mind?"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
									rows="5"
								/>
								<p className="text-sm text-gray-500 mt-2">{postContent.length} characters</p>
							</div>

							{mediaFiles.some(m => m.type === 'video') && (selectedPlatforms.includes('youtube') || selectedPlatforms.includes('tiktok')) && (
								<div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
									<h3 className="text-sm font-bold text-blue-900 mb-3">📹 Video Details (for YouTube/TikTok)</h3>
									<div className="space-y-3">
										<div>
											<label className="block text-sm text-gray-700 mb-1">Video Title</label>
											<input
												type="text"
												value={videoTitle}
												onChange={(e) => setVideoTitle(e.target.value)}
												placeholder="Enter video title"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
											/>
										</div>
										<div>
											<label className="block text-sm text-gray-700 mb-1">Video Description</label>
											<textarea
												value={videoDescription}
												onChange={(e) => setVideoDescription(e.target.value)}
												placeholder="Enter video description"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm resize-none"
												rows="3"
											/>
										</div>
										<div>
											<label className="block text-sm text-gray-700 mb-1">Tags (comma separated)</label>
											<input
												type="text"
												value={videoTags}
												onChange={(e) => setVideoTags(e.target.value)}
												placeholder="e.g. tech, tutorial, coding"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
											/>
										</div>
									</div>
								</div>
							)}

							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">Media Files</label>
								<label className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-all">
									<FaImage className="text-2xl text-gray-400" />
									<span className="text-gray-600">Click to upload</span>
									<input type="file" multiple accept="image/*,video/*" onChange={handleMediaUpload} className="hidden" />
								</label>
								{mediaFiles.length > 0 && (
									<div className="grid grid-cols-4 gap-4 mt-4">
										{mediaFiles.map(media => (
											<div key={media.id} className="relative group">
												{media.type === 'video' ? (
													<video src={media.preview} className="w-full h-24 object-cover rounded-lg" />
												) : (
													<img src={media.preview} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
												)}
												{media.uploading && (
													<div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
														<div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
													</div>
												)}
												{!media.uploading && (
													<button onClick={() => removeMedia(media.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
														<FaTrash className="text-xs" />
													</button>
												)}
											</div>
										))}
									</div>
								)}
							</div>

							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-3">Select Platforms</label>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
									{platforms.map(platform => {
										const Icon = platform.icon
										const isConnected = connectedAccounts.some(acc => acc.platform === platform.id)
										const isSelected = selectedPlatforms.includes(platform.id)
										return (
											<button
												key={platform.id}
												onClick={() => !platform.disabled && isConnected && togglePlatform(platform.id)}
												disabled={!isConnected || platform.disabled}
												className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
													isSelected ? 'border-purple-500 bg-purple-50 scale-105' : 'border-gray-200'
												} ${(!isConnected || platform.disabled) && 'opacity-50 cursor-not-allowed'}`}
											>
												<Icon className="text-2xl" style={{ color: platform.color }} />
												<span className="text-xs font-semibold">{platform.name}</span>
												{platform.videoOnly && <span className="text-xs text-blue-500">Video Only</span>}
												{platform.mediaRequired && <span className="text-xs text-purple-500">Media Required</span>}
												{platform.comingSoon && <span className="text-xs text-orange-500 font-bold">Coming Soon</span>}
												{!platform.comingSoon && !platform.videoOnly && !platform.mediaRequired && !isConnected && <span className="text-xs text-red-500">Not connected</span>}
											</button>
										)
									})}
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-3">Schedule Time</label>
								<div className="flex items-center gap-4 mb-4">
									<label className="flex items-center gap-2 cursor-pointer">
										<input type="checkbox" checked={postNow} onChange={(e) => setPostNow(e.target.checked)} className="w-4 h-4 text-purple-600 rounded" />
										<span className="text-gray-700">Post Now</span>
									</label>
								</div>
								{!postNow && (
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm text-gray-600 mb-2">Date</label>
											<input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none" />
										</div>
										<div>
											<label className="block text-sm text-gray-600 mb-2">Time</label>
											<input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none" />
										</div>
									</div>
								)}
							</div>

							<button 
								onClick={handleSchedulePost} 
								disabled={posting}
								className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							>
								{posting ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
										{postNow ? 'Posting...' : 'Scheduling...'}
									</>
								) : (
									postNow ? '📤 Post Now' : '⏰ Schedule Post'
								)}
							</button>
						</div>

						{/* Posts List */}
						<div className="bg-white rounded-2xl shadow-xl p-8">
							<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
								<FaCalendarAlt className="text-blue-600" />
								Your Scheduled Posts
							</h2>
							{scheduledPosts.length === 0 ? (
								<div className="text-center py-12">
									<FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
									<p className="text-gray-500">No posts yet</p>
								</div>
							) : (
								<div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
									{scheduledPosts.map(post => (
										<div key={post.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
											<div className="flex justify-between items-start mb-3">
												<p className="text-gray-800 flex-1">{post.content}</p>
												<button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700 ml-4">
													<FaTrash />
												</button>
											</div>
											<div className="flex flex-wrap gap-2 mb-3">
												{post.platforms?.map(platformId => {
													const platform = platforms.find(p => p.id === platformId)
													const Icon = platform?.icon
													return (
														<span key={platformId} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs">
															{Icon && <Icon style={{ color: platform.color }} />}
															{platform?.name}
														</span>
													)
												})}
											</div>
											<div className="flex items-center justify-between text-sm">
												<span className="text-gray-500">
													{post.scheduled_for ? `⏰ ${new Date(post.scheduled_for).toLocaleString()}` : '📤 Posted'}
												</span>
												<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
													post.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
												}`}>
													{post.status === 'posted' ? '✅ Posted' : '⏳ Scheduled'}
												</span>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Connected Accounts */}
					<div className="space-y-6">
						<div className="bg-white rounded-2xl shadow-xl p-6">
							<h2 className="text-xl font-bold mb-6 flex items-center gap-3">
								<BiWorld className="text-green-600" />
								Connected Accounts
							</h2>
							<div className="space-y-3">
								{platforms.map(platform => {
									const Icon = platform.icon
									const account = connectedAccounts.find(acc => acc.platform === platform.id)
									const isConnected = !!account
									return (
										<div key={platform.id} className="border-2 border-gray-200 rounded-xl p-4">
											<div className="flex items-center gap-3 mb-3">
												<Icon className="text-2xl" style={{ color: platform.color }} />
												<div className="flex-1">
													<p className="font-semibold">{platform.name}</p>
													{platform.comingSoon && <p className="text-xs text-orange-500 font-bold">Coming Soon</p>}
													{isConnected && <p className="text-xs text-gray-500">@{account.username}</p>}
												</div>
												{isConnected ? <FaCheckCircle className="text-green-500" /> : <FaExclamationCircle className="text-gray-400" />}
											</div>
											{platform.comingSoon ? (
												<div className="w-full bg-orange-50 text-orange-600 py-2 rounded-lg text-center text-sm font-semibold">
													Coming Soon
												</div>
											) : isConnected ? (
												<button onClick={() => disconnectAccount(account.id)} className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold">
													Disconnect
												</button>
											) : (
												<button 
													onClick={() => connectAccount(platform.id)} 
													disabled={connecting === platform.id}
													className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
												>
													{connecting === platform.id ? (
														<>
															<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
															Connecting...
														</>
													) : 'Connect'}
												</button>
											)}
										</div>
									)
								})}
							</div>
						</div>

						<div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl p-6">
							<h3 className="text-lg font-bold mb-4 text-purple-900">💡 Quick Tips</h3>
							<ul className="space-y-3 text-sm text-gray-700">
								<li className="flex gap-2"><span>✅</span><span>Connect accounts first</span></li>
								<li className="flex gap-2"><span>📅</span><span>Schedule up to 30 days ahead</span></li>
								<li className="flex gap-2"><span>🖼️</span><span>Upload up to 10 images</span></li>
								<li className="flex gap-2"><span>🔔</span><span>Auto-saved permissions</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			</div>
		</>
	)
}

export default AutoPostDashboard
