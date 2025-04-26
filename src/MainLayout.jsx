import React from 'react';
import OurLocations from './OurLocations';

export default function MainLayout() {
  return (
    <>
      <div className="min-h-[70vh] bg-cover bg-center flex flex-col justify-center items-start px-4 sm:px-8" style={{
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/03/21/02/26/pizza-4952508_1280.jpg)'
      }}>
        <div>
          <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold text-left">Welcome to Aakhri Pizza</h1>
          <p className="text-base text-white sm:text-lg lg:text-xl mt-2 text-left">The best pizza experience awaits you!</p>
        </div>
      </div>
      <div className="specialties-section w-full max-w-7xl justify-around m-auto px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl text-orange-900 font-bold text-center mb-6">Our Specialties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-evenly">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative group" style={{ aspectRatio: '1' }}>
              <img 
                src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg" 
                alt={`Pizza ${index + 1}`} 
                className="h-full w-full aspect-square rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105 mx-8 my-4"
              />
            </div>
          ))}
        </div>
      </div>
      <OurLocations  />
    </>
  );
}