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
import AddPlan from '../pages/AddPlan'
import CreatePlan from '../pages/CreatePlan'
import AllPlan from '../pages/AllPlan'

const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/pricing', element: <Pricing /> },
	{ path: '/contact', element: <Contact /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/terms-of-service', element: <Terms /> },
	{ path: '/privacy-policy', element: <Privacy /> },
	{ path: '/about', element: <About /> },
	{ path: '/payment/success', element: <PaymentSuccess /> },
	{ path: '/payment/cancel', element: <PaymentCancel /> },
	{ path: '/payment/fail', element: <PaymentFail /> },
]

const allRoutes = [
	...publicRoutes,
	{ path: '/profile', element: <Profile /> },
	{ path: '/subscription/status', element: <PaymentStatus /> },
	{ path: '/activate/:uid/:token', element: <ActivateAccount /> },
]

function AppRoutes() {
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
				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
