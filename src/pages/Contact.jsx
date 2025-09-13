import React, { useState } from 'react'
import AboveFooter from '../components/Home/AboveFooter'
import ApiClient from '../services/api-client'

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setSuccess('')
		setError('')

		try {
			const response = await ApiClient.post('/contact', formData)
            console.log(response);
			setSuccess('Thank you! Your message has been sent.')
			setFormData({ name: '', email: '', message: '' })
		} catch (err) {
			setError('Oops! Something went wrong. Please try again later.')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section
			id="contact"
			className="bg-gradient-to-b from-purple-300 to-purple-100"
		>
			<div className="container mx-auto px-4 pt-20">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
					<p className="text-xl text-gray-600 mb-4">
						Have questions or feedback? We'd love to hear from you.
					</p>
				</div>

				<div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
					{success && <p className="text-green-600 font-semibold mb-4">{success}</p>}
					{error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							/>
						</div>

						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							/>
						</div>

						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								Message
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								rows="5"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
							></textarea>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
						>
							{loading ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				</div>
			</div>

			<AboveFooter />
		</section>
	)
}

export default Contact
