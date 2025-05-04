import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function Menu({ searchTerm, searchResults }) {
  const [menuData, setMenuData] = useState([]);
  const [randomPizzas, setRandomPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch menu data from API
    const fetchMenuData = async (retryCount = 3) => {
      try {
        setLoading(true);

        // Allow up to 10 seconds before timing out
        const response = await axios.get(
          "https://world.openfoodfacts.org/cgi/search.pl?search_terms=pizza&search_simple=1&action=process&json=1",
          { timeout: 10000 } // 10 seconds
        );

        const pizzaProducts = response.data.products || [];
        setMenuData(pizzaProducts);
        selectRandomPizzas(pizzaProducts);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.message);

        // If it's a timeout or server issue, retry
        if (retryCount > 0) {
          console.log(`Retrying... Attempts left: ${retryCount - 1}`);
          setTimeout(() => fetchMenuData(retryCount - 1), 2000); // Try again after 2 seconds
          return;
        }

        setError("Failed to load menu data. Please try again later.");
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Function to select 9 random pizzas from the menu data
  const selectRandomPizzas = (pizzaData) => {
    if (!pizzaData || pizzaData.length === 0) return [];

    // If we have fewer than 9 pizzas, just use all of them
    if (pizzaData.length <= 9) {
      setRandomPizzas([...pizzaData]);
      return;
    }

    // Create a copy of the array to avoid mutating the original
    const shuffled = [...pizzaData];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take the first 9 pizzas
    setRandomPizzas(shuffled.slice(0, 9));
  };

  // Determine which pizzas to display based on search
  const pizzasToDisplay = searchTerm
    ? searchResults
    : randomPizzas.length > 0
    ? randomPizzas
    : menuData;

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-orange-600 text-xl">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
              src={
                pizza.image_url ||
                "https://via.placeholder.com/400x300?text=Pizza+Image"
              }
              alt={pizza.product_name}
              className="w-full h-48 object-cover"
            />
            <h3>{pizza.product_name || "Unnamed Pizza"}</h3>
            <p>{pizza.generic_name || "Delicious pizza made with love"}</p>

            {/* since api doesn't give price fall back to default */}

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {pizza.name}
              </h3>
              <p className="text-gray-600 mb-2">{pizza.description}</p>
              <div className="flex items-center justify-between mb-3">
                <p className="text-orange-600 font-bold">
                  ${pizza.price || "9.99"}
                </p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Menu.propTypes = {
  searchTerm: PropTypes.string,
  searchResults: PropTypes.array,
};

Menu.defaultProps = {
  searchTerm: "",
  searchResults: [],
};
