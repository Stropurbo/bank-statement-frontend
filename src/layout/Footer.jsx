import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
		<footer className="footer sm:footer-horizontal bg-white text-black p-10">
			<nav>
				<h6 className="footer-title">Services</h6>
				<a className="link link-hover">Branding</a>
				<a className="link link-hover">Design</a>
				<a className="link link-hover">Marketing</a>
				<a className="link link-hover">Advertisement</a>
			</nav>
			<nav>
				<h6 className="footer-title">Company</h6>
				<a
					href="about"
					className="link link-hover"
				>
					About us
				</a>
				<a
					href='contact'
					className="link link-hover"
				>
					Contact
				</a>
				<a className="link link-hover">Earn</a>
				<a className="link link-hover">Blog</a>
			</nav>
			<nav>
				<h6 className="footer-title">Legal</h6>
				<a
					href="terms-of-service"
					className="link link-hover"
				>
					Terms of Service
				</a>
				<a
					href="privacy-policy"
					className="link link-hover"
				>
					Privacy policy
				</a>
				{/* <a className="link link-hover">Cookie policy</a> */}
			</nav>
		</footer>
  )
}

export default Footer
