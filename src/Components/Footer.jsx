import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-orange-900 text-white py-8 ">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">AAKHRI PIZZA</h2>
            <p className="text-sm">
              Aakhri Pizza is your go-to destination for the most delicious and
              authentic pizzas. We serve happiness, one slice at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-x-0 gap-y-2">
              <div>
                <NavLink to="/" className="block font-medium hover:underline">
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink to="/menu" className="block font-medium hover:underline">
                  Menu
                </NavLink>
              </div>
              <div>
                <NavLink to="/about-us" className="block font-medium hover:underline">
                  About Us
                </NavLink>
              </div>
              <div>
                <NavLink to="/order-online" className="block font-medium hover:underline">
                  Order Online
                </NavLink>
              </div>
              <div>
                <NavLink to="/profile" className="block font-medium hover:underline">
                  Profile
                </NavLink>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-sm">Email: contact@aakhripizza.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
            <p className="text-sm">Address: 123 Pizza Street, Food City</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          © 2025 Aakhri Pizza. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
