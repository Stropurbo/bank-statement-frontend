import React from 'react'
import { ArrowRight, FileText, Download } from 'lucide-react'

function AboveFooter() {
	return (
		<section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 px-6 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="absolute inset-0 opacity-30">
				<div className="w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
			</div>

			<div className="relative container mx-auto text-center">
				<div className="max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8">
						<FileText className="h-4 w-4" />
						PDF to Excel Conversion
					</div>

					<h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
						Transform Your Bank Statements
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
							In Seconds
						</span>
					</h2>

					<p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
						Stop wasting hours on manual data entry. Our AI-powered tool instantly converts
						your PDF bank statements into organized Excel files with 99.9% accuracy.
					</p>

					{/* Features */}
					<div className="grid md:grid-cols-3 gap-6 mb-12">
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
								<FileText className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">Upload PDF</h3>
							<p className="text-white/70 text-sm">Drag & drop your bank statement</p>
						</div>
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
								<ArrowRight className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">AI Processing</h3>
							<p className="text-white/70 text-sm">Automatic data extraction</p>
						</div>
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
								<Download className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">Download Excel</h3>
							<p className="text-white/70 text-sm">Get your organized data</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<a
							href="/pricing"
							className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 shadow-2xl"
						>
							Start Converting Now
							<ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
						</a>
						<div className="text-white/80 text-sm">
							<span className="font-semibold">Starter Plan available</span> • Try Before You Buy.
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboveFooter
