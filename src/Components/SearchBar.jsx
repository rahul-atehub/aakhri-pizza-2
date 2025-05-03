import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

export default function SearchBar({ onSearch, className, showPlaceholder = true }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Debounce search for performance - only search after 300ms of no typing
    const delaySearch = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query, onSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className={`relative flex items-center border border-orange-900 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-orange-900 ${className}`}>
    <FaSearch className="text-orange-900 text-lg absolute left-2" />
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      placeholder={showPlaceholder ? "Search ..." : ""}
      className="flex-grow focus:outline-none text-orange-900 bg-transparent sm:pl-8 md:pl-10 lg:pl-12"
    />
  </div>
  
  );
}
// PropTypes for type checking
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  showPlaceholder: PropTypes.bool,
};

SearchBar.defaultProps = {
  className: "",
  showPlaceholder: true,
};
