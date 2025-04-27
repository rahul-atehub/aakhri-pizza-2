import React from 'react';
import OurLocations from './Components/OurLocations';

export default function MainLayout() {
  const pizzas = [
    "Margherita",
    "Pepperoni",
    "BBQ Chicken",
    "Veggie",
    "Hawaiian",
    "Meat Lovers",
  ];

  return (
    <>
      <div
        className="min-h-[70vh] bg-cover bg-center flex flex-col justify-center items-start px-4 sm:px-8"
        style={{
          backgroundImage:
            'url(https://cdn.pixabay.com/photo/2020/03/21/02/26/pizza-4952508_1280.jpg)',
        }}
      >
        <div>
          <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold text-left">
            Welcome to Aakhri Pizza
          </h1>
          <p className="text-base text-white sm:text-lg lg:text-xl mt-2 text-left">
            The best pizza experience awaits you!
          </p>
        </div>
      </div>
      <div className="specialties-section w-full max-w-7xl justify-around m-auto px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl text-orange-900 font-bold text-center mb-6">
          Our Specialties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-evenly">
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="relative group bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-724842-1566837.jpg&fm=jpg"
                alt={pizza}
                className="w-full h-auto rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 text-center">{pizza}</h3>
            </div>
          ))}
        </div>
      </div>
      <OurLocations />
    </>
  );
}