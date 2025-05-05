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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              <h1 className="text-2xl sm:text-3xl text-orange-900 font-bold flex items-center">
                AAKHRI PIZZA
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <SearchBar
              onSearch={onSearch}
              className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] flex items-center"
              showPlaceholder={!isMobileView}
            />
          </div>

          <div className="hidden md:flex items-center space-x-4 sm:space-x-8 ml-2 md:ml-6 lg:ml-10">
            <NavLink
              to="/"
              className="hover:underline text-orange-900 font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="hover:underline text-orange-900 font-medium"
            >
              About Us
            </NavLink>
            <NavLink
              to="/menu"
              className="hover:underline text-orange-900 font-medium"
            >
              Menu
            </NavLink>
            <NavLink
              to="/order-online"
              className="hover:underline text-orange-900 font-medium"
            >
              Order Online
            </NavLink>
            
            {/* Profile/Login link with dynamic text based on authentication status */}
            <a
              href="#"
              onClick={handleProfileClick}
              className="hover:underline text-orange-900 font-medium cursor-pointer flex items-center"
            >
              <FaUser className="mr-1" />
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
              className="flex items-center space-x-2 text-orange-900 font-medium hover:underline"
            >
              <FaShoppingCart className="text-orange-900 text-base" />
              {/* <span className="text-sm sm:text-base">Cart</span> */}
            </NavLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-900 focus:outline-none hover:text-orange-700 text-2xl"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg p-2 space-y-2 w-40 sm:w-48 rounded-md">
            <NavLink
              to="/"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2 rounded"
            >
              Menu
            </NavLink>
            <NavLink
              to="/about-us"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2 rounded"
            >
              About
            </NavLink>
            <NavLink
              to="/Order Online"
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2 rounded"
            >
              Order Online
            </NavLink>
            
            {/* Profile/Login link in mobile menu */}
            <a
              href="#"
              onClick={handleProfileClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2 rounded cursor-pointer flex items-center"
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