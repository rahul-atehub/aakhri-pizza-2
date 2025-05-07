import React from "react";
import { useState, useEffect } from "react";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(""); // Clear any errors when switching tabs
  };

  const validateForm = () => {
    // Simple validation
    if (!email || !password) {
      setError("Please fill all required fields");
      return false;
    }

    if (activeTab === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (activeTab === "login") {
      console.log("Login attempt:", { email, password });
      // Add your login logic here

      // For demo purposes - in a real app you'd verify credentials with your backend
      if (email && password) {
        // Set logged in state
        setIsLoggedIn(true);
        
        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify({ email }));
        
        // Show login alert
        setShowAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        // Notify parent component about successful login
        if (onLoginSuccess) {
          onLoginSuccess({ email });
        }

        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Close modal
        onClose();
      }
    } else {
      console.log("Register attempt:", { email, password, confirmPassword });
      // Add your registration logic here

      // For demo - in a real app you'd create the user in your backend
      if (email && password && password === confirmPassword) {
        // Set logged in state
        setIsLoggedIn(true);
        
        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify({ email }));
        
        // Show login alert
        setShowAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        // Notify parent component about successful registration and login
        if (onLoginSuccess) {
          onLoginSuccess({ email });
        }

        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Close modal
        onClose();
      }
    }
  };

  // Alert component
  const Alert = ({ message, type }) => (
    <div className={`fixed top-16 right-4 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
      {message}
    </div>
  );

  // If logged in, just show the login alert
  if (isLoggedIn) {
    return (
      <>
        {showAlert && <Alert message="You have successfully logged in!" type="success" />}
      </>
    );
  }

  // Return null if modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-orange-800">Account</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${
              activeTab === "login"
                ? "bg-orange-500 rounded-md text-gray-800"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "register"
                ? "bg-orange-500 rounded-md text-gray-800"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {activeTab === "register" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-4"
          >
            {activeTab === "login" ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
