import { useState } from "react";

export default function Navbar({ onMenuClick, onProfileClick }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
<nav className="fixed top-0 left-0 lg:sticky z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
  <div className="h-16 flex items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Left Section - Menu Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100/80 hover:text-blue-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
            title="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
           
            <h2 className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h2>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4">
          
          {/* Optional: Notification Icon Placeholder */}
          <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`group flex items-center gap-3 p-1.5 pl-3 rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 ${showProfileMenu ? 'bg-gray-50 border-gray-200' : ''}`}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Admin User</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
                  A
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <svg 
                className={`hidden md:block w-4 h-4 text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180 text-blue-500' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black/5 z-40 transform transition-all duration-200 origin-top-right">
                  
                  {/* Dropdown Header */}
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500 font-medium">admin@bloghub.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dropdown Items */}
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onProfileClick();
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl flex items-center gap-3 transition-colors group"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </button>

                    <button
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl flex items-center gap-3 transition-colors group"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Account Settings
                    </button>
                  </div>

                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to logout?')) {
                          window.location.href = '/login';
                        }
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors group"
                    >
                      <svg className="w-5 h-5 text-red-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}