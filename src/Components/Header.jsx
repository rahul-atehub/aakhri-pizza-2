import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              <h1 className="text-3xl text-orange-900 font-bold flex items-center">
                🍕 AAKHRI PIZZA
              </h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex space-x-8">
              <NavLink to="/" className="hover:underline text-orange-900 font-medium">
                Home
              </NavLink>
              <NavLink to="/menu" className="hover:underline text-orange-900 font-medium">
                Menu
              </NavLink>
              <NavLink to="/about" className="hover:underline text-orange-900 font-medium">
                About
              </NavLink>
              <NavLink to="/order online" className="hover:underline text-orange-900 font-medium">
                Order Online
              </NavLink>
              <NavLink to="/Profile" className="hover:underline text-orange-900 font-medium">
                Profile
              </NavLink>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-900 focus:outline-none hover:text-orange-700"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg p-2 space-y-2 w-48">
            <NavLink to="/" className="block text-orange-900 font-medium">
              Home
            </NavLink>
            <NavLink to="/menu" className="block text-orange-900 font-medium">
              Menu
            </NavLink>
            <NavLink to="/about" className="block text-orange-900 font-medium">
              About
            </NavLink>
            <NavLink to="/Order Online" className="block text-orange-900 font-medium">
              Order Online
            </NavLink>
            <NavLink to="/Profile" className="block text-orange-900 font-medium">
              Profile
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
