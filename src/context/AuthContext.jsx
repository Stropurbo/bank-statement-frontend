import React, { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const allcontext = useAuth()
	return <AuthContext.Provider value={allcontext}> {children}</AuthContext.Provider>
}

export default AuthContext
