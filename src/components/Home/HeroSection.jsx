import { Upload } from 'lucide-react'
import React from 'react'
import { FcDocument } from 'react-icons/fc'
import { GrDocument } from 'react-icons/gr'
import Features from './Features'

function HeroSection() {
	return (
		<section className="py-20 bg-gradient-subtle">
			<div className="container mx-auto px-4 text-center">
				<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
					From Bank Statement
					<br />
					<span className="bg-purple-500 bg-clip-text text-transparent">
						To Excel in Seconds
					</span>
				</h1>
				<p className="text-xl text-black text-muted-foreground mb-12 max-w-3xl mx-auto">
					Upload your bank statement and get a clean, editable Excel file — fast,
					secure, and stress-free.
				</p>

				<div className="max-w-2xl mx-auto mb-16">
					<div className="bg-card border-2 border-dashed border-border border-purple-300 rounded-2xl p-12 hover:border-purple-600 transition-colors duration-300 shadow-card">
						<div className="flex flex-col items-center gap-6">
							<img
								src="https://i.ibb.co.com/JhqQbrM/image.png"
								alt="Document converter"
								className="w-28 h-24 "
							/>

							<div>
								<h3 className="text-2xl font-semibold text-foreground mb-2">
									Upload your PDF bank statement
								</h3>
								<p className="text-muted-foreground">
									Drag & drop or click to select a file
								</p>
							</div>
							<button className="group btn bg-purple-600 rounded-md hover:bg-purple-700 text-white">
								<Upload className="group-hover:scale-110 transition-transform" />
								Select PDF File
							</button>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

export default HeroSection
