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
import DataDeletion from '../pages/DataDeletion'
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
import MailMarketing from '../pages/MailMarketing'
import UserStatements from '../pages/UserStatements'
import BrowseTools from '../pages/BrowseTools'
import DynamicToolPage from '../pages/DynamicToolPage'
import InvoiceGenerator from '../pages/InvoiceGenerator'
import AutoPost from '../pages/AutoPost'
import AutoPostDashboard from '../pages/AutoPostDashboard'
import AutoPostCreate from '../pages/AutoPostCreate'
import AutoPostAccounts from '../pages/AutoPostAccounts'
import PdfToExcel from '../pdf_to_excel/PdToExcel'

const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/pdf-to-excel', element: <PdfToExcel /> },
	{ path: '/pricing', element: <Pricing /> },
	{ path: '/autopost', element: <AutoPost /> },
	{ path: '/tools', element: <BrowseTools /> },
	{ path: '/invoice-generator', element: <InvoiceGenerator /> },
	{ path: '/:toolType', element: <DynamicToolPage /> }, // Dynamic route for all tools
	{ path: '/contact', element: <Contact /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/forgot-password', element: <ForgotPassword /> },
	{ path: '/terms-of-service', element: <Terms /> },
	{ path: '/privacy-policy', element: <Privacy /> },
	{ path: '/data-deletion', element: <DataDeletion /> },
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
	{ path: '/auth/activate/:uid/:token', element: <ActivateAccount /> },
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
					path="/user-dashboard"
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route
						index
						element={<UserStatements />}
					/>
				</Route>

				{/* AutoPost Routes */}
				<Route
					path="/autopost/dashboard"
					element={
						<PrivateRoute>
							<AutoPostDashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path="/autopost/create"
					element={
						<PrivateRoute>
							<AutoPostCreate />
						</PrivateRoute>
					}
				/>
				<Route
					path="/autopost/accounts"
					element={
						<PrivateRoute>
							<AutoPostAccounts />
						</PrivateRoute>
					}
				/>

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
					<Route
						path="mail-marketing"
						element={<MailMarketing />}
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
