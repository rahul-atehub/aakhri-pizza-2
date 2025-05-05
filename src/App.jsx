import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import MainLayout from "./MainLayout.jsx";
import AboutUs from "./AboutUs.jsx";
import Menu from "./Menu.jsx";
import menuData from "./data/menuData.jsx";
import OrderForm from "./OrderForm.jsx";
import LoginModal from "./Components/Login.jsx";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle login/logout functionality
  const handleLoginClick = () => {
    if (user) {
      // If user is logged in, log them out
      setUser(null);
      localStorage.removeItem('user');
    } else {
      // If not logged in, show login modal
      setIsLoginModalOpen(true);
    }
  };

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoginModalOpen(false);
  };

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
      <Header 
        onSearch={handleSearch} 
        onLoginClick={handleLoginClick} 
        isLoggedIn={!!user}
        userName={user?.email}
      />

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
              <Menu searchResults={searchResults} searchTerm={searchTerm} />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/Order-Online" element={<OrderForm />} />
        </Routes>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
