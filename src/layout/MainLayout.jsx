import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from '../components/CookieConsent'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative'>
        {/* Premium Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className='relative z-10 flex flex-col min-h-screen'>
            <Navbar />

            <main className='flex-grow'>
                <Outlet />
            </main>

            <Footer />
            <CookieConsent />
        </div>
    </div>
  )
}

export default MainLayout
