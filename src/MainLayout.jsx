import React from 'react';

export default function MainLayout() {
  return (
    <div className="min-h-[70vh] bg-cover bg-center flex flex-col justify-center items-start px-4 sm:px-8" style={{
      backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/03/21/02/26/pizza-4952508_1280.jpg)'
    }}>
      <div>
        <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold text-left">Welcome to Aakhri Pizza</h1>
        <p className="text-base text-white sm:text-lg lg:text-xl mt-2 text-left">The best pizza experience awaits you!</p>
      </div>
    </div>
  );
}