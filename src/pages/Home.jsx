import React from 'react'
import { Toaster } from 'react-hot-toast'
import PdfToExcel from '../pdf_to_excel/PdToExcel'


function Home() {
	return (
		<div>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<main>
				<PdfToExcel />
			</main>
		</div>
	)
}

export default Home
