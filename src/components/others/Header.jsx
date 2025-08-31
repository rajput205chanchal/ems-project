import React, { useState } from "react";
import { FiUser, FiBarChart, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
  };

  const isAdmin = !props.data; // If no data prop, it's admin

  return (
    <header className="bg-gradient-to-r from-blue-400 to-purple-400 shadow-xl rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center">
        {/* Logo and Welcome */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Hello, <span className="text-yellow-300">
                {props.data?.firstname || "Admin"} 👋
              </span>
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              {isAdmin ? "🛠️ Administrator Dashboard" : "💼 Employee Dashboard"}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-3">
            {isAdmin && (
              <>
                <button
                  onClick={() => props.onNavigate?.('analytics')}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <FiBarChart size={18} />
                  <span className="text-sm">Analytics</span>
                </button>
                <button
                  onClick={() => props.onNavigate?.('employees')}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <FiUser size={18} />
                  <span className="text-sm">Employees</span>
                </button>
              </>
            )}

            {!isAdmin && (
              <button
                onClick={() => props.onNavigate?.('profile')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <FiUser size={18} />
                <span className="text-sm">Profile</span>
              </button>
            )}
          </nav>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {(props.data?.firstname || "A").charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-white font-semibold text-sm">
                  {props.data?.firstname || "Administrator"}
                </p>
                <p className="text-blue-100 text-xs">
                  {props.data?.email || "admin@example.com"}
                </p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                  <p className="font-bold text-white">
                    {props.data?.firstname || "Administrator"}
                  </p>
                  <p className="text-blue-100 text-sm">
                    {props.data?.email || "admin@example.com"}
                  </p>
                </div>

                <div className="p-2">
                  {!isAdmin && (
                    <button
                      onClick={() => {
                        props.onNavigate?.('profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-left transition-colors"
                    >
                      <FiUser size={16} className="text-blue-500" />
                      <span className="text-gray-700 font-medium">Profile</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      props.onNavigate?.('settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 text-left transition-colors"
                  >
                    <FiSettings size={16} className="text-purple-500" />
                    <span className="text-gray-700 font-medium">Settings</span>
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <button
                    onClick={() => {
                      logOutUser();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 text-left transition-colors"
                  >
                    <FiLogOut size={16} />
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={logOutUser}
            className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors shadow-lg"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-6 pt-6 border-t border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              {props.data?.firstname || "Administrator"}
            </h2>
            <p className="text-blue-100 text-lg">
              {isAdmin ? "🛠️ Administrator Dashboard" : "💼 Employee Dashboard"}
            </p>
          </div>

          <nav className="space-y-3">
            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    props.onNavigate?.('analytics');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-left transition-colors shadow-lg"
                >
                  <FiBarChart size={20} />
                  <span className="text-lg">📊 Analytics</span>
                </button>
                <button
                  onClick={() => {
                    props.onNavigate?.('employees');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-left transition-colors shadow-lg"
                >
                  <FiUser size={20} />
                  <span className="text-lg">👥 Employees</span>
                </button>
              </>
            )}

            {!isAdmin && (
              <button
                onClick={() => {
                  props.onNavigate?.('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold text-left transition-colors shadow-lg"
              >
                <FiUser size={20} />
                <span className="text-lg">Profile</span>
              </button>
            )}

            <button
              onClick={() => {
                props.onNavigate?.('settings');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-left transition-colors shadow-lg"
            >
              <FiSettings size={20} />
              <span className="text-lg">⚙️ Settings</span>
            </button>
          </nav>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showProfileMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;

