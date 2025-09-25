import React from 'react'
import { Toaster } from 'react-hot-toast'
import HeroSection from '../components/Home/HeroSection'
import Features from '../components/Home/Features'
import PriceSection from '../components/Home/PriceSection'
import Faq from '../components/Home/Faq'
import AboveFooter from '../components/Home/AboveFooter'

function Home() {
	return (
		<div>
			<title>SheetlyPro - PDF to Excel/CSV Converter</title>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<HeroSection />
			<Features />
			<PriceSection />
			<Faq />
			<AboveFooter />
		</div>
	)
}

export default Home
