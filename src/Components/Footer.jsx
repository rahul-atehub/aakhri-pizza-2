import React from "react";

export default function Footer() {
  return (
    <footer className="bg-orange-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* City Names */}
          <div>
            <h2 className="text-lg font-bold mb-4">Our Locations</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>JAIPUR</div>
              <div>MUMBAI</div>
              <div>CHANDIGARH</div>
              <div>BENGALURU</div>
              <div>HYDERABAD</div>
              <div>DELHI</div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm">
              Aakhri Pizza is your go-to destination for the most delicious and authentic pizzas. We serve happiness, one slice at a time.
            </p>
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