import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../Cart.jsx"; // Import the useCart hook

export default function Header({
  onSearch,
  onLoginClick,
  isLoggedIn,
  userName,
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Use the cart context to get cart functions and state
  const { toggleCart, getCartCount, cartItems } = useCart();
  const cartCount = getCartCount();

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle Profile click to trigger login/logout function
  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    if (onLoginClick) {
      onLoginClick();
      setMobileMenuOpen(false); // Close mobile menu when clicking login/logout
    }
  };

  // Handle cart icon click
  const handleCartClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    toggleCart(); // Open/close the cart using the cart context
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-orange-100 to-orange-300 shadow-lg z-40">
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
                  {userName ? userName.split("@")[0] : "Profile"}
                </span>
              ) : (
                "Login"
              )}
            </a>

            {/* Cart button with count badge */}
            <a
              href="#"
              onClick={handleCartClick}
              className="relative flex items-center text-orange-900 font-medium hover:underline pl-1"
            >
              <FaShoppingCart className="text-orange-900 text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
          </nav>
          {/* Mobile Menu Button */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-900 focus:outline-none hover:text-orange-700 text-2xl p-2"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>

            {/* Cart count badge on menu icon (only on small screens) */}
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-3 bg-white shadow-lg p-2 w-40 sm:w-48 rounded-md z-30">
            <NavLink
              to="/"
              onClick={handleMenuItemClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              onClick={handleMenuItemClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              Menu
            </NavLink>
            <NavLink
              to="/about-us"
              onClick={handleMenuItemClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded"
            >
              About
            </NavLink>
            <NavLink
              to="/order-online"
              onClick={handleMenuItemClick}
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
                  {userName ? userName.split("@")[0] : "Profile"} (Logout)
                </span>
              ) : (
                "Login"
              )}
            </a>

            {/* Cart link in mobile menu */}
            <a
              href="#"
              onClick={handleCartClick}
              className="block text-orange-900 font-medium hover:bg-orange-100 p-2.5 rounded cursor-pointer flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
