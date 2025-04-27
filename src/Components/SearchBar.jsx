import React, { useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center border border-orange-900 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-orange-900 w-80">
      <FaSearch className="text-orange-900 mr-2" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        className="flex-grow focus:outline-none text-orange-900"
      />
      <button
        onClick={handleSearch}
        className="text-orange-900 hover:text-orange-700 ml-2"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}