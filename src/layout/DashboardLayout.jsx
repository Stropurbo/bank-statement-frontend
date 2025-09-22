import React, { useState } from 'react'
import { Outlet } from 'react-router'
import NavbarDashboard from '../pages/NavbarDashboard'
import Sidebar from '../pages/Sidebar'

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<div className="drawer lg:drawer-open bg-gray-100">
			<input
				id="drawer-toggle"
				type="checkbox"
				className="drawer-toggle"
				checked={sidebarOpen}
				onChange={toggleSidebar}
			/>

			<div className="drawer-content flex flex-col">
				<NavbarDashboard sidebarOpen={sidebarOpen} />

				<main className="p-5">
					<Outlet />
				</main>
			</div>

			<Sidebar />
		</div>
	)
}

export default DashboardLayout
