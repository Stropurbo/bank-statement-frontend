import React, { useState, useEffect } from 'react';
import {
  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn,
  FaTiktok, FaYoutube, FaPinterestP, FaSnapchatGhost,
  FaCalendarAlt, FaImage, FaVideo, FaClock, FaChartLine,
  FaCheckCircle, FaExclamationCircle, FaPlus, FaTrash, FaEdit
} from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

const UserDashboard = () => {
  // State management
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [postNow, setPostNow] = useState(false);

  // Platform configuration
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F', connected: false },
    { id: 'facebook', name: 'Facebook', icon: FaFacebookF, color: '#1877F2', connected: false },
    { id: 'twitter', name: 'Twitter', icon: FaTwitter, color: '#1DA1F2', connected: false },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedinIn, color: '#0A66C2', connected: false },
    { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: '#000000', connected: false },
    { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000', connected: false },
    { id: 'pinterest', name: 'Pinterest', icon: FaPinterestP, color: '#E60023', connected: false },
    { id: 'snapchat', name: 'Snapchat', icon: FaSnapchatGhost, color: '#FFFC00', connected: false },
  ];

  // Auto-permission handling on component mount
  useEffect(() => {
    requestAutoPermissions();
    loadConnectedAccounts();
    loadScheduledPosts();
  }, []);

  // Request permissions automatically (one-time)
  const requestAutoPermissions = async () => {
    try {
      // Check if permissions already granted
      const permissionsGranted = localStorage.getItem('socialMediaPermissions');

      if (!permissionsGranted) {
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
          await Notification.requestPermission();
        }

        // Store permission status
        localStorage.setItem('socialMediaPermissions', 'granted');
        console.log('✅ Auto-permissions granted');
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  // Load connected accounts from storage
  const loadConnectedAccounts = () => {
    const saved = localStorage.getItem('connectedAccounts');
    if (saved) {
      setConnectedAccounts(JSON.parse(saved));
    }
  };

  // Load scheduled posts
  const loadScheduledPosts = () => {
    const saved = localStorage.getItem('scheduledPosts');
    if (saved) {
      setScheduledPosts(JSON.parse(saved));
    }
  };

  // Connect social media account
  const connectAccount = async (platformId) => {
    try {
      // Simulate OAuth flow (you'll replace with real API)
      const newAccount = {
        id: Date.now(),
        platform: platformId,
        username: `user_${platformId}`,
        connectedAt: new Date().toISOString(),
        status: 'active'
      };

      const updated = [...connectedAccounts, newAccount];
      setConnectedAccounts(updated);
      localStorage.setItem('connectedAccounts', JSON.stringify(updated));

      alert(`✅ ${platformId} connected successfully!`);
    } catch (error) {
      console.error('Connection error:', error);
      alert('❌ Failed to connect account');
    }
  };

  // Disconnect account
  const disconnectAccount = (accountId) => {
    const updated = connectedAccounts.filter(acc => acc.id !== accountId);
    setConnectedAccounts(updated);
    localStorage.setItem('connectedAccounts', JSON.stringify(updated));
  };

  // Handle media upload
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }));
    setMediaFiles([...mediaFiles, ...newMedia]);
  };

  // Remove media
  const removeMedia = (mediaId) => {
    setMediaFiles(mediaFiles.filter(m => m.id !== mediaId));
  };

  // Toggle platform selection
  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  // Schedule post
  const handleSchedulePost = () => {
    if (!postContent.trim()) {
      alert('⚠️ Please enter post content');
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert('⚠️ Please select at least one platform');
      return;
    }

    if (!postNow && (!scheduledDate || !scheduledTime)) {
      alert('⚠️ Please select date and time for scheduling');
      return;
    }

    const newPost = {
      id: Date.now(),
      content: postContent,
      platforms: selectedPlatforms,
      media: mediaFiles,
      scheduledFor: postNow ? 'now' : `${scheduledDate} ${scheduledTime}`,
      status: postNow ? 'posted' : 'scheduled',
      createdAt: new Date().toISOString()
    };

    const updated = [...scheduledPosts, newPost];
    setScheduledPosts(updated);
    localStorage.setItem('scheduledPosts', JSON.stringify(updated));

    // Reset form
    setPostContent('');
    setSelectedPlatforms([]);
    setMediaFiles([]);
    setScheduledDate('');
    setScheduledTime('');
    setPostNow(false);

    alert(postNow ? '✅ Posted successfully!' : '✅ Post scheduled successfully!');
  };

  // Delete scheduled post
  const deletePost = (postId) => {
    const updated = scheduledPosts.filter(p => p.id !== postId);
    setScheduledPosts(updated);
    localStorage.setItem('scheduledPosts', JSON.stringify(updated));
  };

  // Calculate stats
  const stats = {
    totalPosts: scheduledPosts.length,
    scheduled: scheduledPosts.filter(p => p.status === 'scheduled').length,
    posted: scheduledPosts.filter(p => p.status === 'posted').length,
    connectedAccounts: connectedAccounts.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600">Schedule and manage your social media posts</p>
        </div>

        {/* Quick Stats */}
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
              <FaClock className="text-4xl text-blue-500" />
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

          {/* Left Column - Create Post */}
          <div className="lg:col-span-2 space-y-6">

            {/* Post Creation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaPlus className="text-purple-600" />
                Create New Post
              </h2>

              {/* Post Content */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Post Content</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind? Write your post here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                  rows="5"
                />
                <p className="text-sm text-gray-500 mt-2">{postContent.length} characters</p>
              </div>

              {/* Media Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Media Files</label>
                <label className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-all">
                  <FaImage className="text-2xl text-gray-400" />
                  <span className="text-gray-600">Click to upload images or videos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>

                {/* Media Preview */}
                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {mediaFiles.map(media => (
                      <div key={media.id} className="relative group">
                        {media.type === 'video' ? (
                          <video src={media.preview} className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <img src={media.preview} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                        )}
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">Select Platforms</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {platforms.map(platform => {
                    const Icon = platform.icon;
                    const isConnected = connectedAccounts.some(acc => acc.platform === platform.id);
                    const isSelected = selectedPlatforms.includes(platform.id);

                    return (
                      <button
                        key={platform.id}
                        onClick={() => isConnected && togglePlatform(platform.id)}
                        disabled={!isConnected}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                      >
                        <Icon className="text-2xl" style={{ color: platform.color }} />
                        <span className="text-xs font-semibold">{platform.name}</span>
                        {!isConnected && (
                          <span className="text-xs text-red-500">Not connected</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Schedule Time */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">Schedule Time</label>

                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postNow}
                      onChange={(e) => setPostNow(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Post Now</span>
                  </label>
                </div>

                {!postNow && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Date</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Time</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSchedulePost}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all"
              >
                {postNow ? '📤 Post Now' : '⏰ Schedule Post'}
              </button>
            </div>

            {/* Scheduled Posts List */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" />
                Your Scheduled Posts
              </h2>

              {scheduledPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No scheduled posts yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledPosts.map(post => (
                    <div key={post.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-gray-800 flex-1">{post.content}</p>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.platforms.map(platformId => {
                          const platform = platforms.find(p => p.id === platformId);
                          const Icon = platform?.icon;
                          return (
                            <span key={platformId} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs">
                              {Icon && <Icon style={{ color: platform.color }} />}
                              {platform?.name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {post.scheduledFor === 'now' ? '📤 Posted' : `⏰ ${post.scheduledFor}`}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.status === 'posted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
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

          {/* Right Column - Connected Accounts */}
          <div className="space-y-6">

            {/* Connected Accounts */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <BiWorld className="text-green-600" />
                Connected Accounts
              </h2>

              <div className="space-y-3">
                {platforms.map(platform => {
                  const Icon = platform.icon;
                  const account = connectedAccounts.find(acc => acc.platform === platform.id);
                  const isConnected = !!account;

                  return (
                    <div key={platform.id} className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="text-2xl" style={{ color: platform.color }} />
                        <div className="flex-1">
                          <p className="font-semibold">{platform.name}</p>
                          {isConnected && (
                            <p className="text-xs text-gray-500">@{account.username}</p>
                          )}
                        </div>
                        {isConnected ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaExclamationCircle className="text-gray-400" />
                        )}
                      </div>

                      {isConnected ? (
                        <button
                          onClick={() => disconnectAccount(account.id)}
                          className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button
                          onClick={() => connectAccount(platform.id)}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-purple-900">💡 Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Connect your accounts first before scheduling posts</span>
                </li>
                <li className="flex gap-2">
                  <span>📅</span>
                  <span>Schedule posts up to 30 days in advance</span>
                </li>
                <li className="flex gap-2">
                  <span>🖼️</span>
                  <span>Upload up to 10 images per post</span>
                </li>
                <li className="flex gap-2">
                  <span>🔔</span>
                  <span>Permissions are auto-saved for seamless posting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
