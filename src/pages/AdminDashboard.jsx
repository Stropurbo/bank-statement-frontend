import React, { useState, useEffect } from 'react'
import AuthApiClient from '../services/auth-api-client'
import ApiClient from '../services/api-client'
import useAuthContext from '../hooks/useAuthContext'

function AdminDashboard() {
  const { user: currentUser } = useAuthContext()
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])
  const [statements, setStatements] = useState([])
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const usersRes = await AuthApiClient.get('admin/user/')
      console.log('Full API response:', usersRes)
      console.log('Users response data:', usersRes.data)
      
      const userData = usersRes.data.results || usersRes.data || []
      console.log('Processed user data:', userData)
      setUsers(userData)

      // Set demo data for payments and statements since endpoints don't exist
      setPayments([
        { id: 1, amount: 29.99, status: 'success' },
        { id: 2, amount: 19.99, status: 'failed' }
      ])
      setStatements([
        { id: 1, filename: 'Statement_2024_01.pdf', status: 'Generated' }
      ])
    } catch (error) {
      console.error('Error fetching users:', error)
      console.error('API Error details:', error.response || error.message)
      setUsers([
        { id: 1, email: 'admin@example.com', is_active: true },
        { id: 2, email: 'user@example.com', is_active: false }
      ])
      setPayments([
        { id: 1, amount: 29.99, status: 'success' },
        { id: 2, amount: 19.99, status: 'failed' }
      ])
      setStatements([
        { id: 1, filename: 'Statement_2024_01.pdf', status: 'Generated' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    try {
      await AuthApiClient.delete(`admin/user/${userId}/`)
      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const generateStatement = async () => {
    try {
      const newStatement = {
        id: Date.now(),
        filename: `Statement_${new Date().toISOString().slice(0, 7)}.pdf`,
        status: 'Generated'
      }
      setStatements([newStatement, ...statements])
    } catch (error) {
      console.error('Error generating statement:', error)
    }
  }

  const toggleSetting = async (setting) => {
    try {
      const newValue = !settings[setting]
      setSettings({ ...settings, [setting]: newValue })
    } catch (error) {
      console.error('Error updating setting:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'statements', name: 'Statements', icon: '📄' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Management</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                  Add User
                </button>
              </div>
              <div className="space-y-2">
                {users.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No users found
                  </div>
                ) : (
                  users.map(user => {
                    const isActive = user.is_active !== false && user.is_active !== 'false'
                    const hasSubscription = user.subscription || user.has_subscription || user.subscribed
                    
                    return (
                      <div key={user.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <span className="font-medium">{user.email || user.username}</span>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${hasSubscription ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {hasSubscription ? 'Subscribed' : 'No Subscription'}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                          {currentUser?.id !== user.id ? (
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">Cannot delete self</span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {payments.filter(p => p.status === 'success').length}
                  </div>
                  <div className="text-sm text-gray-600">Successful Payments</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {payments.filter(p => p.status === 'failed').length}
                  </div>
                  <div className="text-sm text-gray-600">Failed Payments</div>
                </div>
              </div>
              <div className="space-y-2">
                {payments.slice(0, 10).map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">Payment #{payment.id}</span>
                      <span className={`ml-2 text-sm ${
                        payment.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <span className="font-medium">${payment.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'statements' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bank Statements</h2>
                <button
                  onClick={generateStatement}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Generate Report
                </button>
              </div>
              <div className="space-y-2">
                {statements.map(statement => (
                  <div key={statement.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">{statement.filename}</span>
                      <span className="ml-2 text-sm text-gray-500">{statement.status}</span>
                    </div>
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">System Settings</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>Maintenance Mode</span>
                  <button
                    onClick={() => toggleSetting('maintenanceMode')}
                    className={`px-3 py-1 rounded text-sm ${
                      settings.maintenanceMode
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {settings.maintenanceMode ? 'On' : 'Off'}
                  </button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>Email Notifications</span>
                  <button
                    onClick={() => toggleSetting('emailNotifications')}
                    className={`px-3 py-1 rounded text-sm ${
                      settings.emailNotifications
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {settings.emailNotifications ? 'On' : 'Off'}
                  </button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>Backup Database</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Run Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard