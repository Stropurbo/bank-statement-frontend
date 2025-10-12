import React from 'react'
import { Link } from 'react-router'
import { Mail, Phone, MapPin, X, Share2, Users, Camera } from 'lucide-react'

function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="container mx-auto px-6 py-16">
				<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
					{/* Brand Section */}
					<div className="lg:col-span-1">
						<div className="mb-6">
							<h3 className="text-2xl font-bold text-white mb-4">SheetlyPro</h3>
							<p className="text-gray-400 leading-relaxed">
								Transform your PDF bank statements into Excel files instantly
								with our AI-powered conversion tool.
							</p>
						</div>
						<div className="flex space-x-4">
							<a
								href="https://x.com/Sheetlypro"
								className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
								target="_blank"
							>
								<X className="h-5 w-5" />
							</a>

							<a
								href="https://linkedin.com/company/sheetlypro"
								className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
								target="_blank"
							>
								<svg
									className="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Services */}
					<div>
						<h6 className="text-lg font-semibold text-white mb-6">Services</h6>
						<ul className="space-y-3">
							<li>
								<a
									href="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									PDF to Excel
								</a>
							</li>
							<li>
								<a
									href="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Bank Statement Conversion
								</a>
							</li>
							<li>
								<a
									href="/pricing"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Pricing Plans
								</a>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h6 className="text-lg font-semibold text-white mb-6">Company</h6>
						<ul className="space-y-3">
							<li>
								<a
									href="/about"
									className="text-gray-400 hover:text-white transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="/affiliate"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Affiliate Program
								</a>
							</li>
							<li>
								{/* <a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Careers
								</a> */}
							</li>
						</ul>
					</div>

					{/* Contact & Legal */}
					<div>
						<h6 className="text-lg font-semibold text-white mb-6">Contact Info</h6>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center gap-3 text-gray-400">
								<Mail className="h-4 w-4" />
								<span>contact@sheetlypro.com</span>
							</li>
							{/* <li className="flex items-center gap-3 text-gray-400">
								<Phone className="h-4 w-4" />
								<span>+1 (555) 123-4567</span>
							</li> */}
						</ul>
						<div>
							<ul className="space-y-2">
								<li>
									<a
										href="/terms-of-service"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href="/privacy-policy"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="/data-deletion"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Data Deletion
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="text-gray-400 text-sm mb-4 md:mb-0">
							© 2025 SheetlyPro. All rights reserved.
						</div>
						<div className="flex items-center gap-6 text-sm text-gray-400">
							<span>Made with ❤️ for better productivity</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
