import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import Features from './Features'
import PriceSection from './PriceSection'
import Faq from './Faq'
import AboveFooter from './AboveFooter'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { setMeta } from '../utils/setMeta'

function PdToExcel() {
	const [featuresRef, featuresVisible] = useScrollAnimation(0.1)
	const [priceRef, priceVisible] = useScrollAnimation(0.1)
	const [faqRef, faqVisible] = useScrollAnimation(0.1)
	const [footerRef, footerVisible] = useScrollAnimation(0.1)

	useEffect(() => {
		setMeta({
			title: 'Convert PDF Bank Statements to Excel Online - Free & Secure | SheetlyPro',
			description: 'Transform PDF bank statements into Excel spreadsheets instantly. AI-powered converter with 99% accuracy. Support for 1000+ banks. Fast, secure, and easy to use.',
			keywords: 'pdf to excel, bank statement converter, pdf to csv, convert bank statement, pdf converter online, bank statement to excel, financial document converter',
			ogTitle: 'PDF Bank Statement to Excel Converter - SheetlyPro',
			ogDescription: 'Convert PDF bank statements to Excel format in seconds. AI-powered accuracy, bank-grade security, and support for all major banks worldwide.',
		})
	}, [])
	

	return (
		<div>
			<HeroSection />
			<div
				ref={featuresRef}
				className={`transition-all duration-1000 ${
					featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
				}`}
			>
				<Features />
			</div>
			<div
				ref={priceRef}
				className={`transition-all duration-1000 ${
					priceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
				}`}
			>
				<PriceSection />
			</div>
			<div
				ref={faqRef}
				className={`transition-all duration-1000 ${
					faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
				}`}
			>
				<Faq />
			</div>
			<div
				ref={footerRef}
				className={`transition-all duration-1000 ${
					footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
				}`}
			>
				<AboveFooter />
			</div>
		</div>
	)
}

export default PdToExcel
