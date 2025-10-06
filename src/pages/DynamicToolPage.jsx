import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { toolsConfig } from '../config/toolsConfig'
import UniversalToolPage from './UniversalToolPage'

function DynamicToolPage() {
	const { toolType } = useParams()

	const config = toolsConfig[toolType]

	if (!config) {
		return <Navigate to="/tools" replace />
	}

	return <UniversalToolPage config={config} />
}

export default DynamicToolPage
