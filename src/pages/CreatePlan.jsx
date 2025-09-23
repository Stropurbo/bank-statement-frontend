import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../services/api-client'

function CreatePlan() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')






	const onSubmit = async (data) => {
		setLoading(true)
		setError('')
		setSuccess('')

		try {
			console.log('Raw form data:', data)
			
			const monthlyPrice = parseFloat(data.monthly_price)
			const annualPrice = parseFloat(data.annual_price)
			const monthlyPages = parseInt(data.monthly_pages)
			const annualPages = parseInt(data.annual_pages)

			console.log('Parsed values:', { monthlyPrice, annualPrice, monthlyPages, annualPages })

			if (isNaN(monthlyPrice) || isNaN(annualPrice) || isNaN(monthlyPages) || isNaN(annualPages)) {
				setError('Please enter valid numbers for prices and pages')
				setLoading(false)
				return
			}

			const planData = {
				name: data.name,
				monthly_price: monthlyPrice,
				annual_price: annualPrice,
				pages_monthly: monthlyPages,
				pages_annual: annualPages,
				description: data.description,
				features: data.features.split('\n').filter((f) => f.trim()),
			}

			console.log('Sending plan data:', planData)
			console.log('JSON stringified:', JSON.stringify(planData))

			await ApiClient.post('/plans/', planData)
			setSuccess('Plan created successfully!')

			reset()
		} catch (err) {
			console.error('Error details:', err.response?.data)
			setError(err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to save plan')
		} finally {
			setLoading(false)
		}
	}







	return (
		<div className="max-w-6xl mx-auto p-6">
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

			<div className="max-w-2xl mx-auto">
				{/* Form */}
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Create New Plan</h2>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="form-control">
								<label className="label">Plan Name</label>
								<input
									type="text"
									placeholder="Enter plan name"
									className={`input input-bordered ${
										errors.name ? 'input-error' : ''
									}`}
									{...register('name', { required: 'Plan name is required' })}
								/>
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
									<label className="label">Monthly Pages</label>
									<input
										type="number"
										className={`input input-bordered ${
											errors.monthly_pages ? 'input-error' : ''
										}`}
										{...register('monthly_pages', {
											required: 'Monthly pages is required',
										})}
									/>
									{errors.monthly_pages && (
										<span className="text-error text-sm">
											{errors.monthly_pages.message}
										</span>
									)}
								</div>

								<div className="form-control">
									<label className="label">Annual Pages</label>
									<input
										type="number"
										className={`input input-bordered ${
											errors.annual_pages ? 'input-error' : ''
										}`}
										{...register('annual_pages', {
											required: 'Annual pages is required',
										})}
									/>
									{errors.annual_pages && (
										<span className="text-error text-sm">
											{errors.annual_pages.message}
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
									{loading ? 'Saving...' : 'Create Plan'}
								</button>

							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePlan