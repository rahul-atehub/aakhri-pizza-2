import React, { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";

// Create a CartContext to manage cart state globally
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data from localStorage:", e);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    // Optional: Open cart after adding item
    // setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity is less than 1, remove the item
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Cart Total Price

  const getCartTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Makes all functions and states available to any child components.

  // Also renders the <Cart /> sidebar.

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    getCartCount,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Cart />
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart component
export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    isCartOpen,
    toggleCart,
  } = useCart();

  const cartTotal = getCartTotal();

  return (
    <>
      {/* Cart overlay - darkens the background when cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.1)] z-40"
          onClick={toggleCart}
        />
      )}

      {/* Cart sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-orange-800">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-orange-500 hover:text-orange-700"
              aria-label="Close cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="mt-4 text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex border-b border-gray-100 pb-4"
                  >
                    <div className="w-20 h-20">
                      <img
                        src={
                          item.image_url ||
                          "https://via.placeholder.com/80x80?text=Food"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-orange-600 font-bold">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 bg-gray-100 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold">${cartTotal}</span>
            </div>
            <button
              onClick={() => {
                alert("Processing checkout for $" + cartTotal);
                // Here you would typically redirect to a checkout page
                // or open a checkout modal
                // For now, we'll just clear the cart to simulate completion
                clearCart();
                toggleCart();
              }}
              className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded font-medium hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
