import React from 'react';
import menuData from './data/menuData.jsx';
import PropTypes from 'prop-types';

export default function Menu({ searchTerm, searchResults }) {
  const pizzasToDisplay = searchTerm ? searchResults : menuData;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Menu
      </h2>

      {searchTerm && (
        <div className="mb-6 text-center">
          {pizzasToDisplay.length === 0 ? (
            <p className="text-red-500">No results found for "{searchTerm}"</p>
          ) : (
            <p className="text-green-600">Showing results for "{searchTerm}"</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzasToDisplay.map((pizza, index) => (
          <div
            key={index}
            className="pizza-card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-48 sm:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{pizza.name}</h3>
              <p className="text-gray-600 mb-2">{pizza.description}</p>
              <p className="text-orange-600 font-bold">${pizza.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Menu.propTypes = {
  searchTerm: PropTypes.string,
  searchResults: PropTypes.array
};

Menu.defaultProps = {
  searchTerm: '',
  searchResults: []
};
