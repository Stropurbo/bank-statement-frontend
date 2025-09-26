import {
	FiBarChart2,
	FiMenu,
	FiPackage,
	FiPlusCircle,
	FiShoppingBag,
	FiShoppingCart,
	FiStar,
	FiTag,
	FiUsers,
	FiX,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { BiLogOut } from 'react-icons/bi'
import { Banknote, Newspaper, Podcast } from 'lucide-react'
import { BsPeople } from 'react-icons/bs'
import useAuthContext from '../hooks/useAuthContext'
import { useState } from 'react'

const Sidebar = () => {
	const { user, logoutUser: userLogout } = useAuthContext()
	const navigate = useNavigate()
	const [isCollapsed, setIsCollapsed] = useState(false)

	const logoutUser = () => {
		userLogout()
		navigate('/')
	}

	const customerMenu = [
		{ to: '/user-dashboard', icon: FiBarChart2, label: 'Dashboard' },

	]

	const adminMenu = [
		{
			to: '/dashboard',
			icon: FiBarChart2,
			label: 'Dashboard',
			hover: 'group-hover:text-red-500',
		},
		{ to: '/dashboard/add-plan', icon: FiPlusCircle, label: 'Add Plan' },
		{ to: '/dashboard/admin/users', icon: FiUsers, label: 'Users' },
		{ to: '/dashboard/create-plan', icon: Podcast, label: 'Create Plan' },
		{ to: '/dashboard/plans', icon: Newspaper, label: 'Plan' },
		{ to: '/dashboard/subscriber', icon: BsPeople, label: 'Premium User' },
		
	]

	const menuItems = user.is_staff ? adminMenu : customerMenu

	return (
		<div className="drawer-side min-h-screen z-10 bg-white shadow-sm">
			<label
				htmlFor="drawer-toggle"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<aside className={`menu bg-white ${isCollapsed ? 'w-16' : 'w-50'} p-4 text-base-content h-screen transition-all duration-300`}>
				<div className="flex items-center justify-between mb-6 px-2">
					{!isCollapsed && (
						<Link
							to="/"
							className="text-xl font-bold p-2"
						>
							SheetlyPro
						</Link>
					)}
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="p-2 hover:bg-gray-100 rounded-md transition-colors"
					>
						{isCollapsed ? <FiMenu className="h-5 w-5" /> : <FiX className="h-5 w-5" />}
					</button>
				</div>

				<ul className="menu menu-md gap-2">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link
								to={item.to}
								className="group flex items-center gap-2 p-2 rounded-md transition-all duration-300 hover:bg-white hover:shadow-md hover:font-bold  hover:transition-y-6 "
								title={isCollapsed ? item.label : ''}
							>
								<item.icon
									className={`h-4 w-4 text-black transition-colors duration-300 group-hover:text-indigo-600 ${
										item.hover || ''
									}`}
								/>
								{!isCollapsed && <span>{item.label}</span>}
							</Link>
						</li>
					))}
				</ul>

				<div className="mt-auto text-xs text-base-content">
					<div className="flex gap-3 text-xl text-black items-center h-4 ">
						<BiLogOut className="h-4 w-4 flex items-center" />
						<a
							onClick={logoutUser}
							className="cursor-pointer"
							title={isCollapsed ? 'Logout' : ''}
						>
							{!isCollapsed && <span>Logout</span>}
						</a>
					</div>
					{!isCollapsed && <p className="ml-2 pt-3"> © 2025 SheetlyPro</p>}
				</div>
			</aside>
		</div>
	)
}

export default Sidebar
