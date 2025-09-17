import React from 'react'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router'
import ActivateAccount from '../components/Registration/ActivateAccount'
import Pricing from '../pages/Pricing'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

function AppRoutes() {
	return (
		<div className="overflow-hidden">
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<Home />}
					/>

					<Route
						path="pricing"
						element={<Pricing />}
					/>

					<Route
						path="contact"
						element={<Contact />}
					/>

					<Route
						path="login"
						element={<Login />}
					/>

					<Route
						path="register"
						element={<Register />}
					/>

					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="activate/:uid/:token"
						element={<ActivateAccount />}
					/>

					{/* <Route
						path="payment/subscription/success/"
						element={<PaymentSuccess />}
					/> */}

				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
