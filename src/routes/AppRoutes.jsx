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
import PaymentSuccess from '../pages/PaymentSuccess'
import Terms from '../pages/Terms'
import Privacy from '../pages/Privacy'
import About from '../pages/About'
import PaymentStatus from '../pages/PaymentStatus'
import PaymentFail from '../pages/PaymentFail'
import PaymentCancel from '../pages/PaymentCancel'
import AdminDashboard from '../pages/AdminDashboard'
import DashboardLayout from '../layout/DashboardLayout'
import PrivateRoute from './PrivateRoute'
import UserList from '../pages/UserList'

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
						path="subscription/status"
						element={<PaymentStatus />}
					/>
					<Route
						path="activate/:uid/:token"
						element={<ActivateAccount />}
					/>

					<Route
						path="payment/success"
						element={<PaymentSuccess />}
					/>

					<Route
						path="payment/cancel"
						element={<PaymentCancel />}
					/>

					<Route
						path="payment/fail"
						element={<PaymentFail />}
					/>

					<Route
						path="terms-of-service"
						element={<Terms />}
					/>

					<Route
						path="privacy-policy"
						element={<Privacy />}
					/>

					<Route
						path="about"
						element={<About />}
					/>
				</Route>

				<Route
					path="dashboard"
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route
						index
						element={<AdminDashboard />}
					/>

					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="admin/users"
						element={<UserList />}
					/>
				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
