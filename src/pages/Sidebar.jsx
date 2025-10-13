import {
	FiBarChart2,
	FiMenu,
	FiPlusCircle,
	FiUsers,
	FiX,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { BiLogOut } from 'react-icons/bi'
import { Newspaper, Podcast, Mail, Coins } from 'lucide-react'
import { BsPeople } from 'react-icons/bs'
import useAuthContext from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'

const Sidebar = () => {
	const { user, logoutUser: userLogout } = useAuthContext()
	const navigate = useNavigate()
	const [isCollapsed, setIsCollapsed] = useState(false)

	useEffect(() => {
		document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '64px' : '256px')
	}, [isCollapsed])

	const logoutUser = async () => {
		await userLogout()
		navigate('/')
	}

	const customerMenu = [
		{ to: '/user-dashboard', icon: FiBarChart2, label: 'Dashboard' },

	]

	const adminMenu = [
		{ to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
		{ to: '/dashboard/add-plan', icon: FiPlusCircle, label: 'Add Plan' },
		{ to: '/dashboard/admin/users', icon: FiUsers, label: 'Users' },
		{ to: '/dashboard/create-plan', icon: Podcast, label: 'Create Plan' },
		{ to: '/dashboard/plans', icon: Newspaper, label: 'Plans' },
		{ to: '/dashboard/subscriber', icon: BsPeople, label: 'Premium Users' },
		{ to: '/dashboard/admin/statements', icon: BsPeople, label: 'ALl Statement' },
		{ to: '/dashboard/mail-marketing', icon: Mail, label: 'Mail Marketing' },
	]

	const menuItems = user.is_staff ? adminMenu : customerMenu

	return (
		<div className="drawer-side min-h-screen z-50 bg-slate-50 border-r border-slate-200">
			<label
				htmlFor="drawer-toggle"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<aside
				className={`bg-slate-50 ${isCollapsed ? 'w-16' : 'w-64'} h-screen transition-all duration-300 flex flex-col fixed z-50`}
				style={{'--sidebar-width': isCollapsed ? '64px' : '256px'}}
				onTransitionEnd={() => {
					document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '64px' : '256px')
				}}
			>
				<div className="flex items-center justify-between p-4 border-b border-slate-200">
					{!isCollapsed && (
						<Link
							to="/"
							className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
						>
							SheetlyPro
						</Link>
					)}
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"
					>
						{isCollapsed ? <FiMenu className="h-5 w-5" /> : <FiX className="h-5 w-5" />}
					</button>
				</div>

				<nav className="flex-1 p-4">
					<ul className="space-y-2">
						{menuItems.map((item, index) => (
							<li key={index}>
								<Link
									to={item.to}
									className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all duration-200 font-medium"
									title={isCollapsed ? item.label : ''}
								>
									<item.icon className="h-5 w-5 transition-colors duration-200" />
									{!isCollapsed && <span className="text-sm">{item.label}</span>}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="border-t border-slate-200 p-4 mt-auto">
					<button
						onClick={logoutUser}
						className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium w-full"
						title={isCollapsed ? 'Logout' : ''}
					>
						<BiLogOut className="h-5 w-5 transition-colors duration-200" />
						{!isCollapsed && <span className="text-sm">Logout</span>}
					</button>
					{!isCollapsed && (
						<p className="text-xs text-slate-500 mt-4 px-3">© 2025 SheetlyPro</p>
					)}
				</div>
			</aside>
		</div>
	)
}

export default Sidebar
