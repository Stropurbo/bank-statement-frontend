import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../services/api-client'

function CreatePlan() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')

	const [planChoices] = useState([
		{ value: 'basic', label: 'Basic' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'ultra', label: 'Ultra' },
	])
	const [editingPlan, setEditingPlan] = useState(null)

	const onSubmit = async (data) => {
		setLoading(true)
		setError('')
		setSuccess('')

		try {
			const planData = {
				name: data.name,
				monthly_price: parseFloat(data.monthly_price),
				annual_price: parseFloat(data.annual_price),
				tokens: parseInt(data.tokens_monthly) || parseInt(data.tokens_annual),
				tokens_monthly: parseInt(data.tokens_monthly),
				tokens_annual: parseInt(data.tokens_annual),
				description: data.description,
				features: data.features.split('\n').filter((f) => f.trim()),
			}

			if (editingPlan) {
				await ApiClient.put(`/plans/${editingPlan.id}/`, planData)
				setSuccess('Plan updated successfully!')
			} else {
				await ApiClient.post('/plans/', planData)
				setSuccess('Plan created successfully!')
			}

			reset()
			setEditingPlan(null)
		} catch (err) {
			setError(err.response?.data?.error || 'Failed to save plan')
		} finally {
			setLoading(false)
		}
	}

	const cancelEdit = () => {
		setEditingPlan(null)
		reset()
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<title>Create Plan</title>
			<h1 className="text-3xl font-bold mb-6">Plan Management</h1>

			{error && (
				<div className="alert alert-error mb-4 justify-between">
					<span>{error}</span>
					<button onClick={() => setError('')}>✕</button>
				</div>
			)}

			{success && (
				<div className="alert alert-success mb-4 justify-between">
					<span>{success}</span>
					<button onClick={() => setSuccess('')}>✕</button>
				</div>
			)}

			<div className="grid lg:grid-cols-2 gap-8">
				{/* Form */}
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">
							{editingPlan ? 'Edit Plan' : 'Create New Plan'}
						</h2>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="form-control">
								<label className="label">Plan Name</label>
								<select
									className={`select select-bordered ${
										errors.name ? 'select-error' : ''
									}`}
									{...register('name', { required: 'Plan name is required' })}
								>
									<option value="">Select Plan</option>
									{planChoices.map((choice) => (
										<option
											key={choice.value}
											value={choice.value}
										>
											{choice.label}
										</option>
									))}
								</select>
								{errors.name && (
									<span className="text-error text-sm">
										{errors.name.message}
									</span>
								)}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="form-control">
									<label className="label">Monthly Price $</label>
									<input
										type="number"
										step="0.01"
										className={`input input-bordered ${
											errors.monthly_price ? 'input-error' : ''
										}`}
										{...register('monthly_price', {
											required: 'Monthly price is required',
										})}
									/>
									{errors.monthly_price && (
										<span className="text-error text-sm">
											{errors.monthly_price.message}
										</span>
									)}
								</div>

								<div className="form-control">
									<label className="label">Annual Price $</label>
									<input
										type="number"
										step="0.01"
										className={`input input-bordered ${
											errors.annual_price ? 'input-error' : ''
										}`}
										{...register('annual_price', {
											required: 'Annual price is required',
										})}
									/>
									{errors.annual_price && (
										<span className="text-error text-sm">
											{errors.annual_price.message}
										</span>
									)}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="form-control">
									<label className="label">Monthly Tokens</label>
									<input
										type="number"
										defaultValue="0"
										className={`input input-bordered ${
											errors.tokens_monthly ? 'input-error' : ''
										}`}
										{...register('tokens_monthly', {
											required: 'Monthly tokens is required',
										})}
									/>
									{errors.tokens_monthly && (
										<span className="text-error text-sm">
											{errors.tokens_monthly.message}
										</span>
									)}
								</div>

								<div className="form-control">
									<label className="label">Annual Tokens</label>
									<input
										type="number"
										defaultValue="0"
										className={`input input-bordered ${
											errors.tokens_annual ? 'input-error' : ''
										}`}
										{...register('tokens_annual', {
											required: 'Annual tokens is required',
										})}
									/>
									{errors.tokens_annual && (
										<span className="text-error text-sm">
											{errors.tokens_annual.message}
										</span>
									)}
								</div>
							</div>

							<div className="form-control">
								<label className="label">Description</label>
								<textarea
									className={`textarea textarea-bordered ${
										errors.description ? 'textarea-error' : ''
									}`}
									{...register('description', {
										required: 'Description is required',
									})}
								/>
								{errors.description && (
									<span className="text-error text-sm">
										{errors.description.message}
									</span>
								)}
							</div>

							<div className="form-control">
								<label className="label">Features (one per line)</label>
								<textarea
									className={`textarea textarea-bordered h-32 ${
										errors.features ? 'textarea-error' : ''
									}`}
									placeholder="Feature 1\nFeature 2\nFeature 3"
									{...register('features', {
										required: 'Features are required',
									})}
								/>
								{errors.features && (
									<span className="text-error text-sm">
										{errors.features.message}
									</span>
								)}
							</div>

							<div className="flex gap-2">
								<button
									type="submit"
									className="btn btn-primary flex-1"
									disabled={loading}
								>
									{loading
										? 'Saving...'
										: editingPlan
										? 'Update Plan'
										: 'Create Plan'}
								</button>
								{editingPlan && (
									<button
										type="button"
										className="btn btn-ghost"
										onClick={cancelEdit}
									>
										Cancel
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePlan
