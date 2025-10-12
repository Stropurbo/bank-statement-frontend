import React from 'react'
import { Toaster } from 'react-hot-toast'

import LandingPage from './LandingPage'


function Home() {
	return (
		<div>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<main>
				<LandingPage />
			</main>
		</div>
	)
}

export default Home
