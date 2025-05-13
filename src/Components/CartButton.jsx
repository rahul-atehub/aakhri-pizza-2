import React from "react";
import { useCart } from "./Cart.jsx";
import PropTypes from "prop-types";

export default function CartButton({ className, iconOnly = false }) {
  const { toggleCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <button
      onClick={toggleCart}
      className={`relative p-2 text-gray-600 hover:text-orange-600 transition-colors focus:outline-none ${className || ""}`}
      aria-label="Open cart"
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
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      
      {/* Cart counter badge */}
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
      
      {/* Optional text label */}
      {!iconOnly && cartCount > 0 && (
        <span className="ml-1 sr-only md:not-sr-only md:ml-2">
          Cart ({cartCount})
        </span>
      )}
    </button>
  );
}

CartButton.propTypes = {
  className: PropTypes.string,
  iconOnly: PropTypes.bool
};