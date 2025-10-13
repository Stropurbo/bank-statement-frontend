import React, { useState, useEffect } from 'react'
import ApiClient from '../services/api-client'

function AllPlan() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingPlan, setEditingPlan] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await ApiClient.get('/plans/')
      const plansData = response.data.results || response.data || []
      setPlans(Array.isArray(plansData) ? plansData : [])
    } catch (err) {
      console.error('Error fetching plans:', err)
      setError('Failed to fetch plans')
      setPlans([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (plan) => {
    setEditingPlan(plan)
    const monthlyTokens = plan.pages?.monthly?.match(/(\d+) tokens/) ? plan.pages.monthly.match(/(\d+) tokens/)[1] : '0'
    const annualTokens = plan.pages?.annual?.match(/(\d+) tokens/) ? plan.pages.annual.match(/(\d+) tokens/)[1] : '0'
    
    setEditForm({
      name: plan.title || plan.name || '',
      description: plan.description || '',
      monthly_price: plan.price?.monthly?.replace('$', '') || '',
      annual_price: plan.price?.annual?.replace('$', '') || '',
      tokens_monthly: monthlyTokens,
      tokens_annual: annualTokens,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : ''
    })
  }

  const handleSave = async () => {
    try {
      const saveData = {
        name: editForm.name,
        description: editForm.description,
        monthly_price: parseFloat(editForm.monthly_price),
        annual_price: parseFloat(editForm.annual_price),
        tokens: parseInt(editForm.tokens_monthly) || parseInt(editForm.tokens_annual),
        tokens_monthly: parseInt(editForm.tokens_monthly),
        tokens_annual: parseInt(editForm.tokens_annual),
        features: editForm.features.split('\n').filter(f => f.trim())
      }

      console.log('Saving plan data:', saveData)
      const response = await ApiClient.patch(`/plans/${editingPlan.id}/`, saveData)
      console.log('Save response:', response)

      await fetchPlans()
      setEditingPlan(null)
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message)
      setError(err.response?.data?.error || 'Failed to update plan')
    }
  }

  const handleDelete = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await ApiClient.delete(`/plans/${planId}/`)
        await fetchPlans()
      } catch (err) {
        console.error('Delete error:', err.response?.data || err.message)
        setError(err.response?.data?.error || 'Failed to delete plan')
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    )
  }

  return (
		<div className="max-w-6xl mx-auto p-6">
			<title>All Plans</title>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">All Available Plans</h1>
				<a
					href="create-plan"
					className="btn btn-primary btn-lg"
				>
					+ Create Plan
				</a>
			</div>

			{error && (
				<div className="alert alert-error mb-4">
					<span>{error}</span>
					<button onClick={() => setError('')}>✕</button>
				</div>
			)}

			{plans.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No plans available yet.</p>
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`card bg-base-100 shadow-lg ${
								plan.popular ? 'ring-2 ring-primary' : ''
							}`}
						>
							<div className="card-body">
								<div className="flex justify-between items-start mb-4">
									<h3 className="card-title capitalize">
										{plan.title || plan.name || 'Plan'}
									</h3>
									{plan.popular && (
										<div className="badge badge-primary">Popular</div>
									)}
								</div>

								<p className="text-sm text-gray-600 mb-4">{plan.description}</p>

								<div className="grid grid-cols-2 gap-4 mb-4">
									<div className="text-center p-3 bg-base-200 rounded">
										<div className="font-semibold text-lg">
											{plan.price.monthly}
										</div>
										<div className="text-sm text-gray-500">Monthly</div>
										<div className="text-xs">{plan.pages.monthly}</div>
									</div>
									<div className="text-center p-3 bg-base-200 rounded">
										<div className="font-semibold text-lg">
											{plan.price.annual}
										</div>
										<div className="text-sm text-gray-500">Annual</div>
										<div className="text-xs">{plan.pages.annual}</div>
									</div>
								</div>

								<div>
									<div className="font-semibold mb-2">Features:</div>
									<ul className="list-disc list-inside text-sm space-y-1">
										{Array.isArray(plan.features) &&
											plan.features.map((feature, idx) => (
												<li key={idx}>{feature}</li>
											))}
									</ul>
								</div>

								<div className="card-actions justify-between mt-4">
									<button
										className="btn btn-sm btn-outline"
										onClick={() => handleEdit(plan)}
									>
										Edit
									</button>
									<button
										className="btn btn-sm btn-error"
										onClick={() => handleDelete(plan.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Edit Modal */}
			{editingPlan && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">Edit Plan</h3>
						<div className="space-y-4">
							<div>
								<label className="label">Plan Name</label>

								<textarea
									className="textarea textarea-bordered w-full"
									value={editForm.name}
									onChange={(e) =>
										setEditForm({
											...editForm,
											name: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label className="label">Description</label>
								<textarea
									className="textarea textarea-bordered w-full"
									value={editForm.description}
									onChange={(e) =>
										setEditForm({
											...editForm,
											description: e.target.value,
										})
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="label">Monthly Price</label>
									<input
										type="number"
										className="input input-bordered w-full"
										value={editForm.monthly_price}
										onChange={(e) =>
											setEditForm({
												...editForm,
												monthly_price: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<label className="label">Annual Price</label>
									<input
										type="number"
										className="input input-bordered w-full"
										value={editForm.annual_price}
										onChange={(e) =>
											setEditForm({
												...editForm,
												annual_price: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="label">Monthly Tokens</label>
									<input
										type="number"
										className="input input-bordered w-full"
										value={editForm.tokens_monthly}
										onChange={(e) =>
											setEditForm({
												...editForm,
												tokens_monthly: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<label className="label">Annual Tokens</label>
									<input
										type="number"
										className="input input-bordered w-full"
										value={editForm.tokens_annual}
										onChange={(e) =>
											setEditForm({
												...editForm,
												tokens_annual: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div>
								<label className="label">Features (one per line)</label>
								<textarea
									className="textarea textarea-bordered w-full h-32"
									value={editForm.features}
									onChange={(e) =>
										setEditForm({ ...editForm, features: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="modal-action">
							<button
								className="btn btn-primary"
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className="btn"
								onClick={() => setEditingPlan(null)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
  )
}

export default AllPlan
