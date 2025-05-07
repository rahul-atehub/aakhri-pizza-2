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
        console.log("Fetching menu data...");

        // Use TheMealDB API - this endpoint always returns data (categories)
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
          { timeout: 10000 } // 10 seconds
        );

        console.log("API Response:", response.data);

        // Check if we have categories data
        if (response.data && response.data.categories) {
          // Transform categories data to menu items format
          const menuItems = response.data.categories.map(category => ({
            id: category.idCategory,
            name: category.strCategory,
            description: category.strCategoryDescription.substring(0, 100) + "...",
            image_url: category.strCategoryThumb,
            price: ((Math.random() * 10) + 5).toFixed(2) // Generate random price between $5-$15
          }));
          
          console.log("Transformed data:", menuItems);
          setMenuData(menuItems);
          selectRandomPizzas(menuItems);
        } else {
          // If API returns unexpected format
          setError("No menu items found. Please try again later.");
        }
        
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

  // Function to select random pizzas from the menu data
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

  // Determine which items to display based on search
  const itemsToDisplay = searchTerm
    ? (searchResults && searchResults.length > 0) 
        ? searchResults 
        : menuData.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
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
          {itemsToDisplay.length === 0 ? (
            <p className="text-red-500">No results found for "{searchTerm}"</p>
          ) : (
            <p className="text-green-600">Found {itemsToDisplay.length} results for "{searchTerm}"</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item) => (
            <div
              key={item.id}
              className="pizza-card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
            >
              <img
                src={
                  item.image_url ||
                  "https://via.placeholder.com/400x300?text=Food+Image"
                }
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-orange-600 font-bold">
                    ${item.price}
                  </p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        )}
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