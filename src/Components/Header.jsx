import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              <h1 className="text-3xl text-orange-900 font-bold flex items-center ">
                🍕 AAKHRI PIZZA
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex space-x-8">
              <NavLink to="/" className=" hover:underline text-orange-900 font-medium">
                Home
              </NavLink>
              <NavLink to="/menu" className="hover:underline text-orange-900 font-medium">
                Menu
              </NavLink>
              <NavLink to="/about" className=" hover:underline text-orange-900 font-medium">
                About
              </NavLink>
              <NavLink to="/contact" className="hover:underline text-orange-900 font-medium">
                Order Online
              </NavLink>
              <NavLink to="/contact" className="hover:underline text-orange-900 font-medium">
                profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
