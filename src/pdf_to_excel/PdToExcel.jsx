import React from 'react'
import HeroSection from './HeroSection'
import Features from './Features'
import PriceSection from './PriceSection'
import Faq from './Faq'
import AboveFooter from './AboveFooter'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function PdToExcel() {
	const [featuresRef, featuresVisible] = useScrollAnimation(0.1)
	const [priceRef, priceVisible] = useScrollAnimation(0.1)
	const [faqRef, faqVisible] = useScrollAnimation(0.1)
	const [footerRef, footerVisible] = useScrollAnimation(0.1)

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
