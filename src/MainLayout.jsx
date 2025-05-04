import React from "react";
import OurLocations from "./Components/Home/OurLocations";
import menuData from "./data/menuData";
import PropTypes from "prop-types";

export default function MainLayout({ searchResults, searchTerm }) {
  // If we have a search term but no results
  const noResultsFound = searchTerm && searchResults.length === 0;

  // Use search results if available, otherwise use the default pizzas list
  const pizzasToDisplay = searchTerm ? searchResults : menuData.slice(0, 6);

  return (
    <>
      <div
        className="min-h-[70vh] bg-cover bg-center flex flex-col justify-center items-start px-4 sm:px-8"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2020/03/21/02/26/pizza-4952508_1280.jpg)",
        }}
      >
        <div>
          <h1 className="text-3xl text-orange-200 sm:text-4xl lg:text-5xl font-bold text-left">
            Welcome to Aakhri Pizza
          </h1>
          <p className="text-base text-orange-200 sm:text-lg lg:text-xl mt-2 text-left">
            The best pizza experience awaits you!
          </p>
        </div>
      </div>
      <div className="specialties-section w-full max-w-7xl justify-around m-auto px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl text-orange-900 font-bold text-center mb-6">
          Our Specialties
        </h2>

        {searchTerm && (
          <div className="mb-6 text-center">
            {noResultsFound ? (
              <p className="text-orange-700">
                No results found for "{searchTerm}"
              </p>
            ) : (
              <p className="text-orange-700">
                Showing results for "{searchTerm}"
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-evenly">
          {pizzasToDisplay.map((pizza, index) => (
            <div
              key={index}
              className="relative group bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transform hover:scale-105 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-auto rounded-md mb-4 transition-all duration-300 group-hover:brightness-105 group-hover:contrast-105"
              />
              <div className="overflow-hidden">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 text-center transition-all duration-300">
                  {pizza.name}
                </h3>
                <p className="text-gray-600 text-sm text-center mt-2">
                  {pizza.description}
                </p>
                <p className="text-orange-700 font-bold text-center mt-2">
                  ${pizza.price}
                </p>
                <button className="bg-orange-500 text-white text-sm mt-3 px-4 py-2 rounded opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mx-auto block hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OurLocations />
    </>
  );
}

MainLayout.propTypes = {
  searchResults: PropTypes.array,
  searchTerm: PropTypes.string,
};

MainLayout.defaultProps = {
  searchResults: [],
  searchTerm: "",
};
