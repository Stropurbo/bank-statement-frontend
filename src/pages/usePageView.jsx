import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

function usePageView() {
	const location = useLocation()
	useEffect(() => {
		if (window.gtag) {
			window.gtag('config', 'G-DW2XH02R1V', {
				page_path: location.pathname,
			})
		}
	}, [location])
}


export default usePageView
