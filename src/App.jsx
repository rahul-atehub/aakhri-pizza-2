import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import MainLayout from "./MainLayout.jsx";
import AboutUs from "./AboutUs.jsx";
import Menu from './Menu.jsx'; // Import Menu
import menuData from "./data/menuData.jsx"; // Correct import

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = menuData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <Header onSearch={handleSearch} />

      {/* Main Content Section */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                searchResults={searchResults}
                searchTerm={searchTerm}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                searchResults={searchResults}
                searchTerm={searchTerm}
              />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
