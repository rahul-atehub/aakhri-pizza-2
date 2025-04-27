import React from 'react';

export default function Specialities() {
  return (
    <section className="container mx-auto mb-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Specialties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="pizza-card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
          >
            <img
              src={`https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&random=${index}`}
              alt={`Pizza ${index + 1}`}
              className="w-full h-48 sm:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}