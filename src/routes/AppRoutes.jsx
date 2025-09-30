import React from 'react'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
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
import AdminStatements from '../pages/AdminStatements'
import DashboardLayout from '../layout/DashboardLayout'
import PrivateRoute from './PrivateRoute'
import UserList from '../pages/UserList'
import AddPlan from '../pages/AddPlan'
import CreatePlan from '../pages/CreatePlan'
import AllPlan from '../pages/AllPlan'
import Affiliate from '../pages/Affiliate'
import usePageView from '../pages/usePageView'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import { Routes, Route } from 'react-router'
import PremiumUsers from '../pages/PremiumUsers'

const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/pricing', element: <Pricing /> },
	{ path: '/contact', element: <Contact /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/forgot-password', element: <ForgotPassword /> },
	{ path: '/terms-of-service', element: <Terms /> },
	{ path: '/privacy-policy', element: <Privacy /> },
	{ path: '/about', element: <About /> },
	{ path: '/payment/success', element: <PaymentSuccess /> },
	{ path: '/payment/cancel', element: <PaymentCancel /> },
	{ path: '/payment/fail', element: <PaymentFail /> },
	{ path: '/affiliate', element: <Affiliate /> },
]

const allRoutes = [
	...publicRoutes,
	{ path: '/profile', element: <Profile /> },
	{ path: '/subscription/status', element: <PaymentStatus /> },
	{ path: '/activate/:uid/:token', element: <ActivateAccount /> },
]

function AppRoutes() {
	usePageView()

	return (
		<div className="overflow-hidden">
			<Routes>
				<Route element={<MainLayout />}>
					{allRoutes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Route>

				{/* private routes */}
				<Route
					path="dashboard/*"
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
					<Route
						path="admin/statements"
						element={<AdminStatements />}
					/>
					<Route
						path="add-plan"
						element={<AddPlan />}
					/>
					<Route
						path="create-plan"
						element={<CreatePlan />}
					/>
					<Route
						path="plans"
						element={<AllPlan />}
					/>
					<Route
						path="subscriber"
						element={<PremiumUsers />}
					/>
				</Route>

				<Route
					path="/password/reset/confirm/:uid/:token"
					element={<ResetPassword />}
				/>
			</Routes>
		</div>
	)
}

export default AppRoutes
