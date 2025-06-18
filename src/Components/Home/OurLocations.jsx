import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function OurLocations() {
  const locations = [
    { city: "Jaipur", count: 5 },
    { city: "Mumbai", count: 5 },
    { city: "Hyderabad", count: 4 },
    { city: "chandigarh", count: 2 },
    { city: "Lukhnow", count: 3 },
    { city: "Delhi", count: 5 },
  ];

  return (
    <div className="bg-[#fde1d31a] py-12 px-4 sm:px-8 mx-auto max-w-7xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-900">Our Locations</h2>
        <p className="text-orange-900 mt-2">Find us in these amazing cities!</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {locations.map((location, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:scale-105 w-full max-w-xs m-4"
          >
            <div className="w-10 h-10 bg-[#fde1d3] rounded-full flex items-center justify-center mb-3">
              <FaMapMarkerAlt className="text-orange-900 text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{location.city}</h3>
            <p className="text-sm text-gray-500">{location.count} locations</p>
          </div>
        ))}
      </div>
    </div>
  );
}
