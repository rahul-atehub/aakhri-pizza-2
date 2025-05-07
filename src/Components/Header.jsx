import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Header({ onSearch, onLoginClick, isLoggedIn, userName }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle Profile click to trigger login/logout function
  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-orange-100 to-orange-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              <h1 className="text-2xl sm:text-3xl text-orange-900 font-bold">
                AAKHRI PIZZA
              </h1>
            </Link>
          </div>

          {/* Search Bar - centered with consistent spacing */}
          <div className="flex-1 mx-4 md:mx-6 lg:mx-8 flex justify-center">
            <SearchBar
              onSearch={onSearch}
              className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[280px] flex items-center"
              showPlaceholder={!isMobileView}
            />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
            <NavLink
              to="/"
              className="hover:underline text-orange-900 font-medium px-1"
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="hover:underline text-orange-900 font-medium px-1"
            >
              About Us
            </NavLink>
            <NavLink
              to="/menu"
              className="hover:underline text-orange-900 font-medium px-1"
            >
              Menu
            </NavLink>
            <NavLink
              to="/order-online"
              className="hover:underline text-orange-900 font-medium px-1"
            >
              Order Online
            </NavLink>
            
            {/* Profile/Login link with dynamic text based on authentication status */}
            <a
              href="#"
              onClick={handleProfileClick}
              className="hover:underline text-orange-900 font-medium cursor-pointer flex items-center px-1"
            >
              <FaUser className="mr-1.5" />
              {isLoggedIn ? (
                <span className="flex items-center">
                  {userName ? userName.split('@')[0] : 'Profile'}
                </span>
              ) : (
                'Login'
              )}
            </a>
            
            <NavLink
              to="/cart"
              className="flex items-center text-orange-900 font-medium hover:underline pl-1"
            >
              <FaShoppingCart className="text-orange-900 text-lg" />
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-900 focus:outline-none hover:text-orange-700 text-2xl p-2"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-3 bg-white shadow-lg p-2 w-40 sm:w-48 rounded-md">
            <NavLink
              to="/"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              Menu
            </NavLink>
            <NavLink
              to="/about-us"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              About
            </NavLink>
            <NavLink
              to="/Order Online"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              Order Online
            </NavLink>
            
            {/* Profile/Login link in mobile menu */}
            <a
              href="#"
              onClick={handleProfileClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded cursor-pointer flex items-center"
            >
              <FaUser className="mr-2" />
              {isLoggedIn ? (
                <span>
                  {userName ? userName.split('@')[0] : 'Profile'} (Logout)
                </span>
              ) : (
                'Login'
              )}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}