import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ResetPassword from '../pages/ResetPassword'

const PasswordResetHandler = ({ children }) => {
	const location = useLocation()
	const navigate = useNavigate()

	console.log('PasswordResetHandler - Current pathname:', location.pathname)
	console.log('PasswordResetHandler - Contains password reset?', location.pathname.includes('/password/reset/confirm/'))

	// Check if current path is a password reset URL
	if (location.pathname.includes('/password/reset/confirm/')) {
		console.log('PasswordResetHandler - Showing ResetPassword component')
		return <ResetPassword />
	}

	console.log('PasswordResetHandler - Showing children')
	return children
}

export default PasswordResetHandler