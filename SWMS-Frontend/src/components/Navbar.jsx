"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Settings, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileOpen(false);
    };
    if (isProfileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isProfileOpen]);

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/features", label: "Features" },
    { path: "/learn", label: "Learn" },
    { path: "/shop", label: "Shop" },
    { path: "/sell-trash", label: "Sell Trash" },
    { path: "/nearby", label: "Nearby" },
    { path: "/waste-diary", label: "Waste Diary" },
    { path: "/waste-classifier", label: "Classify" },
    { path: "/eco-calendar", label: "Eco Calendar" },
    { path: "/quiz", label: "Quiz" },
    { path: "/chatbot", label: "Chatbot" },
  ];

  const profileImageSrc =
    isAuthenticated && user?.profileImage
      ? user.profileImage
      : "/images/guest-user.webp";

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/90 border-white/10 shadow-lg shadow-lime-400/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          SWMS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 items-center overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-lime-400 whitespace-nowrap ${
                location.pathname === link.path
                  ? "text-lime-400"
                  : "text-gray-300"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-emerald-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          {/* Admin Link */}
          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className={`relative px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-lime-400 whitespace-nowrap ${
                location.pathname === "/admin-dashboard"
                  ? "text-lime-400"
                  : "text-gray-300"
              }`}
            >
              <Shield className="w-4 h-4 inline mr-1" />
              Admin
              {location.pathname === "/admin-dashboard" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-emerald-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          )}
        </nav>

        {/* Desktop Profile Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="relative group p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <img
                  src={profileImageSrc}
                  alt={user?.name || "User Profile"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover:border-lime-400 transition-all"
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-neutral-900"></span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-lime-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-lime-400 to-emerald-500 text-neutral-900 rounded-lg hover:shadow-lg hover:shadow-lime-400/25 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50 z-50"
          aria-label="Open Menu"
        >
          <div className="space-y-1.5 relative">
            <span className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-gray-300 ml-auto transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 w-6 ml-0' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-[9998] lg:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-neutral-900/98 backdrop-blur-lg z-[9999] shadow-xl flex flex-col border-l border-white/10 lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg sm:text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent"
                >
                  SWMS
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50"
                  aria-label="Close Menu"
                >
                  <X size={20} className="text-gray-300 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <nav className="flex flex-col gap-1 sm:gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? "bg-lime-400/10 text-lime-400"
                          : "text-gray-300 hover:bg-white/10 active:bg-white/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated && user?.role === "admin" && (
                    <>
                      <div className="my-3 sm:my-4 border-t border-white/10"></div>
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                          location.pathname === "/admin-dashboard"
                            ? "bg-lime-400/10 text-lime-400"
                            : "text-gray-300 hover:bg-white/10 active:bg-white/20"
                        }`}
                      >
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                        Admin Dashboard
                      </Link>
                    </>
                  )}
                </nav>
              </div>

              {/* Footer with Profile */}
              <div className="p-4 sm:p-6 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-2 sm:space-y-3">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium text-gray-300 hover:bg-white/10 active:bg-white/20 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={profileImageSrc}
                          alt={user?.name || "User Profile"}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-lime-400/50"
                        />
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-lime-400 rounded-full border-2 border-neutral-900"></span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-white">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-400">View Profile</p>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-red-400 hover:bg-red-500/10 active:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-center text-sm sm:text-base bg-white/10 text-white rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-center text-sm sm:text-base bg-gradient-to-r from-lime-400 to-emerald-500 text-neutral-900 font-medium rounded-lg hover:shadow-lg hover:shadow-lime-400/25 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
