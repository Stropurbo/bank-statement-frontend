import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../services/api-client'

function AddPlan() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')


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
        features: data.features.split('\n').filter(f => f.trim())
      }

      await ApiClient.post('/plans/', planData)
      setSuccess('Plan saved successfully!')
      reset()
    } catch (err) {
      if (err.response?.status === 401) {
        setError('You need admin permissions to create plans')
      } else {
        setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create plan')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
		<div className="max-w-2xl mx-auto p-6">
			<title>Add Plan</title>
			<h1 className="text-3xl font-bold mb-6">User Plan Selection</h1>

			{error && (
				<div className="alert alert-error mb-4">
					<span>{error}</span>
					<button
						className="btn btn-sm btn-circle btn-ghost ml-auto"
						onClick={() => setError('')}
					>
						✕
					</button>
				</div>
			)}

			{success && (
				<div className="alert alert-success mb-4">
					<span>{success}</span>
					<button
						className="btn btn-sm btn-circle btn-ghost ml-auto"
						onClick={() => setSuccess('')}
					>
						✕
					</button>
				</div>
			)}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<div className="form-control">
					<label className="label">Plan Name</label>
					<input
						type="text"
						placeholder="Enter plan name (e.g., Basic, Pro, Premium)"
						className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
						{...register('name', { required: 'Plan name is required' })}
					/>
					{errors.name && (
						<span className="text-error text-sm">{errors.name.message}</span>
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
						{...register('description', { required: 'Description is required' })}
					/>
					{errors.description && (
						<span className="text-error text-sm">{errors.description.message}</span>
					)}
				</div>

				<div className="form-control">
					<label className="label">Features (one per line)</label>
					<textarea
						className={`textarea textarea-bordered h-32 ${
							errors.features ? 'textarea-error' : ''
						}`}
						placeholder="Feature 1\nFeature 2\nFeature 3"
						{...register('features', { required: 'Features are required' })}
					/>
					{errors.features && (
						<span className="text-error text-sm">{errors.features.message}</span>
					)}
				</div>

				<button
					type="submit"
					className="btn btn-primary w-full"
					disabled={loading}
				>
					{loading ? 'Creating...' : 'Create Plan'}
				</button>
			</form>
		</div>
  )
}

export default AddPlan
